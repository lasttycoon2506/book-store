import { App } from "aws-cdk-lib";
import { Data } from "./stacks/Data";
import { Lambdas } from "./stacks/Lambdas";


const app = new App()
const dataStack = new Data(app, 'DataStack');
const lambdaStack = new Lambdas(app, 'LambdaStack', {
    booksTable: dataStack.booksTable
})
