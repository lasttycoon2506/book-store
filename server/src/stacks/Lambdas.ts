import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { join } from "path";


interface booksTableProps extends StackProps {
    booksTable: ITable
}

export class Lambdas extends Stack {

    public readonly booksLambdaIntegration: LambdaIntegration;
    
    constructor(scope: Construct, id: string , props: booksTableProps) {
        super(scope, id, props)

        const booksLambda = new NodejsFunction(this, 'BooksLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: (join(__dirname, '..','..', 'services', 'spaces', 'handler.ts')),
            environment: {
                TABLE_NAME: props.booksTable.tableName
            },
            timeout: Duration.minutes(1)
        })
    }
}