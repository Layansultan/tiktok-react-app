import { useState } from "react";
import { C } from "../../constants";

/* Each video occupies the full visible area (phone 812 - nav 64) */
const SLIDE_H = 748;

function VideoSlide({ video, onShare }) {
  const { creator, caption, sound, likes, comments, shares, background } = video;
  return (
    <div style={{
      height: SLIDE_H, position: "relative", background,
      flexShrink: 0, scrollSnapAlign: "start", scrollSnapStop: "always",
      overflow: "hidden",
    }}>
      {/* gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 28%, transparent 52%, rgba(0,0,0,0.82) 100%)" }} />

      {/* right action bar */}
      <div style={{ position: "absolute", right: 10, bottom: 90, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, zIndex: 10 }}>
        {/* avatar */}
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: creator.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white", border: "2px solid white", flexShrink: 0 }}>
          {creator.initials}
        </div>
        {/* likes */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19 }}>♥</div>
          <span style={{ fontSize: 9, color: "white", fontWeight: 600 }}>{likes}</span>
        </div>
        {/* comments */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>💬</div>
          <span style={{ fontSize: 9, color: "white", fontWeight: 600 }}>{comments}</span>
        </div>
        {/* share */}
        <div onClick={(e) => { e.stopPropagation(); onShare(video); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>↗</div>
          <span style={{ fontSize: 9, color: "white", fontWeight: 600 }}>{shares}</span>
        </div>
      </div>

      {/* creator info */}
      <div style={{ position: "absolute", bottom: 22, left: 14, right: 60, zIndex: 10, pointerEvents: "none" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "white", marginBottom: 4 }}>@{creator.username}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.88)", lineHeight: 1.45, marginBottom: 6 }}>{caption}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 11 }}>♪</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.72)" }}>{sound}</span>
        </div>
      </div>
    </div>
  );
}

export default function FYPFeed({ videos, followingVideos, onShare }) {
  const [tab, setTab] = useState("foryou");
  const activeVideos = tab === "foryou" ? videos : followingVideos;

  return (
    <>
      {/* Scrollable feed */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 64,
        overflowY: "scroll", scrollSnapType: "y mandatory",
        WebkitOverflowScrolling: "touch",
      }}>
        {activeVideos.map(video => (
          <VideoSlide key={`${tab}-${video.id}`} video={video} onShare={onShare} />
        ))}
      </div>

      {/* Fixed top nav — sits above the scroll container */}
      <div style={{
        position: "absolute", top: 28, left: 0, right: 0,
        display: "flex", justifyContent: "center", gap: 18, zIndex: 20,
        pointerEvents: "none",
      }}>
        <span
          onClick={() => setTab("following")}
          style={{
            fontSize: 13, fontWeight: tab === "following" ? 700 : 500, cursor: "pointer",
            color: tab === "following" ? "white" : "rgba(255,255,255,0.52)",
            borderBottom: tab === "following" ? "2px solid white" : "none",
            paddingBottom: 2, pointerEvents: "auto",
          }}
        >Following</span>
        <span
          onClick={() => setTab("foryou")}
          style={{
            fontSize: 13, fontWeight: tab === "foryou" ? 700 : 500, cursor: "pointer",
            color: tab === "foryou" ? "white" : "rgba(255,255,255,0.52)",
            borderBottom: tab === "foryou" ? "2px solid white" : "none",
            paddingBottom: 2, pointerEvents: "auto",
          }}
        >For you</span>
        <span style={{ position: "absolute", right: 14, fontSize: 15, color: "white", pointerEvents: "auto" }}>🔍</span>
      </div>
    </>
  );
}
