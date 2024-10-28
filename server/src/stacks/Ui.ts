import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib'
import {
    AccessLevel,
    Distribution,
} from 'aws-cdk-lib/aws-cloudfront'
import {
    S3BucketOrigin,
} from 'aws-cdk-lib/aws-cloudfront-origins'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment'
import { Construct } from 'constructs'
import { existsSync } from 'fs'
import { join } from 'path'

export class Ui extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        const deploymentBucket = new Bucket(this, 'UiBucket', {
            bucketName: 'books-fe',
        })

        const uiPath = join(__dirname, '..', '..', '..', 'client', 'dist')
        if (!existsSync(uiPath)) {
            console.warn('ui path dne')
            return
        }

        new BucketDeployment(this, 'BookstoreDeployment', {
            sources: [Source.asset(uiPath)],
            destinationBucket: deploymentBucket,
        })

        const s3origin = S3BucketOrigin.withOriginAccessControl(
            deploymentBucket,
            {
                originAccessLevels: [AccessLevel.READ],
            }
        )

        const distribution = new Distribution(this, 'BookstoreDistribution', {
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin: s3origin,
            },
        })

        new CfnOutput(this, 'BookstoreUrl', {
            value: distribution.distributionDomainName,
        })
    }
}
