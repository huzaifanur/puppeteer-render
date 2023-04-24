const puppeteer = require("puppeteer");
require("dotenv").config();
const { merge } = require("merge-pdf-buffers");

async function createMultipagePdf(dataArr, res) {
  const htmlArr = dataArr.map((body) => getFilledTemplate(body));
  // browser launch
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  const page = await browser.newPage();
  await page.emulateMediaType("screen");
  await page.setViewport({
    width: 1200,
    height: 800,
    deviceScaleFactor: 2,
  });
  try {
    const pages = [];
    for (let i = 0; i < htmlArr.length; i++) {
      await page.setContent(htmlArr[i]);
      // Letter: 8.5in x 11in
      pages.push(
        await page.pdf({
          printBackground: true,
          height: "12in",
          width: "9.5in",
        })
      );
    }
    const merged = await merge(pages);
    res.type("pdf");
    res.send(merged);
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong");
  } finally {
    await browser.close();
  }
}

function getFilledTemplate(body) {
  const { productName, ingredients, instructions, nutritionInfo } = body;
  let { productImg } = body;
  // TODO :  Make sure that file is small
  if (1) {
    productImg = "https://picsum.photos/400";
  }

  const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <style>
    
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
        body {
          font-family: "Poppins", sans-serif;
        }
        ul,
        ol {
          list-style: none;
        }
        img {
          max-width: 100%;
          display: block;
        }
        img {
          object-fit: cover;
          width: 100%;
          aspect-ratio: 1 / 1;
          
        }
        h2 {
          margin-bottom: 16px;
        }
        p {
          font-size: 1.2rem;
          line-height: 1.5;
        }
        .container {
          margin-inline: auto;
          display: flex;
          height: 100vh;
        }
        .col > p {
          font-size: 1.2rem;
        }
        .col-1 {
          flex-basis: 50%;
          color: white;
          background-color: #264472;
          padding: 2rem;
          height: 1152px;
          overflow: hidden;
          
        }
        .col-2 {
          flex-basis: 50%;
        }
    
        .ing-p {
          margin-bottom: 50px;
        }
    
        .underline {
          border-bottom: 2px solid rgb(184, 184, 184);
          padding-bottom: 3px;
          width: fit-content;
          letter-spacing: 3px;
        }
    
        .meal {
          padding: 2rem;
        }
        .meal-heading {
          text-align: center;
          line-height: 1.2;
          margin: 2rem 0 1rem;
        }
    
        .meal-content {
        }
      </style>
      <body>
        <div class="container">
          <div class="col col-1">
            <h2 class="underline">INGREDIENTS</h2>
            <p class="ing-p">
              ${ingredients} 
            </p>
    
            <h2 class="underline">INSTRUCTIONS</h2>
            <p>
              ${instructions}
            </p>
          </div>
          <div class="col col-2">
            <img
              class=".image"
              src=${productImg}
              alt=""
            />
            <div class="meal">
              <h2 class="meal-heading">${productName}</h2>
              <p class="meal-content">
                ${nutritionInfo}
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
  return html;
}

module.exports = { createMultipagePdf };
