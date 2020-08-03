export function updateUI(result) {
    const resDomLocation = document.getElementById("result");
    if (result) {
        const stringy = JSON.stringify(result);
        const parsedRes = JSON.parse(stringy);
        console.log("We have a winner");
        console.log(parsedRes);
        const agreement = parsedRes.agreement;
        resDomLocation.innerText = `${agreement}`;

        /*`
        <div class="container">
            <div><h3>Agreement</h3>:${parsedRes.agreement
                .charAt(0)
                .toUpperCase()}${parsedRes.agreement.slice(1).toLowerCase()}</div>
            <div><h3>Confidence</h3>: ${parsedRes.confidence}</div>
            
            <div><h3>Subjectivity</h3>: ${parsedRes.subjectivity
                .charAt(0)
                .toUpperCase()}${parsedRes.subjectivity
            .slice(1)
            .toLowerCase()}</div>
        </div>
            `;*/
    };

};