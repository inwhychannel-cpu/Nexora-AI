(() => {
  const button = document.querySelector('#mic-button');
  const label = document.querySelector('#mic-label');
  const status = document.querySelector('#voice-status');
  const substatus = document.querySelector('#voice-substatus');
  const transcript = document.querySelector('#transcript');
  const language = document.querySelector('#language-select');
  const orb = document.querySelector('#voice-orb');
  const note = document.querySelector('#browser-note');
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;
  let listening = false;

  document.querySelector('#year').textContent = new Date().getFullYear();

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('is-open', !expanded);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }));

  function setListening(value) {
    listening = value;
    button.setAttribute('aria-pressed', String(value));
    button.classList.toggle('is-listening', value);
    orb.classList.toggle('is-listening', value);
    label.textContent = value ? 'Stop listening' : 'Start speaking';
    status.textContent = value ? 'I’m listening…' : 'Your assistant is ready';
    substatus.textContent = value ? 'Speak now; tap stop whenever you’re done' : 'Choose a language, then tap the button to speak';
  }

  if (!Recognition) {
    button.addEventListener('click', () => {
      status.textContent = 'Speech recognition isn’t available here';
      substatus.textContent = 'Try a supported browser and an HTTPS connection.';
      note.textContent = 'Your browser does not expose speech recognition to this demo. You can still explore the site and its language options.';
    });
  } else {
    recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (event) => {
      setListening(false);
      status.textContent = event.error === 'not-allowed' ? 'Microphone permission was not granted' : 'I couldn’t hear that—please try again';
    };
    recognition.onresult = (event) => {
      let text = '';
      for (let i = event.resultIndex; i < event.results.length; i++) text += event.results[i][0].transcript;
      transcript.textContent = text;
      if (event.results[event.results.length - 1].isFinal) {
        status.textContent = 'Thanks for speaking with Nexora';
        substatus.textContent = 'This demo shows your words; it does not perform computer actions.';
      }
    };
    button.addEventListener('click', () => {
      if (listening) {
        recognition.stop();
        return;
      }
      transcript.textContent = '';
      recognition.lang = language.value;
      try {
        recognition.start();
      } catch (_) {
        status.textContent = 'Please wait a moment, then try again';
      }
    });
  }

  document.querySelectorAll('.prompt-chip').forEach((chip) => chip.addEventListener('click', () => {
    transcript.textContent = chip.dataset.example;
    status.textContent = 'Example request';
    substatus.textContent = 'This is a sample only; Nexora did not execute it.';
  }));
})();
