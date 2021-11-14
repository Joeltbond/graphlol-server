import { createServer, IncomingMessage, ServerResponse } from 'http'

export type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void

export type Route = {
  path: string
  handler: RouteHandler
}

export type App = {
  routes: Route[]
  listen(port: number): void
}

export function createApp(): App {
  return {
    routes: [],
    listen: function (port) {
      const server = createServer((req, res) => {
        const route = this.routes.find((route) => route.path === req.url)

        if (route) {
          route.handler(req, res)
        } else {
          res.writeHead(404)
          res.end('Not Found')
        }
      })

      server.listen(port)
      console.log(`listening on port ${port}`)
    },
  }
}

export function addRoute(app: App, path: string, handler: RouteHandler) {
  app.routes = [
    ...app.routes,
    {
      path,
      handler,
    },
  ]
}
