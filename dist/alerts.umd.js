(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BFKR = {}));
})(this, (function (exports) { 'use strict';

  /* ======================================================
     GLOBAL COLORS
  ====================================================== */
  const BFKR_COLORS = {
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
  const BFKR_THEMES = {
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
  function applyThemeStyles(el, themeName) {
    const theme = BFKR_THEMES[themeName] || {};
    Object.entries(theme).forEach(([k, v]) => {
      if (["titleColor", "messageColor"].includes(k)) return;
      el.style[k] = v;
    });
  }

  /* ======================================================
     TOAST MODULE (ESM)
     Used by React, Vue, Svelte, Vanilla ESM
  ====================================================== */


  class Toast {
    constructor() {
      this.position = "top-right";
      this.theme = "default";
      this._createContainer();
    }

    _createContainer() {
      let c = document.getElementById("bfkr-toast-container");
      if (!c) {
        c = document.createElement("div");
        c.id = "bfkr-toast-container";
        document.body.appendChild(c);
      }
      c.className = `bfkr-${this.position}`;
      this.container = c;
    }

    setPosition(pos) {
      this.position = pos;
      this._createContainer();
    }

    setTheme(theme) {
      this.theme = theme in BFKR_THEMES ? theme : "default";
    }

    show(message, type = "info", opts = {}) {
      const duration = opts.duration || 3500;
      const animation = opts.animation || "slide";
      const theme = opts.theme || this.theme;

      const toast = document.createElement("div");
      toast.className = `bfkr-toast bfkr-animate-${animation}`;

      toast.style.background = BFKR_COLORS[type] || BFKR_COLORS.info;
      toast.style.color = "#fff";

      /* APPLY THEME */
      const themeCfg = BFKR_THEMES[theme];
      if (themeCfg) {
        Object.entries(themeCfg).forEach(([k, v]) => {
          if (["background", "color"].includes(k)) return;
          toast.style[k] = v;
        });
      }

      /* ICON */
      const icon = document.createElement("div");
      icon.className = "bfkr-toast-icon";
      icon.textContent = opts.icon || "";

      /* CONTENT */
      const content = document.createElement("div");
      content.className = "bfkr-toast-content";

      const title = document.createElement("div");
      title.className = "bfkr-toast-title";
      title.textContent = opts.title || type.toUpperCase();

      const msg = document.createElement("div");
      msg.className = "bfkr-toast-message";
      msg.textContent = message;

      content.append(title, msg);

      /* CLOSE BUTTON */
      const close = document.createElement("span");
      close.className = "bfkr-toast-close";
      close.innerHTML = "&times;";
      close.onclick = () => this._hide(toast);

      /* PROGRESS BAR */
      const progress = document.createElement("div");
      progress.className = "bfkr-progress";
      progress.style.animationDuration = duration + "ms";

      /* CUSTOM STYLE */
      if (opts.customStyle) {
        Object.entries(opts.customStyle).forEach(([k, v]) => {
          toast.style[k] = v;
        });
      }

      toast.append(icon, content, close, progress);
      this.container.appendChild(toast);

      setTimeout(() => this._hide(toast), duration);
    }

    _hide(el) {
      el.classList.add("bfkr-animate-ease-out");
      setTimeout(() => el.remove(), 250);
    }
  }

  /* ======================================================
     SWEETALERT-STYLE DIALOG (ESM)
  ====================================================== */


  class Dialog {
    constructor() {
      this.theme = "modern";
      this._createBase();
    }

    setTheme(t) {
      this.theme = BFKR_THEMES[t] ? t : "modern";
    }

    _createBase() {
      this.overlay = document.createElement("div");
      this.overlay.id = "bfkr-dialog-overlay";

      this.overlay.innerHTML = `
      <div id="bfkr-dialog-box">
        <div id="bfkr-dialog-icon"></div>
        <div id="bfkr-dialog-title"></div>
        <div id="bfkr-dialog-message"></div>
        <input id="bfkr-dialog-input" class="bfkr-hidden" />
        <div id="bfkr-dialog-buttons"></div>
      </div>
    `;
      document.body.appendChild(this.overlay);

      this.box   = this.overlay.querySelector("#bfkr-dialog-box");
      this.icon  = this.overlay.querySelector("#bfkr-dialog-icon");
      this.title = this.overlay.querySelector("#bfkr-dialog-title");
      this.msg   = this.overlay.querySelector("#bfkr-dialog-message");
      this.input = this.overlay.querySelector("#bfkr-dialog-input");
      this.btns  = this.overlay.querySelector("#bfkr-dialog-buttons");
    }

    _accent(type) {
      return BFKR_COLORS[type] || BFKR_COLORS.info;
    }

    _apply(type, options) {
      const accent = this._accent(type);

      applyThemeStyles(this.box, this.theme);

      this.icon.textContent = options.icon || {
        success: "✔️",
        error: "❌",
        warning: "⚠️",
        info: "ℹ️",
        primary: "⭐",
        dark: "🌑",
      }[type] || "ℹ️";

      this.icon.style.backgroundColor = accent + "20";
      this.icon.style.border = `2px solid ${accent}55`;
      this.icon.style.color = accent;

      this.title.textContent = options.title || type.toUpperCase();
      this.msg.textContent   = options.message;

      if (options.width) this.box.style.width = options.width;
      if (options.style) {
        Object.entries(options.style).forEach(([k, v]) => {
          this.box.style[k] = v;
        });
      }

      this._btnOkStyle = options.buttonStyle?.ok || {};
      this._btnCancelStyle = options.buttonStyle?.cancel || {};
    }

    alert(message, options = {}) {
      const type = options.type || "info";
      this._apply(type, { ...options, message });

      this.btns.innerHTML = "";
      this.input.classList.add("bfkr-hidden");

      const ok = document.createElement("button");
      ok.textContent = options.okText || "OK";
      ok.style.background = this._accent(type);
      ok.style.color = "#fff";

      Object.assign(ok.style, this._btnOkStyle);
      ok.onclick = () => {
        this._hide();
        options.onClose?.();
      };

      this.btns.append(ok);
      this._show();
    }

    confirm(message, options = {}) {
      const type = options.type || "warning";
      this._apply(type, { ...options, message });

      this.input.classList.add("bfkr-hidden");
      this.btns.innerHTML = "";

      const ok = document.createElement("button");
      ok.textContent = options.okText || "OK";
      ok.style.background = this._accent(type);
      ok.style.color = "#fff";
      Object.assign(ok.style, this._btnOkStyle);

      const cancel = document.createElement("button");
      cancel.textContent = options.cancelText || "Cancel";
      cancel.style.background = "#e5e7eb";
      cancel.style.color = "#1f2937";
      Object.assign(cancel.style, this._btnCancelStyle);

      ok.onclick = () => {
        this._hide();
        options.onConfirm?.(true);
      };
      cancel.onclick = () => {
        this._hide();
        options.onConfirm?.(false);
      };

      this.btns.append(ok, cancel);
      this._show();
    }

    prompt(message, options = {}) {
      const type = options.type || "info";
      this._apply(type, { ...options, message });

      this.btns.innerHTML = "";
      this.input.classList.remove("bfkr-hidden");
      this.input.value = options.defaultValue || "";

      if (options.inputStyle) {
        Object.assign(this.input.style, options.inputStyle);
      }

      const ok = document.createElement("button");
      ok.textContent = options.okText || "Submit";
      ok.style.background = this._accent(type);
      ok.style.color = "#fff";
      Object.assign(ok.style, this._btnOkStyle);

      const cancel = document.createElement("button");
      cancel.textContent = options.cancelText || "Cancel";
      cancel.style.background = "#e5e7eb";
      cancel.style.color = "#1f2937";
      Object.assign(cancel.style, this._btnCancelStyle);

      ok.onclick = () => {
        this._hide();
        options.onSubmit?.(this.input.value);
      };
      cancel.onclick = () => {
        this._hide();
        options.onSubmit?.(null);
      };

      this.btns.append(ok, cancel);
      this._show();
    }

    _show() {
      this.overlay.classList.add("bfkr-show");
    }

    _hide() {
      this.overlay.classList.remove("bfkr-show");
    }
  }

  const config = {
    setColors(newColors) {
      Object.assign(BFKR_COLORS, newColors);
    },
    getColors() {
      return { ...BFKR_COLORS };
    }
  };

  var index = {
    Toast: new Toast(),
    Dialog: new Dialog(),
    config
  };

  exports.BFKR_COLORS = BFKR_COLORS;
  exports.BFKR_THEMES = BFKR_THEMES;
  exports.Dialog = Dialog;
  exports.Toast = Toast;
  exports.config = config;
  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=alerts.umd.js.map
