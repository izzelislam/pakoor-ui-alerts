import { useCallback, useMemo } from "react";
import BFKR from "../index.js"; // memakai bundler internal

export function useBFKR() {

  /* ======== TOAST WRAPPER ======== */
  const toast = useMemo(() => ({
    raw: (msg, type = "info", opts = {}) =>
      BFKR.Toast.show(msg, type, opts),

    success: (msg, opts = {}) =>
      BFKR.Toast.show(msg, "success", opts),

    error: (msg, opts = {}) =>
      BFKR.Toast.show(msg, "error", opts),

    warning: (msg, opts = {}) =>
      BFKR.Toast.show(msg, "warning", opts),

    info: (msg, opts = {}) =>
      BFKR.Toast.show(msg, "info", opts),

    primary: (msg, opts = {}) =>
      BFKR.Toast.show(msg, "primary", opts),

    dark: (msg, opts = {}) =>
      BFKR.Toast.show(msg, "dark", opts),

    custom: (msg, opts = {}) =>
      BFKR.Toast.show(msg, "custom", opts),

    position: (pos) => BFKR.Toast.setPosition(pos),
    theme: (val) => BFKR.Toast.setTheme(val)
  }), []);


  /* ======== DIALOG WRAPPER ======== */
  const dialog = useMemo(() => ({

    alert: (msg, opts = {}) =>
      BFKR.Dialog.alert(msg, opts),

    confirm: (msg, opts = {}) =>
      BFKR.Dialog.confirm(msg, opts),

    prompt: (msg, opts = {}) =>
      BFKR.Dialog.prompt(msg, opts),

    theme: (val) => BFKR.Dialog.setTheme(val)
  }), []);


  /* ======== THEME WRAPPER ======== */
  const theme = useMemo(() => ({
    set: (name) => {
      BFKR.Toast.setTheme(name);
      BFKR.Dialog.setTheme(name);
    }
  }), []);


  /* ======== CONFIG WRAPPER ======== */
  const config = useMemo(() => ({
    colors: (colors) => BFKR.config.setColors(colors),
    dialogColors: (colors) => BFKR.config.setDialogColors(colors)
  }), []);


  return { toast, dialog, theme, config };
}
