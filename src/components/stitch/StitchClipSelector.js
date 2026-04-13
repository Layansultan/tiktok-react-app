import { useState } from "react";
import StatusBar from "../layout/StatusBar";
import { C } from "../../constants";

export default function StitchClipSelector({ onClose, onNext, video }) {
  const [selected, setSelected] = useState(5);
  const frames = [1,2,3,4,5,6,7,8,9,10];
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 40, background: "#000", display: "flex", flexDirection: "column" }}>
      <StatusBar />

      {/* top bar */}
      <div style={{ marginTop: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", flexShrink: 0 }}>
        <div onClick={onClose} style={{ fontSize: 22, color: "white", cursor: "pointer", fontWeight: 300 }}>✕</div>
        <div onClick={onNext} style={{ background: C.red, borderRadius: 8, padding: "8px 20px", fontSize: 14, fontWeight: 700, color: "white", cursor: "pointer" }}>Next</div>
      </div>

      {/* video preview area */}
      <div style={{ flex: 1, background: video.background, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>@{video.creator.username}'s video</div>
      </div>

      {/* consent banner */}
      <div style={{ margin: "0 12px 6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, padding: "8px 12px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "black", fontWeight: 700 }}>!</div>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: "white" }}>Before you stitch</span>
        </div>
        <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
          A Stitch clips up to <strong style={{ color: "white" }}>5 seconds</strong> from this post into your new video. The original creator is credited.
        </div>
      </div>

      {/* filmstrip scrubber */}
      <div style={{ background: "#111", padding: "12px 0 8px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "0 8px", gap: 2, overflowX: "auto", scrollbarWidth: "none" }}>
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>‹</span>
          <div style={{ flex: 1, display: "flex", gap: 2, position: "relative" }}>
            {frames.map(f => (
              <div key={f} data-testid={`frame-${f}`} onClick={() => setSelected(f)} style={{
                flex: 1, height: 52, borderRadius: 3, flexShrink: 0,
                background: `linear-gradient(135deg, hsl(${f*20},40%,15%), hsl(${f*20+40},50%,25%))`,
                border: f <= selected ? `2px solid white` : "2px solid transparent",
                cursor: "pointer", position: "relative", overflow: "hidden",
              }}>
                {f === selected && (
                  <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 2, background: "white" }} />
                )}
              </div>
            ))}
            <div style={{
              position: "absolute", top: -2, left: 0,
              width: `${(selected / frames.length) * 100}%`,
              bottom: -2, border: "2.5px solid white", borderRadius: 4,
              pointerEvents: "none",
            }} />
          </div>
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>›</span>
        </div>
        <div style={{ fontSize: 12, color: "white", fontWeight: 600, padding: "6px 16px 2px" }}>{selected}.0s selected</div>
      </div>
    </div>
  );
}
