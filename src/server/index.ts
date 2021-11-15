import { createServer, IncomingMessage, ServerResponse } from 'http'

export type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void

export type Method = 'get' | 'post'

export type Route = {
  method: 'get' | 'post'
  path: string
  handler: RouteHandler
}

export type App = {
  routes: Route[]
}

export function createApp(): App {
  return {
    routes: [],
  }
}

export function addRoute(
  app: App,
  path: string,
  method: Method,
  handler: RouteHandler
) {
  app.routes = [
    ...app.routes,
    {
      path,
      handler,
      method,
    },
  ]
}

export function addGet(app: App, path: string, handler: RouteHandler) {
  addRoute(app, path, 'get', handler)
}

export function addPost(app: App, path: string, handler: RouteHandler) {
  addRoute(app, path, 'post', handler)
}

export function listen(app: App, port: number) {
  const server = createServer((req, res) => {
    const route = app.routes.find(
      (route) =>
        route.path.toLowerCase() === req.url?.toLowerCase() &&
        route.method === req.method?.toLowerCase()
    )

    if (route) {
      route.handler(req, res)
    } else {
      res.writeHead(404)
      res.end('Not Found')
    }
  })

  server.listen(port)
  console.log(`listening on port ${port}`)
}
