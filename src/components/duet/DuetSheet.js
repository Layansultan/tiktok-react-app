import { C } from "../../constants";
import { Sheet, Handle, Divider, Btn } from "../common";

export default function DuetSheet({ onClose, onProceed, creator }) {
  return (
    <Sheet height={320}>
      <Handle />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px 10px" }}>
        <span style={{ fontSize: 15, color: "white" }}>🔍</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Send to</span>
        <span onClick={onClose} style={{ fontSize: 15, color: "white", cursor: "pointer" }}>✕</span>
      </div>
      <Divider />

      {/* ── MEDIUM CONSENT CUE */}
      <div style={{ margin: "10px 16px 6px", background: "rgba(45,91,227,0.12)", border: "1px solid rgba(45,91,227,0.25)", borderRadius: 8, padding: "8px 10px", display: "flex", alignItems: "flex-start", gap: 7 }}>
        <div style={{ width: 16, height: 16, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "white", flexShrink: 0, marginTop: 1 }}>i</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>
          <strong style={{ color: "#7ba7f7" }}>@{creator.username} has enabled Duets.</strong> Your side-by-side video will credit the original and appear on both profiles.
        </div>
      </div>

      {/* duet action row */}
      <div style={{ margin: "10px 16px 0", background: C.surf2, borderRadius: 10, padding: "10px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(45,91,227,0.2)", border: `1px solid ${C.blue}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👥</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "white" }}>Duet with @{creator.username}</div>
            <div style={{ fontSize: 9.5, color: C.grey }}>Side-by-side · original video plays alongside yours</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn small onClick={onClose}>Cancel</Btn>
          <Btn small primary onClick={onProceed}>Start Duet →</Btn>
        </div>
      </div>
    </Sheet>
  );
}
