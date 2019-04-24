import path from 'path'
import * as express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import api from './Api'

const app: express.Express = express.default()
app
  .use(helmet())
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  .use(bodyParser.json())
  .use(api)

if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT || 3000
  app
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))
}

export default app
