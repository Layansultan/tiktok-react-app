import { useState } from "react";
import { C } from "../../constants";
import { PROFILE_VIDEOS } from "../../data/mockData";

export default function ProfilePage({ onOpenVideo, user, onSignIn, onSignOut, reposts = [], likedVideos = [] }) {
  const [tab, setTab] = useState("videos");
  const username = user ? `@${user.displayName?.split(" ")[0].toLowerCase() || "user"}` : "@layan";
  const avatarLetter = (user?.displayName || "L")[0].toUpperCase();
  const avatarSrc = user?.photoURL;

  const tabs = [
    { key: "videos",  label: "⊞ Videos" },
    { key: "reposts", label: "🔁 Reposts" },
    { key: "liked",   label: "♥ Liked" },
  ];

  return (
    <div style={{ position: "absolute", top: 0, bottom: 64, left: 0, right: 0, overflowY: "auto", background: "#111" }}>
      {/* profile header */}
      <div style={{ padding: "44px 16px 16px", textAlign: "center", background: "linear-gradient(to bottom, #1a1a1a, #111)" }}>
        {avatarSrc
          ? <img src={avatarSrc} alt="avatar" style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 10px", display: "block", objectFit: "cover" }} />
          : <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#fe2c55,#ff9500)", margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, color: "white" }}>{avatarLetter}</div>
        }
        <div style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 2 }}>{username}</div>
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
          {user
            ? <div onClick={onSignOut} style={{ padding: "7px 12px", background: "#222", borderRadius: 6, fontSize: 12, color: C.grey, cursor: "pointer" }}>Sign out</div>
            : <div onClick={onSignIn} style={{ padding: "7px 14px", background: "#222", borderRadius: 6, fontSize: 12, color: "white", cursor: "pointer" }}>Sign in</div>
          }
        </div>
      </div>

      {/* tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #222", position: "sticky", top: 0, background: "#111", zIndex: 5 }}>
        {tabs.map(t => (
          <div key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, textAlign: "center", padding: "10px 0",
            fontSize: 12, cursor: "pointer",
            color: tab === t.key ? "white" : C.grey,
            fontWeight: tab === t.key ? 600 : 400,
            borderBottom: tab === t.key ? `2px solid white` : "2px solid transparent",
          }}>{t.label}</div>
        ))}
      </div>

      {/* Videos tab */}
      {tab === "videos" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
          {PROFILE_VIDEOS.map(v => (
            <div key={v.id} onClick={() => onOpenVideo(v)}
              style={{ position: "relative", aspectRatio: "9/16", background: v.thumb, cursor: "pointer" }}>
              <div style={{ position: "absolute", bottom: 4, left: 4, fontSize: 9, color: "white", fontWeight: 600, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>▶ {v.views}</div>
            </div>
          ))}
        </div>
      )}

      {/* Reposts tab */}
      {tab === "reposts" && (
        reposts.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 32px", gap: 12 }}>
            <div style={{ fontSize: 36 }}>🔁</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>No reposts yet</div>
            <div style={{ fontSize: 11, color: C.grey, textAlign: "center", lineHeight: 1.6 }}>
              Videos you repost will appear here.{"\n"}The original creator is always credited.
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
            {reposts.map(v => (
              <div key={v.id} onClick={() => onOpenVideo(v)}
                style={{ position: "relative", aspectRatio: "9/16", background: v.background || v.thumb, cursor: "pointer", overflow: "hidden" }}>
                {/* repost badge */}
                <div style={{
                  position: "absolute", top: 4, left: 4,
                  background: "rgba(0,0,0,0.6)", borderRadius: 4,
                  padding: "2px 5px", display: "flex", alignItems: "center", gap: 3,
                }}>
                  <span style={{ fontSize: 8 }}>🔁</span>
                  <span style={{ fontSize: 8, color: "white", fontWeight: 600 }}>@{v.creator?.username}</span>
                </div>
                <div style={{ position: "absolute", bottom: 4, left: 4, fontSize: 9, color: "white", fontWeight: 600, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>▶ {v.likes}</div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Liked tab */}
      {tab === "liked" && (
        likedVideos.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 32px", gap: 12 }}>
            <div style={{ fontSize: 36 }}>♥</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>No liked videos yet</div>
            <div style={{ fontSize: 11, color: C.grey, textAlign: "center", lineHeight: 1.6 }}>
              Videos you like will appear here. Only you can see this.
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
            {likedVideos.map(v => (
              <div key={v.id} onClick={() => onOpenVideo(v)}
                style={{ position: "relative", aspectRatio: "9/16", background: v.background, cursor: "pointer", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 4, left: 4, background: "rgba(0,0,0,0.6)", borderRadius: 4, padding: "2px 5px", display: "flex", alignItems: "center", gap: 3 }}>
                  <span style={{ fontSize: 8, color: "#fe2c55" }}>♥</span>
                  <span style={{ fontSize: 8, color: "white", fontWeight: 600 }}>@{v.creator?.username}</span>
                </div>
                <div style={{ position: "absolute", bottom: 4, left: 4, fontSize: 9, color: "white", fontWeight: 600, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>▶ {v.likes}</div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
