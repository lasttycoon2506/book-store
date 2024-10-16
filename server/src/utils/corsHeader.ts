import { APIGatewayProxyResult } from 'aws-lambda'

export function addCorsHeader(res: APIGatewayProxyResult): void {
    if (!res.headers) {
        res.headers = {}
    }
    res.headers['X-Requested-With'] = '*'
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Access-Control-Allow-Methods'] = '*'
    res.headers['Access-Control-Allow-Headers'] =
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with'
}
