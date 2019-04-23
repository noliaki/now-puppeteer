import puppeteer from 'puppeteer'
import puppeteerCore from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'

export async function analyze(path: string, option = {}): Promise<void> {
  const result: any = {
    pageUrl: path
  }
  const browser: puppeteer.Browser = await createBrowser()
  const page: puppeteer.Page = await browser.newPage()
  page.on('error', (error: any) => {
    console.log(error)

    if (!result.error) {
      result.error = []
    }

    result.error.push(error)
  })
  page.on(
    'pageerror',
    (pageError: any): void => {
      console.log(pageError)

      if (!result.pageError) {
        result.pageError = []
      }

      result.pageError.push(pageError)
    }
  )
  page.on('response', async (response: any) => {
    if (response.ok()) {
      return
    }

    if (!result.responseError) {
      result.responseError = []
    }

    result.responseError.push({
      status: response.status(),
      url: response.url(),
      headers: response.headers()
    })
  })

  await page.goto(path)

  result.meta = await page.$$eval('meta', meta => {
    const r: { [key: string]: string }[] = []

    for (let i = 0; i < meta.length; i++) {
      const attrs = meta[i].attributes
      const elObj: { [key: string]: string } = {}

      for (let j = 0; j < attrs.length; j++) {
        elObj[attrs[j].name] = attrs[j].value
      }

      r.push(elObj)
    }

    return r
  })

  await browser.close()
  return result
}

export async function getScreenShot(url: string): Promise<Buffer> {
  const browser: puppeteer.Browser = await createBrowser()

  const page: puppeteer.Page = await browser.newPage()
  page.setViewport({
    width: 1200,
    height: 800
  })
  await page.goto(url)
  const file: Buffer = await page.screenshot({
    type: 'jpeg',
    quality: 60
  })
  await browser.close()
  return file
}

async function createBrowser(): Promise<puppeteer.Browser> {
  return process.env.NODE_ENV === 'development'
    ? await puppeteer.launch()
    : await puppeteerCore.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
      })
}
