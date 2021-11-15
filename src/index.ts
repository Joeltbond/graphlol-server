import { mountGraphQL } from './graphql'
import { createApp, listen } from './server'

const schema = {
  Query: {
    viewer() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id: '1' })
        }, 3000)
      })
    },
  },
  Mutation: {},
}

const app = createApp()
mountGraphQL(app, schema)
listen(app, 3000)
