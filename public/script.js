const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const videoElement = document.createElement('video');
videoElement.muted = true;

let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(videoElement, stream);
});

socket.emit('join-room', ROOM_ID);

socket.on('user-connected', () => {
    connectToNewUser();
});

function connectToNewUser() {
    console.log('new user');
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });

    videoGrid.append(video);
}
