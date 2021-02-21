const socket = io()
const $messageForm = document.querySelector('#msgForm')
const $messageFormInput = document.querySelector('#messageField')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocation = document.querySelector('#sendLocation')
const $messages = document.querySelector('#messages')
const $sidebar =document.querySelector('#sidebar')
//templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate=document.querySelector('#location-template').innerHTML
// const ownmessageTemplate=document.querySelector('#ownmessage-template').innerHTML
const sidebarTemplate=document.querySelector('#sidebar-template').innerHTML
//Options
const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})

const autoscroll=()=>{

    const $newMessage=$messages.lastElementChild

    const newMessageStyles=getComputedStyle($newMessage)
    // const newMessageMargin=parseInt(newMessageStyles.marginBottom)
    const newMessageHeight=$newMessage.offsetHeight+parseInt(newMessageStyles.marginBottom)

    const visibleHeight=$messages.offsetHeight


    const contentHeight=$messages.scrollHeight

    const scrollOffset=$messages.scrollTop+visibleHeight

    if(contentHeight-newMessageHeight<=scrollOffset)
    {
        $messages.scrollTop=$messages.scrollHeight
    }
}

// socket.on('ownMessage', (message) => {
//     console.log(message)
//     const html = Mustache.render(ownmessageTemplate, { username:message.username,message:message.text,createdAt:moment(message.createdAt).format('h:mm a') })
//     $messages.insertAdjacentHTML('beforeend', html)
//     autoscroll()
// })

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, { username:message.username,message:message.text,createdAt:moment(message.createdAt).format('h:mm a') })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('locationMessage',(locationurl)=>{
    console.log(locationurl)
    const html=Mustache.render(locationTemplate,{ username:locationurl.username,url:locationurl.url,
    createdAt:moment(locationurl.createdAt).format('h:mm a') })
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
})

// socket.on('locationMessage ',(location_url)=>{
// console.log(location_url)
// // const html=Mustache.render(locationTemplate,{location_url})
// // $messages.insertAdjacentHTML('beforeend',html)
// })


$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()


    $messageFormButton.setAttribute('disabled', 'disabled')
    const message = $messageFormInput.value

    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        if (error) {
            return console.log(error)
        }
        console.log(' This Message was  deleivered ')
    })
})

socket.on('roomData',({room,users})=>{
   

const html=Mustache.render(sidebarTemplate,{
    room,
    users
})
$sidebar.innerHTML=html
})

$sendLocation.addEventListener('click', async () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!!')
    }
    $sendLocation.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        const location = {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }
        socket.emit('sendLocation', location, (error) => {
            if(error)
            {
            console.log(error)
            }
            $sendLocation.removeAttribute('disabled')
            console.log('Location Shared')
        })

    })
})


socket.emit('join',{username,room},(error)=>{
    if(error)
    {
        alert(error)
        location.href='/'
    }
})




// socket.on('messageToClient',(message)=>{
//     console.log(message)
// })
// socket.on('countUpdated',(count)=>{
//     console.log('The count has been updated! ',count)
// })
// const button=document.querySelector('#increment')

// button.addEventListener('click',()=>{
//     console.log("clicked")
//     socket.emit('increment')
// })