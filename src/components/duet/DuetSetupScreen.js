import { C } from "../../constants";
import StatusBar from "../layout/StatusBar";

export default function DuetSetupScreen({ onClose, onInfo, video }) {
  const { creator, background } = video;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 40, background: "#000", display: "flex", flexDirection: "column" }}>
      <StatusBar />

      {/* split view */}
      <div style={{ display: "flex", flex: 1, marginTop: 44 }}>
        {/* left — original video */}
        <div style={{ flex: 1, background, position: "relative" }}>
          <div style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.6)", borderRadius: 4, padding: "2px 6px", fontSize: 9, color: "white", fontWeight: 600 }}>@{creator.username}</div>
          <div style={{ position: "absolute", bottom: 8, left: 8, fontSize: 9, color: "rgba(255,255,255,0.45)" }}>Original creator</div>
        </div>
        {/* right — your camera */}
        <div style={{ flex: 1, background: "linear-gradient(160deg,#1c1c1c,#2a2a2a)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, position: "relative" }}>
          <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.6)", borderRadius: 4, padding: "2px 6px", fontSize: 9, color: "white", fontWeight: 600 }}>You</div>
          <span style={{ fontSize: 32, opacity: 0.25 }}>📷</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Your camera</span>
        </div>
      </div>

      {/* consent banner */}
      <div style={{ margin: "8px 12px", background: "rgba(45,91,227,0.2)", border: "1px solid rgba(45,91,227,0.4)", borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "flex-start", gap: 8 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "white", flexShrink: 0, fontWeight: 700, marginTop: 1 }}>i</div>
        <div style={{ flex: 1, fontSize: 11, color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>
          Your duet will appear alongside <strong style={{ color: "#7ba7f7" }}>@{creator.username}'s</strong> content and may reach audiences beyond the original post.
        </div>
        <div onClick={onInfo} style={{ width: 26, height: 26, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "white", cursor: "pointer", flexShrink: 0, fontWeight: 700, marginTop: 1 }}>!</div>
      </div>

      {/* record controls */}
      <div style={{ height: 72, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", gap: 24, position: "relative", flexShrink: 0 }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🔀</div>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.red, border: "3px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>⏺</div>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🎵</div>
        <div onClick={onClose} style={{ position: "absolute", right: 16, fontSize: 11, color: C.grey, cursor: "pointer" }}>✕ Cancel</div>
      </div>
    </div>
  );
}
