import { Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { existsSync } from "fs";
import { join } from "path";

export class UiDeployment extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const deploymentBucket = new Bucket(this, 'UiDeploymentBucket', {
            bucketName: 'bookstore-frontend'
        });

        const uiPath = join(__dirname, "..", "..", "..", "client", "dist");
        if (!existsSync(uiPath)) {
            console.warn('ui path dne');
        }

        new BucketDeployment(this, 'BookstoreDeployment', {
            sources: [Source.asset(uiPath)],
            destinationBucket: deploymentBucket
        });

        
    }
}