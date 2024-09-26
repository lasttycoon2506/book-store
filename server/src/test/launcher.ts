import { handler } from "../lambdas/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "book-table";


handler({httpMethod: 'DELETE',
    queryStringParameters: {
        id: '10cdee4d-0126-4a67-b9f3-be8d61439ace'
    }
} as any).then(result => console.log(result));