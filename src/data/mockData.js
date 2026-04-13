/* ─── FYP (For You) videos ───────────────────────────────────── */
export const FYP_VIDEOS = [
  {
    id: 1,
    creator: { username: "tomharvey",   initials: "TH", gradient: "linear-gradient(135deg,#fe2c55,#ff9500)" },
    caption: "this took some work so please rate 🙏 #fyp #coding",
    sound: "Original sound · tomharvey",
    likes: "3.1M", comments: "45.4K", shares: "183.9K",
    background: "linear-gradient(160deg,#1a1a2e 0%,#16213e 40%,#0f3460 100%)",
    duetEnabled: true,  stitchEnabled: true,
  },
  {
    id: 2,
    creator: { username: "sarahcooks",  initials: "SC", gradient: "linear-gradient(135deg,#11998e,#38ef7d)" },
    caption: "5-minute pasta that actually slaps 🍝 #foodtok #recipe",
    sound: "Cooking Vibes · sarahcooks",
    likes: "892K", comments: "12.1K", shares: "44.2K",
    background: "linear-gradient(160deg,#0d3b2e 0%,#1a5e3a 50%,#2d8a56 100%)",
    duetEnabled: true,  stitchEnabled: false,
  },
  {
    id: 3,
    creator: { username: "devwithmike", initials: "DM", gradient: "linear-gradient(135deg,#667eea,#764ba2)" },
    caption: "CSS trick nobody talks about 🤯 #webdev #coding #learnontiktok",
    sound: "Lo-fi Beats · chillhop",
    likes: "2.4M", comments: "67.8K", shares: "312K",
    background: "linear-gradient(160deg,#1a1535 0%,#2c3e50 50%,#1a2a6c 100%)",
    duetEnabled: false, stitchEnabled: true,
  },
  {
    id: 4,
    creator: { username: "zeynep.art",  initials: "ZA", gradient: "linear-gradient(135deg,#f093fb,#f5576c)" },
    caption: "speed painting session — took 6 hrs 🎨✨ #art #digitalart",
    sound: "Dreamy Lofi · artvibes",
    likes: "567K", comments: "8.9K", shares: "21.3K",
    background: "linear-gradient(160deg,#2d0b3f 0%,#4a0e4e 50%,#81244e 100%)",
    duetEnabled: true,  stitchEnabled: true,
  },
  {
    id: 5,
    creator: { username: "fitnessjay",  initials: "FJ", gradient: "linear-gradient(135deg,#f7971e,#ffd200)" },
    caption: "morning routine that genuinely changed my life 💪 #fitness #wellness",
    sound: "Pump It Up · gymbeats",
    likes: "1.8M", comments: "29.4K", shares: "95.7K",
    background: "linear-gradient(160deg,#1a1200 0%,#3d2c00 50%,#5a4000 100%)",
    duetEnabled: true,  stitchEnabled: false,
  },
];

/* ─── Following feed (accounts you follow) ───────────────────── */
export const FOLLOWING_VIDEOS = [
  {
    id: 11,
    creator: { username: "sarahcooks",  initials: "SC", gradient: "linear-gradient(135deg,#11998e,#38ef7d)" },
    caption: "new series every Sunday 🍳 drop a request below!",
    sound: "Sunday Best · Surfaces",
    likes: "34.2K", comments: "1.4K", shares: "3.8K",
    background: "linear-gradient(160deg,#0a2e1e 0%,#163d28 50%,#1f5535 100%)",
    duetEnabled: true,  stitchEnabled: true,
  },
  {
    id: 12,
    creator: { username: "devwithmike", initials: "DM", gradient: "linear-gradient(135deg,#667eea,#764ba2)" },
    caption: "React vs Vue in 2025 — honest take 👀 #dev #webdev",
    sound: "Lo-fi Study · chillhop",
    likes: "88.4K", comments: "5.6K", shares: "14.2K",
    background: "linear-gradient(160deg,#0e0d1f 0%,#1a1040 50%,#251862 100%)",
    duetEnabled: false, stitchEnabled: true,
  },
  {
    id: 13,
    creator: { username: "zeynep.art",  initials: "ZA", gradient: "linear-gradient(135deg,#f093fb,#f5576c)" },
    caption: "redrew my first ever digital drawing 😭 glow up real 🎨",
    sound: "Snowfall · Øneheart",
    likes: "204K", comments: "7.1K", shares: "42.9K",
    background: "linear-gradient(160deg,#1f0535 0%,#360a52 50%,#52146b 100%)",
    duetEnabled: true,  stitchEnabled: true,
  },
];

/* ─── Friends feed (mutual follows) ─────────────────────────── */
export const FRIENDS_VIDEOS = [
  {
    id: 21,
    creator: { username: "mia.designs", initials: "MD", gradient: "linear-gradient(135deg,#f5576c,#f093fb)" },
    caption: "study session w me ☕📚 3 more days until finals 😭",
    sound: "Lofi Hip Hop · Chillout",
    likes: "2.8K", comments: "214", shares: "89",
    background: "linear-gradient(160deg,#1f1020 0%,#2e1535 50%,#3d1a45 100%)",
    duetEnabled: true,  stitchEnabled: true,
  },
  {
    id: 22,
    creator: { username: "james.runs",  initials: "JR", gradient: "linear-gradient(135deg,#11998e,#43c6ac)" },
    caption: "5am run in London 🌅 the city is different before everyone wakes up",
    sound: "Morning Run · spotify playlist",
    likes: "1.1K", comments: "73", shares: "41",
    background: "linear-gradient(160deg,#061a20 0%,#0a2e38 50%,#0f4050 100%)",
    duetEnabled: true,  stitchEnabled: false,
  },
  {
    id: 23,
    creator: { username: "priya.eats",  initials: "PE", gradient: "linear-gradient(135deg,#9b59b6,#c39bd3)" },
    caption: "rated every meal deal in London so you don't have to 🥪 Pret vs M&S",
    sound: "Original sound · priya.eats",
    likes: "9.4K", comments: "882", shares: "1.2K",
    background: "linear-gradient(160deg,#1a0a25 0%,#2d1040 50%,#3f1858 100%)",
    duetEnabled: false, stitchEnabled: true,
  },
  {
    id: 24,
    creator: { username: "alexk",       initials: "AK", gradient: "linear-gradient(135deg,#f7971e,#ffd200)" },
    caption: "built a chrome extension in a weekend 🛠️ here's how #coding #buildinpublic",
    sound: "Lo-fi Chill · study beats",
    likes: "4.7K", comments: "310", shares: "620",
    background: "linear-gradient(160deg,#1a1000 0%,#2e2000 50%,#443100 100%)",
    duetEnabled: true,  stitchEnabled: true,
  },
];

/* ─── Share sheet contacts ───────────────────────────────────── */
export const CONTACTS = [
  { id: 1, name: "Sarah K.",    type: "user",  initials: "SK", color: "#667eea" },
  { id: 2, name: "Study Group", type: "group" },
  { id: 3, name: "Mia",         type: "user",  initials: "M",  color: "#f5576c" },
  { id: 4, name: "James",       type: "user",  initials: "J",  color: "#11998e" },
  { id: 5, name: "Uni Crew",    type: "group" },
  { id: 6, name: "Alex",        type: "user",  initials: "A",  color: "#f7971e" },
  { id: 7, name: "Priya",       type: "user",  initials: "P",  color: "#9b59b6" },
];

/* ─── Inbox notifications ────────────────────────────────────── */
export const INBOX_ITEMS = [
  {
    id: 1, type: "follow",
    user: "devwithmike", initials: "DM", gradient: "linear-gradient(135deg,#667eea,#764ba2)",
    text: "started following you",
    time: "2m", read: false,
  },
  {
    id: 2, type: "like",
    user: "zeynep.art", initials: "ZA", gradient: "linear-gradient(135deg,#f093fb,#f5576c)",
    text: "liked your video",
    videoThumb: "linear-gradient(135deg,#1a1a2e,#0f3460)",
    time: "15m", read: false,
  },
  {
    id: 3, type: "comment",
    user: "fitnessjay", initials: "FJ", gradient: "linear-gradient(135deg,#f7971e,#ffd200)",
    text: "commented: \"this is so accurate omg 😭\"",
    videoThumb: "linear-gradient(135deg,#0e1a2e,#0f3460)",
    time: "1h", read: false,
  },
  {
    id: 4, type: "like",
    user: "sarahcooks", initials: "SC", gradient: "linear-gradient(135deg,#11998e,#38ef7d)",
    text: "and 847 others liked your video",
    videoThumb: "linear-gradient(135deg,#2e2e0e,#595914)",
    time: "3h", read: true,
  },
  {
    id: 5, type: "mention",
    user: "mia.designs", initials: "MD", gradient: "linear-gradient(135deg,#f5576c,#f093fb)",
    text: "mentioned you: \"@layan you'd love this\"",
    videoThumb: "linear-gradient(135deg,#1a0e2e,#3d1459)",
    time: "5h", read: true,
  },
  {
    id: 6, type: "duet",
    user: "james.runs", initials: "JR", gradient: "linear-gradient(135deg,#11998e,#43c6ac)",
    text: "dueted with your video",
    videoThumb: "linear-gradient(135deg,#2e1a0e,#603014)",
    time: "1d", read: true,
  },
  {
    id: 7, type: "follow",
    user: "alexk", initials: "AK", gradient: "linear-gradient(135deg,#f7971e,#ffd200)",
    text: "started following you",
    time: "2d", read: true,
  },
  {
    id: 8, type: "system",
    user: "TikTok", initials: "TT", gradient: "linear-gradient(135deg,#fe2c55,#000)",
    text: "Your video reached 1M views 🎉",
    time: "3d", read: true,
  },
];

/* ─── Profile videos (your own) ──────────────────────────────── */
export const PROFILE_VIDEOS = [
  { id: 1, thumb: "linear-gradient(135deg,#1a1a2e,#0f3460)", title: "Travel vlog pt.1",  views: "2.1M",  likes: "180K", comments: "4.2K" },
  { id: 2, thumb: "linear-gradient(135deg,#1a0e2e,#3d1459)", title: "Day in my life",    views: "890K",  likes: "72K",  comments: "1.8K" },
  { id: 3, thumb: "linear-gradient(135deg,#0e1a2e,#0f3460)", title: "Morning routine",   views: "450K",  likes: "38K",  comments: "920"  },
  { id: 4, thumb: "linear-gradient(135deg,#2e1a0e,#603014)", title: "Recipe ideas 🍜",   views: "1.3M",  likes: "114K", comments: "3.1K" },
  { id: 5, thumb: "linear-gradient(135deg,#0e2e1a,#145929)", title: "Study with me ☕",  views: "220K",  likes: "19K",  comments: "540"  },
  { id: 6, thumb: "linear-gradient(135deg,#2e2e0e,#595914)", title: "Room tour ✨",       views: "3.4M",  likes: "310K", comments: "8.7K" },
];
