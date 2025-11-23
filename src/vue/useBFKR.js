import { reactive } from "vue";
import BFKR from "../index.js";

export function useBFKR() {
  const toast = reactive({
    raw: (msg, type = "info", opts = {}) =>
      BFKR.Toast.show(msg, type, opts),

    success: (msg, opts = {}) => BFKR.Toast.show(msg, "success", opts),
    error:   (msg, opts = {}) => BFKR.Toast.show(msg, "error", opts),
    warning: (msg, opts = {}) => BFKR.Toast.show(msg, "warning", opts),
    info:    (msg, opts = {}) => BFKR.Toast.show(msg, "info", opts),
    primary: (msg, opts = {}) => BFKR.Toast.show(msg, "primary", opts),
    dark:    (msg, opts = {}) => BFKR.Toast.show(msg, "dark", opts),
    custom:  (msg, opts = {}) => BFKR.Toast.show(msg, "custom", opts),

    position: (p) => BFKR.Toast.setPosition(p),
    theme:    (t) => BFKR.Toast.setTheme(t),
  });

  const dialog = reactive({
    alert: (msg, opts = {})  => BFKR.Dialog.alert(msg, opts),
    confirm: (msg, opts = {}) => BFKR.Dialog.confirm(msg, opts),
    prompt: (msg, opts = {}) => BFKR.Dialog.prompt(msg, opts),
    theme: (t) => BFKR.Dialog.setTheme(t),
  });

  const theme = {
    set(name) {
      BFKR.Toast.setTheme(name);
      BFKR.Dialog.setTheme(name);
    }
  };

  const config = {
    colors: (c) => BFKR.config.setColors(c),
    dialogColors: (c) => BFKR.config.setDialogColors(c)
  };

  return { toast, dialog, theme, config };
}
