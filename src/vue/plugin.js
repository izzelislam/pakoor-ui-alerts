import BFKR from "../index.js";
import { useBFKR } from "./useBFKR.js";

export default {
  install(app) {
    const api = useBFKR();

    // For Options API: this.$bfkr.toast.success()
    app.config.globalProperties.$bfkr = api;

    // For Composition API auto-import style (optional)
    app.provide("bfkr", api);
  }
};
