import { handler } from "../lambdas/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "book-table";


handler({httpMethod: 'POST',
    body: JSON.stringify({
            userName: "toodles"
            })
} as any).then(result => console.log(result));