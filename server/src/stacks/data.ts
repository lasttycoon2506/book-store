import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Bucket, IBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class Data extends Stack {
    public readonly booksBucket: IBucket;
    public readonly booksTable: ITable;
    
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.booksBucket = new Bucket(this, 'BooksBuck', {
            bucketName: 'booksbuck'
        })
        new CfnOutput(this, 'BooksBucketName', {
            value: this.booksBucket.bucketName
        });
        
        this.booksTable = new Table(this, 'Books-table', {
            tableName: 'books-table',
            partitionKey: {
                    name: 'id',
                    type: AttributeType.STRING
            }
        })
    }
}