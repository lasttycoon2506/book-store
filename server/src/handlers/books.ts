import { client } from "../../db.js";
import { Book } from "../entities/Book.js";
import {
    GetItemCommand,
    PutItemCommand,
    UpdateItemCommand, 
    DeleteItemCommand,
    ScanCommand,
    AttributeValue,
    PutItemCommandOutput,
    UpdateItemCommandOutput
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";


type responseData = {
    statusCode: number,
    statusMessage: string, 
    data?: Record<string, any>, 
    rawData?: Record<string, AttributeValue>,
    createResult?: PutItemCommandOutput,
    updateResult?: UpdateItemCommandOutput,
    errorMsg?: string,
    errorStack?: string
    };
    
let response: responseData = {
    statusCode: 0,
    statusMessage: ""
};

export async function getBook(bookId: number): Promise<responseData> {              
    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ bookId: bookId }),
        };
        const { Item } = await client.send(new GetItemCommand(params));
        
        console.log({ Item });
        response = {
            statusCode: 200,
            statusMessage: "Successfully retrieved book",
            data: (Item) ? unmarshall(Item) : {},
            rawData: Item
            };
        
    } catch (error: any) {
        console.error(error);
        response = {
            statusCode: 500,
            statusMessage: "Failed to get book",
            errorMsg: error.message,
            errorStack: error.stack,
        };
    }

    return response;
};


export async function createBook(book: Book): Promise<responseData> {
    const { 
        bookId,
        title, 
        author, 
        pages, 
        genre, 
        price, 
        stock } = book;

    const newBook: Book = {bookId, title, author, pages, genre, price, stock};

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: marshall(newBook, {convertClassInstanceToMap: true}),
        };
        const createResult = await client.send(new PutItemCommand(params));

        response = {
            statusCode: 200,
            statusMessage: "Successfully created book",
            createResult,
        };
    } catch (error: any) {
        console.error(error);
        response = {
            statusCode: 500,
            statusMessage: "Failed to create book",
            errorMsg: error.message,
            errorStack: error.stack,
        };
    }

    return response;
};

export async function updateBook(bookId: number): Promise<responseData> {
    try {
        const objKeys = Object.keys(bookId);
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ bookId: bookId }),
            UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
            ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`#key${index}`]: key,
            }), {}),
            ExpressionAttributeValues: marshall(objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`:value${index}`]: key,
            }), {})),
        };
        const updateResult = await client.send(new UpdateItemCommand(params));

        response = {
            statusCode: 200,
            statusMessage: "Successfully updated book.",
            updateResult,
        };
    } catch (error: any) {
        console.error(error);
        response= {
            statusCode: 500,
            statusMessage: "Failed to update book.",
            errorMsg: error.message,
            errorStack: error.stack,
        };
    }

    return response;
};

export const deleteBook = async (event) => {
    const response = { statusCode: 200 };

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ bookId: event.pathParameters.bookId }),
        };
        const deleteResult = await client.send(new DeleteItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully deleted book.",
            deleteResult,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to delete book.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

export const getAllBooks = async () => {
    const response = { statusCode: 200 };

    try {
        const { Items } = await client.send(new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME }));

        response.body = JSON.stringify({
            message: "Successfully retrieved all books.",
            data: Items.map((item) => unmarshall(item)),
            Items,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to retrieve books.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

