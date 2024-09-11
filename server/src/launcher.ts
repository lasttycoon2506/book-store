import { App } from "aws-cdk-lib";
import { Data } from "./stacks/Data";


const app = new App()
const data = new Data(app, 'DataStack');
