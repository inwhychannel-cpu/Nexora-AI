# Nexora

A responsive, static website for the Nexora voice-assistant concept. It includes a voice input demonstration, sample language selector, product overview, privacy and permissions information, FAQ, and a custom SVG logo.

## Run locally

No build tools or dependencies are required. Download or clone this repository, then either open `index.html` in a browser or run a local server from the project directory:

```bash
python -m http.server 8000
```

Visit <http://localhost:8000>.

## Voice demo and limitations

The optional speech demo uses the browser's built-in `SpeechRecognition` or `webkitSpeechRecognition` API when available. It only starts after the visitor presses **Start speaking** and the browser grants microphone permission. Browser, device, and language support varies; HTTPS is generally required outside localhost. Some browsers may send speech to a vendor's recognition service, so users should consult that browser's privacy documentation.

This website is a front-end demo only. It displays recognized words; it does **not** control the computer, open apps, access files, run commands, or include an AI/backend service. Do not treat the sample language list as a guarantee of universal language support.

## Files

- `index.html` — website content and page sections
- `styles.css` — responsive visual design
- `app.js` — menu, voice demo, and FAQ interactions
- `assets/nexora.svg` — Nexora logo

## Publish

The site is static and can be hosted by any static web host. To use GitHub Pages, configure Pages for this repository in **Settings → Pages** and select the `main` branch with the `/ (root)` folder. GitHub will show the published URL in the Pages settings after deployment.
