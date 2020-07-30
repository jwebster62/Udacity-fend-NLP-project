const path = require("path");
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const axios = require("axios");
const { response } = require("express");
require('dotenv').config();

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));

const port = process.env.port || 8081;

app.listen(port, () => {
    console.log(`Starting server on port ${port}`);
});


app.post("/api", async(req, res) => {
    console.log('I got a request');
    console.log(req.body);
    const data = req.body;
    res.json({
        status: 'success',
        URL: data.sendURL
    });
});
/*await fetch(`http://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=auto&url=`, {
    method:'POST',
    body: JSON.stringify(data)
})
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(json => {
        console.log(json);
        document.getElementById('result').innerHTML = json
    });
    */

const https = require('follow-redirects').https;
const fs = require('fs');

const options = {
    'method': 'POST',
    'hostname': 'api.meaningcloud.com',
    'path': `/sentiment-2.1?key=a61e1677e6deb8dba178e66a9a9ae65b&lang=auto&url=https://www.facebook.com`,
    'headers': {},
    'maxRedirects': 20
};

const req = https.request(options, function(res) {
    const chunks = [];

    res.on("data", function(chunk) {
        chunks.push(chunk);
    });

    res.on("end", function(chunk) {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
    });

    res.on("error", function(error) {
        console.error(error);
    });
});

req.end();