import { handler } from "../lambdas/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "book-table";


handler({httpMethod: 'POST',
    body: JSON.stringify({
            userName: "tester",
            name: 'jibby',
            email: 'chacha@gma',
            phoneNumber:'+3853545847',
            password: 'testeR123!'
            })
} as any).then(result => console.log(result));