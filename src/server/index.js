const path = require("path");
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const axios = require("axios")
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
// Everything prior to this on the page works

app.get("/", function(req, res) {
    res.sendFile("dist/index.html");
});

let sentiment;
/*app.get('/api', async(req, res) => {
    //const apiURL = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.apiKey}&lang=auto&txt=${getURL}`
    const apiURL = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.apiKey}&lang=auto&txt=https://www.independent.co.uk/arts-entertainment/books/wow-an-exclusive-short-story-by-al-kennedy-a6785186.html`
    const fetch_response = await fetch(apiURL);
    const json = await fetch_response.json();
    response.json(json);
});*/
app.post("/api", async(req, res) => {
    try {
        // calls the api by passing API key, type i.e URL or word and the text which is url or word
        const result = await axios.post(
            `http://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&text=${req.body.url}`
        );

        // stores the result of the call in data
        const { data } = result;
        const { code } = data.status;

        // status code 200 is failed so runs following if not failed
        if (code !== "200") {
            // stores the below field in its own variable
            const { score_tag } = data;
            const { agreement } = data;
            const { subjectivity } = data;
            const { confidence } = data;
            const { irony } = data;

            // storing the api response
            sentiment = {
                score_tag,
                agreement,
                subjectivity,
                confidence,
                irony,
            };
        } else {
            // if error occurs then change the response to false
            sentiment = false;
        }
        res.end("It worked!");
    } catch (e) {
        console.log(`Error = ${e}`);
    }
});
// calls the function on get sentiment method
app.get("/sentiment", (req, res) => {
    // sends the sentiment variable
    res.send(sentiment);
});