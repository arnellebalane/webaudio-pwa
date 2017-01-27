const audioCtx = new AudioContext();
const analyser = audioCtx.createAnalyser();

const audioData = new Float32Array(analyser.fftSize);
let source = null;


const canvas = document.querySelector('canvas');
const canvasCtx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height =  window.innerHeight;

let backgroundColor = '#111111';
let visualizationColor = '#ffc107';


const constraints = { audio: true };
navigator.mediaDevices.getUserMedia(constraints)
  .then(visualize)
  .catch(console.error);


function visualize(input) {
  if (source) {
    source.disconnect();
  }
  if (input instanceof HTMLMediaElement) {
    source = audioCtx.createMediaElementSource(input);
    analyser.connect(audioCtx.destination);
  } else if (input instanceof MediaStream) {
    source = audioCtx.createMediaStreamSource(input);
    analyser.disconnect();
  } else {
    throw new Error('Unknown audio input type.');
  }
  source.connect(analyser);
}


(function render() {
  requestAnimationFrame(render);
  analyser.getFloatTimeDomainData(audioData);

  canvasCtx.fillStyle = backgroundColor;
  canvasCtx.strokeStyle = visualizationColor;
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < audioData.length; i++) {
    const data = audioData[i] * 250;
    const x = canvas.width / audioData.length * i;
    const y = canvas.height / 2;

    canvasCtx.beginPath();
    canvasCtx.moveTo(x, y - data);
    canvasCtx.lineTo(x, y + data);
    canvasCtx.stroke();
  }
})();
