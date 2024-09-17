import { Stack, StackProps } from "aws-cdk-lib"
import { CognitoUserPoolsAuthorizer, Cors, LambdaIntegration, ResourceOptions, RestApi } from "aws-cdk-lib/aws-apigateway"
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
    booksLambdaIntegration: LambdaIntegration;
    userPool: IUserPool;
}

export class Api extends Stack {
    constructor(scope: Construct, id: string, props?: ApiStackProps) {
        super(scope, id, props);

        const api = new RestApi(this, 'booksApi');

        const authorizer = new CognitoUserPoolsAuthorizer(this, 'BookstoreApiAuthorizer', {
            cognitoUserPools: [props.userPool],
            identitySource: 'method.request.header.Authorization'
        });

        authorizer._attachToApi(api);

        const optionsWithCors: ResourceOptions = {
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
                allowMethods: Cors.ALL_METHODS
            }
        }
        
        const bookResource = api.root.addResource('books', optionsWithCors);
        bookResource.addMethod("GET", props.booksLambdaIntegration)
        bookResource.addMethod("POST", props.booksLambdaIntegration)
        bookResource.addMethod("PUT", props.booksLambdaIntegration)
        bookResource.addMethod("DELETE", props.booksLambdaIntegration)
    }
}