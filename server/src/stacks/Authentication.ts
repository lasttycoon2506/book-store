import { Stack, StackProps } from "aws-cdk-lib";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class Authentication extends Stack{
    private userPool: UserPool;
    private userPoolClient: UserPoolClient;
    
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.authenticationUserPool();
        this.authnenticationUserPoolClient();
    }

    private authenticationUserPool(){};
    private authnenticationUserPoolClient(){};

}