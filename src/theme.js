/* ======================================================
   GLOBAL COLORS
====================================================== */
export const BFKR_COLORS = {
  success: "#22c55e",
  error:   "#ef4444",
  warning: "#f59e0b",
  info:    "#3b82f6",
  primary: "#6366f1",
  dark:    "#1e293b",
  custom:  "#a855f7",
};

/* ======================================================
   THEMES
====================================================== */
export const BFKR_THEMES = {
  default: {},

  modern: {
    borderRadius: "18px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
    padding: "26px",
  },

  glass: {
    background: "rgba(255,255,255,0.25)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: "22px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
    color: "#ffffff",
  },

  brutalism: {
    background: "#ffffff",
    border: "4px solid #000",
    boxShadow: "8px 8px 0 #000",
    color: "#000",
    // padding: "px",
    borderRadius: "0",
  },

  minimal: {
    borderRadius: "12px",
    boxShadow: "none"
  },

  neumorphism: {
    borderRadius: "20px",
    boxShadow: "10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff"
  },

  modernDark: {
    background: "#0f172a",
    color: "#e2e8f0",
    borderRadius: "22px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
  }
};

/* Apply theme styles */
export function applyThemeStyles(el, themeName) {
  const theme = BFKR_THEMES[themeName] || {};
  Object.entries(theme).forEach(([k, v]) => {
    if (["titleColor", "messageColor"].includes(k)) return;
    el.style[k] = v;
  });
}
