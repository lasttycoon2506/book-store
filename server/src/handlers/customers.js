import { client } from "../../db.js";
import { Book } from "../entities/Book.js";
import {
    GetItemCommand,
    PutItemCommand,
    UpdateItemCommand, 
    DeleteItemCommand,
    ScanCommand
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";


export const getBook = async (event) => {
    
};