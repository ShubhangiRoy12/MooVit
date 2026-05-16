const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

async function start() {
  const model = await cocoSsd.load();
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  video.onloadedmetadata = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const loop = MooVitDetection.createDetectionLoop({
      model,
      video,
      minScore: 0.5,
      intervalMs: 150,
      speakDelayMs: 4000,
      voiceMode: 'detected',
      onFrame(predictions) {
        MooVitDetection.drawBoxes(ctx, predictions, {
          strokeStyle: '#4CAF50',
          font: '16px Poppins, sans-serif'
        });
      },
      onError(err) {
        console.error(err);
      }
    });

    MooVitDetection.wireLanguageSelector('voiceLang');
    loop.start();
  };
}

start().catch((err) => {
  console.error(err);
  alert('Webcam or model error: ' + err.message);
});
