import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { FYP_VIDEOS, FOLLOWING_VIDEOS, FRIENDS_VIDEOS } from "../data/mockData";

/* All videos across all feeds, keyed by id, for lookup */
const ALL_VIDEOS = [...FYP_VIDEOS, ...FOLLOWING_VIDEOS, ...FRIENDS_VIDEOS]
  .reduce((acc, v) => { acc[v.id] = v; return acc; }, {});

export function useUserLikes(user) {
  const [likedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    if (!user) { setLikedVideos([]); return; }

    const userLikesRef = ref(db, `userLikes/${user.uid}`);
    const unsub = onValue(userLikesRef, (snap) => {
      if (!snap.exists()) { setLikedVideos([]); return; }
      const entries = Object.values(snap.val());
      entries.sort((a, b) => (b.likedAt || 0) - (a.likedAt || 0));
      // map back to full video objects
      const videos = entries
        .map(e => ALL_VIDEOS[e.videoId])
        .filter(Boolean);
      setLikedVideos(videos);
    });
    return () => unsub();
  }, [user]);

  return likedVideos;
}
