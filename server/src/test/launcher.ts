import { handler } from "../lambdas/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "book-table";


handler({httpMethod: 'POST',
    body: JSON.stringify({
            userName: "tester2",
            name: 'bb',
            email: 'aaaaa@gmail',
            phoneNumber:'+5847583860',
            password: 'testeR1234!'
            })
} as any).then(result => console.log(result));