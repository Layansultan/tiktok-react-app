export default function StatusBar() {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, zIndex: 20,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "10px 16px 4px", pointerEvents: "none",
    }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: "white" }}>9:41</span>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <span style={{ fontSize: 9, color: "white" }}>●●●</span>
        <span style={{ fontSize: 9, color: "white" }}>WiFi</span>
        <span style={{ fontSize: 9, color: "white" }}>🔋</span>
      </div>
    </div>
  );
}
