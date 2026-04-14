import { useState, useEffect } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "../firebase";
import { INBOX_ITEMS } from "../data/mockData";

/* Live inbox for a signed-in user; falls back to mock data when logged out */
export function useInbox(user) {
  const [items, setItems] = useState(INBOX_ITEMS);

  useEffect(() => {
    if (!user) {
      setItems(INBOX_ITEMS);
      return;
    }

    const inboxRef = ref(db, `inbox/${user.uid}`);
    const unsub = onValue(inboxRef, (snap) => {
      if (!snap.exists()) {
        setItems(INBOX_ITEMS);
        return;
      }
      const data = snap.val();
      const list = Object.entries(data).map(([id, val]) => ({ id, ...val }));
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setItems(list);
    });

    return () => unsub();
  }, [user]);

  const markAllRead = async () => {
    if (!user) return;
    const updates = {};
    items.filter(i => !i.read).forEach(i => {
      updates[`inbox/${user.uid}/${i.id}/read`] = true;
    });
    if (Object.keys(updates).length > 0) await update(ref(db), updates);
  };

  return { items, markAllRead };
}
