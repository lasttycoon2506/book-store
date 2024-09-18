import { Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { join } from "path";

export class UiDeployment extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const deploymentBucket = new Bucket(this, 'UiDeploymentBucket', {
            bucketName: 'bookstore-frontend'
        })

        const uiPath = join(__dirname, "..", "..", "..", "client", "dist")
    }
}