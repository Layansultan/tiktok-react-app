import { INBOX_ITEMS } from "../data/mockData";

/* Uses mock inbox data for the prototype — Firebase inbox not seeded */
export function useInbox(_user) {
  return { items: INBOX_ITEMS };
}
