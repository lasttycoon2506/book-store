import { Stack, StackProps } from "aws-cdk-lib"
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway"
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
    booksLambdaIntegration: LambdaIntegration;
}

export class Api extends Stack {
    constructor(scope: Construct, id: string, props?: ApiStackProps) {
        super(scope, id, props);


        
    }
}