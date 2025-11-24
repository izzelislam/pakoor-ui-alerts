# Themes and Customization

UI Alerts comes with multiple built-in themes and extensive customization options to match your application's design system.

## Built-in Themes

### Available Themes

UI Alerts includes six pre-built themes:

- `default` - Clean, modern design with subtle shadows
- `brutalism` - Bold, harsh edges with strong contrasts
- `modern` - Sleek, minimalist design with smooth animations
- `glass` - Glassmorphism effect with blur and transparency
- `minimal` - Simple, flat design with minimal styling
- `modernDark` - Dark version of the modern theme

### Setting Themes

```javascript
import { Toast, Dialog } from '@pakoor/ui-alerts';

// Set theme for toasts
Toast.setTheme('brutalism');

// Set theme for dialogs
Dialog.setTheme('glass');

// Set both at once
Toast.setTheme('modernDark');
Dialog.setTheme('modernDark');
```

```vue
<!-- Vue -->
<script setup>
import { useBFKR } from '@pakoor/ui-alerts/vue';

const { theme } = useBFKR();

theme.setTheme('modern');
</script>
```

```tsx
// React
import { useBFKR } from '@pakoor/ui-alerts/react';

function MyComponent() {
  const { theme } = useBFKR();

  theme.setTheme('glass');
}
```

## Theme Previews

### Default Theme
```javascript
Toast.setTheme('default');
```
- Clean, professional appearance
- Subtle shadows and borders
- Works well in most applications

### Brutalism Theme
```javascript
Toast.setTheme('brutalism');
```
- Bold, striking design
- Black borders and sharp corners
- High contrast for maximum visibility

### Glass Theme
```javascript
Toast.setTheme('glass');
```
- Glassmorphism effect
- Blurred background with transparency
- Modern, elegant appearance

### Minimal Theme
```javascript
Toast.setTheme('minimal');
```
- Flat design with no shadows
- Simple, clean aesthetic
- Maximum content focus

### Modern Theme
```javascript
Toast.setTheme('modern');
```
- Contemporary design with smooth curves
- Subtle gradients and shadows
- Perfect for modern web apps

### Modern Dark Theme
```javascript
Toast.setTheme('modernDark');
```
- Dark version of the modern theme
- Optimized for dark mode applications
- Reduced eye strain in low light

## Color Customization

### Global Color Override

Override all toast and dialog colors globally:

```javascript
import { config } from '@pakoor/ui-alerts';

config.setColors({
  success: '#10b981',    // Green
  error: '#ef4444',      // Red
  warning: '#f59e0b',    // Yellow/Orange
  info: '#3b82f6',       // Blue
  primary: '#8b5cf6',    // Purple
  dark: '#1f2937',       // Dark gray
  custom: '#ec4899'      // Pink/Magenta
});
```

### Dialog-Specific Colors

Customize dialog button and background colors:

```javascript
config.setDialogColors({
  ok: '#10b981',           // Confirm button color
  cancel: '#6b7280',       // Cancel button color
  background: '#ffffff',   // Dialog background
  text: '#1f2937'          // Text color
});
```

## Custom Styling

### Custom Toast Styles

```javascript
import { Toast } from '@pakoor/ui-alerts';

Toast.show("Custom styled toast!", "success", {
  title: "Custom Design",
  customStyle: {
    background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    borderRadius: '16px',
    border: '2px solid #4c51bf',
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
    padding: '20px',
    fontSize: '16px'
  }
});
```

### Custom Dialog Styles

```javascript
import { Dialog } from '@pakoor/ui-alerts';

Dialog.confirm("Custom styled dialog", {
  title: "Custom Design",
  type: "info",
  width: "500px",
  style: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    borderRadius: '20px',
    border: 'none',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    padding: '30px'
  },
  buttonStyle: {
    ok: {
      background: '#10b981',
      color: '#ffffff',
      borderRadius: '12px',
      padding: '12px 24px',
      fontWeight: 'bold'
    },
    cancel: {
      background: '#ffffff',
      color: '#1f2937',
      borderRadius: '12px',
      padding: '12px 24px'
    }
  }
});
```

## Animation Customization

### Available Animations

- `slide` - Slide in from the side
- `fade` - Fade in and out
- `bounce` - Bounce effect
- `zoom` - Scale up and down
- `ease-in` - Smooth easing in
- `ease-out` - Smooth easing out

```javascript
Toast.show("Animated notification!", "info", {
  animation: "bounce",
  duration: 3000
});
```

### Custom Position

```javascript
Toast.setPosition("bottom-right");

Toast.show("Positioned toast!", "success", {
  position: "bottom-right",
  animation: "zoom"
});
```

Available positions:
- `top-left`, `top-center`, `top-right`
- `bottom-left`, `bottom-center`, `bottom-right`

## Responsive Design

All themes are fully responsive and adapt to different screen sizes:

```javascript
// Works automatically on mobile, tablet, and desktop
Toast.show("Responsive notification!", "info");
```

## Dark Mode Support

### Automatic Dark Mode

```javascript
// Use the modernDark theme for dark mode
Toast.setTheme('modernDark');
Dialog.setTheme('modernDark');
```

### Manual Dark Mode Implementation

```javascript
import { config, Toast, Dialog } from '@pakoor/ui-alerts';

function setDarkMode(isDark) {
  if (isDark) {
    config.setColors({
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      primary: '#8b5cf6',
      dark: '#f3f4f6'  // Light text for dark backgrounds
    });

    config.setDialogColors({
      background: '#1f2937',
      text: '#f3f4f6',
      ok: '#10b981',
      cancel: '#6b7280'
    });
  } else {
    // Light mode colors
    config.setColors({
      success: '#059669',
      error: '#dc2626',
      warning: '#d97706',
      info: '#2563eb',
      primary: '#7c3aed',
      dark: '#111827'
    });
  }
}

// Toggle based on system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setDarkMode(prefersDark);
```

## Brand Customization

### Corporate Branding

```javascript
// Customize for your brand colors
config.setColors({
  primary: '#0066cc',    // Brand primary color
  success: '#00a86b',    // Brand success color
  error: '#dc3545',      // Brand error color
  warning: '#ff9800',    // Brand warning color
  info: '#17a2b8'        // Brand info color
});
```

### Complete Brand Theme

```javascript
function setupBrandTheme(brandColors) {
  config.setColors(brandColors);

  Toast.setTheme('minimal'); // Start with minimal base
  Dialog.setTheme('minimal');

  // Add brand-specific styling
  Toast.show("Welcome!", "success", {
    customStyle: {
      background: brandColors.primary,
      color: '#ffffff',
      borderLeft: `4px solid ${brandColors.success}`
    }
  });
}

// Usage
setupBrandTheme({
  primary: '#6366f1',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6'
});
```

## CSS Custom Properties

You can also customize using CSS custom properties:

```css
:root {
  --bfkr-success: #10b981;
  --bfkr-error: #ef4444;
  --bfkr-warning: #f59e0b;
  --bfkr-info: #3b82f6;
  --bfkr-primary: #8b5cf6;
  --bfkr-dark: #1f2937;
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --bfkr-success: #34d399;
    --bfkr-error: #f87171;
    --bfkr-warning: #fbbf24;
    --bfkr-info: #60a5fa;
    --bfkr-primary: #a78bfa;
    --bfkr-dark: #f3f4f6;
  }
}
```

## Advanced Customization Examples

### Custom Theme Creation

```javascript
function createCustomTheme(themeConfig) {
  const { name, colors, styles } = themeConfig;

  // Set colors
  config.setColors(colors);

  // Create a custom toast with the theme
  const themedToast = (message, type = 'info', options = {}) => {
    return Toast.show(message, type, {
      customStyle: {
        ...styles.base,
        ...styles[type]
      },
      ...options
    });
  };

  return themedToast;
}

// Usage
const myTheme = createCustomTheme({
  name: 'ocean',
  colors: {
    primary: '#0891b2',
    success: '#059669',
    error: '#dc2626',
    warning: '#d97706',
    info: '#2563eb'
  },
  styles: {
    base: {
      borderRadius: '20px',
      fontFamily: 'system-ui, sans-serif',
      fontWeight: '500'
    },
    success: {
      background: 'linear-gradient(135deg, #0891b2, #06b6d4)'
    },
    error: {
      background: 'linear-gradient(135deg, #dc2626, #ef4444)'
    }
  }
});

myTheme("Ocean themed notification!", "success");
```

## Best Practices

1. **Consistency**: Use the same theme across toasts and dialogs for a cohesive look
2. **Accessibility**: Ensure color contrasts meet WCAG guidelines
3. **Performance**: Avoid overly complex animations on low-end devices
4. **Branding**: Use your brand colors consistently
5. **Testing**: Test themes in both light and dark modes

## Advanced Theme Examples

### Corporate Brand Theme System

```javascript
// Comprehensive corporate theme system
class CorporateThemeManager {
  constructor(brandConfig) {
    this.brandConfig = brandConfig;
    this.currentTheme = 'light';
    this.setupThemes();
  }

  setupThemes() {
    const { primary, secondary, accent, neutrals } = this.brandConfig;

    // Light theme configuration
    this.lightTheme = {
      colors: {
        success: neutrals.success,
        error: neutrals.error,
        warning: neutrals.warning,
        info: neutrals.info,
        primary: primary,
        dark: neutrals.dark
      },
      dialogColors: {
        background: '#ffffff',
        text: neutrals.darkest,
        ok: primary,
        cancel: neutrals.medium
      },
      toastStyles: {
        base: {
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: '14px',
          fontWeight: '500'
        },
        success: {
          background: `linear-gradient(135deg, ${neutrals.success}, ${this.lightenColor(neutrals.success, 10)})`,
          borderLeft: `4px solid ${this.darkenColor(neutrals.success, 20)}`
        },
        error: {
          background: `linear-gradient(135deg, ${neutrals.error}, ${this.lightenColor(neutrals.error, 10)})`,
          borderLeft: `4px solid ${this.darkenColor(neutrals.error, 20)}`
        }
      }
    };

    // Dark theme configuration
    this.darkTheme = {
      colors: {
        success: this.lightenColor(neutrals.success, 20),
        error: this.lightenColor(neutrals.error, 20),
        warning: this.lightenColor(neutrals.warning, 20),
        info: this.lightenColor(neutrals.info, 20),
        primary: this.lightenColor(primary, 20),
        dark: neutrals.lightest
      },
      dialogColors: {
        background: neutrals.darkest,
        text: neutrals.lightest,
        ok: primary,
        cancel: neutrals.medium
      },
      toastStyles: {
        base: {
          borderRadius: '12px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: '14px',
          fontWeight: '500',
          backdropFilter: 'blur(10px)'
        },
        success: {
          background: `linear-gradient(135deg, ${neutrals.success}, ${this.darkenColor(neutrals.success, 10)})`,
          borderLeft: `4px solid ${this.lightenColor(neutrals.success, 30)}`
        }
      }
    };
  }

  applyTheme(theme = 'light') {
    const config = this.currentTheme === 'dark' ? this.darkTheme : this.lightTheme;

    // Apply colors
    config.setColors(config.colors);
    config.setDialogColors(config.dialogColors);

    // Set base theme
    Toast.setTheme('minimal');
    Dialog.setTheme('minimal');

    this.currentTheme = theme;
  }

  createThemedToast(message, type, options = {}) {
    const config = this.currentTheme === 'dark' ? this.darkTheme : this.lightTheme;

    return Toast.show(message, type, {
      customStyle: {
        ...config.toastStyles.base,
        ...config.toastStyles[type]
      },
      ...options
    });
  }

  createThemedDialog(content, options = {}) {
    const config = this.currentTheme === 'dark' ? this.darkTheme : this.lightTheme;

    return Dialog.alert(content, {
      style: {
        borderRadius: '16px',
        boxShadow: this.currentTheme === 'dark'
          ? '0 20px 60px rgba(0, 0, 0, 0.6)'
          : '0 20px 60px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(20px)',
        border: this.currentTheme === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.1)',
        ...config.dialogColors
      },
      ...options
    });
  }

  // Utility methods for color manipulation
  lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255))
      .toString(16).slice(1);
  }

  darkenColor(color, percent) {
    return this.lightenColor(color, -percent);
  }

  toggleDarkMode() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    return newTheme;
  }
}

// Usage example
const corporateTheme = new CorporateThemeManager({
  primary: '#2563eb',
  secondary: '#64748b',
  accent: '#f59e0b',
  neutrals: {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    lightest: '#ffffff',
    light: '#f8fafc',
    medium: '#64748b',
    dark: '#1e293b',
    darkest: '#0f172a'
  }
});

// Apply the corporate theme
corporateTheme.applyTheme('light');

// Create themed notifications
corporateTheme.createThemedToast('Welcome to our platform!', 'success', {
  title: 'Welcome',
  icon: '🎉'
});
```

### E-commerce Theme Variants

```javascript
// E-commerce themed notifications
const EcommerceThemes = {
  // Amazon-inspired theme
  amazon: {
    colors: {
      success: '#00a86b',    // Amazon green
      error: '#cc0c39',      // Amazon red
      warning: '#f0ad4e',    // Amazon yellow
      info: '#007185',       // Amazon blue
      primary: '#ff9900'     // Amazon orange
    },
    toastStyles: {
      base: {
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontFamily: '"Amazon Ember", Arial, sans-serif',
        fontSize: '13px'
      },
      success: {
        background: '#f0fdf4',
        color: '#00a86b',
        borderColor: '#00a86b'
      }
    }
  },

  // Shopify-inspired theme
  shopify: {
    colors: {
      success: '#008060',    // Shopify green
      error: '#bf0711',      // Shopify red
      warning: '#fcb900',    // Shopify yellow
      info: '#505cdf',       // Shopify blue
      primary: '#000000'     // Shopify black
    },
    toastStyles: {
      base: {
        borderRadius: '8px',
        fontFamily: '"Shopify Sans", system-ui, sans-serif',
        fontWeight: '600',
        letterSpacing: '-0.02em'
      },
      success: {
        background: 'linear-gradient(135deg, #008060, #10b981)',
        color: '#ffffff'
      }
    }
  },

  // Stripe-inspired theme
  stripe: {
    colors: {
      success: '#00d924',    // Stripe green
      error: '#e23939',      // Stripe red
      warning: '#fab91b',    // Stripe yellow
      info: '#635bff',       // Stripe blue
      primary: '#635bff'     // Stripe primary
    },
    toastStyles: {
      base: {
        borderRadius: '6px',
        fontFamily: '"Camphor", "Open Sans", system-ui, sans-serif',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      success: {
        background: '#00d924',
        color: '#ffffff',
        padding: '16px'
      }
    }
  }
};

function applyEcommerceTheme(themeName) {
  const theme = EcommerceThemes[themeName];
  if (!theme) return;

  config.setColors(theme.colors);
  Toast.setTheme('minimal');

  // Apply custom styles to all toasts
  const originalShow = Toast.show;
  Toast.show = function(message, type, options = {}) {
    return originalShow.call(this, message, type, {
      customStyle: {
        ...theme.toastStyles.base,
        ...theme.toastStyles[type]
      },
      ...options
    });
  };
}

// Usage
applyEcommerceTheme('shopify');
Toast.success('Order confirmed! Your items will be shipped soon.');
```

### Social Media Platform Themes

```javascript
// Social media inspired themes
const SocialThemes = {
  // Twitter/X theme
  twitter: {
    colors: {
      success: '#1da1f2',    // Twitter blue
      error: '#e0245e',      // Twitter red
      warning: '#ffad1f',    // Twitter yellow
      info: '#1da1f2',       // Twitter blue
      primary: '#1da1f2'     // Twitter blue
    },
    customComponents: {
      notification: {
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #eff3f4',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)'
      }
    }
  },

  // LinkedIn theme
  linkedin: {
    colors: {
      success: '#0a66c2',    // LinkedIn blue
      error: '#d9292a',      // LinkedIn red
      warning: '#fcaf38',    // LinkedIn yellow
      info: '#0a66c2',       // LinkedIn blue
      primary: '#0a66c2'     // LinkedIn blue
    },
    customComponents: {
      notification: {
        background: '#ffffff',
        borderRadius: '8px',
        fontFamily: '"LinkedIn Sans", system-ui, sans-serif',
        borderLeft: '3px solid'
      }
    }
  },

  // Discord theme
  discord: {
    colors: {
      success: '#3ba55c',    // Discord green
      error: '#ed4245',      // Discord red
      warning: '#faa61a',    // Discord yellow
      info: '#5865f2',       // Discord blurple
      primary: '#5865f2'     // Discord blurple
    },
    customComponents: {
      notification: {
        background: '#2f3136',
        color: '#dcddde',
        borderRadius: '8px',
        border: '1px solid #202225'
      }
    }
  }
};

function createSocialNotification(platform, message, type, options = {}) {
  const theme = SocialThemes[platform];
  if (!theme) return;

  const baseStyle = theme.customComponents.notification;
  const typeColor = theme.colors[type];

  if (platform === 'discord') {
    // Dark theme for Discord
    return Toast.show(message, type, {
      customStyle: {
        ...baseStyle,
        borderLeftColor: typeColor,
        background: '#36393f'
      },
      ...options
    });
  } else {
    // Light theme for others
    return Toast.show(message, type, {
      customStyle: {
        ...baseStyle,
        borderLeftColor: typeColor
      },
      ...options
    });
  }
}

// Usage examples
createSocialNotification('twitter', 'Your tweet was liked!', 'success', {
  title: 'New Like',
  icon: '❤️'
});

createSocialNotification('discord', 'You have a new message!', 'info', {
  title: 'Direct Message',
  icon: '💬'
});
```

### Gaming/UI Themes

```javascript
// Gaming and interface themes
const GamingThemes = {
  // Cyberpunk theme
  cyberpunk: {
    colors: {
      success: '#00ff88',    // Neon green
      error: '#ff0080',      // Neon pink
      warning: '#ffaa00',    // Neon yellow
      info: '#00ccff',       // Neon cyan
      primary: '#ff0080'     // Neon pink
    },
    animations: {
      success: 'pulse-glow',
      error: 'shake',
      warning: 'blink',
      info: 'fade-in'
    },
    customStyles: {
      base: {
        background: 'rgba(0, 0, 0, 0.9)',
        border: '2px solid',
        borderColor: 'currentColor',
        borderRadius: '0px',
        fontFamily: '"Orbitron", monospace',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        boxShadow: '0 0 20px currentColor',
        textShadow: '0 0 10px currentColor'
      }
    }
  },

  // Retro 8-bit theme
  pixel: {
    colors: {
      success: '#4CAF50',    // Classic green
      error: '#f44336',      // Classic red
      warning: '#ff9800',    // Classic orange
      info: '#2196F3',       // Classic blue
      primary: '#9C27B0'     // Classic purple
    },
    customStyles: {
      base: {
        background: '#ffffff',
        border: '4px solid currentColor',
        borderRadius: '0px',
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '12px',
        imageRendering: 'pixelated'
      }
    }
  },

  // Minimalist dark theme
  minimalDark: {
    colors: {
      success: '#00d4aa',    // Mint green
      error: '#ff6b6b',      // Soft red
      warning: '#ffd43b',    // Soft yellow
      info: '#4ecdc4',       // Teal
      primary: '#a8dadc'     // Light blue
    },
    customStyles: {
      base: {
        background: '#1a1a1a',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        fontFamily: '"Inter", system-ui, sans-serif',
        backdropFilter: 'blur(20px)'
      }
    }
  }
};

function applyGamingTheme(themeName) {
  const theme = GamingThemes[themeName];
  if (!theme) return;

  config.setColors(theme.colors);
  Toast.setTheme('minimal');

  // Override show method for custom styling
  const originalShow = Toast.show;
  Toast.show = function(message, type, options = {}) {
    const finalOptions = {
      customStyle: {
        ...theme.customStyles.base
      },
      ...options
    };

    // Add animation if specified
    if (theme.animations && theme.animations[type]) {
      finalOptions.animation = theme.animations[type];
    }

    return originalShow.call(this, message, type, finalOptions);
  };
}

// Usage examples
applyGamingTheme('cyberpunk');
Toast.success('MISSION COMPLETE', {
  title: '🎮 ACHIEVEMENT UNLOCKED'
});

applyGamingTheme('pixel');
Toast.error('GAME OVER', {
  title: '❌ INSERT COIN'
});
```

### Seasonal/Holiday Themes

```javascript
// Seasonal and holiday themes
const SeasonalThemes = {
  christmas: {
    colors: {
      success: '#c41e3a',    // Christmas red
      error: '#c41e3a',      // Christmas red
      warning: '#f4a460',    // Sandy brown
      info: '#228b22',       // Forest green
      primary: '#c41e3a'     // Christmas red
    },
    customStyles: {
      base: {
        background: 'linear-gradient(135deg, #0f7938, #1a5e3a)',
        color: '#ffffff',
        border: '2px solid #ffd700',
        borderRadius: '12px',
        fontFamily: '"Georgia", serif'
      }
    },
    icons: {
      success: '🎄',
      error: '🎅',
      warning: '⭐',
      info: '🎁'
    }
  },

  halloween: {
    colors: {
      success: '#ff8c00',    // Dark orange
      error: '#800080',      // Purple
      warning: '#ff8c00',    // Orange
      info: '#ff6347',       // Tomato red
      primary: '#ff8c00'     // Orange
    },
    customStyles: {
      base: {
        background: 'linear-gradient(135deg, #1a1a1a, #4a0080)',
        color: '#ffa500',
        border: '2px solid #ff8c00',
        borderRadius: '8px',
        fontFamily: '"Creepster", cursive',
        boxShadow: '0 0 30px rgba(255, 140, 0, 0.5)'
      }
    },
    icons: {
      success: '🎃',
      error: '💀',
      warning: '👻',
      info: '🦇'
    }
  },

  valentine: {
    colors: {
      success: '#ff69b4',    // Hot pink
      error: '#ff1493',      // Deep pink
      warning: '#ff6b6b',    // Light red
      info: '#ff69b4',       // Hot pink
      primary: '#ff1493'     // Deep pink
    },
    customStyles: {
      base: {
        background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
        color: '#ffffff',
        border: '2px solid #ffffff',
        borderRadius: '20px',
        fontFamily: '"Lobster", cursive'
      }
    },
    icons: {
      success: '💕',
      error: '💔',
      warning: '💝',
      info: '💖'
    }
  }
};

function createSeasonalNotification(season, message, type, options = {}) {
  const theme = SeasonalThemes[season];
  if (!theme) return;

  config.setColors(theme.colors);

  return Toast.show(message, type, {
    customStyle: {
      ...theme.customStyles.base
    },
    icon: theme.icons[type],
    ...options
  });
}

// Auto-apply seasonal theme based on date
function autoApplySeasonalTheme() {
  const month = new Date().getMonth();
  let season = null;

  if (month === 11 || month === 0) { // December or January
    season = 'christmas';
  } else if (month === 9) { // October
    season = 'halloween';
  } else if (month === 1) { // February
    season = 'valentine';
  }

  if (season) {
    const theme = SeasonalThemes[season];
    config.setColors(theme.colors);
    Toast.setTheme('minimal');

    // Show welcome notification
    Toast.show(`🎉 ${season.charAt(0).toUpperCase() + season.slice(1)} theme activated!`, 'info', {
      customStyle: theme.customStyles.base
    });
  }
}

// Usage
autoApplySeasonalTheme();
createSeasonalNotification('christmas', '🎄 Merry Christmas!', 'success');
```

### Accessibility-Focused Themes

```javascript
// Accessibility-focused themes
const AccessibleThemes = {
  // High contrast theme for visual impairments
  highContrast: {
    colors: {
      success: '#00ff00',    // Bright green
      error: '#ff0000',      // Bright red
      warning: '#ffff00',    // Bright yellow
      info: '#00ffff',       // Bright cyan
      primary: '#ffffff'     // White
    },
    customStyles: {
      base: {
        background: '#000000',
        color: '#ffffff',
        border: '3px solid currentColor',
        borderRadius: '0px',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '20px',
        minWidth: '300px'
      }
    }
  },

  // Large text theme for readability
  largeText: {
    colors: {
      success: '#28a745',    // Green
      error: '#dc3545',      // Red
      warning: '#ffc107',    // Yellow
      info: '#17a2b8',       // Blue
      primary: '#007bff'     // Primary blue
    },
    customStyles: {
      base: {
        fontSize: '24px',
        lineHeight: '1.5',
        padding: '24px',
        borderRadius: '12px',
        minHeight: '80px',
        display: 'flex',
        alignItems: 'center',
        fontFamily: '"Arial Black", sans-serif'
      }
    }
  },

  // Dyslexia-friendly theme
  dyslexiaFriendly: {
    colors: {
      success: '#1b4332',    // Dark green
      error: '#9d0208',      // Dark red
      warning: '#606c38',    // Olive
      info: '#1e6091',       // Dark blue
      primary: '#184e77'     // Navy
    },
    customStyles: {
      base: {
        background: '#fef9c3',  // Cream background
        color: '#1b4332',
        border: '2px solid #1b4332',
        borderRadius: '8px',
        fontFamily: '"OpenDyslexic", "Arial", sans-serif',
        fontSize: '16px',
        lineHeight: '1.8',
        letterSpacing: '0.1em',
        textAlign: 'left',
        padding: '20px'
      }
    }
  }
};

function applyAccessibilityTheme(themeName) {
  const theme = AccessibleThemes[themeName];
  if (!theme) return;

  config.setColors(theme.colors);
  Toast.setTheme('minimal');

  const originalShow = Toast.show;
  Toast.show = function(message, type, options = {}) {
    return originalShow.call(this, message, type, {
      customStyle: {
        ...theme.customStyles.base
      },
      ...options
    });
  };

  // Add ARIA labels and announcements for screen readers
  setTimeout(() => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = `${type} notification: ${message}`;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, 100);
}

// Usage with user preference detection
function detectAndApplyAccessibilityPreferences() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    Toast.setAnimation('fade'); // Use only simple animations
  }

  // Check for high contrast preference
  const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
  if (prefersHighContrast) {
    applyAccessibilityTheme('highContrast');
  }

  // Allow manual override
  return {
    applyHighContrast: () => applyAccessibilityTheme('highContrast'),
    applyLargeText: () => applyAccessibilityTheme('largeText'),
    applyDyslexiaFriendly: () => applyAccessibilityTheme('dyslexiaFriendly')
  };
}

const accessibility = detectAndApplyAccessibilityPreferences();
```

### Dynamic Theme Switcher

```javascript
// Advanced theme switcher component
class ThemeSwitcher {
  constructor() {
    this.themes = {
      ...CorporateThemes,
      ...EcommerceThemes,
      ...SocialThemes,
      ...GamingThemes,
      ...SeasonalThemes,
      ...AccessibleThemes
    };

    this.currentTheme = 'default';
    this.userPreferences = this.loadUserPreferences();
    this.init();
  }

  init() {
    // Apply saved theme or system preference
    const savedTheme = this.userPreferences.theme || this.detectSystemTheme();
    this.applyTheme(savedTheme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (this.userPreferences.autoTheme) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  detectSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  loadUserPreferences() {
    try {
      return JSON.parse(localStorage.getItem('bfkr-theme-preferences') || '{}');
    } catch {
      return {};
    }
  }

  saveUserPreferences() {
    localStorage.setItem('bfkr-theme-preferences', JSON.stringify(this.userPreferences));
  }

  applyTheme(themeName) {
    const theme = this.themes[themeName];
    if (!theme) {
      console.warn(`Theme "${themeName}" not found`);
      return;
    }

    this.currentTheme = themeName;

    // Apply theme configuration
    if (theme.colors) {
      config.setColors(theme.colors);
    }

    if (theme.dialogColors) {
      config.setDialogColors(theme.dialogColors);
    }

    if (theme.customStyles) {
      this.setupCustomStyles(theme.customStyles);
    }

    // Update document for CSS custom properties
    this.updateCSSVariables(theme);

    // Save preference
    this.userPreferences.theme = themeName;
    this.saveUserPreferences();

    // Announce theme change for accessibility
    this.announceThemeChange(themeName);
  }

  setupCustomStyles(customStyles) {
    const originalShow = Toast.show;
    Toast.show = function(message, type, options = {}) {
      const typeStyle = customStyles[type] || {};

      return originalShow.call(this, message, type, {
        customStyle: {
          ...customStyles.base,
          ...typeStyle
        },
        ...options
      });
    };
  }

  updateCSSVariables(theme) {
    const root = document.documentElement;

    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--bfkr-${key}`, value);
      });
    }
  }

  announceThemeChange(themeName) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Theme changed to ${themeName}`;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  createThemeSelector() {
    const selector = document.createElement('div');
    selector.innerHTML = `
      <div class="bfkr-theme-selector">
        <h3>Select Theme</h3>
        <div class="theme-grid">
          ${Object.keys(this.themes).map(theme => `
            <button
              class="theme-btn ${this.currentTheme === theme ? 'active' : ''}"
              data-theme="${theme}"
              title="${theme}">
              ${this.getThemePreview(theme)}
            </button>
          `).join('')}
        </div>
        <div class="theme-controls">
          <label>
            <input type="checkbox" ${this.userPreferences.autoTheme ? 'checked' : ''}
                   id="auto-theme" />
            Auto-detect system theme
          </label>
        </div>
      </div>
    `;

    // Add event listeners
    selector.addEventListener('click', (e) => {
      if (e.target.classList.contains('theme-btn')) {
        this.applyTheme(e.target.dataset.theme);
        this.updateSelectorUI(selector);
      }
    });

    selector.addEventListener('change', (e) => {
      if (e.target.id === 'auto-theme') {
        this.userPreferences.autoTheme = e.target.checked;
        this.saveUserPreferences();

        if (e.target.checked) {
          this.applyTheme(this.detectSystemTheme());
        }
      }
    });

    return selector;
  }

  updateThemeSelector(selector) {
    const buttons = selector.querySelectorAll('.theme-btn');
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === this.currentTheme);
    });
  }

  getThemePreview(themeName) {
    const theme = this.themes[themeName];
    if (!theme) return themeName;

    // Return color preview or emoji for visual selection
    if (theme.colors && theme.colors.primary) {
      return `<span style="display: block; width: 30px; height: 30px; background: ${theme.colors.primary}; border-radius: 4px;"></span>`;
    }

    return themeName;
  }

  // Public API
  setTheme(themeName) {
    this.applyTheme(themeName);
  }

  getTheme() {
    return this.currentTheme;
  }

  getAvailableThemes() {
    return Object.keys(this.themes);
  }

  addCustomTheme(name, themeConfig) {
    this.themes[name] = themeConfig;
  }
}

// Global theme switcher instance
const globalThemeSwitcher = new ThemeSwitcher();

// Usage
export { globalThemeSwitcher as themeManager };

// In your application:
// themeManager.setTheme('cyberpunk');
// themeManager.setTheme('linkedin');

// Or add the theme selector to your page:
// document.body.appendChild(themeManager.createThemeSelector());
```

## Best Practices

### Performance Considerations

```javascript
// Efficient theme management
const PerformanceOptimizedTheme = {
  // Batch color updates to minimize reflows
  updateTheme: (theme) => {
    // Request animation frame for smooth updates
    requestAnimationFrame(() => {
      config.setColors(theme.colors);
      config.setDialogColors(theme.dialogColors);
    });
  },

  // Preload critical themes
  preloadThemes: ['light', 'dark', 'high-contrast'],

  // Lazy load theme configurations
  loadTheme: async (themeName) => {
    if (!this.cachedThemes[themeName]) {
      const themeConfig = await import(`./themes/${themeName}.js`);
      this.cachedThemes[themeName] = themeConfig.default;
    }
    return this.cachedThemes[themeName];
  }
};
```

### Testing Themes

```javascript
// Theme testing utilities
const ThemeTester = {
  testAllThemeVariants: () => {
    const themes = ['default', 'brutalism', 'glass', 'minimal', 'modern', 'modernDark'];
    const types = ['success', 'error', 'warning', 'info'];

    themes.forEach(theme => {
      console.log(`Testing theme: ${theme}`);
      Toast.setTheme(theme);

      types.forEach(type => {
        Toast.show(`Test ${type} message with ${theme} theme`, type);
      });
    });
  },

  testColorContrast: (theme) => {
    // Automated contrast testing
    const tester = document.createElement('div');
    tester.style.position = 'absolute';
    tester.style.left = '-9999px';

    // Test all color combinations
    // Return contrast ratio and WCAG compliance
  }
};
```

## Next Steps

- Learn about [advanced configuration](/guide/config)
- Explore [dialog API details](/guide/dialog)
- Check [React integration](/guide/react)
- Read about [Vue integration](/guide/vue)