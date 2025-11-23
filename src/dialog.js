/* ======================================================
   SWEETALERT-STYLE DIALOG (ESM)
====================================================== */

import { BFKR_COLORS, BFKR_THEMES, applyThemeStyles } from "./theme.js";

export class Dialog {
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
