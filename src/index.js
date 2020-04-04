/* global OT config */
// A real app would use require('opentok-filters/src/filters.js');
const filters = require('opentok-camera-filters/src/filters.js');

const captureButton = require('./components/captureButton');
const filterPicker = require('./components/filterPicker');

const canvas = document.createElement('canvas');

console.log("hello")

let videoElement;
navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
}).then(stream => {

  console.log("hello")

  videoElement = document.createElement('video');
  videoElement.srcObject = stream;
  videoElement.muted = true;
  videoElement.setAttribute('playsinline', '');
  setTimeout(() => {
    videoElement.play();
  });
  videoElement.addEventListener('loadedmetadata', () => {
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    let context = canvas.getContext('2d', {alpha: false});
    context.fillText("Hello World", 10, 50);
    let canvasStream = canvas.captureStream();

    filterPicker(videoElement, canvas, filters, document.body);
    if (stream.getAudioTracks().length) {
      canvasStream.addTrack(stream.getAudioTracks()[0]);
    }

    document.body.appendChild(canvas);
    captureButton(canvas, canvasStream, document.body);
  })
}).catch(error => console.log(error));
