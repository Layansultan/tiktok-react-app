import { useState, useEffect } from "react";
import { ref, set, remove, onValue } from "firebase/database";
import { db } from "../firebase";

export function useReposts(user) {
  const [reposts, setReposts] = useState([]); // array of video objects

  useEffect(() => {
    if (!user) { setReposts([]); return; }

    const repostsRef = ref(db, `reposts/${user.uid}`);
    const unsub = onValue(repostsRef, (snap) => {
      if (!snap.exists()) { setReposts([]); return; }
      const list = Object.values(snap.val());
      list.sort((a, b) => (b.repostedAt || 0) - (a.repostedAt || 0));
      setReposts(list);
    });
    return () => unsub();
  }, [user]);

  const addRepost = async (video) => {
    if (!user) return;
    await set(ref(db, `reposts/${user.uid}/${video.id}`), {
      ...video,
      repostedAt: Date.now(),
    });
  };

  const removeRepost = async (videoId) => {
    if (!user) return;
    await remove(ref(db, `reposts/${user.uid}/${videoId}`));
  };

  const hasReposted = (videoId) => reposts.some(r => String(r.id) === String(videoId));

  return { reposts, addRepost, removeRepost, hasReposted };
}
