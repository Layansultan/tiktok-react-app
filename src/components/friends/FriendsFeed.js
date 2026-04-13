import { C } from "../../constants";

const SLIDE_H = 748;

function FriendVideoSlide({ video, onShare }) {
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

      {/* creator info + Friends badge */}
      <div style={{ position: "absolute", bottom: 22, left: 14, right: 60, zIndex: 10, pointerEvents: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>@{creator.username}</span>
          {/* Friends badge — same as real TikTok */}
          <div style={{
            display: "flex", alignItems: "center", gap: 3,
            background: "rgba(255,255,255,0.18)", borderRadius: 20,
            padding: "2px 7px", border: "1px solid rgba(255,255,255,0.25)",
          }}>
            <span style={{ fontSize: 9 }}>👥</span>
            <span style={{ fontSize: 9, color: "white", fontWeight: 600 }}>Friends</span>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.88)", lineHeight: 1.45, marginBottom: 6 }}>{caption}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 11 }}>♪</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.72)" }}>{sound}</span>
        </div>
      </div>
    </div>
  );
}

export default function FriendsFeed({ videos, onShare }) {
  return (
    <>
      {/* Scrollable feed */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 64,
        overflowY: "scroll", scrollSnapType: "y mandatory",
        WebkitOverflowScrolling: "touch",
      }}>
        {videos.map(video => (
          <FriendVideoSlide key={video.id} video={video} onShare={onShare} />
        ))}
      </div>

      {/* Fixed top nav */}
      <div style={{
        position: "absolute", top: 28, left: 0, right: 0,
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 20, pointerEvents: "none",
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "white", borderBottom: "2px solid white", paddingBottom: 2 }}>Friends</span>
        <span style={{ position: "absolute", right: 14, fontSize: 15, color: "white", pointerEvents: "auto" }}>🔍</span>
      </div>
    </>
  );
}
