require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const md5 = require("md5");
const axios = require("axios");

const app = express();
app.use(formidable());
app.use(cors());

// Faire la route get Characters

app.get("/comics", async (req, res) => {
  try {
    // Création du timestamp
    const date = new Date();
    const timestamp = date.getTime();
    // les ApiKey cachées
    const publicKey = process.env.PUBLIC_KEY;
    const privateKey = process.env.PRIVATE_KEY;
    // Création du hash crypté
    const hash = md5(timestamp + privateKey + publicKey);
    // url pour les requêtes vers l'API Marvel
    const url = `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    // --------- Requête Axios ---------
    const response = await axios.get(url);
    // console.log(response.data.data);
    res.status(200).json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Faire la route get pour CharactersIdComics

app.all("*", (req, res) => {
  res.status(404).json({ message: error.message });
});

app.listen(3100, () => {
  console.log("Server Started");
});
