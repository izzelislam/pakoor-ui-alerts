# Getting Started

UI Alerts is a modern, lightweight notification and dialog library that works seamlessly across different frameworks and environments. With **zero dependencies**, **TypeScript support**, and **6 beautiful themes**, it's perfect for any modern web application.

## ✨ Key Features

- 🚀 **Lightning Fast** - < 20KB gzipped, zero dependencies
- 🎨 **6 Built-in Themes** - Default, Brutalism, Glass, Minimal, Modern, Modern Dark
- ⚡ **Rich Animations** - Slide, fade, bounce, zoom, ease-in, ease-out
- 📱 **Mobile Optimized** - Fully responsive design
- 🔧 **TypeScript First** - Complete type definitions included
- 🌍 **Universal** - Works with CDN, ESM, UMD, CommonJS
- 🎯 **Developer Friendly** - Simple API with powerful customization

## Installation

### Package Managers

```bash
# NPM
npm install @pakoor/ui-alerts

# Yarn
yarn add @pakoor/ui-alerts

# Pnpm
pnpm add @pakoor/ui-alerts

# Bun
bun add @pakoor/ui-alerts
```

### CDN for Quick Start

```html
<!-- Complete CSS and JS bundle -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/style.min.css" />
<script src="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/alerts.umd.min.js"></script>
```

### Framework-Specific Imports

```javascript
// ES Modules
import { Toast, Dialog } from '@pakoor/ui-alerts';
import '@pakoor/ui-alerts/dist/style.min.css';

// React
import { useBFKR } from '@pakoor/ui-alerts/react';

// Vue 3
import { useBFKR } from '@pakoor/ui-alerts/vue';
// or plugin mode
import { BFKRPlugin } from '@pakoor/ui-alerts/vue';
```

## Quick Start Examples

### 🌐 Browser/CDN Usage

```html
<script>
  // Basic toast notifications
  BFKR.Toast.success("🎉 Success! Operation completed");
  BFKR.Toast.error("❌ Error! Something went wrong");
  BFKR.Toast.warning("⚠️ Warning! Please review input");
  BFKR.Toast.info("ℹ️ Info! New updates available");

  // Dialog boxes
  BFKR.Dialog.alert("Welcome to UI Alerts!");

  BFKR.Dialog.confirm("Delete this item?", {
    type: "warning",
    title: "⚠️ Confirm Delete",
    onConfirm: (yes) => {
      if (yes) {
        BFKR.Toast.success("✅ Item deleted!");
      }
    }
  });

  // Prompt for user input
  BFKR.Dialog.prompt("What's your name?", {
    type: "info",
    title: "👋 Welcome!",
    onSubmit: (name) => {
      if (name) BFKR.Toast.success(`Hello, ${name}!`);
    }
  });
</script>
```

### ⚛️ React Hook Usage

```tsx
import React from 'react';
import { useBFKR } from '@pakoor/ui-alerts/react';
import '@pakoor/ui-alerts/dist/style.min.css';

function App() {
  const { toast, dialog, theme } = useBFKR();

  const handleSuccess = () => {
    toast.success("🎉 Operation completed successfully!");
  };

  const handleConfirm = () => {
    dialog.confirm("Delete this item?", {
      type: "warning",
      title: "⚠️ Confirm Delete",
      onConfirm: (confirmed) => {
        if (confirmed) {
          toast.success("✅ Item deleted!");
        }
      }
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleConfirm}>Show Confirm</button>
      <button onClick={() => dialog.prompt("Enter your name:", {
        onSubmit: (name) => name && toast.success(`Hello, ${name}!`)
      })}>
        Get Name
      </button>
    </div>
  );
}
```

### 🟦 Vue 3 Usage

```vue
<template>
  <div>
    <button @click="showToast">Show Toast</button>
    <button @click="showConfirm">Show Confirm</button>
  </div>
</template>

<script setup>
import { useBFKR } from '@pakoor/ui-alerts/vue';

const { toast, dialog, theme } = useBFKR();

const showToast = () => {
  toast.success('🎉 Hello from Vue!');
};

const showConfirm = () => {
  dialog.confirm('Are you sure?', {
    type: 'warning',
    title: '⚠️ Confirmation',
    onConfirm: (confirmed) => {
      if (confirmed) {
        toast.info('✅ Action confirmed!');
      }
    }
  });
};
</script>
```

## 🎨 Toast Types & Options

### All Toast Types

```javascript
// Basic toast types
Toast.success("✅ Success message");
Toast.error("❌ Error message");
Toast.warning("⚠️ Warning message");
Toast.info("ℹ️ Info message");
Toast.primary("🎯 Primary message");
Toast.dark("🌙 Dark message");

// Generic show method
Toast.show("Generic message", "success", {
  title: "Custom Title",
  icon: "🎉"
});
```

### Toast Positions

```javascript
// Available positions
const positions = [
  'top-left', 'top-center', 'top-right',
  'bottom-left', 'bottom-center', 'bottom-right'
];

// Set default position
Toast.setPosition("bottom-right");

// Or per toast
Toast.show("Positioned toast!", "info", {
  position: "top-center"
});
```

### Toast Animations

```javascript
// Available animations
const animations = ['slide', 'fade', 'bounce', 'zoom', 'ease-in', 'ease-out'];

// Custom animation per toast
Toast.show("Animated notification!", "success", {
  animation: "bounce",
  duration: 5000,
  title: "🎯 Custom Animation"
});
```

### Advanced Toast Styling

```javascript
Toast.show("Highly customized toast!", "custom", {
  title: "🎨 Custom Design",
  icon: "🌟",
  duration: 6000,
  position: "top-right",
  animation: "bounce",
  customStyle: {
    background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    borderRadius: "16px",
    border: "2px solid #4c51bf",
    boxShadow: "0 10px 25px rgba(102, 126, 234, 0.4)",
    padding: "20px",
    fontSize: "16px",
    fontFamily: "system-ui, -apple-system, sans-serif"
  }
});
```

## 🧊 Dialog Types & Options

### Alert Dialog

```javascript
Dialog.alert("📢 Important system announcement!", {
  title: "System Notice",
  type: "info",
  icon: "📡",
  width: "450px",
  style: {
    background: "#f0f9ff",
    border: "1px solid #0ea5e9",
    borderRadius: "12px"
  }
});
```

### Confirmation Dialog

```javascript
Dialog.confirm("🗑️ Delete this item permanently?", {
  title: "⚠️ Confirm Permanent Delete",
  type: "warning",
  icon: "⚡",
  width: "400px",
  buttonStyle: {
    ok: {
      background: "#ef4444",
      color: "#ffffff",
      borderRadius: "8px",
      fontWeight: "bold"
    },
    cancel: {
      background: "#f3f4f6",
      color: "#374151",
      borderRadius: "8px"
    }
  },
  onConfirm: (confirmed) => {
    if (confirmed) {
      Toast.success("✅ Item deleted successfully!");
    } else {
      Toast.info("ℹ️ Action cancelled");
    }
  }
});
```

### Prompt Dialog

```javascript
Dialog.prompt("📧 Enter your email address:", {
  title: "🔐 Email Required",
  type: "info",
  icon: "📮",
  width: "400px",
  onSubmit: (value) => {
    if (!value) {
      Toast.warning("⚠️ Email is required");
      return;
    }
    if (!value.includes('@')) {
      Toast.error("❌ Please enter a valid email");
      return;
    }
    Toast.success(`✅ Email registered: ${value}`);
  }
});
```

## 🎨 Built-in Themes

```javascript
// Available themes: default, brutalism, glass, minimal, modern, modernDark

// Apply themes
Toast.setTheme("brutalism");
Dialog.setTheme("glass");

// Modern dark theme for dark mode
Toast.setTheme("modernDark");
Dialog.setTheme("modernDark");

// Glass theme for elegant look
Toast.setTheme("glass");
Dialog.setTheme("glass");
```

## ⚙️ Global Configuration

### Color Customization

```javascript
import { config } from '@pakoor/ui-alerts';

// Override global colors
config.setColors({
  success: "#10b981",    // Green
  error: "#ef4444",      // Red
  warning: "#f59e0b",    // Yellow
  info: "#3b82f6",       // Blue
  primary: "#8b5cf6",    // Purple
  dark: "#1f2937",       // Dark gray
  custom: "#ec4899"      // Pink
});

// Configure dialog-specific colors
config.setDialogColors({
  ok: "#10b981",         // Confirm button
  cancel: "#6b7280",     // Cancel button
  background: "#ffffff", // Dialog background
  text: "#1f2937"        // Text color
});
```

### Environment-Specific Configuration

```javascript
// Development configuration
if (process.env.NODE_ENV === 'development') {
  config.setColors({
    success: "#059669",
    error: "#dc2626",
    warning: "#d97706",
    info: "#2563eb"
  });
  Toast.setTheme("default");
}

// Production configuration
if (process.env.NODE_ENV === 'production') {
  config.setColors({
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6"
  });
  Toast.setTheme("modern");
}
```

## 🔒 TypeScript Support

UI Alerts comes with **complete TypeScript support** out of the box:

```typescript
import {
  Toast,
  Dialog,
  config,
  type ToastOptions,
  type DialogOptions,
  type ToastType,
  type ToastPosition,
  type ToastAnimation,
  type GlobalColors
} from '@pakoor/ui-alerts';

// Fully typed configuration
const toastOptions: ToastOptions = {
  title: "Success! 🎉",
  duration: 3000,
  position: "bottom-right" as ToastPosition,
  animation: "bounce" as ToastAnimation,
  customStyle: {
    background: "linear-gradient(45deg, #667eea, #764ba2)",
    color: "#ffffff",
    borderRadius: "12px"
  }
};

const dialogOptions: DialogOptions = {
  type: "warning" as ToastType,
  title: "⚠️ Confirm Action",
  icon: "⚡",
  width: "400px",
  onConfirm: (confirmed: boolean) => {
    if (confirmed) {
      Toast.show("Action confirmed!", "success", toastOptions);
    }
  }
};

// Type-safe global configuration
const colors: GlobalColors = {
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
  primary: "#8b5cf6"
};

config.setColors(colors);
```

## 🚀 Next Steps

Now that you've got the basics down, explore our comprehensive guides:

- **[Browser Usage](/guide/browser)** - Deep dive into browser-specific features and CDN usage
- **[React Integration](/guide/react)** - Complete React hook guide with TypeScript examples
- **[Vue Integration](/guide/vue)** - Vue composables, plugin setup, and Composition API
- **[Themes & Customization](/guide/themes)** - Theme system, styling, and brand customization
- **[Configuration](/guide/config)** - Advanced configuration options and patterns
- **[Dialog API Reference](/guide/dialog)** - Complete dialog API documentation

## 🎯 Quick Reference

```javascript
// Quick copy-paste examples
import { Toast, Dialog } from '@pakoor/ui-alerts';
import '@pakoor/ui-alerts/dist/style.min.css';

// Basic usage
Toast.success("✅ Success!");
Dialog.alert("ℹ️ Information!");

// Advanced usage
Toast.show("Custom message", "success", {
  title: "Custom Title",
  position: "bottom-right",
  animation: "bounce"
});

Dialog.confirm("Are you sure?", {
  type: "warning",
  onConfirm: (yes) => yes && Toast.success("✅ Confirmed!")
});
```

That's it! You're now ready to create beautiful, responsive notifications and dialogs with UI Alerts. 🎉