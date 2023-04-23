const puppeteer = require("puppeteer");
const { merge } = require("merge-pdf-buffers");

async function Game() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const htmlArr = [
    "<h1>Page 1</h1><p>This is some custom content for page 1.</p>",
    "<h1>Page 2</h1><p>This is some custom content for page 2.</p>",
    "<h1>Page 3</h1><p>This is some custom content for page 3.</p>",
  ];
  const pages = [];
  for (const html of htmlArr) {
    await page.setContent(html);
    const pdfBuffer = await page.pdf();
    pages.push(pdfBuffer);
  }
  await browser.close();

  // Concatenate the PDF buffers manually
  const merged = await merge(pages);

  require("fs").writeFileSync("output.pdf", merged);
  console.log("PDFs generated successfully!");
}

module.exports = {
  Game,
};
