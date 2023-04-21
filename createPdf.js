const puppeteer = require("puppeteer");
require("dotenv").config();

const createPdf = async (body, res) => {
  const { productName, ingredients, instructions } = body;
  let { productImg } = body;
  if (!productImg) {
    productImg = "https://picsum.photos/300";
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
        height: 400px;
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
        height:1056px;
        
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
              15 minutes Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla fringilla lectus eget nibh accumsan scelerisque. Sed nec metus
              et tellus dignissim egestas quis vel erat. Vestibulum vel facilisis
              ex. Sed semper neque nec hendrerit vestibulum. Etiam ut turpis nec
              nibh consectetur ullamcorper.
            </p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
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
  try {
    const page = await browser.newPage();
    // Set the HTML content and configure the page
    await page.setContent(html);
    await page.emulateMediaType("screen");
    await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });

    // Generate the PDF and send it as a response
    const pdfBuffer = await page.pdf({ printBackground: true });
    //res.contentType("application/pdf");
    //res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
    res.type("pdf");
    res.send(pdfBuffer);

    // Close the browser
    await browser.close();
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { createPdf };
