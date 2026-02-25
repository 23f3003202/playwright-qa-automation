const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [57,58,59,60,61,62,63,64,65,66];
  let grandTotal = 0;

  for (let seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/=${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval("table td", cells =>
      cells.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b) => a+b, 0);
    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
