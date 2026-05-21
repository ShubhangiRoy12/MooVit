const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wrapper = document.getElementById('wrapper');
let lastSpoken = {};
const speakDelay = 4000; // Delay between speaking the same label (ms)

// Cache the model so retries don't re-download it.
let cachedModel = null;

// Guard flag to prevent overlapping start() calls.
let isStarting = false;

// Track the active stream so we can stop it on retry.
let activeStream = null;

function showError(type) {
    // Remove any existing error message.
    const old = document.getElementById('camera-error');
    if (old) old.remove();

    const box = document.createElement('div');
    box.id = 'camera-error';

    // Accessibility: let screen readers announce this error.
    box.setAttribute('role', 'alert');
    box.setAttribute('aria-live', 'assertive');

    let heading = 'Camera unavailable';
    let message = 'Something went wrong while accessing your camera.';

    if (type === 'denied') {
        heading = 'Camera access denied';
        message = 'You blocked camera permission. To use live detection, allow camera access in your browser settings and try again.';
    } else if (type === 'not-found') {
        heading = 'No camera found';
        message = 'This device does not appear to have a camera, or it is being used by another application.';
    } else if (type === 'insecure') {
        heading = 'HTTPS required';
        message = 'Camera access requires a secure connection. Open this page using HTTPS instead of HTTP.';
    } else if (type === 'model') {
        heading = 'Detection model failed to load';
        message = 'The object detection model could not be downloaded. Check your internet connection and try again.';
    }

    box.innerHTML =
        '<div class="error-icon">&#9888;</div>' +
        '<h3>' + heading + '</h3>' +
        '<p>' + message + '</p>' +
        '<button id="retry-btn" onclick="retryCamera()">Try again</button>';

    wrapper.appendChild(box);
}

function showLoading() {
    const old = document.getElementById('loading-indicator');
    if (old) old.remove();

    const el = document.createElement('div');
    el.id = 'loading-indicator';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.innerHTML =
        '<div class="spinner"></div>' +
        '<p>Loading detection model...</p>';

    wrapper.appendChild(el);
}

function hideLoading() {
    const el = document.getElementById('loading-indicator');
    if (el) el.remove();
}

function stopActiveStream() {
    // Stop all tracks on the existing stream to free the camera.
    if (activeStream) {
        activeStream.getTracks().forEach(function(track) {
            track.stop();
        });
        activeStream = null;
    }
    video.srcObject = null;
}

function retryCamera() {
    // Prevent spamming the retry button.
    if (isStarting) return;

    const errorBox = document.getElementById('camera-error');
    if (errorBox) errorBox.remove();
    start();
}

async function start() {
    // Block concurrent calls.
    if (isStarting) return;
    isStarting = true;

    // Release any previous camera stream before requesting a new one.
    stopActiveStream();

    showLoading();

    // Check for secure context before even trying the camera.
    if (window.isSecureContext === false) {
        hideLoading();
        isStarting = false;
        showError('insecure');
        return;
    }

    // Load the COCO-SSD model, or reuse the cached one.
    if (!cachedModel) {
        try {
            cachedModel = await cocoSsd.load();
        } catch (err) {
            console.error('Model load failed:', err);
            hideLoading();
            isStarting = false;
            showError('model');
            return;
        }
    }

    // Request camera access.
    let stream;
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (err) {
        console.error('Camera error:', err);
        hideLoading();
        isStarting = false;

        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            showError('denied');
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
            showError('not-found');
        } else if (err.name === 'NotSupportedError' || err.name === 'SecurityError') {
            // Some browsers throw SecurityError instead of NotSupportedError.
            showError('insecure');
        } else {
            showError('generic');
        }
        return;
    }

    activeStream = stream;
    hideLoading();
    isStarting = false;
    video.srcObject = stream;

    const model = cachedModel;

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

// Start the application.
start();