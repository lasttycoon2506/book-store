import { App } from "aws-cdk-lib";
import { Data } from "./stacks/data";


const app = new App()
const data = new Data(app, 'DataStack');
