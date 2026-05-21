(function (global) {
  const STORAGE_KEY = 'moovit-voice-lang';

  const LANG_CODES = {
    en: 'en-US',
    hi: 'hi-IN',
    es: 'es-ES',
    fr: 'fr-FR'
  };

  const PHRASES = {
    en: { detected: 'Detected', sharp: 'This is a' },
    hi: { detected: 'पता चला', sharp: 'यह एक' },
    es: { detected: 'Detectado', sharp: 'Esto es un' },
    fr: { detected: 'Détecté', sharp: 'Ceci est un' }
  };

  const LABELS = {
    person: { en: 'person', hi: 'व्यक्ति', es: 'persona', fr: 'personne' },
    bicycle: { en: 'bicycle', hi: 'साइकिल', es: 'bicicleta', fr: 'vélo' },
    car: { en: 'car', hi: 'कार', es: 'coche', fr: 'voiture' },
    motorcycle: { en: 'motorcycle', hi: 'मोटरसाइकिल', es: 'motocicleta', fr: 'moto' },
    bus: { en: 'bus', hi: 'बस', es: 'autobús', fr: 'bus' },
    truck: { en: 'truck', hi: 'ट्रक', es: 'camión', fr: 'camion' },
    'traffic light': { en: 'traffic light', hi: 'ट्रैफिक लाइट', es: 'semáforo', fr: 'feu de circulation' },
    'stop sign': { en: 'stop sign', hi: 'स्टॉप साइन', es: 'señal de alto', fr: "panneau d'arrêt" },
    dog: { en: 'dog', hi: 'कुत्ता', es: 'perro', fr: 'chien' },
    cat: { en: 'cat', hi: 'बिल्ली', es: 'gato', fr: 'chat' },
    horse: { en: 'horse', hi: 'घोड़ा', es: 'caballo', fr: 'cheval' },
    cow: { en: 'cow', hi: 'गाय', es: 'vaca', fr: 'vache' },
    elephant: { en: 'elephant', hi: 'हाथी', es: 'elefante', fr: 'éléphant' },
    bear: { en: 'bear', hi: 'भालू', es: 'oso', fr: 'ours' },
    bird: { en: 'bird', hi: 'पक्षी', es: 'pájaro', fr: 'oiseau' },
    knife: { en: 'knife', hi: 'चाकू', es: 'cuchillo', fr: 'couteau' },
    scissors: { en: 'scissors', hi: 'कैंची', es: 'tijeras', fr: 'ciseaux' },
    fork: { en: 'fork', hi: 'कांटा', es: 'tenedor', fr: 'fourchette' },
    spoon: { en: 'spoon', hi: 'चम्मच', es: 'cuchara', fr: 'cuillère' },
    bottle: { en: 'bottle', hi: 'बोतल', es: 'botella', fr: 'bouteille' },
    chair: { en: 'chair', hi: 'कुर्सी', es: 'silla', fr: 'chaise' },
    bench: { en: 'bench', hi: 'बेंच', es: 'banco', fr: 'banc' },
    backpack: { en: 'backpack', hi: 'बैग', es: 'mochila', fr: 'sac à dos' },
    handbag: { en: 'handbag', hi: 'हैंडबैग', es: 'bolso', fr: 'sac à main' }
  };

  function getLanguage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return LANG_CODES[stored] ? stored : 'en';
  }

  function setLanguage(lang) {
    if (LANG_CODES[lang]) {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  function translateLabel(className, lang) {
    const key = className.toLowerCase();
    const entry = LABELS[key];
    if (entry && entry[lang]) {
      return entry[lang];
    }
    return className;
  }

  function filterPredictions(predictions, minScore, allowedClasses) {
    let filtered = predictions.filter((p) => p.score >= minScore);
    if (allowedClasses && allowedClasses.length > 0) {
      const allowed = new Set(allowedClasses.map((c) => c.toLowerCase()));
      filtered = filtered.filter((p) => allowed.has(p.class.toLowerCase()));
    }
    return filtered;
  }

  function drawBoxes(ctx, predictions, style) {
    const stroke = style.strokeStyle || '#4CAF50';
    const font = style.font || '16px Poppins, Arial, sans-serif';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    predictions.forEach((pred) => {
      const [x, y, width, height] = pred.bbox;
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.lineWidth = style.lineWidth || 2;
      ctx.strokeStyle = stroke;
      ctx.stroke();
      ctx.font = font;
      ctx.fillStyle = style.textColor || 'white';
      ctx.fillText(
        `${pred.class} (${Math.round(pred.score * 100)}%)`,
        x,
        y > 10 ? y - 5 : 10
      );
    });
  }

  function createVoiceAlert(options) {
    const speakDelay = options.speakDelayMs || 4000;
    const mode = options.mode || 'detected';
    const lastSpoken = {};
    let voicesReady = false;

    function loadVoices() {
      voicesReady = global.speechSynthesis.getVoices().length > 0;
    }

    if (global.speechSynthesis) {
      loadVoices();
      global.speechSynthesis.onvoiceschanged = loadVoices;
    }

    function pickVoice(langCode) {
      if (!voicesReady) {
        return null;
      }
      const voices = global.speechSynthesis.getVoices();
      const prefix = langCode.split('-')[0];
      return (
        voices.find((v) => v.lang === langCode) ||
        voices.find((v) => v.lang.startsWith(prefix)) ||
        null
      );
    }

    function speak(className) {
      const lang = getLanguage();
      const langCode = LANG_CODES[lang];
      const label = translateLabel(className, lang);
      const phrases = PHRASES[lang] || PHRASES.en;
      const text =
        mode === 'sharp'
          ? `${phrases.sharp} ${label}`
          : `${phrases.detected} ${label}`;

      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = langCode;
      msg.rate = options.rate || 1;
      const voice = pickVoice(langCode);
      if (voice) {
        msg.voice = voice;
      }
      global.speechSynthesis.speak(msg);
    }

    function speakLabels(predictions) {
      const now = Date.now();
      predictions.forEach((pred) => {
        const label = pred.class;
        const lastTime = lastSpoken[label] || 0;
        if (now - lastTime > speakDelay) {
          speak(label);
          lastSpoken[label] = now;
        }
      });
    }

    return { speakLabels, speak, setLanguage, getLanguage };
  }

  function createDetectionLoop(config) {
    const intervalMs = config.intervalMs || 150;
    const minScore = config.minScore ?? 0.5;
    const allowedClasses = config.allowedClasses || null;
    const voice = createVoiceAlert({
      speakDelayMs: config.speakDelayMs,
      mode: config.voiceMode,
      rate: config.speechRate
    });

    let detecting = false;
    let lastDetectTime = 0;
    let running = false;
    let rafId = null;

    async function tick() {
      if (!running) {
        return;
      }
      rafId = global.requestAnimationFrame(tick);
      const now = performance.now();
      if (detecting || now - lastDetectTime < intervalMs) {
        return;
      }
      detecting = true;
      lastDetectTime = now;
      try {
        const raw = await config.model.detect(config.video);
        const predictions = filterPredictions(raw, minScore, allowedClasses);
        config.onFrame(predictions);
        if (config.enableVoice !== false) {
          voice.speakLabels(predictions);
        }
      } catch (err) {
        if (config.onError) {
          config.onError(err);
        }
      } finally {
        detecting = false;
      }
    }

    function start() {
      if (running) {
        return;
      }
      running = true;
      tick();
    }

    function stop() {
      running = false;
      if (rafId !== null) {
        global.cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    return { start, stop, voice };
  }

  function wireLanguageSelector(selectId) {
    const select = document.getElementById(selectId);
    if (!select) {
      return;
    }
    select.value = getLanguage();
    select.addEventListener('change', () => {
      setLanguage(select.value);
    });
  }

  global.MooVitDetection = {
    LANG_CODES,
    STORAGE_KEY,
    getLanguage,
    setLanguage,
    translateLabel,
    filterPredictions,
    drawBoxes,
    createVoiceAlert,
    createDetectionLoop,
    wireLanguageSelector
  };
})(window);
