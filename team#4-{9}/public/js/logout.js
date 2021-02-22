$logout = document.querySelector('.logout') 
$logout.addEventListener('click', async(e) => {
    e.preventDefault()
    console.log('hello')
    const date=Date.now(0);
    // document.cookie = `authtoken= ; expires=${date}`;
    // // cookies.set('authtoken', {expires: Date.now()});
    window.location.href = '/';
    try {
        const response = await fetch('/logout', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
})
        if(response.status===200)
        window.location.href = '/';
        else
        {
            throw new error('Hello hi how are you')
        }
    } catch (error) {
        window.alert(error)
        console.error(error)
        window.location.href = '/';
    }
})