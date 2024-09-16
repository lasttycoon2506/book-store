import { handler } from "../lambdas/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "books-table";


handler({httpMethod: 'PUT',
    queryStringParameters: {id: 'a811f04e-119a-4802-8f69-2a5f40aeaf68'},
    body: JSON.stringify({bookTitle: 'gats',
        pages: 5
    })
} as any, {} as any).then(result => console.log(result));