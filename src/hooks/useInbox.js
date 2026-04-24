import { INBOX_ITEMS } from "../data/mockData";

export function useInbox(_user) {
  return { items: INBOX_ITEMS };
}
