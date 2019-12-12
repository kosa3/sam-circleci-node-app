const chai = require('chai');
const expect = chai.expect;
const puppeteer = require('puppeteer');

const VIEW_WIDTH = 1024;
const VIEW_HEIGHT = 768;

// テスト前処理
before(async function() {
    global.browser = await puppeteer.launch({
        headless: true,
        ignoreDefaultArgs: ['--disable-extensions'],
        ignoreHTTPSErrors: true,
        arg: [
            `--window-size=${VIEW_WIDTH},${VIEW_HEIGHT}`
        ]
    });
});

it ('get users test', async function() {

    const page = await global.browser.newPage();
    await page.setViewport({ width: VIEW_WIDTH, height: VIEW_HEIGHT });

    await page.goto(`${process.env.SAM_URI}/users`);

    let list = await page.$$('pre');
    const listTexts = [];
    for (let i = 0; i < list.length; i++) {
        const textContentProp = await list[i].getProperty('textContent');
        const textContent = await textContentProp.jsonValue();

        listTexts.push(textContent);
    }

    expect(await JSON.parse(listTexts[0]).length > 0).to.equal(true);

    await page.close();
});

// テスト後処理
after (function () {
    // ブラウザ閉じます。
    global.browser.close();
});
