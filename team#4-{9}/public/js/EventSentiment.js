$description = document.querySelector('.description')
$checkSentiment = document.querySelector('.checkSentiment')

// Google, headquartered in Mountain View, unveiled the new Android phone at the Consumer Electronic Show.  Sundar Pichai said in his keynote that users love their new Android phones.
$checkSentiment.addEventListener('click', () => {
    // try {
    //     const obj = {
    //         text: $description.value

    //     }

    //     const response = await fetch("https://sentim-api.herokuapp.com/api/v1/", {
    //         "method": "POST",
    //         "headers": {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(obj)


    //     })
    //     const data=await response.json()
    //     console.log(data.result)

    // }
    // catch (error) {
    //     console.log(error)
    // }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "text": $description.value });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://sentim-api.herokuapp.com/api/v1/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


}
)


