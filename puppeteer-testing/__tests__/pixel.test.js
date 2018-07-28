const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const pixelTest = require('../src/utils/diffImages');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('http://192.168.0.11:8080');
  await page.setViewport({ width: 600, height: 1024 });
});

afterAll(() => {
  browser.close();
});

describe('screenshots are correct', () => {
  it('/index', async () => {
    const file = 'screenshots/screenshot.png';
    await page.screenshot({ path: file });
    return pixelTest.compareScreenshots(file);
  });
});
