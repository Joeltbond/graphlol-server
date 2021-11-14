import { addRoute, App } from '../server'

type Config = {
  path?: string
}

type Schema = {}

export function mountGraphQL(app: App, schema: Schema, config?: Config) {
  addRoute(app, config?.path ?? '/graphql', (req, res) => {
    switch (req.method?.toLowerCase()) {
      case 'get':
        // TODO playground will get served here
        res.writeHead(200)
        res.end('Hello World')
        break
      case 'post':
        // TODO queries will get resolved here
        res.writeHead(200)
        res.end('Hello World')
    }
  })
}
