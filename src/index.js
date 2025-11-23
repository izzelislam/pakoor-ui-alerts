import "./style.css";
import { Toast } from "./toast.js";
import { Dialog } from "./dialog.js";
import { BFKR_COLORS, BFKR_THEMES } from "./theme.js";

export const config = {
  setColors(newColors) {
    Object.assign(BFKR_COLORS, newColors);
  },
  getColors() {
    return { ...BFKR_COLORS };
  }
};

export { Toast, Dialog, BFKR_COLORS, BFKR_THEMES };

export default {
  Toast: new Toast(),
  Dialog: new Dialog(),
  config
};
