// $description = document.querySelector('.description')
// $checkSentiment = document.querySelector('.checkSentiment')

// // Google, headquartered in Mountain View, unveiled the new Android phone at the Consumer Electronic Show.  Sundar Pichai said in his keynote that users love their new Android phones.
// $checkSentiment.addEventListener('click', async () => {
//     // try {
//     //     const obj = {
//     //         text: $description.value

//     //     }

//     //     const response = await fetch("https://sentim-api.herokuapp.com/api/v1/", {
//     //         "method": "POST",
//     //         "headers": {
//     //             Accept: "application/json",
//     //             "Content-Type": "application/json"
//     //         },
//     //         body: JSON.stringify(obj)


//     //     })
//     //     const data=await response.json()
//     //     console.log(data.result)

//     // }
//     // catch (error) {
//     //     console.log(error)
//     // }
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     var raw = JSON.stringify({ "text": $description.value });

//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };

//     const response = await fetch("https://sentim-api.herokuapp.com/api/v1/", requestOptions)
//     const data = await response.json();
//     const polarity = data.result.polarity
//     if (polarity < 0) {
//         $checkSentiment.style.backgroundColor = "#DC143C"
//         $checkSentiment.innerText = `Negative (${polarity} Polarity)`
//     }
//     else if (polarity > 0) {
//         $checkSentiment.style.backgroundColor = "#149414"
//         $checkSentiment.innerText = `Positive (${polarity} Polarity)`
//     }
//     else {
//         $checkSentiment.innerText = `Neutral (${polarity} Polarity)`
//     }


// }
// )


