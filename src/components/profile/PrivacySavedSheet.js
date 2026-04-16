import { C } from "../../constants";
import { Sheet, Handle, Divider, Btn } from "../common";

export default function PrivacySavedSheet({ settings, onDone, onChange }) {
  const audienceLabel = { everyone: "Everyone", friends: "Friends only", only_you: "Only you" }[settings.audience];
  return (
    <Sheet height={260}>
      <Handle />
      <Divider />
      <div style={{ padding: "20px 16px", textAlign: "center" }}>
        <div style={{ width: 48, height: 48, background: "rgba(37,211,102,0.15)", border: `1.5px solid ${C.green}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 22 }}>✓</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 6 }}>Preferences saved</div>
        <div style={{ fontSize: 11, color: "#aaa", lineHeight: 1.6, marginBottom: 16 }}>
          Audience: {audienceLabel}<br />
          Reposts: {settings.repost ? "On" : "Off"} · Duets: {settings.duet ? "On" : "Off"} · Stitches: {settings.stitch ? "On" : "Off"}<br />
          <span style={{ color: "#666", fontSize: 10 }}>These settings apply to this video only</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn small onClick={onChange}>Change settings</Btn>
          <Btn small primary onClick={onDone}>Done</Btn>
        </div>
      </div>
    </Sheet>
  );
}
