import http from 'node:http'
import express from 'express'
import path from 'node:path'
import {Server} from 'socket.io'
import {spawn} from 'child_process'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const options: string[] = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', `25`,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', `128000 / 4`,
    '-f', 'flv',
    `rtmp://a.rtmp.youtube.com/live2/dcfx-m7v2-j248-3185-9207`,
]
const ffmpegProcess = spawn('ffmpeg', options)

app.use(express.static(path.resolve('./public')))
app.use(express.json())

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('binary-stream', stream => {
        ffmpegProcess.stdin.write(stream, err => {
            console.log(err)
        })
    })
})

server.listen(3000, () => console.log(`app running at port ${3000}`))