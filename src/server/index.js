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


const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));

const port = process.env.port || 8081;

app.listen(port, () => {
    console.log(`Starting server on port ${port}`);
});
let projectData = [];

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
                const body = Buffer.concat(chunks);
                const sentiment = body.toString();
                const parsedSentiment = JSON.parse(sentiment);
                const agree = parsedSentiment.agreement;
                const subj = parsedSentiment.subjectivity;
                const conf = parsedSentiment.confidence;

                console.log(`Agreement: ${agree}`);
                console.log(`Subjectivity: ${subj}`);
                console.log(`Confidence: ${conf}`);

                projectData = {
                    agree,
                    subj,
                    conf
                };


                //console.log(projectData);

                //console.log(body.toString());

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

app.get("/sentiment", (req, res) => {
    res.send(projectData);
});