import { C } from "../../constants";
import { CONTACTS } from "../../data/mockData";
import { Sheet, Handle, Divider } from "../common";

export default function RepostSheet({ onClose, onInfo, onConfirm, onUndo, creator, alreadyReposted }) {
  return (
    <Sheet height={410}>
      <Handle />
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px 10px" }}>
        <span style={{ fontSize: 15, color: "white" }}>🔍</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Send to</span>
        <span onClick={onClose} style={{ fontSize: 15, color: "white", cursor: "pointer" }}>✕</span>
      </div>

      {/* contacts row */}
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

      {/* platform row — Repost highlighted */}
      <div style={{ display: "flex", overflowX: "auto", padding: "10px 10px", gap: 4, scrollbarWidth: "none" }}>
        {/* ★ REPOST */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 52, position: "relative" }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%", background: C.amber, color: "white",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
            boxShadow: `0 0 0 2px ${C.amber}, 0 0 10px rgba(245,166,35,0.5)`,
          }}>🔁</div>
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

      {/* ── LIGHT CONSENT CUE — repost row */}
      <div style={{ padding: "10px 16px 6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 10px", borderRadius: 10, background: C.surf2 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🔁</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "white", marginBottom: 2 }}>Repost to your followers</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div onClick={onInfo} style={{
                width: 13, height: 13, borderRadius: "50%", border: `1px solid ${C.grey2}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 7, color: C.grey, cursor: "pointer",
              }}>i</div>
              <span style={{ fontSize: 9.5, color: C.grey }}>@{creator.username} allows reposts · shared to your feed unchanged</span>
            </div>
          </div>
          <div onClick={alreadyReposted ? onUndo : onConfirm} style={{ padding: "5px 10px", background: alreadyReposted ? "#333" : C.red, borderRadius: 6, fontSize: 10, fontWeight: 700, color: alreadyReposted ? C.grey : "white", cursor: "pointer", whiteSpace: "nowrap" }}>
            {alreadyReposted ? "✓ Reposted" : "Repost"}
          </div>
        </div>
      </div>

      {/* action row for duet/stitch */}
      <div style={{ display: "flex", overflowX: "auto", padding: "10px 10px 6px", gap: 4, scrollbarWidth: "none" }}>
        {[["👥","Duet","#7ba7f7",true],["✂","Stitch",C.red,true],["🔒","Save","#aaa",false],["⚡","Live","#aaa",false]].map(([icon,label,col,hl]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 52 }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.surf2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, border: hl ? `1.5px solid ${col}` : "none", boxShadow: hl ? `0 0 8px ${col}55` : "none" }}>{icon}</div>
            <span style={{ fontSize: 8, color: hl ? col : C.grey, fontWeight: hl ? 700 : 400 }}>{label}</span>
          </div>
        ))}
      </div>
    </Sheet>
  );
}
