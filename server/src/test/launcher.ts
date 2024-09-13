import { handler } from "../lambdas/handler";

process.env.AWS_REGION = "us-east-1";

handler({httpMethod: 'GET'} as any, {} as any).then(result => console.log(result))