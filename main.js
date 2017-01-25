const options = { audio: true };
navigator.webkitGetUserMedia(options, capture, console.error);


function capture(stream) {
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaStreamSource(stream);
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

      canvasCtx.fillStyle = '#222222';
      canvasCtx.lineWidth = 1;
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < audioData.length; i++) {
          const data = audioData[i] * 250;
          const x = i * horizontalInterval;
          const y = canvas.height / 2;

          if (data >= 0) {
            canvasCtx.strokeStyle = '#FFC107';
          } else {
            canvasCtx.strokeStyle = '#673AB7';
          }

          canvasCtx.beginPath();
          canvasCtx.moveTo(x, y - data);
          canvasCtx.lineTo(x, y + data);
          canvasCtx.stroke();
      }
  })();
}
