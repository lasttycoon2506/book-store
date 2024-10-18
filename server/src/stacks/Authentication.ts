import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib'
import {
    CfnIdentityPool,
    CfnIdentityPoolRoleAttachment,
    CfnUserPoolGroup,
    UserPool,
    UserPoolClient,
} from 'aws-cdk-lib/aws-cognito'
import {
    Effect,
    FederatedPrincipal,
    PolicyStatement,
    Role,
} from 'aws-cdk-lib/aws-iam'
import { IBucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

interface AuthStackProps extends StackProps {
    booksBucket: IBucket
}
export class Authentication extends Stack {
    public userPool?: UserPool 
    private userPoolClient?: UserPoolClient 
    private identityPool?: CfnIdentityPool 
    private authenticatedRole?: Role 
    private unAuthenticatedRole?: Role 
    private adminRole?: Role

    constructor(scope: Construct, id: string, props?: AuthStackProps) {
        super(scope, id, props)

        this.createUserPool()
        this.createUserPoolClient()
        this.createIdentityPool()
        this.createRoles(props.booksBucket)
        this.attachRoles()
        this.createAdminGroup()
    }

    private createUserPool() {
        this.userPool = new UserPool(this, 'BookstoreUserPool', {
            selfSignUpEnabled: true,
            signInAliases: {
                username: true,
                email: true,
            },
        })
        new CfnOutput(this, 'BookstoreUserPoolId', {
            value: this.userPool.userPoolId,
        })
    }

    private createUserPoolClient() {
        this.userPoolClient = this.userPool.addClient(
            'BookstoreUserPoolClient',
            {
                authFlows: {
                    adminUserPassword: true,
                    custom: true,
                    userPassword: true,
                    userSrp: true,
                },
            }
        )
        new CfnOutput(this, 'BookstoreUserPoolClientId', {
            value: this.userPoolClient.userPoolClientId,
        })
    }

    private createAdminGroup() {
        new CfnUserPoolGroup(this, 'BookstoreAdmins', {
            userPoolId: this.userPool.userPoolId,
            groupName: 'admins',
            roleArn: this.adminRole.roleArn,
        })
    }

    private createIdentityPool() {
        this.identityPool = new CfnIdentityPool(this, 'BookstoreIdentityPool', {
            allowUnauthenticatedIdentities: true,
            cognitoIdentityProviders: [
                {
                    clientId: this.userPoolClient.userPoolClientId,
                    providerName: this.userPool.userPoolProviderName,
                },
            ],
        })
        new CfnOutput(this, 'BookstoreIdentityPoolId', {
            value: this.identityPool.ref,
        })
    }

    private createRoles(booksBucket: IBucket) {
        this.authenticatedRole = new Role(
            this,
            'CognitoDefaultAuthenticatedRole',
            {
                assumedBy: new FederatedPrincipal(
                    'cognito-identity.amazonaws.com',
                    {
                        StringEquals: {
                            'cognito-identity.amazonaws.com:aud':
                                this.identityPool.ref,
                        },
                        'ForAnyValue:StringLike': {
                            'cognito-identity.amazonaws.com:amr':
                                'authenticated',
                        },
                    },
                    'sts:AssumeRoleWithWebIdentity'
                ),
            }
        )
        this.unAuthenticatedRole = new Role(
            this,
            'CognitoDefaultUnAuthenticatedRole',
            {
                assumedBy: new FederatedPrincipal(
                    'cognito-identity.amazonaws.com',
                    {
                        StringEquals: {
                            'cognito-identity.amazonaws.com:aud':
                                this.identityPool.ref,
                        },
                        'ForAnyValue:StringLike': {
                            'cognito-identity.amazonaws.com:amr':
                                'unauthenticated',
                        },
                    },
                    'sts:AssumeRoleWithWebIdentity'
                ),
            }
        )
        this.adminRole = new Role(this, 'CognitoAdminRole', {
            assumedBy: new FederatedPrincipal(
                'cognito-identity.amazonaws.com',
                {
                    StringEquals: {
                        'cognito-identity.amazonaws.com:aud':
                            this.identityPool.ref,
                    },
                    'ForAnyValue:StringLike': {
                        'cognito-identity.amazonaws.com:amr': 'authenticated',
                    },
                },
                'sts:AssumeRoleWithWebIdentity'
            ),
        })
        this.authenticatedRole.addToPolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                actions: ['cognito-idp:ListUsers'],
                resources: [
                    booksBucket.bucketArn + '/*',
                    this.userPool.userPoolArn,
                ],
            })
        )
    }

    private attachRoles() {
        new CfnIdentityPoolRoleAttachment(this, 'AttachRoles', {
            identityPoolId: this.identityPool.ref,
            roles: {
                authenticated: this.authenticatedRole.roleArn,
                unauthenticated: this.unAuthenticatedRole.roleArn,
            },
            roleMappings: {
                adminsMapping: {
                    type: 'Token',
                    ambiguousRoleResolution: 'AuthenticatedRole',
                    identityProvider: `cognito-idp.${this.region}.amazonaws.com/${this.userPool.userPoolId}:${this.userPoolClient.userPoolClientId}`,
                },
            },
        })
    }
}
