# Configuration

UI Alerts provides extensive configuration options to customize the behavior, appearance, and defaults across your application.

## Global Configuration

### Basic Configuration

```javascript
import { config, Toast, Dialog } from '@pakoor/ui-alerts';

// Configure global colors
config.setColors({
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  primary: '#8b5cf6',
  dark: '#1f2937',
  custom: '#ec4899'
});

// Configure dialog-specific colors
config.setDialogColors({
  ok: '#10b981',
  cancel: '#6b7280',
  background: '#ffffff',
  text: '#1f2937'
});
```

### Color Types

```typescript
interface GlobalColors {
  success?: string;    // Success notifications
  error?: string;      // Error notifications
  warning?: string;    // Warning notifications
  info?: string;       // Info notifications
  primary?: string;    // Primary notifications
  dark?: string;       // Dark notifications
  custom?: string;     // Custom notifications
}

interface GlobalDialogColors {
  ok?: string;         // Confirm button color
  cancel?: string;     // Cancel button color
  background?: string; // Dialog background color
  text?: string;       // Dialog text color
}
```

## Toast Configuration

### Default Settings

```javascript
import { Toast } from '@pakoor/ui-alerts';

// Set default position
Toast.setPosition('bottom-right');

// Set default theme
Toast.setTheme('modern');

// Override individual defaults
Toast.show("Custom default toast!", "success", {
  duration: 5000,
  animation: "bounce",
  position: "top-center"
});
```

### Position Options

```javascript
// Available positions
const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right'
];

// Set default position
Toast.setPosition('bottom-right');

// Or set per toast
Toast.show("Positioned toast!", "info", {
  position: 'top-center'
});
```

### Animation Options

```javascript
// Available animations
const animations = [
  'slide',
  'fade',
  'bounce',
  'zoom',
  'ease-in',
  'ease-out'
];

// Set animation per toast
Toast.show("Animated toast!", "success", {
  animation: 'bounce'
});
```

## Dialog Configuration

### Default Dialog Settings

```javascript
import { Dialog } from '@pakoor/ui-alerts';

// Set default theme
Dialog.setTheme('modern');

// Configure default dialog options
Dialog.alert("System maintenance scheduled", {
  type: "info",
  title: "System Notice",
  width: "450px"
});
```

### Dialog Width Options

```javascript
// Common width presets
const dialogSizes = {
  small: '300px',
  medium: '450px',
  large: '600px',
  fullscreen: '90vw'
};

// Usage
Dialog.confirm("Delete this item?", {
  width: '400px',
  type: 'warning'
});
```

### Button Styling

```javascript
Dialog.confirm("Save changes before leaving?", {
  type: 'warning',
  buttonStyle: {
    ok: {
      background: '#10b981',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      fontWeight: '600',
      boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
    },
    cancel: {
      background: '#f3f4f6',
      color: '#374151',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '12px 24px',
      fontWeight: '600'
    }
  }
});
```

## Advanced Configuration

### Environment-Based Configuration

```javascript
import { config } from '@pakoor/ui-alerts';

function configureEnvironment() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';

  if (isDevelopment) {
    // Development settings - longer duration for debugging
    config.setColors({
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    });
  } else if (isProduction) {
    // Production settings - optimized for users
    config.setColors({
      success: '#059669',
      error: '#dc2626',
      warning: '#d97706',
      info: '#2563eb'
    });
  }
}

configureEnvironment();
```

### Feature Flag Configuration

```javascript
function configureWithFeatureFlags(features) {
  const baseConfig = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    primary: '#8b5cf6'
  };

  if (features.darkMode) {
    baseConfig.dark = '#f3f4f6';
    config.setDialogColors({
      background: '#1f2937',
      text: '#f3f4f6'
    });
  }

  if (features.customBrand) {
    baseConfig.primary = features.brandColor;
  }

  config.setColors(baseConfig);
}

// Usage
configureWithFeatureFlags({
  darkMode: true,
  customBrand: true,
  brandColor: '#6366f1'
});
```

### User Preference Configuration

```javascript
function configureForUser(userPreferences) {
  const { theme, animations, duration, position } = userPreferences;

  // Set theme
  Toast.setTheme(theme || 'default');
  Dialog.setTheme(theme || 'default');

  // Configure animations if reduced motion is preferred
  if (!animations) {
    Toast.show("Static toast", "info", { animation: 'fade' });
  }

  // Set default position
  if (position) {
    Toast.setPosition(position);
  }

  // Set custom duration
  const defaultDuration = duration || 3000;

  // Override all toasts to use user's preferred duration
  const originalShow = Toast.show;
  Toast.show = function(message, type, options = {}) {
    return originalShow.call(this, message, type, {
      duration: defaultDuration,
      ...options
    });
  };
}

// Load from localStorage
const userPrefs = JSON.parse(localStorage.getItem('ui-alerts-prefs') || '{}');
configureForUser(userPrefs);
```

## Configuration Presets

### Material Design Preset

```javascript
function applyMaterialDesignPreset() {
  config.setColors({
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    primary: '#673ab7',
    dark: '#212121'
  });

  config.setDialogColors({
    ok: '#4caf50',
    cancel: '#757575',
    background: '#ffffff',
    text: '#212121'
  });

  Toast.setTheme('minimal');
  Dialog.setTheme('minimal');
}

applyMaterialDesignPreset();
```

### Bootstrap Preset

```javascript
function applyBootstrapPreset() {
  config.setColors({
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b2',
    primary: '#007bff',
    dark: '#343a40'
  });

  config.setDialogColors({
    ok: '#28a745',
    cancel: '#6c757d',
    background: '#ffffff',
    text: '#212529'
  });

  Toast.setTheme('default');
  Dialog.setTheme('default');
}

applyBootstrapPreset();
```

### Tailwind CSS Preset

```javascript
function applyTailwindPreset() {
  config.setColors({
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    primary: '#8b5cf6',
    dark: '#1f2937'
  });

  config.setDialogColors({
    ok: '#10b981',
    cancel: '#6b7280',
    background: '#ffffff',
    text: '#111827'
  });

  Toast.setTheme('modern');
  Dialog.setTheme('modern');
}

applyTailwindPreset();
```

## Framework-Specific Configuration

### React Configuration Hook

```typescript
// hooks/useUIConfig.ts
import { useEffect } from 'react';
import { useBFKR } from '@pakoor/ui-alerts/react';
import type { GlobalColors, GlobalDialogColors } from '@pakoor/ui-alerts';

interface UIConfig {
  colors?: GlobalColors;
  dialogColors?: GlobalDialogColors;
  theme?: string;
  position?: string;
}

export function useUIConfig(config: UIConfig) {
  const { theme } = useBFKR();

  useEffect(() => {
    if (config.colors) {
      // Import config function
      const { config: uiConfig } = await import('@pakoor/ui-alerts');
      uiConfig.setColors(config.colors);
    }

    if (config.dialogColors) {
      const { config: uiConfig } = await import('@pakoor/ui-alerts');
      uiConfig.setDialogColors(config.dialogColors);
    }

    if (config.theme) {
      const { Toast, Dialog } = await import('@pakoor/ui-alerts');
      Toast.setTheme(config.theme);
      Dialog.setTheme(config.theme);
    }

    if (config.position) {
      const { Toast } = await import('@pakoor/ui-alerts');
      Toast.setPosition(config.position);
    }
  }, [config]);
}

// Usage
function App() {
  const config = {
    colors: {
      primary: '#6366f1',
      success: '#10b981'
    },
    theme: 'modern',
    position: 'bottom-right'
  };

  useUIConfig(config);

  return <YourApp />;
}
```

### Vue Configuration Composable

```typescript
// composables/useUIConfig.ts
import { watch, onMounted } from 'vue';
import { useBFKR } from '@pakoor/ui-alerts/vue';
import type { GlobalColors, GlobalDialogColors } from '@pakoor/ui-alerts';

export function useUIConfig(config: {
  colors?: GlobalColors;
  dialogColors?: GlobalDialogColors;
  theme?: string;
  position?: string;
}) {
  const { theme } = useBFKR();

  onMounted(() => {
    applyConfig();
  });

  watch(() => config, applyConfig, { deep: true });

  async function applyConfig() {
    const { config: uiConfig, Toast, Dialog } = await import('@pakoor/ui-alerts');

    if (config.colors) {
      uiConfig.setColors(config.colors);
    }

    if (config.dialogColors) {
      uiConfig.setDialogColors(config.dialogColors);
    }

    if (config.theme) {
      Toast.setTheme(config.theme);
      Dialog.setTheme(config.theme);
    }

    if (config.position) {
      Toast.setPosition(config.position);
    }
  }

  return {
    updateConfig: (newConfig: Partial<typeof config>) => {
      Object.assign(config, newConfig);
    }
  };
}

// Usage
<script setup>
import { reactive } from 'vue';
import { useUIConfig } from '@/composables/useUIConfig';

const uiConfig = reactive({
  theme: 'modern',
  position: 'bottom-right',
  colors: {
    primary: '#6366f1',
    success: '#10b981'
  }
});

useUIConfig(uiConfig);
</script>
```

## Configuration Validation

### Validate Color Configuration

```javascript
function validateColors(colors) {
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  for (const [key, value] of Object.entries(colors)) {
    if (value && !colorRegex.test(value)) {
      throw new Error(`Invalid color format for ${key}: ${value}`);
    }
  }
}

// Usage
try {
  const colors = {
    success: '#10b981',
    error: '#invalid-color'
  };

  validateColors(colors);
  config.setColors(colors);
} catch (error) {
  console.error('Configuration error:', error.message);
}
```

## Performance Considerations

### Optimize Configuration Updates

```javascript
let configUpdateTimeout;

function debouncedConfigUpdate(colors) {
  clearTimeout(configUpdateTimeout);

  configUpdateTimeout = setTimeout(() => {
    config.setColors(colors);
  }, 100);
}

// Usage in rapidly changing scenarios
function handleThemeChange(newTheme) {
  debouncedConfigUpdate(newTheme.colors);
}
```

## Advanced Configuration Patterns

### Configuration Management System

```javascript
// Advanced configuration manager
class UIManager {
  constructor() {
    this.config = {
      global: {},
      toast: {},
      dialog: {},
      theme: 'default',
      position: 'bottom-right'
    };
    this.presets = new Map();
    this.middleware = [];
    this.observers = new Set();
    this.init();
  }

  init() {
    this.loadPresets();
    this.loadUserPreferences();
    this.setupAutoSave();
    this.setupEnvironmentDetection();
  }

  // Configuration management
  setGlobalConfig(config) {
    this.validateConfig(config);
    this.config.global = { ...this.config.global, ...config };
    this.applyGlobalConfig();
    this.notifyObservers('global', config);
    return this;
  }

  setToastConfig(config) {
    this.validateConfig(config);
    this.config.toast = { ...this.config.toast, ...config };
    this.applyToastConfig();
    this.notifyObservers('toast', config);
    return this;
  }

  setDialogConfig(config) {
    this.validateConfig(config);
    this.config.dialog = { ...this.config.dialog, ...config };
    this.applyDialogConfig();
    this.notifyObservers('dialog', config);
    return this;
  }

  // Preset management
  registerPreset(name, preset) {
    this.presets.set(name, preset);
    return this;
  }

  applyPreset(name) {
    const preset = this.presets.get(name);
    if (!preset) {
      throw new Error(`Preset "${name}" not found`);
    }

    return this
      .setGlobalConfig(preset.global || {})
      .setToastConfig(preset.toast || {})
      .setDialogConfig(preset.dialog || {})
      .setTheme(preset.theme || 'default');
  }

  // Middleware system
  use(middleware) {
    this.middleware.push(middleware);
    return this;
  }

  applyMiddleware(type, config) {
    return this.middleware.reduce((acc, middleware) => {
      if (middleware[type]) {
        return middleware[type](acc) || acc;
      }
      return acc;
    }, config);
  }

  // Observer pattern
  subscribe(observer) {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }

  notifyObservers(type, config) {
    this.observers.forEach(observer => {
      try {
        observer(type, config);
      } catch (error) {
        console.error('Observer error:', error);
      }
    });
  }

  // Configuration validation
  validateConfig(config) {
    const validators = {
      colors: (colors) => this.validateColors(colors),
      theme: (theme) => this.validateTheme(theme),
      position: (position) => this.validatePosition(position),
      duration: (duration) => this.validateDuration(duration),
      animation: (animation) => this.validateAnimation(animation)
    };

    for (const [key, value] of Object.entries(config)) {
      if (validators[key] && !validators[key](value)) {
        throw new Error(`Invalid configuration for ${key}: ${value}`);
      }
    }

    return true;
  }

  validateColors(colors) {
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(|^rgba\(|^hsl\(|^hsla\(/;

    for (const [colorName, colorValue] of Object.entries(colors)) {
      if (typeof colorValue !== 'string' || !colorRegex.test(colorValue)) {
        throw new Error(`Invalid color format for ${colorName}: ${colorValue}`);
      }
    }

    return true;
  }

  validateTheme(theme) {
    const validThemes = ['default', 'brutalism', 'glass', 'minimal', 'modern', 'modernDark'];
    return validThemes.includes(theme);
  }

  validatePosition(position) {
    const validPositions = [
      'top-left', 'top-center', 'top-right',
      'bottom-left', 'bottom-center', 'bottom-right'
    ];
    return validPositions.includes(position);
  }

  validateDuration(duration) {
    return typeof duration === 'number' && duration >= 0 && duration <= 60000;
  }

  validateAnimation(animation) {
    const validAnimations = ['slide', 'fade', 'bounce', 'zoom', 'ease-in', 'ease-out'];
    return validAnimations.includes(animation);
  }

  // Configuration application
  applyGlobalConfig() {
    const config = this.applyMiddleware('global', this.config.global);

    if (config.colors) {
      const { config: uiConfig } = require('@pakoor/ui-alerts');
      uiConfig.setColors(config.colors);
    }

    if (config.dialogColors) {
      const { config: uiConfig } = require('@pakoor/ui-alerts');
      uiConfig.setDialogColors(config.dialogColors);
    }
  }

  applyToastConfig() {
    const config = this.applyMiddleware('toast', this.config.toast);
    const { Toast } = require('@pakoor/ui-alerts');

    if (config.theme) {
      Toast.setTheme(config.theme);
    }

    if (config.position) {
      Toast.setPosition(config.position);
    }

    if (config.defaults) {
      this.setToastDefaults(config.defaults);
    }
  }

  applyDialogConfig() {
    const config = this.applyMiddleware('dialog', this.config.dialog);
    const { Dialog } = require('@pakoor/ui-alerts');

    if (config.theme) {
      Dialog.setTheme(config.theme);
    }

    if (config.defaults) {
      this.setDialogDefaults(config.defaults);
    }
  }

  setToastDefaults(defaults) {
    const originalShow = Toast.show;
    Toast.show = function(message, type, options = {}) {
      return originalShow.call(this, message, type, {
        ...defaults,
        ...options
      });
    };
  }

  setDialogDefaults(defaults) {
    const originalAlert = Dialog.alert;
    const originalConfirm = Dialog.confirm;
    const originalPrompt = Dialog.prompt;

    Dialog.alert = function(message, options = {}) {
      return originalAlert.call(this, message, {
        ...defaults,
        ...options
      });
    };

    Dialog.confirm = function(message, options = {}) {
      return originalConfirm.call(this, message, {
        ...defaults,
        ...options
      });
    };

    Dialog.prompt = function(message, options = {}) {
      return originalPrompt.call(this, message, {
        ...defaults,
        ...options
      });
    };
  }

  // Environment detection
  setupEnvironmentDetection() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isProduction = process.env.NODE_ENV === 'production';
    const isTest = process.env.NODE_ENV === 'test';

    if (isDevelopment) {
      this.applyPreset('development');
    } else if (isProduction) {
      this.applyPreset('production');
    } else if (isTest) {
      this.applyPreset('test');
    }

    // Detect system preferences
    this.detectSystemPreferences();
  }

  detectSystemPreferences() {
    // Reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.setToastConfig({ defaults: { animation: 'fade' } });
    }

    // Dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.applyPreset('dark');
    }

    // High contrast
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      this.applyPreset('high-contrast');
    }
  }

  // User preferences
  loadUserPreferences() {
    try {
      const prefs = localStorage.getItem('ui-alerts-config');
      if (prefs) {
        const userConfig = JSON.parse(prefs);
        this.setGlobalConfig(userConfig.global || {});
        this.setToastConfig(userConfig.toast || {});
        this.setDialogConfig(userConfig.dialog || {});

        if (userConfig.theme) {
          this.setTheme(userConfig.theme);
        }
      }
    } catch (error) {
      console.warn('Failed to load user preferences:', error);
    }
  }

  // Auto-save configuration
  setupAutoSave() {
    this.subscribe((type, config) => {
      this.saveUserPreferences();
    });
  }

  saveUserPreferences() {
    try {
      const config = {
        global: this.config.global,
        toast: this.config.toast,
        dialog: this.config.dialog,
        theme: this.config.theme
      };

      localStorage.setItem('ui-alerts-config', JSON.stringify(config));
    } catch (error) {
      console.warn('Failed to save user preferences:', error);
    }
  }

  // Preset definitions
  loadPresets() {
    // Development preset
    this.registerPreset('development', {
      global: {
        colors: {
          success: '#10b981',
          error: '#ef4444',
          warning: '#f59e0b',
          info: '#3b82f6'
        }
      },
      toast: {
        defaults: {
          duration: 5000, // Longer for debugging
          animation: 'bounce'
        }
      },
      theme: 'default'
    });

    // Production preset
    this.registerPreset('production', {
      global: {
        colors: {
          success: '#059669',
          error: '#dc2626',
          warning: '#d97706',
          info: '#2563eb'
        }
      },
      toast: {
        defaults: {
          duration: 3000,
          animation: 'slide'
        }
      },
      theme: 'modern'
    });

    // Test preset
    this.registerPreset('test', {
      toast: {
        defaults: {
          duration: 100, // Very short for tests
          animation: 'none'
        }
      },
      theme: 'minimal'
    });

    // Accessibility preset
    this.registerPreset('accessibility', {
      global: {
        colors: {
          success: '#00ff00',
          error: '#ff0000',
          warning: '#ffff00',
          info: '#00ffff',
          primary: '#ffffff'
        }
      },
      toast: {
        defaults: {
          duration: 10000, // Longer for reading
          animation: 'fade',
          customStyle: {
            fontSize: '18px',
            fontWeight: 'bold',
            padding: '20px',
            minWidth: '300px'
          }
        }
      },
      theme: 'minimal'
    });

    // Dark mode preset
    this.registerPreset('dark', {
      global: {
        colors: {
          success: '#34d399',
          error: '#f87171',
          warning: '#fbbf24',
          info: '#60a5fa',
          primary: '#a78bfa',
          dark: '#f3f4f6'
        },
        dialogColors: {
          background: '#1f2937',
          text: '#f3f4f6',
          ok: '#10b981',
          cancel: '#6b7280'
        }
      },
      theme: 'modernDark'
    });

    // High contrast preset
    this.registerPreset('high-contrast', {
      global: {
        colors: {
          success: '#00ff00',
          error: '#ff0000',
          warning: '#ffff00',
          info: '#00ffff',
          primary: '#ffffff'
        }
      },
      toast: {
        defaults: {
          customStyle: {
            background: '#000000',
            color: '#ffffff',
            border: '3px solid currentColor',
            borderRadius: '0px'
          }
        }
      },
      theme: 'minimal'
    });
  }

  // Theme management
  setTheme(theme) {
    this.config.theme = theme;
    const { Toast, Dialog } = require('@pakoor/ui-alerts');
    Toast.setTheme(theme);
    Dialog.setTheme(theme);
    return this;
  }

  getTheme() {
    return this.config.theme;
  }

  // Configuration export/import
  exportConfig() {
    return {
      global: this.config.global,
      toast: this.config.toast,
      dialog: this.config.dialog,
      theme: this.config.theme,
      version: '1.0.0'
    };
  }

  importConfig(config) {
    if (config.version !== '1.0.0') {
      throw new Error('Incompatible configuration version');
    }

    return this
      .setGlobalConfig(config.global || {})
      .setToastConfig(config.toast || {})
      .setDialogConfig(config.dialog || {})
      .setTheme(config.theme || 'default');
  }

  // Reset configuration
  reset() {
    this.config = {
      global: {},
      toast: {},
      dialog: {},
      theme: 'default',
      position: 'bottom-right'
    };

    // Clear localStorage
    localStorage.removeItem('ui-alerts-config');

    // Apply default configuration
    this.applyGlobalConfig();
    this.applyToastConfig();
    this.applyDialogConfig();

    return this;
  }
}

// Global instance
export const uiManager = new UIManager();

// Usage examples
export default uiManager;
```

### Enterprise Configuration

```javascript
// Enterprise-level configuration with feature flags
class EnterpriseUIManager extends UIManager {
  constructor() {
    super();
    this.featureFlags = new Map();
    this.audienceSegments = new Map();
    this.abTests = new Map();
    this.analytics = new Map();
    this.initEnterprise();
  }

  initEnterprise() {
    this.loadFeatureFlags();
    this.loadAudienceSegments();
    this.setupAnalytics();
    this.loadABTestConfigurations();
  }

  // Feature flag management
  setFeatureFlag(name, enabled, conditions = {}) {
    this.featureFlags.set(name, { enabled, conditions });
    this.reapplyConfiguration();
    return this;
  }

  isFeatureEnabled(name, context = {}) {
    const flag = this.featureFlags.get(name);
    if (!flag) return false;

    if (!flag.enabled) return false;

    // Check conditions
    return this.evaluateConditions(flag.conditions, context);
  }

  evaluateConditions(conditions, context) {
    if (conditions.userRole && context.userRole !== conditions.userRole) {
      return false;
    }

    if (conditions.environment && process.env.NODE_ENV !== conditions.environment) {
      return false;
    }

    if (conditions.audience && !this.isInAudience(context.userId, conditions.audience)) {
      return false;
    }

    return true;
  }

  // Audience segmentation
  defineAudience(name, rules) {
    this.audienceSegments.set(name, rules);
    return this;
  }

  isInAudience(userId, audienceName) {
    const rules = this.audienceSegments.get(audienceName);
    if (!rules) return false;

    // Implement audience logic (e.g., based on user properties)
    return this.checkAudienceRules(userId, rules);
  }

  checkAudienceRules(userId, rules) {
    // This would integrate with your user management system
    // For now, return a simple implementation
    return Math.random() < (rules.percentage || 0.5);
  }

  // A/B testing
  defineABTest(name, variants, trafficSplit) {
    this.abTests.set(name, { variants, trafficSplit });
    return this;
  }

  getABTestVariant(name, userId) {
    const test = this.abTests.get(name);
    if (!test) return null;

    // Simple hash-based variant assignment
    const hash = this.hashUserId(userId);
    const variantIndex = hash % test.variants.length;
    return test.variants[variantIndex];
  }

  hashUserId(userId) {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Analytics integration
  trackConfigurationChange(type, config, context = {}) {
    const eventData = {
      type,
      config: this.sanitizeConfig(config),
      timestamp: Date.now(),
      userId: context.userId,
      sessionId: context.sessionId,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    this.analytics.forEach((tracker, name) => {
      try {
        tracker.track('ui_config_change', eventData);
      } catch (error) {
        console.error(`Analytics tracker ${name} failed:`, error);
      }
    });
  }

  addAnalyticsTracker(name, tracker) {
    this.analytics.set(name, tracker);
    return this;
  }

  sanitizeConfig(config) {
    // Remove sensitive data before sending to analytics
    const sanitized = { ...config };

    // Remove any fields that might contain sensitive information
    delete sanitized.apiKeys;
    delete sanitized.tokens;
    delete sanitized.secrets;

    return sanitized;
  }

  // Apply configuration based on feature flags and A/B tests
  reapplyConfiguration() {
    const context = this.getContext();

    // Apply A/B test variants
    for (const [testName, test] of this.abTests) {
      const variant = this.getABTestVariant(testName, context.userId);
      if (variant && variant.config) {
        this.applyVariantConfig(variant.config);
      }
    }

    // Apply feature flag configuration
    for (const [flagName, flag] of this.featureFlags) {
      if (this.isFeatureEnabled(flagName, context)) {
        if (flag.config) {
          this.applyFeatureFlagConfig(flag.config);
        }
      }
    }
  }

  getContext() {
    return {
      userId: this.getCurrentUserId(),
      sessionId: this.getSessionId(),
      userAgent: navigator.userAgent,
      environment: process.env.NODE_ENV
    };
  }

  getCurrentUserId() {
    // Integrate with your authentication system
    return localStorage.getItem('userId') || 'anonymous';
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  applyVariantConfig(config) {
    if (config.colors) this.setGlobalConfig({ colors: config.colors });
    if (config.theme) this.setTheme(config.theme);
    if (config.toastDefaults) this.setToastConfig({ defaults: config.toastDefaults });
    if (config.dialogDefaults) this.setDialogConfig({ defaults: config.dialogDefaults });
  }

  applyFeatureFlagConfig(config) {
    this.applyVariantConfig(config);
  }

  // Configuration validation with business rules
  validateConfig(config) {
    super.validateConfig(config);

    // Business-specific validations
    if (config.colors) {
      this.validateBusinessColors(config.colors);
    }

    if (config.duration) {
      this.validateBusinessDuration(config.duration);
    }

    return true;
  }

  validateBusinessColors(colors) {
    // Check if colors meet brand guidelines
    const brandGuidelines = {
      minContrast: 4.5, // WCAG AA
      forbiddenColors: ['#ff0000', '#00ff00'], // Brand-specific rules
      requiredColors: ['primary', 'success', 'error']
    };

    for (const [colorName, colorValue] of Object.entries(colors)) {
      if (brandGuidelines.forbiddenColors.includes(colorValue)) {
        throw new Error(`Color ${colorValue} is not allowed by brand guidelines`);
      }
    }

    for (const requiredColor of brandGuidelines.requiredColors) {
      if (!colors[requiredColor]) {
        throw new Error(`Required color ${requiredColor} is missing`);
      }
    }
  }

  validateBusinessDuration(duration) {
    // Business rule: notifications shouldn't be too long or too short
    if (duration < 1000) {
      throw new Error('Duration too short - minimum 1000ms for business use');
    }

    if (duration > 30000) {
      throw new Error('Duration too long - maximum 30000ms for business use');
    }
  }

  // Load configurations from external sources
  async loadRemoteConfig(url) {
    try {
      const response = await fetch(url);
      const config = await response.json();
      this.importConfig(config);
      return config;
    } catch (error) {
      console.error('Failed to load remote configuration:', error);
      throw error;
    }
  }

  // Configuration rollout management
  async rolloutConfig(config, rolloutPercentage = 0.1) {
    const context = this.getContext();
    const userHash = this.hashUserId(context.userId);
    const shouldRollout = (userHash % 100) < (rolloutPercentage * 100);

    if (shouldRollout) {
      this.importConfig(config);
      this.trackConfigurationChange('rollout', config, context);
      return true;
    }

    return false;
  }
}

// Usage example
export const enterpriseUI = new EnterpriseUIManager();

// Set up feature flags
enterpriseUI
  .setFeatureFlag('new-theme', true, { audience: 'beta-users' })
  .setFeatureFlag('enhanced-animations', false, { environment: 'production' })
  .defineAudience('beta-users', { percentage: 0.1 })
  .defineABTest('button-colors', [
    { name: 'control', config: { colors: { primary: '#3b82f6' } } },
    { name: 'variant-a', config: { colors: { primary: '#10b981' } } },
    { name: 'variant-b', config: { colors: { primary: '#f59e0b' } } }
  ])
  .addAnalyticsTracker('mixpanel', {
    track: (event, data) => {
      // Send to Mixpanel
      console.log('Mixpanel event:', event, data);
    }
  });
```

### Performance-Optimized Configuration

```javascript
// Performance-focused configuration management
class PerformanceUIManager extends UIManager {
  constructor() {
    super();
    this.configCache = new Map();
    this.pendingUpdates = new Map();
    this.batchSize = 10;
    this.updateQueue = [];
    this.isProcessingQueue = false;
    this.initPerformance();
  }

  initPerformance() {
    this.setupBatchUpdates();
    this.setupConfigMemoization();
    this.setupLazyLoading();
    this.setupCriticalPathOptimization();
  }

  // Batch configuration updates
  setupBatchUpdates() {
    setInterval(() => {
      this.processBatchedUpdates();
    }, 50); // Process every 50ms
  }

  batchUpdate(type, config) {
    if (!this.pendingUpdates.has(type)) {
      this.pendingUpdates.set(type, []);
    }

    this.pendingUpdates.get(type).push(config);
  }

  processBatchedUpdates() {
    if (this.isProcessingQueue || this.pendingUpdates.size === 0) {
      return;
    }

    this.isProcessingQueue = true;

    requestAnimationFrame(() => {
      // Process all pending updates in a single frame
      for (const [type, updates] of this.pendingUpdates) {
        const mergedConfig = this.mergeUpdates(updates);
        this.applyBatchedUpdate(type, mergedConfig);
      }

      this.pendingUpdates.clear();
      this.isProcessingQueue = false;
    });
  }

  mergeUpdates(updates) {
    return updates.reduce((merged, update) => {
      return { ...merged, ...update };
    }, {});
  }

  applyBatchedUpdate(type, config) {
    switch (type) {
      case 'global':
        this.setGlobalConfig(config);
        break;
      case 'toast':
        this.setToastConfig(config);
        break;
      case 'dialog':
        this.setDialogConfig(config);
        break;
      case 'theme':
        this.setTheme(config);
        break;
    }
  }

  // Configuration memoization
  setupConfigMemoization() {
    this.getCachedConfig = this.memoize(this.getConfig.bind(this));
    this.getCachedColors = this.memoize(this.getColors.bind(this));
  }

  memoize(fn) {
    const cache = new Map();

    return (...args) => {
      const key = JSON.stringify(args);

      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = fn(...args);
      cache.set(key, result);

      // Limit cache size
      if (cache.size > 100) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }

      return result;
    };
  }

  // Lazy loading of configuration
  setupLazyLoading() {
    this.lazyLoadPresets = new Map();
    this.loadingPresets = new Set();
  }

  async lazyLoadPreset(name) {
    if (this.lazyLoadPresets.has(name)) {
      return this.lazyLoadPresets.get(name);
    }

    if (this.loadingPresets.has(name)) {
      // Wait for loading to complete
      return new Promise((resolve) => {
        const checkLoading = () => {
          if (this.lazyLoadPresets.has(name)) {
            resolve(this.lazyLoadPresets.get(name));
          } else if (!this.loadingPresets.has(name)) {
            resolve(null);
          } else {
            setTimeout(checkLoading, 10);
          }
        };
        checkLoading();
      });
    }

    this.loadingPresets.add(name);

    try {
      const preset = await import(`./presets/${name}.js`);
      this.lazyLoadPresets.set(name, preset.default);
      return preset.default;
    } catch (error) {
      console.error(`Failed to load preset ${name}:`, error);
      return null;
    } finally {
      this.loadingPresets.delete(name);
    }
  }

  // Critical path optimization
  setupCriticalPathOptimization() {
    this.criticalConfig = {
      colors: {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
      },
      theme: 'default',
      position: 'bottom-right'
    };

    // Apply critical config immediately
    this.applyCriticalConfig();
  }

  applyCriticalConfig() {
    const { config: uiConfig, Toast } = require('@pakoor/ui-alerts');
    uiConfig.setColors(this.criticalConfig.colors);
    Toast.setTheme(this.criticalConfig.theme);
    Toast.setPosition(this.criticalConfig.position);
  }

  // Optimized configuration updates
  setGlobalConfig(config) {
    // Batch the update for performance
    this.batchUpdate('global', config);
    return this;
  }

  setToastConfig(config) {
    this.batchUpdate('toast', config);
    return this;
  }

  setDialogConfig(config) {
    this.batchUpdate('dialog', config);
    return this;
  }

  // Performance monitoring
  measureConfigPerformance() {
    const start = performance.now();

    this.applyGlobalConfig();
    this.applyToastConfig();
    this.applyDialogConfig();

    const end = performance.now();
    const duration = end - start;

    // Log performance metrics
    console.log(`Configuration applied in ${duration.toFixed(2)}ms`);

    // Send to analytics if available
    if (this.performanceObserver) {
      this.performanceObserver({
        type: 'config_application',
        duration,
        timestamp: Date.now()
      });
    }

    return duration;
  }

  setPerformanceObserver(observer) {
    this.performanceObserver = observer;
    return this;
  }

  // Memory-efficient configuration
  optimizeMemoryUsage() {
    // Clear old cache entries
    if (this.configCache.size > 50) {
      const keysToDelete = Array.from(this.configCache.keys()).slice(0, 25);
      keysToDelete.forEach(key => this.configCache.delete(key));
    }

    // Force garbage collection hint
    if (window.gc) {
      window.gc();
    }
  }

  // Configuration compression
  compressConfig(config) {
    // Remove redundant properties and compress color values
    const compressed = {};

    for (const [key, value] of Object.entries(config)) {
      if (value !== undefined && value !== null) {
        if (typeof value === 'string' && value.startsWith('#')) {
          // Compress hex colors to short format when possible
          compressed[key] = this.compressColor(value);
        } else {
          compressed[key] = value;
        }
      }
    }

    return compressed;
  }

  compressColor(color) {
    // Convert long hex to short hex when possible
    if (color.length === 7 && /^#([0-9a-f])\1([0-9a-f])\2([0-9a-f])\3$/i.test(color)) {
      return '#' + color[1] + color[3] + color[5];
    }
    return color;
  }

  decompressConfig(compressedConfig) {
    const decompressed = {};

    for (const [key, value] of Object.entries(compressedConfig)) {
      if (typeof value === 'string' && value.startsWith('#')) {
        decompressed[key] = this.decompressColor(value);
      } else {
        decompressed[key] = value;
      }
    }

    return decompressed;
  }

  decompressColor(color) {
    // Convert short hex to long hex
    if (color.length === 4) {
      return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
    }
    return color;
  }
}

export const performanceUI = new PerformanceUIManager();
```

### Real-time Configuration Sync

```javascript
// Real-time configuration synchronization
class SyncUIManager extends UIManager {
  constructor() {
    super();
    this.wsConnection = null;
    this.syncChannel = 'ui-config-changes';
    this.lastSyncTime = 0;
    this.syncQueue = [];
    this.isOnline = navigator.onLine;
    this.initSync();
  }

  initSync() {
    this.setupNetworkMonitoring();
    this.setupWebSocketConnection();
    this.setupConflictResolution();
    this.setupBackgroundSync();
  }

  setupNetworkMonitoring() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncPendingChanges();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  setupWebSocketConnection() {
    if (!this.isOnline) return;

    try {
      this.wsConnection = new WebSocket('wss://api.example.com/ui-config-sync');

      this.wsConnection.onopen = () => {
        console.log('Configuration sync connected');
        this.requestLatestConfig();
      };

      this.wsConnection.onmessage = (event) => {
        this.handleRemoteConfigUpdate(JSON.parse(event.data));
      };

      this.wsConnection.onclose = () => {
        console.log('Configuration sync disconnected');
        this.attemptReconnection();
      };

      this.wsConnection.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
    }
  }

  attemptReconnection() {
    setTimeout(() => {
      if (this.isOnline) {
        this.setupWebSocketConnection();
      }
    }, 5000); // Retry after 5 seconds
  }

  requestLatestConfig() {
    if (this.wsConnection && this.wsConnection.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify({
        type: 'request_latest_config',
        timestamp: Date.now(),
        clientId: this.getClientId()
      }));
    }
  }

  handleRemoteConfigUpdate(data) {
    if (data.timestamp <= this.lastSyncTime) {
      return; // Ignore outdated updates
    }

    // Handle conflict resolution
    if (this.hasLocalChanges()) {
      this.resolveConfigConflict(data);
    } else {
      this.applyRemoteConfig(data.config);
      this.lastSyncTime = data.timestamp;
    }
  }

  hasLocalChanges() {
    // Check if there are unsynced local changes
    const lastSyncedConfig = this.getLastSyncedConfig();
    const currentConfig = this.exportConfig();
    return !this.deepEqual(lastSyncedConfig, currentConfig);
  }

  resolveConfigConflict(remoteData) {
    const localConfig = this.exportConfig();
    const remoteConfig = remoteData.config;

    // Simple conflict resolution: merge configurations
    const mergedConfig = this.mergeConfigs(localConfig, remoteConfig);

    // Apply merged configuration
    this.importConfig(mergedConfig);

    // Notify about conflict resolution
    this.notifyConflictResolution(localConfig, remoteConfig, mergedConfig);

    // Sync the resolved configuration
    this.broadcastConfigChange(mergedConfig);
  }

  mergeConfigs(local, remote) {
    return {
      global: { ...remote.global, ...local.global },
      toast: { ...remote.toast, ...local.toast },
      dialog: { ...remote.dialog, ...local.dialog },
      theme: local.theme || remote.theme
    };
  }

  notifyConflictResolution(local, remote, resolved) {
    // Show notification about conflict resolution
    const { Toast } = require('@pakoor/ui-alerts');
    Toast.warning('Configuration conflict detected and resolved', {
      title: 'Configuration Sync',
      duration: 5000
    });
  }

  broadcastConfigChange(config) {
    if (this.wsConnection && this.wsConnection.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify({
        type: 'config_update',
        config: this.compressConfig(config),
        timestamp: Date.now(),
        clientId: this.getClientId()
      }));
    }

    this.lastSyncTime = Date.now();
    this.saveLastSyncedConfig(config);
  }

  getClientId() {
    let clientId = localStorage.getItem('ui-client-id');
    if (!clientId) {
      clientId = 'client_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('ui-client-id', clientId);
    }
    return clientId;
  }

  getLastSyncedConfig() {
    try {
      return JSON.parse(localStorage.getItem('ui-last-synced-config') || '{}');
    } catch {
      return {};
    }
  }

  saveLastSyncedConfig(config) {
    try {
      localStorage.setItem('ui-last-synced-config', JSON.stringify(config));
    } catch (error) {
      console.error('Failed to save last synced config:', error);
    }
  }

  deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  setupBackgroundSync() {
    // Sync configuration every 5 minutes
    setInterval(() => {
      if (this.isOnline) {
        this.syncConfiguration();
      }
    }, 5 * 60 * 1000);
  }

  syncConfiguration() {
    if (!this.isOnline) return;

    const currentConfig = this.exportConfig();
    this.broadcastConfigChange(currentConfig);
  }

  syncPendingChanges() {
    const pendingChanges = this.getPendingChanges();
    if (pendingChanges.length > 0) {
      pendingChanges.forEach(change => {
        this.broadcastConfigChange(change.config);
      });
      this.clearPendingChanges();
    }
  }

  getPendingChanges() {
    try {
      return JSON.parse(localStorage.getItem('ui-pending-changes') || '[]');
    } catch {
      return [];
    }
  }

  clearPendingChanges() {
    localStorage.removeItem('ui-pending-changes');
  }

  // Override configuration methods to add sync functionality
  setGlobalConfig(config) {
    super.setGlobalConfig(config);

    if (this.isOnline) {
      this.broadcastConfigChange(this.exportConfig());
    } else {
      this.queuePendingChange('global', config);
    }

    return this;
  }

  setToastConfig(config) {
    super.setToastConfig(config);

    if (this.isOnline) {
      this.broadcastConfigChange(this.exportConfig());
    } else {
      this.queuePendingChange('toast', config);
    }

    return this;
  }

  setDialogConfig(config) {
    super.setDialogConfig(config);

    if (this.isOnline) {
      this.broadcastConfigChange(this.exportConfig());
    } else {
      this.queuePendingChange('dialog', config);
    }

    return this;
  }

  queuePendingChange(type, config) {
    const pendingChanges = this.getPendingChanges();
    pendingChanges.push({
      type,
      config,
      timestamp: Date.now()
    });

    try {
      localStorage.setItem('ui-pending-changes', JSON.stringify(pendingChanges));
    } catch (error) {
      console.error('Failed to queue pending change:', error);
    }
  }

  setupConflictResolution() {
    // Advanced conflict resolution strategies
    this.conflictStrategies = {
      'latest-wins': (local, remote) => remote.timestamp > local.timestamp ? remote : local,
      'local-wins': (local, remote) => local,
      'merge': (local, remote) => this.mergeConfigs(local.config, remote.config),
      'manual': (local, remote) => this.promptManualResolution(local, remote)
    };
  }

  setConflictResolutionStrategy(strategy) {
    if (this.conflictStrategies[strategy]) {
      this.conflictStrategy = strategy;
    } else {
      throw new Error(`Unknown conflict resolution strategy: ${strategy}`);
    }
    return this;
  }

  promptManualResolution(local, remote) {
    return new Promise((resolve) => {
      const { Dialog } = require('@pakoor/ui-alerts');

      Dialog.confirm(
        'Configuration conflict detected. Which version would you like to keep?',
        {
          title: 'Resolve Configuration Conflict',
          type: 'warning',
          buttonStyle: {
            ok: { text: 'Keep Remote', background: '#3b82f6' },
            cancel: { text: 'Keep Local', background: '#6b7280' }
          },
          onConfirm: (keepRemote) => {
            resolve(keepRemote ? remote : local);
          }
        }
      );
    });
  }
}

export const syncUI = new SyncUIManager();
```

## Next Steps

- Explore [dialog API details](/guide/dialog)
- Learn about [theme customization](/guide/themes)
- Check [React integration](/guide/react)
- Read about [Vue integration](/guide/vue)