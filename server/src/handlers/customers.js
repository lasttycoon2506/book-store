import { client } from "../../db.js";
import { Customer } from "../entities/Customer.js";
import {
    GetItemCommand,
    PutItemCommand,
    UpdateItemCommand, 
    DeleteItemCommand,
    ScanCommand
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";


export const getCustomer = async (event) => {
    const response = { statusCode: 200 };
    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ customerId: event.pathParameters.customerId }),
        };
        const { Item } = await client.send(new GetItemCommand(params));

        console.log({ Item });
        response.body = JSON.stringify({
            message: "Successfully retrieved customer.",
            data: (Item) ? unmarshall(Item) : {},
            rawData: Item,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to get customer.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }
    return response;
};

export const createCustomer = async (event) => {
    const response = { statusCode: 200 };
    const { 
        customerId,
        uesrName, 
        password, 
        name, 
        email, 
        address } = JSON.parse(event.body);

    const newCustomer = new Customer(customerId, uesrName, password, name, email, address);

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: marshall(newCustomer, {convertClassInstanceToMap: true}),
        };
        const createResult = await client.send(new PutItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully created customer",
            createResult,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to create customer.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }
    return response;
};

export const updateCustomer = async (event) => {
    const response = { statusCode: 200 };
    try {
        const body = JSON.parse(event.body);
        const objKeys = Object.keys(body);
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ customerId: event.pathParameters.customerId }),
            UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
            ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`#key${index}`]: key,
            }), {}),
            ExpressionAttributeValues: marshall(objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`:value${index}`]: body[key],
            }), {})),
        };
        const updateResult = await client.send(new UpdateItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully updated customer",
            updateResult,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to update customer",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }
    return response;
};

export const deleteCustomer = async (event) => {
    const response = { statusCode: 200 };
    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ customerId: event.pathParameters.customerId }),
        };
        const deleteResult = await client.send(new DeleteItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully deleted customer",
            deleteResult,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to delete customer",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }
    return response;
};

export const getAllCustomer = async () => {
    const response = { statusCode: 200 };

    try {
        const { Items } = await client.send(new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME }));

        response.body = JSON.stringify({
            message: "Successfully retrieved all customer",
            data: Items.map((item) => unmarshall(item)),
            Items,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to retrieve customer",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }
    return response;
};