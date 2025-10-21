**Project Documentation for "Song of the Day" Application**

Below is a comprehensive project documentation for your "Song of the Day" application. This document serves as a guide for understanding the project structure, functionality, setup instructions, deployment details, and future considerations. It is tailored to the current state of your code as provided, with the design and integration you’ve settled on.  
---

**Song of the Day Application Documentation**

**Overview**

The "Song of the Day" application is a React-based web app that fetches and displays a random song daily from the Deezer API. It features a visually appealing, Spotify-inspired interface with a dynamic card displaying song artwork, title, artist, album, and release year. Users can refresh to get a new random song, and the app is designed for easy deployment and scalability.

* **Purpose**: Provide users with a daily dose of random music discovery.  
* **Technology Stack**: React, Vite, Tailwind CSS, Deezer API.  
* **Current Version**: 1.0 (as of October 21, 2025).  
* **Author**: Ntokozo 

---

**Project Structure**

The project is organized as follows (based on the C:\\Users\\Ntokozo\\song-of-the-day directory):  
song-of-the-day/  
├── node\_modules/              \# Dependencies installed via npm  
├── public/                    \# Static assets (e.g., index.html)  
│   └── index.html            \# HTML entry point  
├── src/                       \# Source code  
│   ├── App.jsx               \# Main React component  
│   ├── App.css               \# CSS for App (currently empty)  
│   ├── index.css             \# Global styles  
│   └── assets/               \# Asset files (if any)  
├── .gitignore                 \# Git ignore file  
├── package.json               \# Project metadata and scripts  
├── tailwind.config.js         \# Tailwind CSS configuration  
├── vite.config.js             \# Vite configuration  
├── Procfile                   \# Heroku deployment configuration (if added)  
├── static.json                \# Heroku static site config (if added)  
└── README.md                  \# Project README (to be created or updated)

---

**Functionality**

* **Random Song Fetching**:  
  * On load, the app fetches a random song from one of nine genres (pop, rock, hip-hop, jazz, electronic, indie, r\&b, country, reggae) using the Deezer API.  
  * Utilizes a random offset (0-40) with a limit of 25 tracks per request, allowing access to approximately 1000 tracks total.  
* **UI Display**:  
  * Displays song details in a centered card with:  
    * Artwork (300x300px, rounded with a purple border).  
    * Title (large, bold text).  
    * Artist, album, and year (medium-sized, grayed text).  
  * Features a blurred artwork background with a purple-gray gradient overlay.  
* **User Interaction**:  
  * "New Song" button refreshes the page with a different random song.  
  * Loading and error states are handled with spinners and retry options.

---

**Technical Details**

* **Frontend**:  
  * **Framework**: React with Vite for fast development and builds.  
  * **Styling**: Tailwind CSS for utility-first design, customized with a purple-black gradient and Spotify-like elements.  
  * **API**: Deezer API via a Vite proxy to bypass CORS (/api/search endpoint).  
* **Dependencies**:  
  * react, react-dom, vite, tailwindcss, autoprefixer, postcss.  
  * Install via npm install in the project directory.  
* **Build Process**:  
  * npm run build generates a dist/ folder with static assets.  
  * npm run dev starts a local development server at http://localhost:5173.

---

**Setup Instructions**

**Prerequisites**

* **Node.js**: Version 18.x or later (check with node \-v).  
* **npm**: Included with Node.js (check with npm \-v).  
* **Git**: Installed (check with git \--version).  
* **Code Editor**: Recommended: VS Code.

**Installation**

1. **Clone or Navigate to Project**:  
   * If not already set up, clone from GitHub (after pushing, see below):

git clone https://github.com/yourusername/song-of-the-day.git

* cd song-of-the-day  
  * Or use the existing C:\\Users\\Ntokozo\\song-of-the-day directory.  
2. **Install Dependencies**:  
3. npm install  
4. **Run Locally**:  
5. npm run dev  
   * Open http://localhost:5173 in your browser.

---

**Deployment Instructions**

**Pushing to GitHub**

1. **Initialize Git** (if not done):  
2. git init  
3. **Add Files**:  
4. git add .  
5. **Commit**:  
6. git commit \-m "Initial commit: Song of the Day app"  
7. **Set Remote**:  
8. git remote add origin https://github.com/yourusername/song-of-the-day.git  
9. **Push**:  
10. git push \-u origin main  
    * Use master if your repo uses that branch.

**Deploying to Heroku**

1. **Install Heroku CLI**:  
   * Download from [heroku.com](https://devcenter.heroku.com/articles/heroku-cli) and run heroku \--version.  
2. **Log In**:  
3. heroku login  
4. **Create Heroku App**:  
5. heroku create song-of-the-day-app  
6. **Configure**:  
   * Create Procfile with:  
   * web: npm run build && npx serve \-s dist  
   * Update package.json scripts:  
   * json

"scripts": {  
  "dev": "vite",  
  "build": "vite build",  
  "start": "serve \-s dist",  
  "preview": "vite preview"

* }  
  * Install serve:  
  * npm install \--save-dev serve  
  * Add buildpacks:

heroku buildpacks:add heroku/nodejs

* heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static.git  
7. **Deploy**:

git add .  
git commit \-m "Add Heroku config"

8. git push heroku main  
9. **Scale and Open**:

heroku ps:scale web=1

10. heroku open

**Alternative: Deploying to Vercel**

1. **Install Vercel CLI**:  
2. npm install \-g vercel  
3. **Log In**:  
4. vercel login  
5. **Deploy**:  
6. vercel  
   * Follow prompts, use default settings.  
7. **Verify**:  
   * Visit the provided URL (e.g., https://song-of-the-day.vercel.app).

**Note**: Heroku may require a backend proxy for Deezer API calls due to CORS. Vercel handles this better with rewrites (see vercel.json example in prior response).  
---

**Known Issues and Limitations**

* **CORS**: The Deezer API proxy works in development but may fail in production without a backend server.  
* **Track Limit**: Limited to 25 tracks per request (1000 total with offset), not all songs by an artist.  
* **No Previews**: Audio/video previews are not implemented in the current version.

---

**Future Enhancements**

* **Audio Previews**: Add a play button using Deezer’s preview URL.  
* **Daily Lock**: Use localStorage to lock one song per day.  
* **Responsive Improvements**: Enhance mobile layout with media queries.  
* **Backend Proxy**: Implement a Node.js server to handle API requests in production.

---

**Contribution Guidelines**

* **Fork the Repository**: Create your own copy on GitHub.  
* **Create a Branch**: git checkout \-b feature-name.  
* **Commit Changes**: git commit \-m "Describe changes".  
* **Push and PR**: git push origin feature-name, then submit a pull request.

---

**License**

* **Default**: MIT License (add to LICENSE file if desired):

MIT License  
Copyright (c) 2025 Ntokozo

* Permission is hereby granted, free of charge, to any person obtaining a copy...

---

**Contact**

* **Author**: Ntokozo (via your preferred contact method).

---

**Version History**

* **v1.0 (October 21, 2025\)**: Initial release with random song fetch and Spotify-like UI.

