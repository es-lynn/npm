import { NotImplementedErr } from '@es-lynn/utils'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'

type APIGatewayHandler = (
  event: APIGatewayProxyEvent,
  _context: Context
) => Promise<APIGatewayProxyResult>

type Config = {
  whitelist: string[]
}
export const LambdaConfig: Config = {
  whitelist: ['*']
}

export function LambdaAPI(
  func: (data: any) => object,
  config?: Config
): APIGatewayHandler {
  return async (
    event: APIGatewayProxyEvent,
    _context: Context
  ): Promise<APIGatewayProxyResult> => {
    try {
      const origin = event.headers['origin']
      const body = content(event)
      const result = await func(body)
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': matchCORS(
            origin,
            config ?? LambdaConfig
          )
        },
        body: JSON.stringify(result)
      }
    } catch (e) {
      console.error('λ', e)
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': matchCORS(
            origin,
            config ?? LambdaConfig
          )
        },
        body: JSON.stringify({
          error: { name: e.name, message: e.message }
        })
      }
    }
  }
}

export async function TestLambdaAPI<T>(
  method: string,
  data: object,
  handler: APIGatewayHandler
): Promise<T> {
  const a = (
    await handler(
      {
        body: JSON.stringify(data),
        httpMethod: method,
        queryStringParameters: data
      } as any,
      {} as any
    )
  ).body
  return JSON.parse(a)
}

function content(event: APIGatewayProxyEvent): object {
  switch (event.httpMethod) {
    case 'GET':
      return event.queryStringParameters ?? {}
    case 'POST':
      return JSON.parse(event.body ?? '{}')
    default:
      throw new NotImplementedErr()
  }
}

export function matchCORS(origin: string = '', config: Config): string {
  if (config.whitelist.some(it => it === '*')) {
    return origin
  }
  return config.whitelist.find(it => it === origin) ?? ' Denied'
}
