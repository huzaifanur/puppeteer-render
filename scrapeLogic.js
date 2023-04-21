const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
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
  
      ul,
      ol {
        list-style: none;
      }
      img {
        max-width: 100%;
        display: block;
      }
      .ing-h2 {
        width: 131px;
        margin-bottom: 16px;
        font-weight: bold;
      }
      .ins-h2 {
        width: 143px;
        margin-bottom: 16px;
        font-weight: bold;
      }
      .underline {
        border-bottom: 2px solid rgb(184, 184, 184);
        padding-bottom: 3px;
      }
      .p {
        max-width: 222px;
        font-size: 12px;
        line-height: 1.3;
        font-family: "Roboto", sans-serif;
      }
      .container {
        margin-inline: auto;
        height: 100%;
        position: relative;
        width: 595px;
        height: 842px;
      }
      .col {
        height: 842px;
      }
      .col-1 {
        color: white;
        background-color: #264472;
        min-width: 408px;
        padding: 24px 16px;
        position: absolute;
        left: 0;
        width: 50%;
      }
      .col-2 {
        background-color: white;
        position: absolute;
        right: 0;
        width: 50%;
      }
  
      .ing-p {
        margin-bottom: 30px;
      }
  
      img {
        height: 298px;
      }
  
      .meal {
        margin-top: 32px;
        text-align: center;
        font-family: "Roboto", sans-serif;
      }
      .meal-heading {
        margin-bottom: 16px;
        font-size: 18px;
        font-weight: bold;
      }
      .meal-content {
        line-height: 1.3;
        font-size: 14px;
        text-align: left;
        padding-left: 32px;
        max-width: 222px;
      }
    </style>
    <body>
      <div class="container">
        <div class="col col-1">
          <div class="ing-h2 underline">INGREDIENTS</div>
          <div class="p ing-p">
            100 ml milk <br />
            50 g butter <br />
            3 eggs <br />
            1 tbs cocoa <br />
            2 tsp baking soda<br />
            pinch of salt 3 eggs<br />
            1 tbs cocoa <br />
            2 tsp baking soda<br />
          </div>
  
          <div class="ins-h2 underline">INSTRUCTIONS</div>
          <div class="p">
            Nunc nulla velit, feugiat vitae ex quis, lobortis leo. Donec dictum
            lectus in ex accumsan sodales. Pellentesque habitant morbi tristique.
            Nunc nulla velit, feugiat vitae ex quis, lobortis porta leo. Donec
            dictum lectus in ex. lentesque habitant morbi tristique. Nunc nulla
            velit, feugiat vitae ex quis, lobortis porta leo. Donec dictum lectus
            in ex. Habitant morbi tristique.Nunc nulla velit, feugiat vitae ex
            quis, lobortis porta leo. Donec dictum lectus in ex. Donec dictum
            lectus in ex accumsan sodales. Pellentesque habitant morbi tristique.
            Nunc nulla velit, feugiat vitae ex quis, lobortis porta leo. Donec
            dictum lectus in ex. lobortis porta leo. Donec dictum lectus in ex
          </div>
        </div>
        <div class="col col-2">
          <img
            src="https://images.pexels.com/photos/14460118/pexels-photo-14460118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <div class="meal">
            <div class="meal-heading">Healthy Spring Bowl</div>
            <div class="meal-content">
              15 minutes Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla fringilla lectus eget nibh accumsan scelerisque. Sed nec metus
              et tellus dignissim egestas quis vel erat. Vestibulum vel facilisis
              ex. Sed semper neque nec hendrerit vestibulum. Etiam ut turpis nec
              nibh consectetur ullamcorper.
            </div>
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
    res.type("pdf");
    //res.contentType("application/pdf");
    //res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
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

module.exports = { scrapeLogic };
