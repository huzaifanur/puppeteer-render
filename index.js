const express = require("express");
const { createPdf } = require("./createPdf");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.post("/pdf", (req, res) => {
  createPdf(req.body, res);
});
app.get("/pdf", (req, res) => {
  const productName = "Chicken";
  const ingredients = `
  1. Chicken breast
  2. Salt
  3. Pepper
  4. Onion
  5. Garlic
  6. Oil
  7. Pepperoni
  7. Chillies
  8. Tomato
  8. Tomatoes
  9. Basil
  9. Onion
  `;
  const instructions = `
  1. Heat oil in a large pan
  2. Add chicken
  3. Add onion
  4. Add garlic
  5. Add salt
  6. Add pepper
  7. Add pepperoni
  8. Add chillies
  9. Add tomato
  `;
  const productImg =
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w";
  const body = {
    productName,
    ingredients,
    instructions,
    productImg,
  };
  createPdf(body, res);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
