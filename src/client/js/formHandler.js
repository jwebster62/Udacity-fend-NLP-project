import { text } from "body-parser";

export async function handleSubmit() {

    document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault()
        console.log('submit')
    });
    const port = process.env.port || 8081;
    await fetch(`http://localhost:${port}/api`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
    });
    const getSentiment = await fetch(`http://localhost:${port}/sentiment`);
    const sentimentJson = await getSentiment.json();

    Client.updateUI(sentimentJson)
};