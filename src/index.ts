import http from 'node:http'
import express from 'express'
import path from 'node:path'
import {Server} from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static(path.resolve('./public')))
app.use(express.json())

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('binary-stream', stream => {
        console.log("Stream incoming...")
    })
})

server.listen(3000, () => console.log(`app running at port ${3000}`))