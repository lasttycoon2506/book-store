import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Bucket, BucketAccessControl, HttpMethods, IBucket, ObjectOwnership } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class Data extends Stack {
    public readonly booksBucket: IBucket;
    public readonly booksTable: ITable;
    
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.booksBucket = new Bucket(this, 'BooksBuck', {
            bucketName: 'books-buck2',
            cors: [{
                allowedMethods: [
                    HttpMethods.HEAD,
                    HttpMethods.GET,
                    HttpMethods.PUT,
                ],
                allowedOrigins: ['*'],
                allowedHeaders: ['*']
            }],
            objectOwnership: ObjectOwnership.OBJECT_WRITER,
            blockPublicAccess: {
                blockPublicAcls: false,
                blockPublicPolicy: false,
                ignorePublicAcls: false,
                restrictPublicBuckets: false
            }
        })
        new CfnOutput(this, 'BooksBucketName', {
            value: this.booksBucket.bucketName
        });
        
        this.booksTable = new Table(this, 'Books-table', {
            tableName: 'book-table',
            partitionKey: {
                    name: 'id',
                    type: AttributeType.STRING
            }
        })
    }
}