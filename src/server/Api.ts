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
      try {
        const pattern = new RegExp(
          '^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$',
          'i'
        )

        const urls: string[] = req.body.urls
          .filter((urlString: string): boolean => pattern.test(urlString))
          .filter(
            (urlString: string, index: number, arr: string[]): boolean =>
              arr.indexOf(urlString) === index
          )

        const requests: Promise<any>[] = []
        for (let i: number = 0; i < urls.length; i++) {
          requests.push(analyze(urls[i]))
        }
        const results = await Promise.all(requests)
        res.json(results)
      } catch (error) {
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

      if (!(parsedUrl.protocol && parsedUrl.hostname)) {
        res.status(500)
        res.json({
          error: 'not url'
        })
        return
      }

      try {
        const file: Buffer = await getScreenShot(parsedUrl.href)
        res.setHeader('Content-Type', 'image/jpeg')
        res.send(file)
      } catch (error) {
        res.status(500)
        res.json({ error })
      }
    }
  )
