import { C } from "../../constants";
import { Sheet, Handle } from "../common";

export default function RepostInfoPanel({ onClose }) {
  return (
    <Sheet height={300}>
      <Handle />
      <div style={{ padding: "0 16px 6px", textAlign: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>About Reposting</span>
      </div>
      <div style={{ margin: "10px 16px 0", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "white", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
          📣 <span>Audience reach</span>
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: 10 }}>
          When you repost, this video is shared with your followers and may appear on other users' For You pages — expanding its reach beyond the original creator's audience.
        </div>
        <div style={{ fontSize: 10, color: C.grey2, fontStyle: "italic", lineHeight: 1.5, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 8, marginBottom: 12 }}>
          This means people who have never followed the original creator may see this content. The original creator will be notified of your repost.
        </div>
        <div onClick={onClose} style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "white", fontSize: 12, fontWeight: 600, padding: "9px 0", cursor: "pointer", textAlign: "center" }}>
          Got it
        </div>
      </div>
    </Sheet>
  );
}
