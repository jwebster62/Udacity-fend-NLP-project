export function updateUI(result) {
    const resDomLocation = document.getElementById("result");
    if (result) {
        const stringy = JSON.stringify(result);
        const parsedRes = JSON.parse(stringy);
        console.log("We have a winner");
        console.log(parsedRes);
        resDomLocation.innerHTML = `
        <div class="container">
            <div><h3>Agreement</h3>:${parsedRes.agree
                .charAt(0)
                .toUpperCase()}${parsedRes.agree.slice(1).toLowerCase()}</div>
            <div><h3>Confidence</h3>: ${parsedRes.conf}</div>
            
            <div><h3>Subjectivity</h3>: ${parsedRes.subj
                .charAt(0)
                .toUpperCase()}${parsedRes.subj
            .slice(1)
            .toLowerCase()}</div>
        </div>
            `;
    };

};