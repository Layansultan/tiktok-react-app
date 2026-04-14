export default function LoginScreen({ onSignIn, onSkip }) {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "#000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 32px", zIndex: 100,
    }}>
      {/* logo area */}
      <div style={{ marginBottom: 12 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: "linear-gradient(135deg, #fe2c55, #25f4ee)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32,
        }}>▶</div>
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 6 }}>TikTok</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 40, textAlign: "center" }}>
        Sign in to like, repost, and get notified
      </div>

      {/* Google sign-in button */}
      <button
        onClick={onSignIn}
        style={{
          width: "100%", padding: "13px 0", borderRadius: 12,
          background: "white", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          fontSize: 14, fontWeight: 700, color: "#111",
          marginBottom: 12,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        Continue with Google
      </button>

      <button
        onClick={onSkip}
        style={{
          width: "100%", padding: "13px 0", borderRadius: 12,
          background: "transparent", border: "1px solid #333",
          cursor: "pointer", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.6)",
        }}
      >
        Continue as guest
      </button>
    </div>
  );
}
