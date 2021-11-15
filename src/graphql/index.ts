import fs from 'fs'
import path from 'path'
import { addGet, addPost, addRoute, App } from '../server'

type Config = {
  path?: string
  playgroundPath?: string
}

type Schema = {}

const defaultPath = '/graphql'

export function mountGraphQL(app: App, schema: Schema, config?: Config) {
  addGet(
    app,
    config?.playgroundPath ?? config?.path ?? defaultPath,
    (req, res) => {
      var readStream = fs.createReadStream(
        path.join(__dirname, 'playground', 'index.html')
      )

      readStream.on('open', function () {
        readStream.pipe(res)
      })

      readStream.on('error', function (error) {
        res.end(error)
      })
    }
  )

  addPost(app, config?.path ?? defaultPath, (req, res) => {
    const mock = {
      currentUser: {
        id: '1'
      }
    }
    // TODO queries will get resolved here
    res.writeHead(200)
    res.end(JSON.stringify(mock))
  })
}
