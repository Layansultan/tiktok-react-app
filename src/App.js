import { useState } from "react";
import { FYP_VIDEOS, FOLLOWING_VIDEOS, FRIENDS_VIDEOS } from "./data/mockData";

import { useAuth } from "./hooks/useAuth";
import { useInbox } from "./hooks/useInbox";
import { useReposts } from "./hooks/useReposts";
import { useUserLikes } from "./hooks/useUserLikes";
import LoginScreen from "./components/auth/LoginScreen";

import StatusBar from "./components/layout/StatusBar";
import BottomNav from "./components/layout/BottomNav";

import FYPFeed from "./components/feed/FYPFeed";
import RepostedToast from "./components/feed/RepostedToast";
import FriendsFeed from "./components/friends/FriendsFeed";
import InboxPage from "./components/inbox/InboxPage";

import MainShareSheet from "./components/MainShareSheet";
import RepostSheet from "./components/repost/RepostSheet";
import RepostInfoPanel from "./components/repost/RepostInfoPanel";

import DuetSetupScreen from "./components/duet/DuetSetupScreen";
import AboutDuetsPanel from "./components/duet/AboutDuetsPanel";

import StitchClipSelector from "./components/stitch/StitchClipSelector";
import StitchRecordScreen from "./components/stitch/StitchRecordScreen";
import AboutStitchingPanel from "./components/stitch/AboutStitchingPanel";

import ProfilePage from "./components/profile/ProfilePage";
import VideoOptionsSheet from "./components/profile/VideoOptionsSheet";
import PrivacySettingsSheet from "./components/profile/PrivacySettingsSheet";
import PrivacySavedSheet from "./components/profile/PrivacySavedSheet";

import VideoFullScreen from "./components/VideoFullScreen";

export default function App() {
  const { user, signIn, logOut, loading } = useAuth();
  const { items: inboxItems } = useInbox(user);
  const { reposts, addRepost, removeRepost, hasReposted } = useReposts(user);
  const likedVideos = useUserLikes(user);
  const [showLogin, setShowLogin] = useState(true);
  const [tab, setTab] = useState("home");

  /* Share flow — lifted global so it works from any tab */
  const [currentVideo, setCurrentVideo] = useState(FYP_VIDEOS[0]);
  const [shareFlow, setShareFlow] = useState(null);
  const handleShare = (video) => { setCurrentVideo(video); setShareFlow("main"); };
  const closeAll = () => setShareFlow(null);

  /* Profile flow — null | "video" | "options" | "privacy" | "saved" */
  const [profileFlow, setProfileFlow] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [savedSettings, setSavedSettings] = useState(null);

  const isFullScreenVideo = ["video","options","privacy","saved"].includes(profileFlow);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#0a0a0a", fontFamily: "'DM Sans', 'Inter', sans-serif", overflowY: "auto", padding: "20px 0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input[type=range] { -webkit-appearance: none; height: 4px; border-radius: 2px; background: #333; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #fe2c55; cursor: pointer; }
        ::-webkit-scrollbar { width: 0; height: 0; }
      `}</style>

      {/* phone shell */}
      <div style={{
        width: 375, height: 812,
        background: "#000", borderRadius: 40,
        border: "2.5px solid #2a2a2a",
        overflow: "hidden", position: "relative",
        boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 0 0 1px #111",
      }}>
        <StatusBar />

        {/* ── LOGIN SCREEN ── */}
        {!loading && showLogin && !user && (
          <LoginScreen
            onSignIn={() => signIn().catch(() => {})}
            onSkip={() => setShowLogin(false)}
          />
        )}

        {/* ── HOME / FYP ── */}
        {tab === "home" && (
          <FYPFeed
            videos={FYP_VIDEOS}
            followingVideos={FOLLOWING_VIDEOS}
            onShare={handleShare}
            user={user}
          />
        )}

        {/* ── FRIENDS ── */}
        {tab === "friends" && (
          <FriendsFeed videos={FRIENDS_VIDEOS} onShare={handleShare} user={user} />
        )}

        {/* ── INBOX ── */}
        {tab === "inbox" && <InboxPage items={inboxItems} />}

        {/* ── PROFILE ── */}
        {tab === "profile" && (
          <>
            <ProfilePage
              user={user}
              reposts={reposts}
              likedVideos={likedVideos}
              onSignIn={() => signIn().catch(() => {})}
              onSignOut={logOut}
              onOpenVideo={(v) => { setSelectedVideo(v); setProfileFlow("video"); }}
            />

            {isFullScreenVideo && selectedVideo && (
              <>
                <VideoFullScreen
                  video={selectedVideo}
                  onBack={() => { setProfileFlow(null); setSelectedVideo(null); }}
                  onOptions={() => setProfileFlow("options")}
                />
                {["options","privacy","saved"].includes(profileFlow) && (
                  <div data-testid="profile-backdrop" onClick={() => setProfileFlow("video")} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 48 }} />
                )}
              </>
            )}

            {profileFlow === "options" && selectedVideo && (
              <VideoOptionsSheet video={selectedVideo} onPrivacy={() => setProfileFlow("privacy")} onClose={() => setProfileFlow("video")} />
            )}
            {profileFlow === "privacy" && (
              <PrivacySettingsSheet onSave={(s) => { setSavedSettings(s); setProfileFlow("saved"); }} onClose={() => setProfileFlow("video")} />
            )}
            {profileFlow === "saved" && savedSettings && (
              <PrivacySavedSheet settings={savedSettings} onDone={() => { setProfileFlow(null); setSelectedVideo(null); }} onChange={() => setProfileFlow("privacy")} />
            )}
          </>
        )}

        {/* ── GLOBAL SHARE FLOW (works from home + friends tabs) ── */}
        {shareFlow && (
          <div data-testid="share-backdrop" onClick={closeAll} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 28 }} />
        )}
        {shareFlow === "main" && (
          <MainShareSheet
            onClose={closeAll}
            onRepost={() => hasReposted(currentVideo.id) ? removeRepost(currentVideo.id) : (addRepost(currentVideo), setShareFlow("reposted"))}
            onDuet={() => setShareFlow("duet_setup")}
            onStitch={() => setShareFlow("stitch_clip")}
            onInfo={() => setShareFlow("repost_info")}
            alreadyReposted={hasReposted(currentVideo.id)}
          />
        )}
        {shareFlow === "reposted" && <RepostedToast onDone={closeAll} />}
        {shareFlow === "repost_info" && <RepostInfoPanel onClose={() => setShareFlow("main")} />}
        {shareFlow === "repost_sheet" && (
          <RepostSheet
            creator={currentVideo.creator}
            onClose={closeAll}
            onInfo={() => setShareFlow("repost_info")}
            onConfirm={() => { addRepost(currentVideo); setShareFlow("reposted"); }}
            onUndo={() => { removeRepost(currentVideo.id); closeAll(); }}
            alreadyReposted={hasReposted(currentVideo.id)}
          />
        )}
        {(shareFlow === "duet_setup" || shareFlow === "about_duet") && (
          <DuetSetupScreen video={currentVideo} onClose={closeAll} onInfo={() => setShareFlow("about_duet")} />
        )}
        {shareFlow === "about_duet" && (
          <>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 49 }} />
            <AboutDuetsPanel creator={currentVideo.creator} onClose={() => setShareFlow("duet_setup")} />
          </>
        )}
        {shareFlow === "stitch_clip" && (
          <StitchClipSelector video={currentVideo} onClose={closeAll} onNext={() => setShareFlow("stitch_record")} />
        )}
        {(shareFlow === "stitch_record" || shareFlow === "about_stitch") && (
          <StitchRecordScreen creator={currentVideo.creator} onClose={closeAll} onInfo={() => setShareFlow("about_stitch")} />
        )}
        {shareFlow === "about_stitch" && (
          <>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 49 }} />
            <AboutStitchingPanel creator={currentVideo.creator} onClose={() => setShareFlow("stitch_record")} />
          </>
        )}

        {/* bottom nav — hidden when full-screen video is open */}
        {!isFullScreenVideo && (
          <BottomNav active={tab} onNav={(k) => { setTab(k); closeAll(); setProfileFlow(null); setSelectedVideo(null); }} />
        )}
      </div>
    </div>
  );
}
