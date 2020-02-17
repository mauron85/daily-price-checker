const http = require('http');
const puppeteer = require("puppeteer");
const PORT = process.env.PORT || 5000

const requestListener = function (req, res) {
  res.writeHead(200);
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://reolink.com/product/rlc-410w/", {
      waitUntil: "networkidle0"
    });
    const element = await page.$(".sale-price");
    const text = await page.evaluate(element => element.textContent, element);
    const response = `rlc-410w: ${text}`;
    console.log(response);
    res.end(response);
    await browser.close();
  })();
}

const server = http.createServer(requestListener);
server.listen(PORT);