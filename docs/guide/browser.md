# 🌐 Browser Usage

UI Alerts works seamlessly in the browser without any build tools or frameworks. Perfect for static sites, landing pages, WordPress sites, or any web project that needs beautiful notifications without complex build processes.

## ✨ Browser Features

- 🚀 **Zero Dependencies** - Just include CSS and JS files
- 📱 **Fully Responsive** - Works on all devices and screen sizes
- 🎨 **CDN Ready** - Available on jsDelivr with instant caching
- ⚡ **Instant Setup** - Copy-paste and you're ready to go
- 🔧 **No Build Tools** - Works with plain HTML/CSS/JS
- 🌍 **Universal Compatibility** - Chrome, Firefox, Safari, Edge, mobile browsers

## 🚀 Quick Start

### Complete HTML Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UI Alerts - Browser Demo</title>

  <!-- UI Alerts CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/style.min.css" />

  <!-- Optional: Custom styling for demo -->
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: #f8fafc;
    }

    .demo-container {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin: 2rem 0;
    }

    .button-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 1rem 0;
    }

    .btn {
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 14px;
    }

    .btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .btn-success { background: #10b981; color: white; }
    .btn-error { background: #ef4444; color: white; }
    .btn-warning { background: #f59e0b; color: white; }
    .btn-info { background: #3b82f6; color: white; }
    .btn-primary { background: #8b5cf6; color: white; }
    .btn-dark { background: #1f2937; color: white; }

    .form-group {
      margin: 1rem 0;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .form-group input, .form-group select, .form-group textarea {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="demo-container">
    <h1>🎉 UI Alerts Browser Demo</h1>
    <p>Complete demonstration of all UI Alerts features in pure HTML/JavaScript</p>

    <!-- Toast Examples -->
    <h2>🍞 Toast Notifications</h2>
    <div class="button-grid">
      <button class="btn btn-success" onclick="showSuccessToast()">
        ✅ Success Toast
      </button>
      <button class="btn btn-error" onclick="showErrorToast()">
        ❌ Error Toast
      </button>
      <button class="btn btn-warning" onclick="showWarningToast()">
        ⚠️ Warning Toast
      </button>
      <button class="btn btn-info" onclick="showInfoToast()">
        ℹ️ Info Toast
      </button>
      <button class="btn btn-primary" onclick="showPrimaryToast()">
        🎯 Primary Toast
      </button>
      <button class="btn btn-dark" onclick="showDarkToast()">
        🌙 Dark Toast
      </button>
    </div>

    <!-- Custom Toast Examples -->
    <h3>🎨 Custom Toast Examples</h3>
    <div class="button-grid">
      <button onclick="showCustomToast()">
        🎨 Custom Styled
      </button>
      <button onclick="showAnimatedToast()">
        ⚡ Animated Toast
      </button>
      <button onclick="showPositionedToast()">
        📍 Positioned Toast
      </button>
    </div>

    <!-- Dialog Examples -->
    <h2>🧊 Dialog Boxes</h2>
    <div class="button-grid">
      <button class="btn btn-info" onclick="showAlertDialog()">
        📢 Alert Dialog
      </button>
      <button class="btn btn-warning" onclick="showConfirmDialog()">
        ❓ Confirm Dialog
      </button>
      <button class="btn btn-primary" onclick="showPromptDialog()">
        ✏️ Prompt Dialog
      </button>
    </div>

    <!-- Form Examples -->
    <h2>📝 Form Integration</h2>
    <form id="demoForm" onsubmit="handleFormSubmit(event)">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>

      <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4"></textarea>
      </div>

      <button type="submit" class="btn btn-primary">
        📤 Submit Form
      </button>
    </form>

    <!-- Theme Examples -->
    <h2>🎨 Theme Examples</h2>
    <div class="button-grid">
      <button onclick="setTheme('default')">
        🎯 Default Theme
      </button>
      <button onclick="setTheme('brutalism')">
        💥 Brutalism Theme
      </button>
      <button onclick="setTheme('glass')">
        🪟 Glass Theme
      </button>
      <button onclick="setTheme('minimal')">
        ⭕ Minimal Theme
      </button>
      <button onclick="setTheme('modern')">
        🏙️ Modern Theme
      </button>
      <button onclick="setTheme('modernDark')">
        🌙 Modern Dark Theme
      </button>
    </div>
  </div>

  <!-- UI Alerts JavaScript -->
  <script src="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/alerts.umd.min.js"></script>

  <!-- Demo JavaScript -->
  <script>
    // Wait for BFKR to be available
    document.addEventListener('DOMContentLoaded', function() {
      // Initialize with a welcome message
      setTimeout(() => {
        BFKR.Toast.success("🎉 Welcome to UI Alerts Browser Demo!", {
          title: "Demo Loaded",
          duration: 4000,
          animation: "bounce"
        });
      }, 500);
    });

    // Toast Examples
    function showSuccessToast() {
      BFKR.Toast.success("✅ Operation completed successfully!", {
        title: "Success",
        duration: 3000
      });
    }

    function showErrorToast() {
      BFKR.Toast.error("❌ Something went wrong!", {
        title: "Error",
        duration: 5000
      });
    }

    function showWarningToast() {
      BFKR.Toast.warning("⚠️ Please review your input", {
        title: "Warning",
        duration: 4000
      });
    }

    function showInfoToast() {
      BFKR.Toast.info("ℹ️ New updates are available", {
        title: "Information",
        duration: 3000
      });
    }

    function showPrimaryToast() {
      BFKR.Toast.primary("🎯 Primary action completed!", {
        title: "Primary",
        duration: 3000
      });
    }

    function showDarkToast() {
      BFKR.Toast.dark("🌙 Dark mode notification", {
        title: "Dark",
        duration: 3000
      });
    }

    // Custom Toast Examples
    function showCustomToast() {
      BFKR.Toast.show("🎨 This is a custom styled toast!", "custom", {
        title: "Custom Design",
        icon: "🌟",
        duration: 6000,
        position: "top-right",
        animation: "bounce",
        customStyle: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#ffffff",
          borderRadius: "16px",
          border: "2px solid #4c51bf",
          boxShadow: "0 10px 25px rgba(102, 126, 234, 0.4)",
          padding: "20px",
          fontSize: "16px"
        }
      });
    }

    function showAnimatedToast() {
      const animations = ['slide', 'fade', 'bounce', 'zoom', 'ease-in', 'ease-out'];
      const animation = animations[Math.floor(Math.random() * animations.length)];

      BFKR.Toast.show(`⚡ Animation: ${animation}`, "info", {
        title: "Animated Toast",
        animation: animation,
        duration: 4000,
        position: "top-center"
      });
    }

    function showPositionedToast() {
      const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];
      const position = positions[Math.floor(Math.random() * positions.length)];

      BFKR.Toast.setPosition(position);
      BFKR.Toast.info(`📍 Positioned: ${position}`, {
        title: "Position Demo",
        duration: 3000
      });
    }

    // Dialog Examples
    function showAlertDialog() {
      BFKR.Dialog.alert("📢 This is an important system announcement! All systems are operational.", {
        title: "System Notice",
        type: "info",
        icon: "📡",
        width: "450px"
      });
    }

    function showConfirmDialog() {
      BFKR.Dialog.confirm("🗑️ Delete this item permanently? This action cannot be undone.", {
        title: "⚠️ Confirm Delete",
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
            BFKR.Toast.success("✅ Item deleted successfully!");
          } else {
            BFKR.Toast.info("ℹ️ Action cancelled");
          }
        }
      });
    }

    function showPromptDialog() {
      BFKR.Dialog.prompt("📧 Please enter your email address:", {
        title: "🔐 Email Required",
        type: "info",
        icon: "📮",
        width: "400px",
        onSubmit: (value) => {
          if (!value) {
            BFKR.Toast.warning("⚠️ Email is required");
            return;
          }
          if (!value.includes('@')) {
            BFKR.Toast.error("❌ Please enter a valid email");
            return;
          }
          BFKR.Toast.success(`✅ Email registered: ${value}`);
        }
      });
    }

    // Form Handling
    function handleFormSubmit(event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      // Validate
      if (!data.name || !data.email) {
        BFKR.Toast.error("❌ Please fill in all required fields");
        return;
      }

      // Show confirmation
      BFKR.Dialog.confirm("📤 Submit this form data?", {
        title: "Confirm Submission",
        type: "info",
        width: "500px",
        style: {
          fontFamily: "monospace",
          fontSize: "12px",
          whiteSpace: "pre-wrap"
        },
        onConfirm: (confirmed) => {
          if (confirmed) {
            // Simulate form submission
            BFKR.Toast.info("⏳ Submitting form...");

            setTimeout(() => {
              BFKR.Toast.success(`✅ Form submitted successfully! Name: ${data.name}`);
              event.target.reset();
            }, 1500);
          }
        }
      });
    }

    // Theme Management
    function setTheme(themeName) {
      BFKR.Toast.setTheme(themeName);
      BFKR.Dialog.setTheme(themeName);

      BFKR.Toast.info(`🎨 Theme changed to: ${themeName}`, {
        title: "Theme Updated",
        duration: 2000
      });
    }

    // Global Configuration
    function setupGlobalConfig() {
      // Set custom colors
      BFKR.config.setColors({
        success: "#10b981",
        error: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6",
        primary: "#8b5cf6",
        dark: "#1f2937",
        custom: "#ec4899"
      });

      // Set dialog colors
      BFKR.config.setDialogColors({
        ok: "#10b981",
        cancel: "#6b7280",
        background: "#ffffff",
        text: "#1f2937"
      });

      // Set default position
      BFKR.Toast.setPosition("bottom-right");
    }

    // Initialize configuration
    setupGlobalConfig();

    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
      // Ctrl/Cmd + Shift + T: Show test toast
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'T') {
        event.preventDefault();
        BFKR.Toast.info("⌨️ Keyboard shortcut activated! Ctrl+Shift+T", {
          title: "Shortcut Demo"
        });
      }

      // Ctrl/Cmd + Shift + D: Show test dialog
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        BFKR.Dialog.alert("⌨️ This dialog was triggered by Ctrl+Shift+D", {
          title: "Keyboard Shortcut"
        });
      }
    });
  </script>
</body>
</html>
```

### Minimal Setup

For the quickest possible setup:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Quick UI Alerts Demo</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/style.min.css" />
</head>
<body>
  <button onclick="BFKR.Toast.success('🎉 Hello World!')">Click Me!</button>
  <script src="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/alerts.umd.min.js"></script>
</body>
</html>
```

## 📚 CDN Options

### Versioned CDN Links

```html
<!-- Specific version (recommended for production) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts@1.0.0/dist/style.min.css" />
<script src="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts@1.0.0/dist/alerts.umd.min.js"></script>

<!-- Latest version (good for development) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/style.min.css" />
<script src="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/alerts.umd.min.js"></script>

<!-- Minified versions -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/style.min.css" />
<script src="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/alerts.umd.min.js"></script>
```

### Alternative CDN Providers

```html
<!-- jsDelivr (default) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/style.min.css" />
<script src="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/alerts.umd.min.js"></script>

<!-- UNPKG -->
<link rel="stylesheet" href="https://unpkg.com/@pakoor/ui-alerts/dist/style.min.css" />
<script src="https://unpkg.com/@pakoor/ui-alerts/dist/alerts.umd.min.js"></script>

<!--cdnjs -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ui-alerts/1.0.0/style.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/ui-alerts/1.0.0/alerts.umd.min.js"></script>
```

## 🌍 Global API Reference

When using the CDN version, UI Alerts is available globally as `BFKR`:

### Toast API

```javascript
// Basic methods
BFKR.Toast.success(message, options);
BFKR.Toast.error(message, options);
BFKR.Toast.warning(message, options);
BFKR.Toast.info(message, options);
BFKR.Toast.primary(message, options);
BFKR.Toast.dark(message, options);

// Generic method
BFKR.Toast.show(message, type, options);

// Configuration
BFKR.Toast.setPosition(position);     // Set default position
BFKR.Toast.setTheme(themeName);       // Set theme
```

### Dialog API

```javascript
// Dialog types
BFKR.Dialog.alert(message, options);
BFKR.Dialog.confirm(message, options);
BFKR.Dialog.prompt(message, options);

// Configuration
BFKR.Dialog.setTheme(themeName);      // Set theme
```

### Configuration API

```javascript
// Global color configuration
BFKR.config.setColors({
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
  primary: "#8b5cf6",
  dark: "#1f2937"
});

// Dialog color configuration
BFKR.config.setDialogColors({
  ok: "#10b981",
  cancel: "#6b7280",
  background: "#ffffff",
  text: "#1f2937"
});
```

## 🎨 Advanced Browser Examples

### Real-World Form Integration

```html
<form id="contactForm">
  <div class="form-group">
    <label for="name">Name *</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div class="form-group">
    <label for="priority">Priority</label>
    <select id="priority" name="priority">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>

  <button type="submit">Submit</button>
</form>

<script>
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Validation
  if (!data.name || !data.email) {
    BFKR.Toast.error("❌ Please fill in all required fields", {
      title: "Validation Error",
      position: "top-center"
    });
    return;
  }

  // Email validation
  if (!data.email.includes('@')) {
    BFKR.Toast.warning("⚠️ Please enter a valid email address", {
      title: "Invalid Email"
    });
    return;
  }

  // Priority-based messaging
  const priorityMessages = {
    low: { icon: "🔵", type: "info" },
    medium: { icon: "🟡", type: "warning" },
    high: { icon: "🔴", type: "error" }
  };

  const priority = priorityMessages[data.priority];

  // Confirmation dialog
  const confirmed = await new Promise((resolve) => {
    BFKR.Dialog.confirm(`Submit this ${data.priority} priority request?`, {
      title: `${priority.icon} Confirm Submission`,
      type: priority.type,
      width: "400px",
      onConfirm: resolve
    });
  });

  if (confirmed) {
    // Simulate API call
    BFKR.Toast.info("⏳ Submitting your request...", {
      title: "Processing",
      duration: 2000
    });

    setTimeout(() => {
      BFKR.Toast.success(`✅ Request submitted! Priority: ${data.priority}`, {
        title: "Success",
        duration: 5000,
        customStyle: {
          background: "linear-gradient(45deg, #10b981, #059669)",
          color: "white"
        }
      });

      // Reset form
      this.reset();
    }, 2000);
  }
});
</script>
```

### E-commerce Integration

```html
<div class="product-card">
  <h3>🛍️ Premium Product</h3>
  <p class="price">$29.99</p>
  <p class="description">High-quality product with amazing features</p>

  <div class="actions">
    <button onclick="addToCart()" class="btn-add-cart">
      🛒 Add to Cart
    </button>
    <button onclick="buyNow()" class="btn-buy">
      ⚡ Buy Now
    </button>
    <button onclick="addToWishlist()" class="btn-wishlist">
      ❤️ Add to Wishlist
    </button>
  </div>

  <div class="stock-info">
    <span id="stock-count">5</span> items in stock
  </div>
</div>

<script>
let cartCount = 0;
let stockCount = 5;

function addToCart() {
  if (stockCount <= 0) {
    BFKR.Dialog.alert("❌ This product is currently out of stock", {
      title: "Out of Stock",
      type: "error"
    });
    return;
  }

  cartCount++;
  stockCount--;
  updateStockDisplay();

  BFKR.Toast.success("🛒 Added to cart!", {
    title: "Cart Updated",
    duration: 3000,
    position: "bottom-right",
    customStyle: {
      background: "#10b981",
      color: "white"
    }
  });

  // Show cart count update
  BFKR.Toast.info(`🛒 Cart: ${cartCount} items`, {
    duration: 2000,
    position: "top-right"
  });
}

function buyNow() {
  if (stockCount <= 0) {
    BFKR.Toast.error("❌ Product is out of stock", {
      title: "Cannot Purchase"
    });
    return;
  }

  BFKR.Dialog.confirm("Proceed to checkout with this item?", {
    title: "💳 Confirm Purchase",
    type: "info",
    icon: "🛍️",
    width: "400px",
    buttonStyle: {
      ok: {
        background: "#10b981",
        color: "white",
        borderRadius: "8px"
      }
    },
    onConfirm: (confirmed) => {
      if (confirmed) {
        stockCount--;
        updateStockDisplay();

        BFKR.Toast.success("🎉 Redirecting to checkout...", {
          title: "Purchase Confirmed",
          duration: 3000
        });

        // Simulate redirect
        setTimeout(() => {
          BFKR.Toast.info("🌐 Checkout page would open here", {
            title: "Navigation",
            duration: 5000
          });
        }, 3000);
      }
    }
  });
}

function addToWishlist() {
  BFKR.Dialog.prompt("💝 Add a note for this wishlist item:", {
    title: "❤️ Add to Wishlist",
    type: "info",
    width: "400px",
    onSubmit: (note) => {
      if (note) {
        BFKR.Toast.success(`💝 Added to wishlist: "${note}"`, {
          title: "Wishlist Updated",
          duration: 4000,
          customStyle: {
            background: "#ec4899",
            color: "white"
          }
        });
      } else {
        BFKR.Toast.success("❤️ Added to wishlist!", {
          title: "Wishlist Updated",
          duration: 3000,
          customStyle: {
            background: "#ec4899",
            color: "white"
          }
        });
      }
    }
  });
}

function updateStockDisplay() {
  document.getElementById('stock-count').textContent = stockCount;

  if (stockCount <= 2) {
    BFKR.Toast.warning(`⚠️ Only ${stockCount} items left in stock!`, {
      title: "Low Stock",
      duration: 4000
    });
  }
}
</script>
```

### User Authentication Flow

```html
<div id="auth-container">
  <!-- Login Form -->
  <form id="loginForm">
    <h3>🔐 Login</h3>
    <input type="email" placeholder="Email" id="loginEmail" required>
    <input type="password" placeholder="Password" id="loginPassword" required>
    <button type="submit">Login</button>
    <p><a href="#" onclick="showForgotPassword()">Forgot Password?</a></p>
    <p><a href="#" onclick="showRegisterForm()">Don't have an account? Register</a></p>
  </form>

  <!-- Registration Form (Hidden by default) -->
  <form id="registerForm" style="display: none;">
    <h3>📝 Register</h3>
    <input type="text" placeholder="Full Name" id="registerName" required>
    <input type="email" placeholder="Email" id="registerEmail" required>
    <input type="password" placeholder="Password" id="registerPassword" required>
    <input type="password" placeholder="Confirm Password" id="registerConfirmPassword" required>
    <button type="submit">Register</button>
    <p><a href="#" onclick="showLoginForm()">Already have an account? Login</a></p>
  </form>
</div>

<script>
function showLoginForm() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
}

function showRegisterForm() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
}

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Validation
  if (!email || !password) {
    BFKR.Toast.error("❌ Please fill in all fields", {
      title: "Validation Error"
    });
    return;
  }

  if (password.length < 6) {
    BFKR.Toast.warning("⚠️ Password must be at least 6 characters", {
      title: "Invalid Password"
    });
    return;
  }

  // Simulate login
  BFKR.Toast.info("🔐 Authenticating...", {
    title: "Login",
    duration: 2000
  });

  setTimeout(() => {
    // Simulate successful login
    BFKR.Toast.success(`🎉 Welcome back, ${email}!`, {
      title: "Login Successful",
      duration: 5000,
      customStyle: {
        background: "linear-gradient(45deg, #10b981, #059669)",
        color: "white"
      }
    });

    // Show success dialog
    BFKR.Dialog.alert(`Successfully logged in as ${email}`, {
      title: "🎉 Login Successful",
      type: "success",
      width: "400px"
    });

    // Reset form
    this.reset();
  }, 2000);
});

// Registration Form Handler
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    BFKR.Toast.error("❌ Please fill in all fields", {
      title: "Validation Error"
    });
    return;
  }

  if (password !== confirmPassword) {
    BFKR.Toast.error("❌ Passwords do not match", {
      title: "Password Mismatch"
    });
    return;
  }

  if (password.length < 6) {
    BFKR.Toast.warning("⚠️ Password must be at least 6 characters", {
      title: "Weak Password"
    });
    return;
  }

  // Confirm registration
  BFKR.Dialog.confirm(`Create account for ${name} (${email})?`, {
    title: "📝 Confirm Registration",
    type: "info",
    width: "400px",
    onConfirm: (confirmed) => {
      if (confirmed) {
        BFKR.Toast.info("📝 Creating account...", {
          title: "Registration",
          duration: 2000
        });

        setTimeout(() => {
          BFKR.Toast.success(`🎉 Account created for ${name}!`, {
            title: "Registration Successful",
            duration: 5000,
            customStyle: {
              background: "linear-gradient(45deg, #8b5cf6, #7c3aed)",
              color: "white"
            }
          });

          // Switch to login form
          showLoginForm();
          this.reset();
        }, 2000);
      }
    }
  });
});

function showForgotPassword() {
  BFKR.Dialog.prompt("Enter your email address for password reset:", {
    title: "🔑 Forgot Password",
    type: "info",
    width: "400px",
    onSubmit: (email) => {
      if (email && email.includes('@')) {
        BFKR.Toast.success(`📧 Password reset link sent to ${email}`, {
          title: "Reset Link Sent",
          duration: 5000
        });
      } else {
        BFKR.Toast.error("❌ Please enter a valid email address", {
          title: "Invalid Email"
        });
      }
    }
  });
}
</script>
```

## 🎯 Performance Tips

### Optimize Loading

```html
<!-- Use preload for better performance -->
<link rel="preload" href="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/style.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/style.min.css"></noscript>

<!-- Use async for JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/alerts.umd.min.js" async></script>

<script>
// Initialize when ready
window.addEventListener('load', function() {
  if (typeof BFKR !== 'undefined') {
    BFKR.Toast.success("🚀 Ready to use UI Alerts!");
  }
});
</script>
```

### Cache Strategy

```html
<!-- Use specific version for production caching -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts@1.0.0/dist/style.min.css" />
<script src="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts@1.0.0/dist/alerts.umd.min.js"></script>

<!-- Add integrity and crossorigin for security -->
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts@1.0.0/dist/style.min.css"
      integrity="sha384-xxx"
      crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts@1.0.0/dist/alerts.umd.min.js"
        integrity="sha384-xxx"
        crossorigin="anonymous"></script>
```

## 🚀 Next Steps

Now that you have UI Alerts working in the browser, you can:

- **[Explore React Integration](/guide/react)** - Use with React applications
- **[Try Vue Integration](/guide/vue)** - Vue.js composables and plugin
- **[Customize Themes](/guide/themes)** - Create custom themes and styles
- **[Advanced Configuration](/guide/config)** - Global settings and options
- **[Dialog API Reference](/guide/dialog)** - Complete dialog documentation

## 🎉 Summary

UI Alerts in the browser provides:

✅ **Zero Dependencies** - Just include CSS and JS
✅ **Complete API** - All features available without frameworks
✅ **Responsive Design** - Works on all devices
✅ **CDN Ready** - Instant setup with jsDelivr/UNPKG
✅ **Production Ready** - Optimized and cached
✅ **Developer Friendly** - Simple API with extensive customization

Perfect for static sites, WordPress themes, landing pages, and any project that needs beautiful notifications without complex build tools! 🎯

```javascript
// Toast API
BFKR.Toast.show(message, type, options)
BFKR.Toast.success(message, options)
BFKR.Toast.error(message, options)
BFKR.Toast.warning(message, options)
BFKR.Toast.info(message, options)
BFKR.Toast.primary(message, options)
BFKR.Toast.dark(message, options)

// Dialog API
BFKR.Dialog.alert(message, options)
BFKR.Dialog.confirm(message, options)
BFKR.Dialog.prompt(message, options)

// Configuration API
BFKR.config.setColors(colors)
BFKR.config.setDialogColors(colors)
```

## Browser Examples

### Interactive Demo

```html
<div class="demo-section">
  <h3>Toast Examples</h3>
  <button onclick="BFKR.Toast.success('✅ Success!')">Success</button>
  <button onclick="BFKR.Toast.error('❌ Error occurred!')">Error</button>
  <button onclick="BFKR.Toast.warning('⚠️ Warning!')">Warning</button>
  <button onclick="BFKR.Toast.info('ℹ️ Information')">Info</button>
</div>

<div class="demo-section">
  <h3>Dialog Examples</h3>
  <button onclick="showAlert()">Alert</button>
  <button onclick="showConfirm()">Confirm</button>
  <button onclick="showPrompt()">Prompt</button>
</div>

<script>
  function showAlert() {
    BFKR.Dialog.alert("This is an important alert!", {
      title: "Alert",
      type: "info"
    });
  }

  function showConfirm() {
    BFKR.Dialog.confirm("Do you want to delete this item?", {
      title: "Confirm Delete",
      type: "warning",
      onConfirm: (result) => {
        if (result) {
          BFKR.Toast.success("Item deleted!");
        } else {
          BFKR.Toast.info("Action cancelled");
        }
      }
    });
  }

  function showPrompt() {
    BFKR.Dialog.prompt("What's your name?", {
      title: "User Input",
      type: "info",
      onSubmit: (value) => {
        if (value) {
          BFKR.Toast.success(`Hello, ${value}!`);
        }
      }
    });
  }
</script>
```

### Advanced Configuration

```html
<script>
  // Configure global colors
  BFKR.config.setColors({
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
    primary: "#8b5cf6",
    dark: "#1f2937"
  });

  // Configure dialog colors
  BFKR.config.setDialogColors({
    ok: "#10b981",
    cancel: "#6b7280",
    background: "#ffffff",
    text: "#1f2937"
  });

  // Set default position
  BFKR.Toast.setPosition("bottom-right");

  // Set theme
  BFKR.Toast.setTheme("modern");
  BFKR.Dialog.setTheme("modern");
</script>
```

## Event Handling

### User Interaction Events

```html
<button id="save-btn">Save Data</button>
<button id="delete-btn">Delete Item</button>

<script>
  document.getElementById('save-btn').addEventListener('click', function() {
    // Simulate saving data
    setTimeout(() => {
      BFKR.Toast.success("Data saved successfully!", {
        title: "Success",
        duration: 3000
      });
    }, 1000);
  });

  document.getElementById('delete-btn').addEventListener('click', function() {
    BFKR.Dialog.confirm("Are you sure you want to delete this item?", {
      title: "Confirm Delete",
      type: "warning",
      icon: "🗑️",
      onConfirm: (confirmed) => {
        if (confirmed) {
          // Perform deletion
          BFKR.Toast.success("Item deleted permanently");
        }
      }
    });
  });
</script>
```

### Form Validation

```html
<form id="myForm">
  <input type="email" id="email" placeholder="Enter your email" required>
  <input type="password" id="password" placeholder="Enter password" required>
  <button type="submit">Submit</button>
</form>

<script>
  document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      BFKR.Toast.error("Please fill in all fields", {
        title: "Validation Error"
      });
      return;
    }

    if (!email.includes('@')) {
      BFKR.Toast.warning("Please enter a valid email address");
      return;
    }

    // Simulate form submission
    BFKR.Toast.success("Form submitted successfully!");
  });
</script>
```

## Responsive Design

UI Alerts automatically adapts to different screen sizes:

```html
<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }

  .demo-card {
    padding: 20px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #ffffff;
  }
</style>

<div class="container">
  <h1>UI Alerts - Responsive Demo</h1>

  <div class="demo-grid">
    <div class="demo-card">
      <h3>Position Demo</h3>
      <button onclick="BFKR.Toast.setPosition('top-left'); BFKR.Toast.info('Top Left');">Top Left</button>
      <button onclick="BFKR.Toast.setPosition('top-center'); BFKR.Toast.info('Top Center');">Top Center</button>
      <button onclick="BFKR.Toast.setPosition('top-right'); BFKR.Toast.info('Top Right');">Top Right</button>
      <button onclick="BFKR.Toast.setPosition('bottom-left'); BFKR.Toast.info('Bottom Left');">Bottom Left</button>
      <button onclick="BFKR.Toast.setPosition('bottom-center'); BFKR.Toast.info('Bottom Center');">Bottom Center</button>
      <button onclick="BFKR.Toast.setPosition('bottom-right'); BFKR.Toast.info('Bottom Right');">Bottom Right</button>
    </div>

    <div class="demo-card">
      <h3>Animation Demo</h3>
      <button onclick="showAnimation('slide')">Slide</button>
      <button onclick="showAnimation('fade')">Fade</button>
      <button onclick="showAnimation('bounce')">Bounce</button>
      <button onclick="showAnimation('zoom')">Zoom</button>
    </div>
  </div>
</div>

<script>
  function showAnimation(animation) {
    BFKR.Toast.show(`${animation} animation!`, "info", {
      animation: animation,
      position: "top-center"
    });
  }
</script>
```

## Browser Compatibility

UI Alerts supports all modern browsers:

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

For older browsers, you may need appropriate polyfills for ES6 features.

## Performance Tips

1. **Load styles asynchronously**:
```html
<link rel="preload" href="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/style.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

2. **Cache the library**:
```html
<script src="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts/dist/alerts.umd.min.js?v=1.0.0"></script>
```

3. **Use specific versions** to avoid breaking changes:
```html
<script src="https://cdn.jsdelivr.net/npm/@pakoor/ui-alerts@1.0.0/dist/alerts.umd.min.js"></script>
```

## Next Steps

- Learn about [React integration](/guide/react)
- Explore [Vue integration](/guide/vue)
- Discover [theme customization](/guide/themes)
- Read about [advanced configuration](/guide/config)