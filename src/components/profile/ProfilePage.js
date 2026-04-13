import { C } from "../../constants";
import { PROFILE_VIDEOS } from "../../data/mockData";

export default function ProfilePage({ onOpenVideo }) {
  return (
    <div style={{ position: "absolute", top: 0, bottom: 64, left: 0, right: 0, overflowY: "auto", background: "#111" }}>
      {/* profile header */}
      <div style={{ padding: "44px 16px 16px", textAlign: "center", background: "linear-gradient(to bottom, #1a1a1a, #111)" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#fe2c55,#ff9500)", margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, color: "white" }}>L</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 2 }}>@layan</div>
        <div style={{ fontSize: 11, color: C.grey, marginBottom: 12 }}>KCL student · HCI researcher</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 14 }}>
          {[["124","Following"],["8.4K","Followers"],["42.1K","Likes"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "white" }}>{n}</div>
              <div style={{ fontSize: 10, color: C.grey }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <div style={{ padding: "7px 20px", background: C.red, borderRadius: 6, fontSize: 12, fontWeight: 600, color: "white", cursor: "pointer" }}>Edit profile</div>
          <div style={{ padding: "7px 12px", background: C.surf2, borderRadius: 6, fontSize: 12, color: "white", cursor: "pointer" }}>↗</div>
        </div>
      </div>

      {/* tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #222" }}>
        <div style={{ flex: 1, textAlign: "center", padding: "10px 0", fontSize: 12, color: "white", fontWeight: 600, borderBottom: `2px solid ${C.white}` }}>⊞ Videos</div>
        <div style={{ flex: 1, textAlign: "center", padding: "10px 0", fontSize: 12, color: C.grey }}>🔒 Private</div>
        <div style={{ flex: 1, textAlign: "center", padding: "10px 0", fontSize: 12, color: C.grey }}>♥ Liked</div>
      </div>

      {/* video grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
        {PROFILE_VIDEOS.map(v => (
          <div key={v.id} onClick={() => onOpenVideo(v)}
            style={{ position: "relative", aspectRatio: "9/16", background: v.thumb, cursor: "pointer" }}>
            <div style={{ position: "absolute", bottom: 4, left: 4, fontSize: 9, color: "white", fontWeight: 600, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>▶ {v.views}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
