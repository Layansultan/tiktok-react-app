import { useState } from "react";
import { C } from "../../constants";
import { Sheet, Handle, Toggle, Btn } from "../common";

export default function PrivacySettingsSheet({ onSave, onClose }) {
  const [audience, setAudience] = useState("friends");
  const [comments, setComments] = useState(true);
  const [duet, setDuet] = useState(true);
  const [stitch, setStitch] = useState(false);

  return (
    <Sheet height={510}>
      <Handle />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px 14px" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "white", flex: 1, textAlign: "center" }}>Privacy settings</span>
        <span onClick={onClose} style={{ fontSize: 15, color: "white", cursor: "pointer" }}>✕</span>
      </div>

      {/* audience */}
      <div style={{ margin: "0 12px 10px", background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "white", marginBottom: 12 }}>Who can watch this video</div>
        {[["everyone","Everyone",null],["friends","Friends","Followers you follow back · 100 friends ›"],["only_you","Only you",null]].map(([val, label, sub]) => (
          <div key={val} onClick={() => setAudience(val)} style={{ display: "flex", alignItems: sub ? "flex-start" : "center", justifyContent: "space-between", padding: "8px 0", borderBottom: val !== "only_you" ? "1px solid rgba(255,255,255,0.07)" : "none", cursor: "pointer" }}>
            <div>
              <div style={{ fontSize: 12, color: "white" }}>{label}</div>
              {sub && <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{sub}</div>}
            </div>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: audience === val ? C.red : "transparent", border: audience === val ? "none" : "1.5px solid #555", display: "flex", alignItems: "center", justifyContent: "center", marginTop: sub ? 2 : 0, flexShrink: 0 }}>
              {audience === val && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
            </div>
          </div>
        ))}
      </div>

      {/* toggles */}
      <div style={{ margin: "0 12px 12px", background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 14px" }}>
        {[
          ["Allow comments", null, comments, setComments, C.teal],
          ["👥 Allow duets", "Others can create side-by-side videos", duet, setDuet, C.blue],
          ["✂ Allow stitches", "Others can embed a clip in their posts", stitch, setStitch, C.teal],
        ].map(([label, sub, val, set, color], i, arr) => (
          <div key={label} onClick={() => set(!val)} style={{ display: "flex", alignItems: sub ? "flex-start" : "center", justifyContent: "space-between", paddingBottom: i < arr.length - 1 ? 10 : 0, marginBottom: i < arr.length - 1 ? 10 : 0, borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", cursor: "pointer" }}>
            <div>
              <div style={{ fontSize: 12, color: "white", fontWeight: 500 }}>{label}</div>
              {sub && <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{sub}</div>}
            </div>
            <Toggle on={val} color={color} />
          </div>
        ))}
      </div>

      <div style={{ padding: "0 12px" }}>
        <Btn primary onClick={() => onSave({ audience, duet, stitch })}>Save settings</Btn>
      </div>
    </Sheet>
  );
}
