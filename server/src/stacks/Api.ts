import { Stack, StackProps } from "aws-cdk-lib"
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway"

interface ApiStackProps extends StackProps {
    booksLambdaIntegration: LambdaIntegration
}

export class Api extends Stack {

}