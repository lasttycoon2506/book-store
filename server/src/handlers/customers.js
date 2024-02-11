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