const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const takeScreenshot = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://192.168.0.11:8080');
  await page.setViewport({ width: 600, height: 1024 });

  await page.screenshot({ path: 'screenshots/reference.png' });
  browser.close();
  return;
};
takeScreenshot();
