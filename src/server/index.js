const express = require('express')
const fetch = require('node-fetch');
const { response } = require('express');
require('dotenv').config();

const app = express()

const port = process.env.port || 8080;

app.listen(port, () => {
    console.log(`Starting server on port ${port}`);
});

app.use(express.static('dist'));
app.use(express.json({}));

app.get('/api', async(req, res) => {

    const getURL = document.getElementById(url).textContent
    const apiURL = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.apiKey}&lang=auto&txt=${getURL}`
    const fetch_response = await fetch(apiURL);
    const json = await fetch_response.json();
    response.json(json);
});