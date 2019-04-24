"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const express = __importStar(require("express"));
const Chromium_1 = require("./Chromium");
const router = express.Router();
exports.default = router
    .post('/api/analyze', async (req, res, next) => {
    console.log(req.body);
    try {
        const urls = req.body.urls
            .filter((urlString) => new url_1.URL(urlString).hostname.includes('.'))
            .filter((urlString, index, arr) => arr.indexOf(urlString) === index);
        const requests = [];
        for (let i = 0; i < urls.length; i++) {
            requests.push(Chromium_1.analyze(urls[i], {
                basicAuth: req.body.basicAuth
            }));
        }
        const results = await Promise.all(requests);
        res.json(results);
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.json({ error });
    }
})
    .get('/api/screenshot', async (req, res, next) => {
    const parsedUrl = new url_1.URL(req.query.url);
    if (!parsedUrl.hostname.includes('.')) {
        console.log('not url');
        res.status(500);
        res.json({
            error: 'not url'
        });
        return;
    }
    try {
        const file = await Chromium_1.getScreenShot(parsedUrl.toString());
        res.setHeader('Content-Type', 'image/jpeg');
        res.end(file);
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.json({ error });
    }
});
