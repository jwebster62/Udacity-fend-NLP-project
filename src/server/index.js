const path = require("path");
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const { response } = require("express");
require('dotenv').config();
const https = require('follow-redirects').https;
const fs = require('fs');
const apiKey = process.env.API_KEY
const sentiment = [];

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


    if (req.method === 'POST') {

        const options = {
            'method': 'POST',
            'hostname': 'api.meaningcloud.com',
            'path': '/sentiment-2.1?key=' + apiKey + '&lang=auto&url=' + data.sendURL,
            'headers': {},
            'maxRedirects': 20
        };

        const req = https.request(options, function(res) {
            let chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function(chunk) {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });

            res.on("error", function(error) {
                console.error(error);
            });
        });
        req.end();

    } else {
        res.end()
    };
});