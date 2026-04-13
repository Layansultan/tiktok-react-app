import { C } from "../../constants";
import { Sheet, Handle, Divider, Btn } from "../common";

export default function StitchSheet({ onClose, onProceed, creator }) {
  return (
    <Sheet height={350}>
      <Handle />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px 10px" }}>
        <span style={{ fontSize: 15, color: "white" }}>🔍</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Send to</span>
        <span onClick={onClose} style={{ fontSize: 15, color: "white", cursor: "pointer" }}>✕</span>
      </div>
      <Divider />

      {/* ── STRONG CONSENT CUE */}
      <div style={{ margin: "10px 16px 8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, padding: "10px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: C.amber, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "black", fontWeight: 700 }}>!</div>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: "white" }}>Before you stitch</span>
        </div>
        <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
          A Stitch clips up to <strong style={{ color: "white" }}>5 seconds</strong> of @{creator.username}'s video into your new post. The original clip and creator are credited.{" "}
          <span style={{ color: C.teal, fontWeight: 600 }}>@{creator.username} has enabled stitches.</span>
        </div>
      </div>

      {/* stitch action */}
      <div style={{ margin: "0 16px", background: C.surf2, borderRadius: 10, padding: "10px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(254,44,85,0.2)", border: `1px solid ${C.red}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✂</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "white" }}>Stitch @{creator.username}'s video</div>
            <div style={{ fontSize: 9.5, color: C.grey }}>Choose up to 5 s · clip embeds in your new post</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn small onClick={onClose}>Cancel</Btn>
          <Btn small primary onClick={onProceed}>Choose Clip →</Btn>
        </div>
      </div>
    </Sheet>
  );
}
