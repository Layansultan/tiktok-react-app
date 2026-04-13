import { C } from "../../constants";
import { Sheet, Handle, Divider } from "../common";

export default function VideoOptionsSheet({ video, onPrivacy, onClose }) {
  return (
    <Sheet height={340}>
      <Handle />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px 12px" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Video options</span>
        <span onClick={onClose} style={{ fontSize: 15, color: "white", cursor: "pointer" }}>✕</span>
      </div>
      <Divider />

      {/* options row */}
      <div style={{ display: "flex", overflowX: "auto", padding: "12px 10px", gap: 4, scrollbarWidth: "none" }}>
        {[["📊","Analytics"],["🔗","Copy link"],["✏️","Edit"],["📋","Captions"]].map(([icon, label]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 56 }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.surf2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{icon}</div>
            <span style={{ fontSize: 8, color: C.grey }}>{label}</span>
          </div>
        ))}
        {/* ★ Privacy — highlighted */}
        <div onClick={onPrivacy} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 56, position: "relative", cursor: "pointer" }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.surf2, border: "1.5px solid #c39bd3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, boxShadow: "0 0 8px rgba(155,89,182,0.5)" }}>🔒</div>
          <span style={{ fontSize: 8, color: "#c39bd3", fontWeight: 700 }}>Privacy</span>
          <div style={{ position: "absolute", top: -2, right: 6, width: 7, height: 7, background: C.purple, borderRadius: "50%", border: "1px solid #1e1e1e" }} />
        </div>
        {[["🖼","Live Photo"],["🎞","Share as GIF"],["🗑","Delete"]].map(([icon, label]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 56 }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.surf2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{icon}</div>
            <span style={{ fontSize: 8, color: C.grey }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: "10px 16px" }}>
        <div style={{ background: "rgba(155,89,182,0.1)", border: "1px solid rgba(155,89,182,0.25)", borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#c39bd3", marginBottom: 4 }}>🔒 Manage who can interact with this video</div>
          <div style={{ fontSize: 9, color: C.grey, lineHeight: 1.5 }}>Tap <strong style={{ color: "#c39bd3" }}>Privacy</strong> above to control audience, Duet, and Stitch settings per-video.</div>
        </div>
      </div>
    </Sheet>
  );
}
