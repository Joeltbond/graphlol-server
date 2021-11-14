import { mountGraphQL } from './graphql'
import { createApp } from './server'

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
app.listen(3000)
