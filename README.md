# TikTok Consent-Aware Resharing — Prototype

A React prototype implementing consent-aware resharing features for TikTok (Repost, Duet, Stitch, and Per-Video Controls). Built as a dissertation artefact for evaluating how contextual consent cues affect user awareness during content resharing.

---

## Prerequisites

- Node.js 18+
- A Firebase project with **Authentication** (Google sign-in) and **Realtime Database** enabled

---

## Setup

### 1. Extract and install dependencies

Unzip the submitted archive, then from inside the project folder run:

```bash
npm install
```

### 2. Configure Firebase

Create a `.env` file in the project root with your Firebase project credentials:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
REACT_APP_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
```

> The app works without Firebase — users can tap **Continue as guest** to browse the prototype using mock data only. Firebase is only required for Google sign-in, live like counts, and repost persistence.

---

## Running the app

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000). The app renders as a phone shell (375×812px) centred on the page.

---

## Running the tests

```bash
npm test -- --watchAll=false
```

Runs all 114 tests offline. Firebase hooks are mocked so no `.env` file or network connection is required to run the test suite.

---

## Project structure

```
src/
├── data/
│   └── mockData.js              # Mock videos, contacts, and inbox items
├── hooks/
│   ├── useAuth.js               # Firebase Google authentication
│   ├── useInbox.js              # Realtime Database inbox notifications
│   ├── useLikes.js              # Live like counts (mock base + Firebase delta)
│   ├── useReposts.js            # Repost persistence in Firebase
│   └── useUserLikes.js          # Liked videos list from Firebase
├── components/
│   ├── feed/                    # FYP feed, video cards, reposted toast
│   ├── friends/                 # Friends feed
│   ├── inbox/                   # Inbox notifications page
│   ├── profile/                 # Profile page, video grid, privacy settings
│   ├── repost/                  # Repost sheet and info panel
│   ├── duet/                    # Duet setup screen and about panel
│   ├── stitch/                  # Stitch clip selector, record screen, about panel
│   ├── auth/                    # Login screen
│   └── layout/                  # Status bar, bottom navigation
├── firebase.js                  # Firebase initialisation
└── App.js                       # Global state and navigation
```

---

## Features

| Feature | Consent cue style | Screens |
|---|---|---|
| Repost | Amber strip in share sheet | Share sheet → Info panel |
| Duet | Blue info card above record button | Setup screen → About panel |
| Stitch | Amber warning card + clip selector cue | Clip selector → Record screen → About panel |
| Per-Video Controls | Purple pill on creator's own videos | Options sheet → Privacy settings → Confirmation |
