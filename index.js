const express = require("express");
const { createPdf } = require("./createPdf");
const { createMultipagePdf } = require("./testFunctions");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.post("/pdf", (req, res) => {
  createPdf(req.body, res);
});
app.post("/muti-pdf", (req, res) => {
  createMultipagePdf(req.body, res);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
