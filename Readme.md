# 🎵 Spotify Clone (Frontend)

A responsive **Spotify-inspired music player UI** built using **HTML, CSS, and JavaScript**.
This project focuses on frontend concepts like responsive design, audio handling, and UI behavior similar to Spotify Web.

---

## 🚀 Features

* 🎧 Play / Pause music
* ⏭ Next & ⏮ Previous song controls
* 📱 Fully responsive (Desktop & Mobile)
* 📂 Dynamic song loading from local folders
* 🕒 Song duration & current time display
* 📊 Seek bar (progress indicator)
* 🍔 Mobile sidebar with hamburger menu
* 🎨 Spotify‑like UI design

---

## 🛠️ Tech Stack

* **HTML5** – Structure
* **CSS3** – Styling & responsiveness
* **JavaScript (ES6)** – Logic & audio control
* **Audio API** – Music playback

---

## 📁 Project Structure

```text
spotify-clone/
│
├── index.html        # Main HTML file
├── style.css         # Main styling
├── utility.css       # Utility/helper classes
├── script.js         # JavaScript logic
│
├── img/              # Icons & UI images
│   ├── play.svg
│   ├── pause.svg
│   ├── nextsong.svg
│   └── prevsong.svg
│
├── SONG/             # Music files
│   └── *.mp3
│
└── README.md         # Project documentation
```

---

## ▶️ How to Run the Project

⚠️ **Important:** This project uses `fetch()` to load songs, so it must be run on a local server.

### Option 1: Using VS Code Live Server

1. Open the project folder in VS Code
2. Install **Live Server** extension
3. Right‑click `index.html` → **Open with Live Server**

### Option 2: Using Python Server

```bash
python -m http.server
```

Then open:

```
http://127.0.0.1:8000
```

---

## 📱 Mobile Responsiveness

* Uses modern viewport units (`svh`) for iOS compatibility
* Fixed playbar that stays visible on mobile
* Sidebar slides in/out using hamburger menu
* Safe‑area support for iPhone notch & bottom bar

---

## 🧠 Key Learnings

* JavaScript `async / await`
* Handling Promises with `fetch()`
* HTML5 Audio API
* Responsive design pitfalls (`vh` vs `svh`)
* Mobile‑first UI debugging

---

## 🧩 Known Limitations

* No backend / authentication
* Songs must be stored locally
* No playlists or likes (UI only)

---

## 🌟 Future Improvements

* 🎚 Volume control
* 🔁 Shuffle & repeat
* 🎵 Playlist support
* 📡 Backend integration
* 📲 PWA support

---

## 📸 Screenshots

*Add screenshots here*

---

## 🙌 Author

**Nevid**
Frontend Developer | CS Student

---

## 📄 License

This project is for **learning & educational purposes only**.
All music and Spotify branding belong to their respective owners.

---

⭐ If you like this project, give it a star!
