import { handler } from "../lambdas/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "book-table";


handler({httpMethod: 'POST',
    body: JSON.stringify({
            userName: "tester2",
            name: 'jd',
            email: 'chacha@gmail',
            phoneNumber:'+3853845847',
            password: 'testeR1234!'
            })
} as any).then(result => console.log(result));