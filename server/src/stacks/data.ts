import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Bucket, IBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class data extends Stack {
    public readonly booksBucket: IBucket;
    public readonly booksTable: ITable;
    
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.booksBucket = new Bucket(this, 'Books-Bucket', {
            bucketName: 'books-bucket',
        })

        this.booksTable = new Table(this, 'books-table', {
            tableName: 'booksTable',
            partitionKey: {
                    name: 'id',
                    type: AttributeType.STRING
            }
        })
    }
}