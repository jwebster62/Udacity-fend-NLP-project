const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
const { response } = require('express');
require('dotenv').config();

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));

const port = process.env.port || 8080;

app.listen(port, () => {
    console.log(`Starting server on port ${port}`);
});
// Everything prior to this on the page works



app.get('/api', async(req, res) => {

    const getURL = document.getElementById(url).textContent
    const apiURL = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.apiKey}&lang=auto&txt=${getURL}`
    const fetch_response = await fetch(apiURL);
    const json = await fetch_response.json();
    response.json(json);
});