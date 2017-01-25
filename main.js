const audio = new Audio();
audio.src = 'audio.mp3';
audio.autoplay = true;
audio.loop = true;

const audioCtx = new AudioContext();
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();
source.connect(analyser);
analyser.connect(audioCtx.destination);

const audioData = new Float32Array(analyser.fftSize);

const canvas = document.querySelector('canvas');
const canvasCtx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

(function visualize() {
    requestAnimationFrame(visualize);
    analyser.getFloatTimeDomainData(audioData);

    const horizontalInterval = canvas.width / audioData.length;

    canvasCtx.fillStyle = '#3F51B5';
    canvasCtx.strokeStyle = '#FFC107';
    canvasCtx.lineWidth = 3;
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtx.beginPath();

    for (let i = 0; i < audioData.length; i++) {
        const data = audioData[i];
        const x = i * horizontalInterval;
        const y = (canvas.height / 2) + (data * 250);

        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }
    }

    canvasCtx.stroke();
})();
