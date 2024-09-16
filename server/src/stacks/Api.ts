import { Stack, StackProps } from "aws-cdk-lib"
import { LambdaIntegration, ResourceOptions, RestApi } from "aws-cdk-lib/aws-apigateway"
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
    booksLambdaIntegration: LambdaIntegration;
}

export class Api extends Stack {
    constructor(scope: Construct, id: string, props?: ApiStackProps) {
        super(scope, id, props);


        const api = new RestApi(this, 'booksApi');

        const optionsWithCors: ResourceOptions = {
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
                allowMethods: Cors.ALL_METHODS
            }
        }
    }
}