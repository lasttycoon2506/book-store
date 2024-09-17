import { Stack, StackProps } from "aws-cdk-lib";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class Authentication extends Stack{
    private userPool: UserPool;
    private userPoolClient: UserPoolClient;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.createUserPool();
        this.createUserPoolClient();
    }

    private createUserPool(){
        this.userPool = new UserPool(this, 'BookstoreUserPool', 
            {
                selfSignUpEnabled: true,
                signInAliases: {
                    username: true,
                    email: true
                }
            }
        )
    };

    private createUserPoolClient(){
        this.userPoolClient = this.userPool.addClient('BookstoreUserPoolClient', {
            authFlows: {
                adminUserPassword: true,
                custom: true,
                userPassword: true,
                userSrp: true
            }
        })
    };

}