import { Stack } from "aws-cdk-lib";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { IBucket } from "aws-cdk-lib/aws-s3";

export class data extends Stack {
    public readonly booksTable: ITable;
    public readonly booksBucket: IBucket;
    
    constructor(scope: , id: string, props?: ) {
        // constructor implementation goes here
    }
}