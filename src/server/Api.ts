import { URL } from 'url'
import * as express from 'express'
import { analyze, getScreenShot } from './Chromium'

const router: express.Router = express.Router()

export default router
  .post(
    '/api/analyze',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): Promise<void> => {
      console.log(req.body)
      try {
        const urls: string[] = req.body.urls
          .filter(
            (urlString: string): boolean =>
              new URL(urlString).hostname.includes('.')
          )
          .filter(
            (urlString: string, index: number, arr: string[]): boolean =>
              arr.indexOf(urlString) === index
          )

        const requests: Promise<any>[] = []
        for (let i: number = 0; i < urls.length; i++) {
          requests.push(
            analyze(urls[i], {
              basicAuth: req.body.basicAuth
            })
          )
        }
        const results = await Promise.all(requests)
        res.json(results)
      } catch (error) {
        console.log(error)
        res.status(500)
        res.json({ error })
      }
    }
  )
  .get(
    '/api/screenshot',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): Promise<void> => {
      const parsedUrl: URL = new URL(req.query.url)

      if (!parsedUrl.hostname.includes('.')) {
        console.log('not url')
        res.status(500)
        res.json({
          error: 'not url'
        })
        return
      }

      try {
        const file: Buffer = await getScreenShot(parsedUrl.toString())
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(file)
      } catch (error) {
        console.log(error)
        res.status(500)
        res.json({ error })
      }
    }
  )
