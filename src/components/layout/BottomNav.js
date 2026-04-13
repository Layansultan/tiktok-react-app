import { C } from "../../constants";

export default function BottomNav({ active, onNav }) {
  const items = [
    { key: "home",    icon: "🏠", label: "Home" },
    { key: "friends", icon: "👥", label: "Friends" },
    { key: "add",     icon: null, label: null },
    { key: "inbox",   icon: "📥", label: "Inbox" },
    { key: "profile", icon: "👤", label: "Profile" },
  ];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 64,
      background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center",
      justifyContent: "space-around", zIndex: 20,
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}>
      {items.map(it => it.key === "add" ? (
        <div key="add" style={{
          background: `linear-gradient(90deg,${C.teal} 0%,white 45%,white 55%,${C.red} 100%)`,
          borderRadius: 8, width: 36, height: 24,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 300, color: "black", cursor: "pointer",
        }}>+</div>
      ) : (
        <div key={it.key} onClick={() => onNav(it.key)} style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 2, fontSize: 9, cursor: "pointer",
          color: active === it.key ? "white" : "rgba(255,255,255,0.45)",
        }}>
          <span style={{ fontSize: 20 }}>{it.icon}</span>
          {it.label}
        </div>
      ))}
    </div>
  );
}
