
export default function VideoFullScreen({ video, onBack, onOptions }) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 40, background: "#000" }}>
      {/* gradient background */}
      <div style={{ position: "absolute", inset: 0, background: video.thumb || video.background }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 25%, transparent 55%, rgba(0,0,0,0.75) 100%)" }} />

      {/* top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", padding: "10px 14px 0", justifyContent: "space-between" }}>
        <div onClick={onBack} style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, color: "white" }}>‹</div>
        <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Your video</span>
        <div style={{ width: 34 }} />
      </div>

      {/* right action bar */}
      <div style={{ position: "absolute", right: 10, bottom: 120, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, zIndex: 50 }}>
        {/* avatar */}
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: video.creator?.gradient || "linear-gradient(135deg,#fe2c55,#ff9500)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white" }}>{video.creator?.initials || "L"}</div>

        {/* like */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>♥</div>
          <span style={{ fontSize: 9, color: "white", fontWeight: 600 }}>{video.likes}</span>
        </div>

        {/* comment */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💬</div>
          <span style={{ fontSize: 9, color: "white", fontWeight: 600 }}>{video.comments}</span>
        </div>

        {/* bookmark */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🔖</div>
          <span style={{ fontSize: 9, color: "white", fontWeight: 600 }}>0</span>
        </div>

        {/* share */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>↗</div>
          <span style={{ fontSize: 9, color: "white", fontWeight: 600 }}>Share</span>
        </div>

        {/* ··· three dots */}
        <div onClick={onOptions} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "white" }}>•••</div>
        </div>
      </div>

      {/* bottom info bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 14px 14px", background: "linear-gradient(transparent, rgba(0,0,0,0.7))", zIndex: 50 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "white", marginBottom: 3 }}>@{video.creator?.username || "layan"}</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", marginBottom: 8 }}>{video.title || video.caption}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.1)", borderRadius: 20, padding: "6px 14px" }}>
          <span style={{ fontSize: 11, color: "white" }}>▶ {video.views || video.likes} views</span>
          <span style={{ fontSize: 11, color: "white", fontWeight: 600 }}>📊 More insights</span>
        </div>
      </div>
    </div>
  );
}
