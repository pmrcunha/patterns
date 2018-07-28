const puppeteer = require('puppeteer');
const faker = require('faker');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const user = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: 'test',
  email: faker.internet.email(),
};

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 50,
    devtools: true,
  };
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {};
};

let browser;
let page;
let logs = [];
let errors = [];

beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging());

  page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', (interceptedRequest) => {
    if (interceptedRequest.url().includes('swapi')) {
      interceptedRequest.abort();
    } else {
      interceptedRequest.continue();
    }
  });

  await page.emulate(iPhone);
  // page.setViewport({
  //   width: 500,
  //   height: 2400,
  // });

  await page.goto('http://192.168.0.11:8080');
});

describe('on page load', () => {
  test(
    'h1 loads correctly',
    async () => {
      const html = await page.$eval(
        '[data-testid="title"]',
        (e) => e.innerHTML
      );

      expect(html).toBe('Hello');
    },
    16000
  );

  test('nav loads correctly', async () => {
    const navbar = await page.$eval(
      '[data-testid="navbar"]',
      (el) => (el ? true : false)
    );
    const listItems = await page.$$('[data-testid="nav-li"]');

    expect(navbar).toBe(true);
    if (listItems.length !== 4) {
      await page.screenshot({ path: 'screenshots/nav-loads-correctly.png' });
    }
    expect(listItems.length).toBe(4);
  });

  describe('login form', () => {
    test(
      'fills out form and submits',
      async () => {
        const firstName = await page.$('[data-testid="firstName"]');
        const lastName = await page.$('[data-testid="lastName"]');
        const email = await page.$('[data-testid="email"]');
        const password = await page.$('[data-testid="password"]');
        const submit = await page.$('[data-testid="submit"]');

        await page.setCookie({ name: 'JWT', value: 'sdjkhf' });

        await firstName.tap();
        await page.type('[data-testid="firstName"]', user.firstName);

        await lastName.tap();
        await page.type('[data-testid="lastName"]', user.lastName);

        await email.tap();
        await page.type('[data-testid="email"]', user.email);

        await password.tap();
        await page.type('[data-testid="password"]', user.password);

        await submit.tap();

        await page.waitForSelector('[data-testid="banana"]');

        // await page.click('[data-testid="firstName"]');
        // await page.type('[data-testid="firstName"]', user.firstName);

        // await page.click('[data-testid="lastName"]');
        // await page.type('[data-testid="lastName"]', user.lastName);

        // await page.click('[data-testid="email"]');
        // await page.type('[data-testid="email"]', user.email);

        // await page.click('[data-testid="password"]');
        // await page.type('[data-testid="password"]', user.password);

        // await page.click('[data-testid="submit"]');

        // await page.waitForSelector('[data-testid="banana"]');
      },
      16000
    );
    test('sets firstName cookie', async () => {
      const cookies = await page.cookies();
      const firstNameCookie = cookies.find((c) => c.name === 'firstName');

      expect(firstNameCookie).not.toBeUndefined();
    });
  });
  test('does not have console logs', () => {
    page.on('console', (c) => logs.push(c.text));
    expect(logs.length).toBe(0);
  });
  test('does not have exceptions', () => {
    page.on('pageerror', (e) => errors.push(e.text));
    expect(errors.length).toBe(0);
  });

  test('fails to fetch starWars endpoint', async () => {
    page.on('console', () => {});
    page.on('pageerror', () => {});
    const h3 = await page.$eval('[data-testid="starwars"]', (e) => e.innerHTML);
    expect(h3).toBe('Something went wrong');
  });

  test(
    'succeeds to fetch starWars endpoint',
    async () => {
      const page2 = await browser.newPage();
      await page2.setRequestInterception(false);
      await page2.goto('http://192.168.0.11:8080');
      await page2.waitForResponse((req) => req.url().includes('swapi'), {
        timeout: 5000,
      });

      const h3 = await page2.$eval(
        '[data-testid="starwars"]',
        (e) => e.innerHTML
      );
      expect(h3).toBe('Received StarWars data!');
    },
    16000
  );
});

afterAll(() => {
  if (isDebugging()) {
    browser.close();
  }
});
