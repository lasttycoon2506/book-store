import { QueryString } from "aws-cdk-lib/aws-logs";
import { handler } from "../lambdas/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "books-table";


handler({httpMethod: 'GET',
    queryStringParameters: {id: 'ae37f8e8-aefa-4dfa-9d0f-26fca1631a4a'}
} as any, {} as any).then(result => console.log(result));