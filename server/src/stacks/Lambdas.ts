import { Duration, Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { join } from 'path'
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { AuthenticationStack } from '../../outputs.json'

interface booksTableProps extends StackProps {
    booksTable: ITable
}

export class Lambdas extends Stack {
    public readonly booksLambdaIntegration: LambdaIntegration

    constructor(scope: Construct, id: string, props: booksTableProps) {
        super(scope, id, props)

        const booksLambda = new NodejsFunction(this, 'BooksLambda', {
            runtime: Runtime.NODEJS_20_X,
            handler: 'handler',
            entry: join(__dirname, '..', 'lambdas', 'handler.ts'),
            environment: {
                TABLE_NAME: props.booksTable.tableName,
            },
            timeout: Duration.minutes(1),
        })

        booksLambda.addToRolePolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                resources: [
                    props.booksTable.tableArn,
                    AuthenticationStack.ExportsOutputFnGetAttBookstoreUserPool751DBDD9Arn9ED2C3EE,
                ],
                actions: [
                    'dynamodb:PutItem',
                    'dynamodb:Scan',
                    'dynamodb:GetItem',
                    'dynamodb:UpdateItem',
                    'dynamodb:DeleteItem',
                    'cognito-idp:AdminCreateUser',
                    'cognito-idp:AdminSetUserPassword'
                ],
            })
        )
        this.booksLambdaIntegration = new LambdaIntegration(booksLambda)
    }
}
