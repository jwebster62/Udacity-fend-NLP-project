import { text } from "body-parser";

export async function handleSubmit() {
    document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault()
        console.log('submit')
    });
    const port = process.env.port || 8081;
    const sendURL = document.getElementById('url').value;
    const data = { sendURL };
    const response = await fetch(`http://localhost:${port}/api`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    console.log(response.json());

};