const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const videoElement = document.createElement('video');
videoElement.muted = true;

const peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '5000',
});

let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(videoElement, stream);

    peer.on('call', function (call) {

        call.answer(stream); // Answer the call with an A/V stream.
        const video = document.createElement('video');
        call.on('stream', function (remoteStream) {
            // Show stream in some video/canvas element.
            addVideoStream(video, remoteStream);
        });
    });

    socket.on('user-connected', (userId) => {
        setTimeout(() => {
            connectToNewUser(userId, stream);
        }, 100);
    });
});

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
});



function connectToNewUser(userId, stream) {
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    });
}

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });

    videoGrid.append(video);
}
