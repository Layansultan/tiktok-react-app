import { C } from "../../constants";

const TYPE_ICON = {
  follow:  "👤",
  like:    "♥",
  comment: "💬",
  mention: "@",
  duet:    "👥",
  stitch:  "✂",
  system:  "🎉",
};

const TYPE_COLOR = {
  follow:  C.teal,
  like:    C.red,
  comment: "#7ba7f7",
  mention: C.amber,
  duet:    "#7ba7f7",
  stitch:  C.red,
  system:  C.green,
};

export default function InboxPage({ items = [], onMarkAllRead, user }) {
  const unread = items.filter(i => !i.read);
  const read   = items.filter(i =>  i.read);

  return (
    <div style={{ position: "absolute", top: 0, bottom: 64, left: 0, right: 0, overflowY: "auto", background: "#000" }}>
      {/* header */}
      <div style={{ padding: "44px 16px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: "white" }}>Inbox</span>
        <span onClick={onMarkAllRead} style={{ fontSize: 13, color: C.grey, cursor: "pointer" }}>Mark all read</span>
      </div>

      {/* unread section */}
      {unread.length > 0 && (
        <>
          <div style={{ padding: "8px 16px 6px", fontSize: 11, fontWeight: 600, color: C.grey, letterSpacing: 0.5, textTransform: "uppercase" }}>
            New · {unread.length}
          </div>
          {unread.map(item => <NotifRow key={item.id} item={item} />)}
        </>
      )}

      {/* divider */}
      <div style={{ height: 1, background: "#1a1a1a", margin: "8px 0" }} />

      {/* earlier section */}
      <div style={{ padding: "4px 16px 6px", fontSize: 11, fontWeight: 600, color: C.grey, letterSpacing: 0.5, textTransform: "uppercase" }}>
        Earlier
      </div>
      {read.map(item => <NotifRow key={item.id} item={item} />)}

      <div style={{ height: 20 }} />
    </div>
  );
}

function NotifRow({ item }) {
  const iconColor = TYPE_COLOR[item.type] || "white";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "10px 16px",
      background: item.read ? "transparent" : "rgba(255,255,255,0.03)",
      cursor: "pointer",
    }}>
      {/* avatar with type badge */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: item.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white" }}>
          {item.initials}
        </div>
        {/* type icon badge */}
        <div style={{
          position: "absolute", bottom: -2, right: -2,
          width: 18, height: 18, borderRadius: "50%",
          background: iconColor, border: "2px solid #000",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 8, color: item.type === "like" ? "white" : item.type === "system" ? "white" : "#000",
          fontWeight: 700,
        }}>
          {TYPE_ICON[item.type]}
        </div>
      </div>

      {/* text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: "white", lineHeight: 1.4 }}>
          <span style={{ fontWeight: 700 }}>@{item.user}</span>
          {" "}<span style={{ color: "rgba(255,255,255,0.7)" }}>{item.text}</span>
        </div>
        <div style={{ fontSize: 10, color: C.grey2, marginTop: 2 }}>{item.time} ago</div>
      </div>

      {/* video thumbnail (if applicable) + unread dot */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        {item.videoThumb && (
          <div style={{ width: 36, height: 48, borderRadius: 4, background: item.videoThumb, flexShrink: 0 }} />
        )}
        {!item.read && (
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.red, flexShrink: 0 }} />
        )}
      </div>
    </div>
  );
}
