const resHead = document.querySelector("#res-head");
const resCont = document.querySelector("#res");

export const handleSubmit = (url, loadingBtn, header = resHead, container = resCont) => {
    return fetch("/sentiment", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        })
        .then(res => res.json())
        .then(({ polarity, subjectivity, text }) => {
            const polarElem = document.createElement("p");
            const subjElem = document.createElement("p");

            polarElem.textContent = `Polarity: ${polarity}`;
            subjElem.textContent = `Subjectivity: ${subjectivity}`;

            header.textContent = "Form Results:";
            container.innerHTML = `<p>${text}</p>`;

            container.insertAdjacentElement("afterbegin", subjElem);
            container.insertAdjacentElement("afterbegin", polarElem);

            loadingBtn.value = "submit";
        })
        .catch(e => console.error(e));
};