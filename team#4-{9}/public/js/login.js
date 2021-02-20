const $signup = document.querySelector('.actualSignup')
const $username = document.querySelector('.username')
const $email = document.querySelector('.email')
const $password = document.querySelector('.password')
const $signin = document.querySelector('.actualSignin')
const $signinUsername = document.querySelector('.signinUsername')
const $signinPassword = document.querySelector('.signinPassword')
$signup.addEventListener('click', async(e) => {
    e.preventDefault();
    e.disabled=true;
    const user = {
        username: $username.value,
        email: $email.value,
        password: $password.value

    }
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)

        })
        const data = await response.json()
        console.log(data)
        window.location.href = '/home';
    } catch (error) {
        console.error('madarchod ' + error);
    }


})

$signin.addEventListener('click', async(e) => {
    e.preventDefault();
    const credentials = {
        username: $signinUsername.value,
        password: $signinPassword.value
    }
    console.log('credentials ' + credentials.username + ' ' + credentials.password)
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify(credentials)

        })
        const data = await response.json()

        console.log(data)
        if (response.status !== 200) {
            throw new Error(data.errormsg)
        }
        // console.log(data)
        console.log(response.status)
            // window.alert('congratulations for logging in')
        window.location.href = '/home';



    } catch (error) {
        window.alert(error)
        console.error(error)
    }

})