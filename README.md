# Five²

Five² is a deliberately simple 5×5 letter-grid word game for two people sharing one screen.

- 25 six-sided letter dice using a classic 5×5 letter-cube distribution
- cryptographically strong browser randomness when available (`crypto.getRandomValues`)
- 3-minute round timer
- two-tone audible signal at 0:00
- persistent visual time-up state: `0:00`, **Time!**, and a gray board
- no accounts, scoring, dictionary, ads, analytics, or external libraries
- installable on an iPad home screen
- works offline after the first successful load


## Publish with GitHub Pages

1. Create a public GitHub repository named `five-squared`.
2. Put the files from this folder at the repository root and push them to your default branch (normally `main`).
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Select your default branch and **/(root)**, then save.
6. GitHub will show the published site address in the Pages settings. For a project repository it will normally look like:

   `https://YOUR-USERNAME.github.io/five-squared/`

No build step is required. The included `.nojekyll` file tells GitHub Pages to serve the files directly.

## Install on iPad

1. On the iPad, open the published Five² URL in **Safari** while online.
2. Wait for the game board to load once.
3. Tap Safari's **Share** button.
4. Choose **Add to Home Screen**, then add Five².
5. Launch Five² from its new Home Screen icon.

### Verify offline use before traveling

1. Open Five² from the Home Screen at least once while online.
2. Close it.
3. Turn on Airplane Mode (and make sure Wi-Fi is off).
4. Launch Five² again from its Home Screen icon.
5. Tap **New Board** a few times and run a short timer test to confirm the app shell is cached locally.

## Game behavior

- **New Board** rolls all 25 dice, shuffles their positions, resets the timer to 3:00, and clears the time-up state.
- **Start** begins the timer. **Pause** freezes the remaining time; **Resume** continues it.
- At **0:00**, Five² plays two short tones if audio is available, displays **Time!**, and changes the board to gray while keeping the letters readable.
- The time-up state stays visible until **New Board** is pressed.
- A Q tile is displayed as **Qu**.

## Local testing on a computer

Service workers do not work reliably from a plain `file://` URL. To test the offline behavior locally, serve the folder through a local HTTP server. For example, if Python is installed:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/` in a browser.

## Files

- `index.html` — complete UI, game logic, timer, randomization, and audio
- `manifest.webmanifest` — installable-web-app metadata
- `service-worker.js` — offline caching
- `icon-192.png` and `icon-512.png` — app icons
- `.nojekyll` — bypasses Jekyll processing on GitHub Pages
