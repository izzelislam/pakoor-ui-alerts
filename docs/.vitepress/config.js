import { defineConfig } from "vitepress";

export default defineConfig({
  title: "UI Alerts",
  description: "Universal Toast & Dialog library for Browser, React, and Vue.",
  
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Browser", link: "/guide/browser" },
      { text: "React", link: "/guide/react" },
      { text: "Vue", link: "/guide/vue" },
      { text: "Themes", link: "/guide/themes" },
      { text: "Config", link: "/guide/config" },
      { text: "Dialog", link: "/guide/dialog" }
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "Browser (CDN)", link: "/guide/browser" },
            { text: "React", link: "/guide/react" },
            { text: "Vue", link: "/guide/vue" },
            { text: "Themes", link: "/guide/themes" },
            { text: "Dialog", link: "/guide/dialog" },
            { text: "Config (Override Colors)", link: "/guide/config" }
          ]
        }
      ]
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "© 2025 Bang FKR"
    }
  }
});
