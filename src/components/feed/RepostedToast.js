import { C } from "../../constants";

export default function RepostedToast({ onDone }) {
  return (
    <div style={{
      position: "absolute", bottom: 90, left: "50%", transform: "translateX(-50%)",
      background: "rgba(30,30,30,0.96)", border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 12, padding: "12px 20px", zIndex: 60, display: "flex",
      alignItems: "center", gap: 10, whiteSpace: "nowrap",
      animation: "slideUp .25s cubic-bezier(.32,.72,0,1)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
    }}>
      <span style={{ fontSize: 18 }}>🔁</span>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "white" }}>Reposted!</div>
        <div style={{ fontSize: 10, color: C.grey }}>Added to your followers' feeds</div>
      </div>
      <div onClick={onDone} style={{ marginLeft: 8, fontSize: 13, color: C.grey, cursor: "pointer" }}>✕</div>
    </div>
  );
}
