const video = document.getElementById("user-video")
const btn = document.getElementById("start-btn")

const state = { media: null }
const socket = io()

window.addEventListener("load", async e => {
    const media = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    })

    state.media = media
    video.srcObject = media
})

btn.addEventListener("click", async e => {
    const mediaRecorder = new MediaRecorder(state.media, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000
    })

    mediaRecorder.ondataavailable = e => {
        socket.emit('binary-stream', e.data)
    }
})