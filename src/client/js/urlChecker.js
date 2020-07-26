export function validate() {
    const url = document.getElementById("url").value;
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if (urlRegex.test(url)) {
        console.log("URL is valid!")
        document.querySelector(".hidden").style.visibility = "hidden"
        document.querySelector("#submit").style.visibility = "visible"
        return true;

    } else {
        console.log("URL not valid!")
        document.querySelector("#submit").style.visibility = "hidden"
        document.querySelector(".hidden").style.visibility = "visible"
        return false;
    }
};