const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const SHARP_CLASSES = ['knife', 'scissors', 'fork', 'spoon'];

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
      minScore: 0.55,
      intervalMs: 150,
      speakDelayMs: 4000,
      voiceMode: 'sharp',
      allowedClasses: SHARP_CLASSES,
      onFrame(predictions) {
        MooVitDetection.drawBoxes(ctx, predictions, {
          strokeStyle: 'red',
          textColor: 'red',
          font: '16px Arial, sans-serif'
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
  alert('Error initializing detection: ' + err.message);
});
