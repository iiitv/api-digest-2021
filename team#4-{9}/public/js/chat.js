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

socket.emit('join',{username,room},(error)=>{
    if(error)
    {
        alert(error)
        location.href='/'
    }
})