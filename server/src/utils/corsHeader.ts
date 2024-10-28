import { APIGatewayProxyResult } from 'aws-lambda'

export function addCorsHeader(res: APIGatewayProxyResult): void {
    if (!res.headers) {
        res.headers = {}
    }

    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Access-Control-Allow-Methods'] = '*'
}
