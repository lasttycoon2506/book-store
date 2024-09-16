import { App } from "aws-cdk-lib";
import { Data } from "./stacks/Data";
import { Lambdas } from "./stacks/Lambdas";
import { Api } from "./stacks/Api";


const app = new App();
const dataStack = new Data(app, 'DataStack');
const lambdaStack = new Lambdas(app, 'LambdaStack', {
    booksTable: dataStack.booksTable
});
const apiStack = new Api(app, 'ApiStack', {
    booksLambdaIntegration: lambdaStack.booksLambdaIntegration
});
