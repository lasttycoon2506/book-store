import { handler } from "../lambdas/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "books-table";

handler({
    httpMethod: "POST", 
    body: JSON.stringify({
        bookTitle: 'laddy',
        pages: 25
})} as any, {} as any).then(result => console.log(result));