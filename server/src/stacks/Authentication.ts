import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { CfnIdentityPool, CfnUserPoolGroup, UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class Authentication extends Stack{
    public userPool: UserPool;
    private userPoolClient: UserPoolClient;
    private identityPool: CfnIdentityPool;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.createUserPool();
        this.createUserPoolClient();
        this.createAdminGroup();
        this.createIdentityPool();
    }

    private createUserPool() {
        this.userPool = new UserPool(this, 'BookstoreUserPool', 
            {
                selfSignUpEnabled: true,
                signInAliases: {
                    username: true,
                    email: true
                }
            }
        )
        new CfnOutput(this, 'BookstoreUserPoolId', {
            value: this.userPool.userPoolId
        });
    };

    private createUserPoolClient() {
        this.userPoolClient = this.userPool.addClient('BookstoreUserPoolClient', {
            authFlows: {
                adminUserPassword: true,
                custom: true,
                userPassword: true,
                userSrp: true
            }
        })
        new CfnOutput(this, 'BookstoreUserPoolClientId', {
            value: this.userPoolClient.userPoolClientId
        })
    };

    private createAdminGroup() {
        new CfnUserPoolGroup(this, 'BookstoreAdmins', {
            userPoolId: this.userPool.userPoolId,
            groupName: 'admins'
        })
    };

    private createIdentityPool() {
        this.identityPool = new CfnIdentityPool(this, 'BookstoreIdentityPool', {
            allowUnauthenticatedIdentities: true,
            cognitoIdentityProviders: [{
                clientId : this.userPoolClient.userPoolClientId,
                providerName : this.userPool.userPoolProviderName
            }]
        })
        new CfnOutput(this, 'BookstoreIdentityPoolId', {
            value: this.identityPool.ref
        })
    }
}