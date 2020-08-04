export async function handleSubmit() {
    document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault()
        console.log('submit')
    });
    const port = process.env.port || 8081;
    const sendURL = document.getElementById('url').value;
    const userData = { sendURL };
    const serverResponse = await fetch(`http://localhost:${port}/api`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    });

    const freeFood = await fetch(`http://localhost:${port}/sentiment`);

    const freeFoodJson = await freeFood.json();
    console.log(freeFoodJson);

    console.log(serverResponse.json());

    Client.updateUI(freeFoodJson);
};