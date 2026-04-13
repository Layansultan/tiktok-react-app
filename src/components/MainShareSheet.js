import { C } from "../constants";
import { CONTACTS } from "../data/mockData";
import { Sheet, Handle, Divider } from "./common";

export default function MainShareSheet({ onClose, onRepost, onDuet, onStitch, onInfo }) {
  return (
    <Sheet height={460}>
      <Handle />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px 10px" }}>
        <span style={{ fontSize: 15, color: "white" }}>🔍</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Send to</span>
        <span onClick={onClose} style={{ fontSize: 15, color: "white", cursor: "pointer" }}>✕</span>
      </div>

      {/* contacts */}
      <div style={{ display: "flex", overflowX: "auto", padding: "0 10px 12px", gap: 4, scrollbarWidth: "none" }}>
        {CONTACTS.map(c => (
          <div key={c.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 52 }}>
            <div style={{
              width: 42, height: 42, borderRadius: "50%",
              background: c.type === "group" ? "#3a3a3a" : c.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: c.type === "group" ? 18 : 13, fontWeight: 700, color: "white",
            }}>
              {c.type === "group" ? "👥" : c.initials}
            </div>
            <span style={{ fontSize: 8, color: C.grey, textAlign: "center" }}>{c.name}</span>
          </div>
        ))}
      </div>
      <Divider />

      {/* row 2 — repost highlighted */}
      <div style={{ display: "flex", overflowX: "auto", padding: "10px 10px", gap: 4, scrollbarWidth: "none" }}>
        <div onClick={onRepost} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 52, position: "relative", cursor: "pointer" }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.amber, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, boxShadow: `0 0 0 2px ${C.amber}, 0 0 10px rgba(245,166,35,0.5)` }}>🔁</div>
          <span style={{ fontSize: 8, color: C.amber, fontWeight: 700 }}>Repost</span>
          <div style={{ position: "absolute", top: -2, right: 6, width: 7, height: 7, background: C.red, borderRadius: "50%", border: "1px solid #1e1e1e" }} />
        </div>
        {[["🔗","Copy link","#2D5BE3"],["💬","WhatsApp",C.green],["💬","SMS","#34b7f1"],["👻","Snapchat","#fffc00"]].map(([icon, label, bg]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 52 }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{icon}</div>
            <span style={{ fontSize: 8, color: C.grey }}>{label}</span>
          </div>
        ))}
      </div>
      <Divider />

      {/* row 3 — duet & stitch highlighted */}
      <div style={{ display: "flex", overflowX: "auto", padding: "10px 10px 6px", gap: 4, scrollbarWidth: "none" }}>
        <div onClick={onDuet} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 52, position: "relative", cursor: "pointer" }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.surf2, border: `1.5px solid #7ba7f7`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, boxShadow: "0 0 8px rgba(45,91,227,0.45)" }}>👥</div>
          <span style={{ fontSize: 8, color: "#7ba7f7", fontWeight: 700 }}>Duet</span>
          <div style={{ position: "absolute", top: -2, right: 6, width: 7, height: 7, background: C.blue, borderRadius: "50%", border: "1px solid #1e1e1e" }} />
        </div>
        <div onClick={onStitch} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 52, position: "relative", cursor: "pointer" }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.surf2, border: `1.5px solid ${C.red}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, boxShadow: "0 0 8px rgba(254,44,85,0.35)" }}>✂</div>
          <span style={{ fontSize: 8, color: C.red, fontWeight: 700 }}>Stitch</span>
          <div style={{ position: "absolute", top: -2, right: 6, width: 7, height: 7, background: C.red, borderRadius: "50%", border: "1px solid #1e1e1e" }} />
        </div>
        {[["🔒","Save"],["⚡","Live"],["📎","Embed"],["⚠️","Report"]].map(([icon, label]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 52 }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.surf2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{icon}</div>
            <span style={{ fontSize: 8, color: C.grey }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── ALWAYS-VISIBLE CONSENT CUE BANNER ── */}
      <div style={{ margin: "8px 12px 10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, fontSize: 10, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
          <span style={{ color: C.amber, fontWeight: 700 }}>Repost</span> may reach audiences beyond the original context ·{" "}
          <span style={{ color: "#7ba7f7", fontWeight: 700 }}>Duet</span> &amp; <span style={{ color: C.red, fontWeight: 700 }}>Stitch</span> use the creator's content
        </div>
        <div onClick={onInfo} style={{ width: 22, height: 22, borderRadius: "50%", border: `1px solid ${C.grey2}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: C.grey, cursor: "pointer", flexShrink: 0 }}>i</div>
      </div>
    </Sheet>
  );
}
