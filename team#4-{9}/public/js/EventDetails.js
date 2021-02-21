$createEvent=document.querySelector('.createEvent')
$title=document.querySelector('.title')
$email=document.querySelector('.venue')
$description=document.querySelector('.description')
$date=document.querySelector('.date')



$createEvent.addEventListener('click',async (e)=>{
    e.preventdefault()
    const detailsObject={
        title:$title.value,
        email:$email.value,
        description:$description.value,
        date:$date.value
    }
    try {
        const response = await fetch('/createEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(detailsObject)

        })
        // const data = await response.json()
        // console.log(data)
        if (response.status !== 200) {
            throw new Error(data.errormsg)
        }
        // console.log(data)
        console.log(response.status)
            // window.alert('congratulations for logging in')
        // window.location.href = '/home';

    } catch (error) {
        window.alert(error)
        console.error(error)
    }
})