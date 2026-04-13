import { C } from "../../constants";

export const Sheet = ({ height = 420, children, style = {} }) => (
  <div style={{
    position: "absolute", bottom: 0, left: 0, right: 0,
    height, background: C.surf, borderRadius: "20px 20px 0 0",
    zIndex: 50, padding: "10px 0 0", ...style,
    animation: "slideUp .28s cubic-bezier(.32,.72,0,1)",
  }}>
    {children}
  </div>
);

export const Handle = () => (
  <div style={{ width: 36, height: 3, background: C.border, borderRadius: 2, margin: "0 auto 12px" }} />
);

export const Divider = () => (
  <div style={{ height: 1, background: C.border, margin: "0 0 0" }} />
);

export const Toggle = ({ on, color = C.teal }) => (
  <div style={{
    width: 40, height: 22, background: on ? color : "#444",
    borderRadius: 11, position: "relative", flexShrink: 0,
    transition: "background .2s",
  }}>
    <div style={{
      width: 18, height: 18, background: "white", borderRadius: "50%",
      position: "absolute", top: 2, [on ? "right" : "left"]: 2,
      transition: "left .2s, right .2s",
    }} />
  </div>
);

export const Btn = ({ children, primary, small, onClick, style = {} }) => (
  <div onClick={onClick} style={{
    flex: 1, padding: small ? "8px" : "11px",
    background: primary ? C.red : "rgba(255,255,255,0.08)",
    border: primary ? "none" : "1px solid rgba(255,255,255,0.15)",
    borderRadius: 8, textAlign: "center",
    fontSize: small ? 11 : 13, color: "white",
    fontWeight: primary ? 700 : 500, cursor: "pointer", ...style,
  }}>
    {children}
  </div>
);
