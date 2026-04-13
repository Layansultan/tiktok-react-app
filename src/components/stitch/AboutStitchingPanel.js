import { C } from "../../constants";
import { Sheet, Handle } from "../common";

export default function AboutStitchingPanel({ onClose, creator }) {
  return (
    <Sheet height={330}>
      <Handle />
      <div style={{ padding: "0 16px 12px", textAlign: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>About Stitching</span>
      </div>
      <div style={{ margin: "0 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "white", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
          ✂ <span>Embedding another's content</span>
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: 10 }}>
          Stitching clips part of <span style={{ color: C.teal, fontWeight: 600 }}>@{creator.username}'s</span> video into your own new post. Their content will appear in a potentially different context and may reach audiences who never saw the original.
        </div>
        <div style={{ fontSize: 10, color: C.grey2, fontStyle: "italic", lineHeight: 1.5, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 8, marginBottom: 12 }}>
          Consider whether your new framing reflects the intent of the original video. @{creator.username} will be credited automatically and will receive a notification.
        </div>
        <div onClick={onClose} style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "white", fontSize: 12, fontWeight: 600, padding: "9px 0", cursor: "pointer", textAlign: "center" }}>
          Got it
        </div>
      </div>
    </Sheet>
  );
}
