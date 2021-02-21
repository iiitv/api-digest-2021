const users = []

const addUser = ({ id, username, room }) => {
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if (!room || !username) {
        return {
            error: 'Username and room are required'
        }
    }

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    const user = {
        id,
        username,
        room
    }
    users.push(user)

    return {
        user
    }

}

addUser({
    id: 22,
    username: 'bAt   ',
    room: '   India'
})

addUser({
    id: 25,
    username: 'bAt sd  ',
    room: '   India '
})
addUser({
    id: 42,
    username: 'bAt d',
    room: '   India pakistan'
})

const removeUser = (id) => {

    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id
    )
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room.trim().toLowerCase()
    )
}

module.exports={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}