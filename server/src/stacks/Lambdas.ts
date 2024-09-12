import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";


export class Lambdas extends Stack {

    public readonly booksLambdaIntegration: LambdaIntegration;
    
    constructor(scope: Construct, id: string , props: StackProps) {
        super(scope, id, props)

        const booksLambda = new NodejsFunction(this, 'BooksLambda', {
            
        })
    }
}