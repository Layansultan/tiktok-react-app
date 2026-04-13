import { C } from "../../constants";
import { Sheet, Handle } from "../common";

export default function AboutDuetsPanel({ onClose, creator }) {
  return (
    <Sheet height={320}>
      <Handle />
      <div style={{ padding: "0 16px 12px", textAlign: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>About Duets</span>
      </div>
      <div style={{ margin: "0 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "white", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
          👥 <span>Multi-party content</span>
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: 10 }}>
          A duet places your video side-by-side with{" "}
          <span style={{ color: "#7ba7f7", fontWeight: 600 }}>@{creator.username}'s</span> content in a new post. This post lives on your profile and may reach audiences who have never seen the original.
        </div>
        <div style={{ fontSize: 10, color: C.grey2, fontStyle: "italic", lineHeight: 1.5, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 8, marginBottom: 12 }}>
          @{creator.username} cannot remove your duet but can choose to restrict duets on their future videos via their privacy settings.
        </div>
        <div onClick={onClose} style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "white", fontSize: 12, fontWeight: 600, padding: "9px 0", cursor: "pointer", textAlign: "center" }}>
          Got it
        </div>
      </div>
    </Sheet>
  );
}
