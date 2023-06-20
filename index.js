
const express = module.require('express')
const socket = module.require('socket.io')
const path = module.require('path')

const app = express()

app.use(express.static(path.join(__dirname,'public')))


const PORT = process.env.PORT || 4000

const server = app.listen(PORT,()=>{
    console.log('app is running on port ' + PORT)
})


const io = socket(server)

io.on('connection', (user)=>{
    console.log(`user with id of ${user.id} just connected`)


    user.on('chat', (data)=>{
        user.broadcast.emit('chatmessage',data)
    })
})