import { handler } from "../lambdas/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "book-table";


handler({httpMethod: 'PUT',
    queryStringParameters: {
        id: '74011270-06a2-4da1-a944-06d7a3b79d73'
    },
    body: JSON.stringify({
            title: "gg",
            author:"fitzy",
            pages: "25",
            genre: "lit",
            price:"6.99",
            stock:"5"
            })
} as any).then(result => console.log(result));