import { useState, useEffect } from "react";
import { ref, set, remove, onValue } from "firebase/database";
import { db } from "../firebase";

function parseCount(val) {
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    const n = parseFloat(val);
    if (val.endsWith("M")) return Math.round(n * 1_000_000);
    if (val.endsWith("K")) return Math.round(n * 1_000);
    return Math.round(n);
  }
  return 0;
}

export function formatCount(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

export function useLikes(videoId, initialCount, user) {
  const base = parseCount(initialCount);
  const [liked, setLiked] = useState(false);
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    if (!user || !videoId) return;
    const likeRef = ref(db, `likes/${videoId}/${user.uid}`);
    const unsub = onValue(likeRef, (snap) => setLiked(snap.exists()));
    return () => unsub();
  }, [user, videoId]);

  useEffect(() => {
    if (!videoId) return;
    const videoLikesRef = ref(db, `likes/${videoId}`);
    const unsub = onValue(videoLikesRef, (snap) => {
      setDelta(snap.exists() ? Object.keys(snap.val()).length : 0);
    });
    return () => unsub();
  }, [videoId]);

  const toggle = async () => {
    if (!user) return;
    const likeRef = ref(db, `likes/${videoId}/${user.uid}`);
    const userLikeRef = ref(db, `userLikes/${user.uid}/${videoId}`);
    if (liked) {
      await remove(likeRef);
      await remove(userLikeRef);
    } else {
      await set(likeRef, { likedAt: Date.now() });
      await set(userLikeRef, { videoId, likedAt: Date.now() });
    }
  };

  return { liked, count: formatCount(base + delta), toggle };
}
