"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const chrome_aws_lambda_1 = __importDefault(require("chrome-aws-lambda"));
exports.default = async (path, option = {}) => {
    const result = {
        pageUrl: path
    };
    const browser = process.env.NODE_ENV === 'development'
        ? await puppeteer_1.default.launch()
        : await puppeteer_core_1.default.launch({
            args: chrome_aws_lambda_1.default.args,
            executablePath: await chrome_aws_lambda_1.default.executablePath,
            headless: chrome_aws_lambda_1.default.headless
        });
    const page = await browser.newPage();
    page.on('error', (error) => {
        console.log(error);
        if (!result.error) {
            result.error = [];
        }
        result.error.push(error);
    });
    page.on('pageerror', (pageError) => {
        console.log(pageError);
        if (!result.pageError) {
            result.pageError = [];
        }
        result.pageError.push(pageError);
    });
    page.on('response', async (response) => {
        if (response.ok()) {
            return;
        }
        if (!result.responseError) {
            result.responseError = [];
        }
        result.responseError.push({
            status: response.status(),
            url: response.url(),
            headers: response.headers()
        });
    });
    await page.goto(path);
    result.meta = await page.$$eval('meta', meta => {
        const r = [];
        for (let i = 0; i < meta.length; i++) {
            const attrs = meta[i].attributes;
            const elObj = {};
            for (let j = 0; j < attrs.length; j++) {
                elObj[attrs[j].name] = attrs[j].value;
            }
            r.push(elObj);
        }
        return r;
    });
    await browser.close();
    return result;
};
async function getScreenShot(url) {
    const browser = await puppeteer_1.default.launch({
        args: chrome_aws_lambda_1.default.args,
        executablePath: await chrome_aws_lambda_1.default.executablePath,
        headless: chrome_aws_lambda_1.default.headless
    });
    const page = await browser.newPage();
    page.setViewport({
        width: 1200,
        height: 800
    });
    await page.goto(url);
    const file = await page.screenshot({
        type: 'jpeg',
        quality: 60
    });
    await browser.close();
    return file;
}
