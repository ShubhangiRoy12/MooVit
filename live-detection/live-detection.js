const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let lastSpoken = {};
const speakDelay = 4000; // Delay between speaking the same label (ms)

async function start() {
    // Load the COCO-SSD model.
    const model = await cocoSsd.load();

    // Request access to the user's webcam.
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.onloadedmetadata = () => {
        // Set the canvas dimensions to match the video.
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // Start the detection loop.
        detectFrame();
    };

    async function detectFrame() {
        // Detect objects in the current video frame.
        const predictions = await model.detect(video);

        // Clear the canvas and draw new bounding boxes.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoxes(predictions);

        // Speak the labels of the detected objects.
        speakLabels(predictions);

        // Request the next animation frame for a continuous loop.
        requestAnimationFrame(detectFrame);
    }

    function drawBoxes(predictions) {
        predictions.forEach(pred => {
            // Get the bounding box coordinates.
            const [x, y, width, height] = pred.bbox;

            // Draw the box.
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#4CAF50';
            ctx.fillStyle = '#4CAF50';
            ctx.stroke();

            // Draw the label text.
            ctx.font = '16px Poppins';
            ctx.fillStyle = 'white';
            ctx.fillText(`${pred.class} (${Math.round(pred.score * 100)}%)`, x, y > 10 ? y - 5 : 10);
        });
    }

    function speakLabels(predictions) {
        const now = Date.now();
        predictions.forEach(pred => {
            const label = pred.class;
            const lastTime = lastSpoken[label] || 0;
            // Check if enough time has passed since the last alert for this object.
            if (now - lastTime > speakDelay) {
                speak(label);
                lastSpoken[label] = now;
            }
        });
    }

    function speak(text) {
        const msg = new SpeechSynthesisUtterance();
        msg.text = `Detected ${text}`;
        msg.lang = 'en-US';
        msg.rate = 1;
        window.speechSynthesis.speak(msg);
    }
}

// Start the application and handle any errors.
start().catch(err => {
    console.error(err);
    alert('Webcam or model error: ' + err.message);
});