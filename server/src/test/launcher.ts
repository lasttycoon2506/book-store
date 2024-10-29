import { handler } from "../lambdas/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "book-table";


handler({httpMethod: 'POST',
    body: JSON.stringify({
            userName: 'chacha5378',
            name: 'jibby',
            email: 'hkjh@gmail.com',
            phone:'3853545847',
            password: '37dBe73*vkdKd37x'
            })
} as any).then(result => console.log(result));

// handler({httpMethod: 'GET',
//     queryStringParameters: {id: 'dgd'}
// } as any).then(result => console.log(result));

// handler({httpMethod: 'POST',
//     body: JSON.stringify({
//             title: 'chubby',
//             author: 'jibby',
//             pages: 8,
//             genre:'lit',
//             price: 56,
//             stock: 3
//             })
// } as any).then(result => console.log(result));