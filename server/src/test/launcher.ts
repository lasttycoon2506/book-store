import { handler } from "../lambdas/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "books-table";


handler({httpMethod: 'POST',
    body: JSON.stringify({bookTitle: 'labs in paradise',
        pages: 24
    })
} as any, {} as any).then(result => console.log(result));