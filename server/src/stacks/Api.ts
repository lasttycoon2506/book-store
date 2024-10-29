import { Stack, StackProps } from 'aws-cdk-lib'
import {
    AuthorizationType,
    CognitoUserPoolsAuthorizer,
    Cors,
    LambdaIntegration,
    MethodOptions,
    ResourceOptions,
    RestApi,
} from 'aws-cdk-lib/aws-apigateway'
import { IUserPool } from 'aws-cdk-lib/aws-cognito'
import { Construct } from 'constructs'

interface ApiStackProps extends StackProps {
    booksLambdaIntegration: LambdaIntegration
    userPool: IUserPool
}

export class Api extends Stack {
    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props)

        const api = new RestApi(this, 'booksApi')

        const authorizer = new CognitoUserPoolsAuthorizer(
            this,
            'BookstoreApiAuthorizer',
            {
                cognitoUserPools: [props.userPool],
                identitySource: 'method.request.header.Authorization',
            }
        )

        authorizer._attachToApi(api)

        const authOptions: MethodOptions = {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: {
                authorizerId: authorizer.authorizerId,
            },
        }

        const optionsWithCors: ResourceOptions = {
            defaultCorsPreflightOptions: {
                allowOrigins: ['http://localhost:5173' ],
                allowMethods: Cors.ALL_METHODS,
            },
        }

        const bookResource = api.root.addResource('books', optionsWithCors)
        bookResource.addMethod('GET', props.booksLambdaIntegration, authOptions)
        bookResource.addMethod(
            'POST',
            props.booksLambdaIntegration,
            authOptions
        )
        bookResource.addMethod('PUT', props.booksLambdaIntegration, authOptions)
        bookResource.addMethod(
            'DELETE',
            props.booksLambdaIntegration,
            authOptions
        )
    }
}
