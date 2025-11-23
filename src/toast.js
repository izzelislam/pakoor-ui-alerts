/* ======================================================
   TOAST MODULE (ESM)
   Used by React, Vue, Svelte, Vanilla ESM
====================================================== */

import { BFKR_COLORS, BFKR_THEMES } from "./theme.js";

export class Toast {
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
