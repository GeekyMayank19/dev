const reader = require("xlsx");
const path = require("path");
const puppeteer = require("puppeteer");
let request = require("request");
const cheerio = require("cheerio");
let fs = require("fs");
const { resolve } = require("path");
const { rejects } = require("assert");
let page;
let name = [];
let description = [];

const fn = async () => {
  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  page = await browser.newPage();
  await page.goto("https://www.flipkart.com/");
  await page.click("._2KpZ6l._2doB4z");
  await page.waitFor(1000);
  await page.click('img[alt="Mobiles"]');
  await page.waitForSelector("div._4921Z.t0pPfW");
  await page.waitFor(1000);
  let checkbox = await page.$$("div._4921Z.t0pPfW");
  await checkbox[11].click();
  await page.waitFor(3000);
  await page.select('select[class="_2YxCDZ"]', "30000");
  await page.waitForSelector("._2kHMtA a");
  let cururl = await page.url();

  return new Promise((resolve, rejects) => {
    resolve(cururl);
  });
};

const display = async () => {
  let url = await fn();
  request(url, cb);
  function cb(error, response, html) {
    if (error) {
      console.log(error);
    } else if (response.statusCode == 404) {
      console.log("Page Not Found");
    } else {
      dataExtracter(html);
    }
  }

  function dataExtracter(html) {
    let SearchTool = cheerio.load(html);

    let item = SearchTool("._2kHMtA a");

    console.log(item.length);

    for (let i = 0; i < item.length; i++) {
      let fullLink =
        "https://www.flipkart.com" + SearchTool(item[i]).attr("href");
      request(fullLink, newcb);
    }
  }

  function newcb(error, response, html) {
    if (error) {
      console.log(error);
    } else if (response.statusCode == 404) {
      console.log("Page Not Found");
    } else {
      getAllRecord(html);
    }
  }

  let currentpath = process.cwd();
  let dir = path.join(currentpath, "file.json");

  function getAllRecord(html) {
    let searchTool = cheerio.load(html);
    let productTitle = searchTool(".B_NuCI").text();
    let highlights = searchTool("._2418kt ul li").text();
    description.push(`${highlights}`);
    name.push(`${productTitle}`);
    console.log("name",productTitle)
    console.log("detail",highlights)

    fileName = dir;

    if (fs.existsSync(fileName)) {
      let content = JSON.parse(fs.readFileSync(fileName));
     content.push([
        {
           productTitle,
           highlights,
        },
      ]);

      fs.writeFileSync(fileName,JSON.stringify(content));
    } else {
      let content = [
        {
           productTitle,
           highlights,
        },
      ];

      fs.writeFileSync(fileName, JSON.stringify(content));
    }
  }

  
};

display();

