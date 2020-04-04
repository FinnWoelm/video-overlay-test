require('./captureButton.css');
const captureContainer = require('../captureContainer');

const recordingAnimation = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 70 70" width="70" height="70">
    <defs>
      <mask id="clip">
        <rect x="35" y="0" width="35" height="70" fill="white"/>
        <rect x="35" y="0" width="35" height="70" fill="black">
          <animateTransform attributeName="transform" type="rotate"
            begin="0s" dur="5s" fill="black" from="0,35,35" to="180,35,35"/>
        <rect/>
      </mask>
    </defs>
    <circle cx="35" cy="35" r="30" fill="red" stroke="red" stroke-width="5"
      stroke-opacity="1" fill="red" fill-opacity="0" mask="url(#clip)"/>
  </svg>
  `;

module.exports = function captureButton(canvas, canvasStream, appendTo) {
  const captureBtn = document.createElement('div');
  const container = captureContainer(canvas, canvasStream, appendTo);
  captureBtn.setAttribute('id', 'captureBtn');
  let isCapturing;

  captureBtn.addEventListener('mousedown', () => {
    if (isCapturing) {
      isCapturing = false
      container.stopCapturing();
      captureBtn.classList.remove("on");
      return true
    }

    if (container.startCapturing()) {
      isCapturing = true
      captureBtn.classList.add("on");
    }
  });
  appendTo.appendChild(captureBtn);
};
