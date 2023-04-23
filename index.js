const express = require("express");
const { createPdf } = require("./createPdf");
const { createMultipagePdf } = require("./testFunctions");
const app = express();
const { Game } = require("./test");
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.post("/pdf", (req, res) => {
  createPdf(req.body, res);
});
app.post("/multi", (req, res) => {
  createMultipagePdf(req.body.data, res);
});
app.get("/multi", (req, res) => {
  const data = [
    {
      productName: "2. Mexican-Style Burrito Bowl",
      ingredients:
        " 2 cups of cooked brown rice<br/> 2 tablespoons of olive oil<br/> 2 cloves of garlic, minced<br/> 2 tablespoons of chili powder<br/> 2 teaspoons of ground cumin<br/> 1 can of black beans, drained and rinsed<br/> 1 can of corn kernels, drained<br/> 2 tomatoes, diced<br/> 2 avocados, diced<br/> 2 tablespoons of fresh cilantro, chopped<br/> 2 tablespoons of lime juice<br/> Salt and pepper to taste<br/>",
      instructions:
        "1. Heat the olive oil in a large skillet over medium heat.<br/>2. Add the garlic and sauté for 1 minute.<br/>3. Add the chili powder and cumin and cook for 1 minute.<br/>4. Add the black beans, corn and tomatoes and cook for 5 minutes.<br/>5. Divide the cooked brown rice between two bowls.<br/>6. Top the rice with the bean and vegetable mixture.<br/>7. Top with diced avocado, cilantro, lime juice, salt and pepper.<br/>8. Serve with a side of tortilla chips.<br/>",
    },
    {
      productName: "2. Thai Coconut Curry Soup (serves 2)",
      ingredients:
        "2 tablespoons coconut oil<br/>1 onion, diced<br/>2 cloves garlic, minced<br/>2 teaspoons freshly grated ginger<br/>2 teaspoons curry powder<br/>1 teaspoon ground cumin<br/>1/2 teaspoon sea salt<br/>1/4 teaspoon black pepper<br/>1 red chilli pepper, diced<br/>400ml (13.5 fl oz) can coconut milk<br/>400ml (13.5 fl oz) vegetable stock<br/>2 carrots, diced<br/>1 head broccoli, cut into florets<br/>2 tablespoons freshly squeezed lime juice<br/>",
      instructions:
        "1. Heat the coconut oil in a large pot over medium heat.2. Add the onion, garlic, ginger, curry powder, cumin, salt, and pepper, and cook for 5 minutes, stirring occasionally.3. Add the chilli pepper, coconut milk, and vegetable stock, and bring to a boil.4. Reduce the heat to low and simmer for 10 minutes.5. Add the carrots and broccoli and simmer for an additional 10 minutes, or until the vegetables are tender.6. Add the lime juice and stir to combine.7. Serve hot.<br/>",
    },
  ];
  createMultipagePdf(data, res);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
