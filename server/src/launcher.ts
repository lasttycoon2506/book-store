import { App } from "aws-cdk-lib";
import { Data } from "./stacks/Data";
import { Lambdas } from "./stacks/Lambdas";
import { Api } from "./stacks/Api";
import { Authentication } from "./stacks/Authentication";
import { UiDeployment } from "./stacks/UiDeployment";


const app = new App();
const dataStack = new Data(app, 'DataStack');
const lambdaStack = new Lambdas(app, 'LambdaStack', {
    booksTable: dataStack.booksTable
});
const authenticationStack = new Authentication(app, 'AuthenticationStack', {
    booksBucket: dataStack.booksBucket
}
);
const apiStack = new Api(app, 'ApiStack', {
    booksLambdaIntegration: lambdaStack.booksLambdaIntegration,
    userPool: authenticationStack.userPool
});
const uiDeploymentStack = new UiDeployment(app, 'UiDeploymentStack');
