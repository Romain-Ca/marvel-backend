require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

// Import Route
const charactersRoute = require("./routes/characters");
app.use(charactersRoute);
const comicsRoute = require("./routes/comics");
app.use(comicsRoute);
const characterIdRoute = require("./routes/characterId");
app.use(characterIdRoute);
const comicIdRoute = require("./routes/comicId");
app.use(comicIdRoute);

app.all("*", (req, res) => {
  res.status(404).json({ message: "All routes" });
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Server Started");
});

// test test
