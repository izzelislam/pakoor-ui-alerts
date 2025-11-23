# UI Alerts

A lightweight with vanila javascript, modern, themeable Toast + SweetAlert-style Dialog library for the web.
Supports **CDN**, **React**, **Vue**, and **ESM**.
Fast, customizable, themeable, and perfect for dashboards, SaaS, admin panels, and any modern UI.

![License](https://img.shields.io/badge/license-MIT-green.svg)
![JS](https://img.shields.io/badge/JS-ESM%20%2B%20UMD-blue)
![npm](https://img.shields.io/badge/npm-ready-red)
![Vue](https://img.shields.io/badge/vue-3.x-brightgreen)
![React](https://img.shields.io/badge/react-18.x-blue)
![TypeScript](https://img.shields.io/badge/typescript-included-blue)

---

## ✨ Features

- 🔥 Toast notifications (success, error, warning, info, primary, dark, custom)
- 🔥 SweetAlert-style Dialogs (alert, confirm, prompt)
- 🎨 Multiple built-in themes (Brutalism, Modern, Glass, Minimal, Neumorphism, Modern Dark)
- 🎨 Fully customizable styles & animations
- 🎯 Global color override system (success/error/info/etc)
- ⚡ Lightweight & dependency-free
- 🌎 Works with CDN, React, Vue, Svelte, Vanilla JS
- 📦 Bundled in ESM, UMD, Minified, and React/Vue variants
- 🧪 Fully typed (TypeScript `.d.ts`)
- 🚀 Perfect for SaaS, dashboards, admin UIs, or any modern web app

---

# 📦 Installation

### **CDN (Browser)**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/style.min.css" />
<script src="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/alerts.umd.min.js"></script>
```

---

### **NPM (React, Vue, Svelte, Vite, Next.js, Nuxt)**

```bash
npm install @pakoor/ui-alerts
# or
yarn add @pakoor/ui-alerts
```

---

# 🚀 Usage

## 1. Vanilla JavaScript (CDN)

```html
<script>
  BFKR.Toast.show("Saved!", "success", {
    title: "Success",
    icon: "✔️",
    animation: "bounce"
  });

  BFKR.Dialog.confirm("Delete this item?", {
    type: "warning",
    title: "Are you sure?",
    icon: "⚠️",
    onConfirm: (yes) => {
      if (yes) BFKR.Toast.show("Deleted!", "success");
    }
  });
</script>
```

---

# ⚛️ React Usage

## **Import React Hook**

```tsx
import { useBFKR } from "@pakoor/ui-alerts/react";
import "@pakoor/ui-alerts/dist/style.min.css";

export default function App() {
  const { toast, dialog, theme } = useBFKR();

  return (
    <>
      <button onClick={() => toast.success("Saved!")}>Success</button>

      <button onClick={() =>
        dialog.confirm("Delete?", {
          type: "warning",
          onConfirm: yes => yes && toast.success("Deleted!")
        })
      }>
        Confirm
      </button>
    </>
  );
}
```

---

# 🟦 Vue 3 Usage

## **Plugin Mode**

```js
import { createApp } from "vue";
import App from "./App.vue";
import { BFKRPlugin } from "@pakoor/ui-alerts/vue";
import "@pakoor/ui-alerts/dist/style.min.css";

const app = createApp(App);
app.use(BFKRPlugin);
app.mount("#app");
```

Use anywhere (Options API):

```js
this.$bfkr.toast.success("Saved!");
```

Use in Composition API:

```vue
<script setup>
import { useBFKR } from "@pakoor/ui-alerts/vue";

const { toast, dialog } = useBFKR();

toast.success("Welcome!");
</script>
```

---

# 🔥 Toast API

### **Basic Usage**

```js
BFKR.Toast.show("Message", "success");
```

---

## Types

| Type    | Example color |
| ------- | ------------- |
| success | green         |
| error   | red           |
| warning | orange        |
| info    | blue          |
| primary | purple        |
| dark    | black/gray    |
| custom  | fully custom  |

---

## Options

```ts
ToastOptions {
  title?: string;
  icon?: string;
  duration?: number;
  animation?: "slide" | "fade" | "bounce" | "zoom" | "ease-in" | "ease-out";
  position?: "top-left" | "top-center" | "top-right" |
             "bottom-left" | "bottom-center" | "bottom-right";
  customStyle?: Partial<CSSStyleDeclaration>;
}
```

---

## Example with Advanced Options

```js
BFKR.Toast.show("Saved!", "success", {
  title: "Success",
  icon: "✔️",
  duration: 3500,
  animation: "bounce",
  position: "top-right",
  customStyle: {
    background: "#020617",
    borderRadius: "14px",
    padding: "18px",
    boxShadow: "0 0 25px rgba(34,197,94,0.4)"
  }
});
```

---

# 🧊 Dialog API

## Types

* `alert()`
* `confirm()`
* `prompt()`

---

## Dialog Options

```ts
DialogOptions {
  type?: ToastType;
  title?: string;
  icon?: string;
  width?: string;
  style?: Partial<CSSStyleDeclaration>;
  buttonStyle?: {
    ok?: DialogButtonStyles;
    cancel?: DialogButtonStyles;
  };
  onConfirm?: (value: boolean) => void;
  onSubmit?: (value: string | null) => void;
}
```

---

## Example Confirm Dialog

```js
BFKR.Dialog.confirm("Are you sure?", {
  type: "warning",
  title: "Delete Item?",
  icon: "⚠️",
  onConfirm: (yes) => {
    if (yes) BFKR.Toast.show("Deleted!", "success")
  }
});
```

---

# 🎨 Themes

Built-in themes:

* `default`
* `brutalism`
* `modern`
* `glass`
* `minimal`
* `neumorphism`
* `modernDark`

Apply theme:

```js
BFKR.Toast.setTheme("brutalism");
BFKR.Dialog.setTheme("brutalism");
```

Or globally:

```js
BFKR.config.setColors({
  success: "#22c55e",
  error: "#f43f5e",
  info: "#3b82f6",
});
```

---

# 🎨 Global Color Overriding

You can override **all toast & dialog colors**:

```js
BFKR.config.setColors({
  success: "#22c55e",
  error: "#ef4444",
  warning: "#facc15",
  info: "#38bdf8",
  primary: "#a855f7",
  dark: "#020617",
  custom: "#e11d48",
});
```

Dialog colors:

```js
BFKR.config.setDialogColors({
  ok: "#22c55e",
  cancel: "#f97316",
  background: "rgba(15,23,42,0.95)",
  text: "#e5e7eb",
});
```

---

# ⚙️ Advanced

## Programmatic position update

```js
BFKR.Toast.setPosition("bottom-center");
```

## Programmatic animation update

```js
BFKR.Toast.show("Hello!", "info", { animation: "zoom" });
```

## Custom dialog width & style

```js
BFKR.Dialog.alert("Custom Style", {
  width: "480px",
  style: {
    background: "#fff",
    padding: "28px",
    borderRadius: "14px"
  }
});
```

---

# 📘 TypeScript Support

UI Alerts comes with **first-class TypeScript support** and provides comprehensive type definitions out of the box.

## Installation with TypeScript

```bash
npm install @pakoor/ui-alerts
# No additional TypeScript packages required - types are included!
```

## TypeScript Usage Examples

### Basic TypeScript Usage

```typescript
import { Toast, Dialog, type ToastOptions, type DialogOptions } from '@pakoor/ui-alerts';
import '@pakoor/ui-alerts/dist/style.min.css';

// Fully typed toast
const toastOptions: ToastOptions = {
  title: "Success!",
  icon: "✅",
  duration: 3000,
  animation: "bounce",
  position: "top-right"
};

Toast.show("Data saved successfully", "success", toastOptions);

// Fully typed dialog
const dialogOptions: DialogOptions = {
  type: "warning",
  title: "Confirm Delete",
  icon: "⚠️",
  onConfirm: (confirmed: boolean) => {
    if (confirmed) {
      Toast.show("Item deleted", "success");
    }
  }
};

Dialog.confirm("Are you sure you want to delete this item?", dialogOptions);
```

### Advanced TypeScript Configuration

```typescript
import {
  Toast,
  Dialog,
  config,
  type ToastType,
  type ToastPosition,
  type ToastAnimation,
  type GlobalColors,
  type GlobalDialogColors
} from '@pakoor/ui-alerts';

// Type-safe theme configuration
const customColors: GlobalColors = {
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
  primary: "#8b5cf6",
  dark: "#1f2937",
  custom: "#ec4899"
};

config.setColors(customColors);

// Type-safe position and animation
const position: ToastPosition = "bottom-center";
const animation: ToastAnimation = "zoom";

Toast.setPosition(position);
Toast.show("Animated notification", "info", { animation });
```

### React with TypeScript

```tsx
import React from 'react';
import { useBFKR } from '@pakoor/ui-alerts/react';
import '@pakoor/ui-alerts/dist/style.min.css';

interface NotificationButtonProps {
  message: string;
  type: ToastType;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({ message, type }) => {
  const { toast, dialog } = useBFKR();

  const handleToast = () => {
    toast[type](message);
  };

  const handleConfirm = () => {
    dialog.confirm(`Send ${message}?`, {
      type: "info",
      onConfirm: (confirmed: boolean) => {
        if (confirmed) {
          toast.success("Message sent!");
        }
      }
    });
  };

  return (
    <div>
      <button onClick={handleToast}>Show Toast</button>
      <button onClick={handleConfirm}>Show Confirm</button>
    </div>
  );
};
```

### Vue 3 with TypeScript

```vue
<template>
  <button @click="showToast">Show Toast</button>
  <button @click="showConfirm">Show Confirm</button>
</template>

<script setup lang="ts">
import { useBFKR } from '@pakoor/ui-alerts/vue';
import type { ToastType, DialogOptions } from '@pakoor/ui-alerts';

const { toast, dialog } = useBFKR();

const showToast = () => {
  toast.success('Hello from TypeScript Vue!');
};

const showConfirm = () => {
  const options: DialogOptions = {
    type: 'warning',
    title: 'Confirm Action',
    onConfirm: (confirmed: boolean) => {
      if (confirmed) {
        toast.info('Action confirmed!');
      }
    }
  };

  dialog.confirm('Are you sure?', options);
};
</script>
```

## Available Types

### Core Types
- `ToastType`: `"success" | "error" | "warning" | "info" | "primary" | "dark" | "custom"`
- `ToastPosition`: `"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"`
- `ToastAnimation`: `"slide" | "fade" | "bounce" | "zoom" | "ease-in" | "ease-out"`

### Interface Types
- `ToastOptions`: Configuration for toast notifications
- `DialogOptions`: Configuration for dialog boxes
- `DialogButtonStyles`: Styling options for dialog buttons
- `GlobalColors`: Color theme configuration
- `GlobalDialogColors`: Dialog-specific color configuration

### API Interfaces
- `ToastAPI`: Toast-related methods
- `DialogAPI`: Dialog-related methods
- `ConfigAPI`: Global configuration methods
- `BFKRExport`: Main library export shape

## TypeScript Configuration

No additional configuration needed! The library includes:

✅ **Built-in type definitions** - No `@types` package required
✅ **Full IntelliSense support** - Complete autocomplete in VS Code
✅ **UMD/ESM compatibility** - Works with all module systems
✅ **React/Vue type integration** - Typed hooks and composables
✅ **Strict type safety** - All APIs properly typed

---

# 🧪 Type Definitions

Automatic typings are generated in:

```
dist/index.d.ts
```

Full IntelliSense support for:

* Toast APIs with `ToastOptions`
* Dialog APIs with `DialogOptions`
* Theme configuration types
* React Hook with proper typing
* Vue Plugin with Composition API support
* Global Config with type safety

---

# 🤝 Contributing

Contributions are welcome!
Feel free to submit:

* Bug reports
* Feature requests
* Pull requests
* Themes
* New UI variants

Fork the repo and send a PR 🚀

---

# 📄 License

**MIT License**
Free to use, modify, distribute, and commercialize.

---

# If you like this package

Give it a star ⭐ on GitHub to support development!
Thank you 🙏

