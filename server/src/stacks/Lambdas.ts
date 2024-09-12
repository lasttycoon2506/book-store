import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';


export class Lambdas extends Stack {

    public readonly lambdas: NodejsFunction;
    
    constructor(scope: Construct, id: string , props: StackProps) {
        super(scope, id, props)

        const booksLambda = new NodejsFunction(this, 'BooksLambda', {
            
        })
    }
}