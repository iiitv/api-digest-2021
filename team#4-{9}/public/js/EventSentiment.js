$description = document.querySelector('#messageField')
$checkSentiment = document.querySelector('.checkSentiment')

$checkSentiment.addEventListener('click', async () => {
    console.log("clicked")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "text": $description.value });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch("https://sentim-api.herokuapp.com/api/v1/", requestOptions)
    const data = await response.json();
    const polarity = data.result.polarity
    if (polarity < 0) {
        $checkSentiment.style.backgroundColor = "#DC143C"
        $checkSentiment.innerText = `Negative (${polarity} Polarity)`
        alert("The sentiment of your message seems to be negative. Do you want to continue?")
    }
    else if (polarity > 0) {
        $checkSentiment.style.backgroundColor = "#149414"
        $checkSentiment.innerText = `Positive (${polarity} Polarity)`
    }
    else {
        $checkSentiment.innerText = `Neutral (${polarity} Polarity)`
    }
}
)


