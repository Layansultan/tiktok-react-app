import { useState } from "react";
import { C } from "../../constants";
import StatusBar from "../layout/StatusBar";

export default function StitchRecordScreen({ onClose, onInfo, creator }) {
  const [duration, setDuration] = useState("15s");
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 40, background: "#000", display: "flex", flexDirection: "column" }}>
      <StatusBar />

      {/* top bar */}
      <div style={{ marginTop: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px 0", flexShrink: 0 }}>
        <div onClick={onClose} style={{ fontSize: 22, color: "white", cursor: "pointer", fontWeight: 300 }}>✕</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
          {["↻","⚡","—","⏱","✦","❀","①"].map((icon, i) => (
            <div key={i} style={{ fontSize: i === 6 ? 11 : 18, color: "white", opacity: 0.85, cursor: "pointer", lineHeight: 1 }}>{icon}</div>
          ))}
        </div>
      </div>

      {/* camera view */}
      <div style={{ flex: 1, background: "#050505" }} />

      {/* duration selector */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20, padding: "10px 0 4px", flexShrink: 0 }}>
        {["10m","60s","15s"].map(d => (
          <div key={d} onClick={() => setDuration(d)} style={{
            padding: "5px 12px", borderRadius: 20, cursor: "pointer",
            background: duration === d ? "white" : "transparent",
            color: duration === d ? "black" : "rgba(255,255,255,0.5)",
            fontSize: 13, fontWeight: duration === d ? 700 : 400,
          }}>{d}</div>
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: 16, fontWeight: 700, color: "white", marginBottom: 6, flexShrink: 0 }}>00:05</div>

      {/* consent banner */}
      <div style={{ margin: "0 12px 8px", background: "rgba(255,255,255,0.06)", border: `1px solid ${C.amber}55`, borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "flex-start", gap: 8, flexShrink: 0 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.amber, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "black", flexShrink: 0, fontWeight: 700, marginTop: 1 }}>!</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "white", marginBottom: 2 }}>You are stitching @{creator.username}'s content</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>
            This clip may reach a <strong style={{ color: C.teal }}>different audience and context</strong> than the original.
          </div>
        </div>
        <div onClick={onInfo} style={{ width: 26, height: 26, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "white", cursor: "pointer", flexShrink: 0, fontWeight: 700, marginTop: 1 }}>!</div>
      </div>

      {/* record row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, padding: "4px 16px 10px", flexShrink: 0, position: "relative" }}>
        <div style={{ width: 48, height: 48, borderRadius: 8, background: "linear-gradient(135deg,#2a1a2e,#3d1459)", flexShrink: 0 }} />
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.red }} />
        </div>
        <div style={{ width: 48 }} />
      </div>

      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: "white", paddingBottom: 16, flexShrink: 0, letterSpacing: 1 }}>POST</div>
    </div>
  );
}
