
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

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });

    videoGrid.append(video);
}
