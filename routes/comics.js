const express = require("express");
const router = express.Router();
const md5 = require("md5");
const axios = require("axios");

router.get("/comics", async (req, res) => {
  // console.log(req.query);
  try {
    // Création du timestamp
    const date = new Date();
    const timestamp = date.getTime();
    // les ApiKey cachées
    const publicKey = process.env.PUBLIC_KEY;
    const privateKey = process.env.PRIVATE_KEY;
    // Création du hash crypté
    const hash = md5(timestamp + privateKey + publicKey);
    // Reception des query du front
    const { page, title } = req.query;
    const limit = 100;
    let offset = page * 100 - 100;
    let apiFilter = "title";
    let queryFilters = `orderBy=${apiFilter}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;
    let searchComics;

    if (title !== "") {
      searchComics = `&titleStartsWith=${title}`;
    }

    // url pour les requêtes vers l'API Marvel
    const url =
      `https://gateway.marvel.com/v1/public/comics?${queryFilters}` +
      searchComics;
    // --------- Requête Axios ---------
    const response = await axios.get(url);
    // console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
