# React Integration

UI Alerts provides seamless React integration through a custom hook that gives you access to all toast and dialog functionality with proper TypeScript support.

## Installation

```bash
npm install @pakoor/ui-alerts
# or
yarn add @pakoor/ui-alerts
# or
pnpm add @pakoor/ui-alerts
```

## Basic Setup

### Import Styles

First, import the CSS styles in your application:

```tsx
// src/main.tsx or src/App.tsx
import '@pakoor/ui-alerts/dist/style.min.css';
```

### Using the Hook

```tsx
import React from 'react';
import { useBFKR } from '@pakoor/ui-alerts/react';

function App() {
  const { toast, dialog, theme } = useBFKR();

  const handleSuccess = () => {
    toast.success("Operation completed successfully!");
  };

  const handleConfirm = () => {
    dialog.confirm("Are you sure you want to delete this item?", {
      type: "warning",
      title: "Confirm Delete",
      onConfirm: (confirmed) => {
        if (confirmed) {
          toast.success("Item deleted!");
        }
      }
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleConfirm}>Show Confirm</button>
    </div>
  );
}

export default App;
```

## Hook API

The `useBFKR` hook returns an object with three main properties:

```typescript
interface BFKRHook {
  toast: ToastAPI;
  dialog: DialogAPI;
  theme: {
    setTheme: (theme: string) => void;
    setColors: (colors: GlobalColors) => void;
  };
}
```

## Toast Examples

### All Toast Types

```tsx
import { useBFKR } from '@pakoor/ui-alerts/react';
import type { ToastType } from '@pakoor/ui-alerts';

function ToastDemo() {
  const { toast } = useBFKR();

  const showToast = (type: ToastType, message: string) => {
    toast[type](message);
  };

  return (
    <div className="toast-demo">
      <button onClick={() => showToast('success', '✅ Success!')}>
        Success
      </button>
      <button onClick={() => showToast('error', '❌ Error!')}>
        Error
      </button>
      <button onClick={() => showToast('warning', '⚠️ Warning!')}>
        Warning
      </button>
      <button onClick={() => showToast('info', 'ℹ️ Info!')}>
        Info
      </button>
      <button onClick={() => showToast('primary', '🎯 Primary!')}>
        Primary
      </button>
      <button onClick={() => showToast('dark', '🌙 Dark!')}>
        Dark
      </button>
    </div>
  );
}
```

### Advanced Toast Options

```tsx
import { useBFKR } from '@pakoor/ui-alerts/react';
import type { ToastOptions } from '@pakoor/ui-alerts';

function AdvancedToastDemo() {
  const { toast } = useBFKR();

  const showAdvancedToast = () => {
    const options: ToastOptions = {
      title: "Upload Complete",
      icon: "📤",
      duration: 5000,
      position: "bottom-right",
      animation: "bounce",
      customStyle: {
        background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
        color: "#ffffff",
        borderRadius: "12px"
      }
    };

    toast.show("Your file has been uploaded successfully!", "success", options);
  };

  return (
    <button onClick={showAdvancedToast}>
      Show Advanced Toast
    </button>
  );
}
```

## Dialog Examples

### Alert Dialog

```tsx
import { useBFKR } from '@pakoor/ui-alerts/react';

function AlertDialogDemo() {
  const { dialog, toast } = useBFKR();

  const showAlert = () => {
    dialog.alert("Welcome to UI Alerts! This library provides beautiful notifications and dialogs.", {
      title: "Welcome!",
      type: "info",
      icon: "🎉",
      width: "500px"
    });
  };

  return (
    <button onClick={showAlert}>
      Show Alert
    </button>
  );
}
```

### Confirmation Dialog

```tsx
import { useBFKR } from '@pakoor/ui-alerts/react';
import type { DialogOptions } from '@pakoor/ui-alerts';

interface ConfirmDialogDemoProps {
  onDelete: () => void;
}

function ConfirmDialogDemo({ onDelete }: ConfirmDialogDemoProps) {
  const { dialog, toast } = useBFKR();

  const handleDelete = () => {
    const options: DialogOptions = {
      type: "warning",
      title: "Confirm Delete",
      icon: "🗑️",
      width: "400px",
      buttonStyle: {
        ok: {
          background: "#ef4444",
          color: "#ffffff",
          borderRadius: "8px"
        },
        cancel: {
          background: "#6b7280",
          color: "#ffffff",
          borderRadius: "8px"
        }
      },
      onConfirm: (confirmed) => {
        if (confirmed) {
          onDelete();
          toast.success("Item deleted successfully!");
        } else {
          toast.info("Deletion cancelled");
        }
      }
    };

    dialog.confirm("This action cannot be undone. Are you sure you want to continue?", options);
  };

  return (
    <button onClick={handleDelete} className="delete-btn">
      Delete Item
    </button>
  );
}
```

### Prompt Dialog

```tsx
import { useBFKR } from '@pakoor/ui-alerts/react';

function PromptDialogDemo() {
  const { dialog, toast } = useBFKR();

  const handlePrompt = () => {
    dialog.prompt("Please enter your name:", {
      type: "info",
      title: "User Information",
      width: "400px",
      onSubmit: (value) => {
        if (value && value.trim()) {
          toast.success(`Hello, ${value}! 👋`);
        } else {
          toast.warning("Please enter a valid name");
        }
      }
    });
  };

  return (
    <button onClick={handlePrompt}>
      Get User Name
    </button>
  );
}
```

## Custom Hooks

You can create custom hooks for repeated patterns:

```tsx
import { useCallback } from 'react';
import { useBFKR } from '@pakoor/ui-alerts/react';

export function useNotifications() {
  const { toast, dialog } = useBFKR();

  const showSuccess = useCallback((message: string, title?: string) => {
    toast.success(message, title ? { title } : undefined);
  }, [toast]);

  const showError = useCallback((message: string, title?: string) => {
    toast.error(message, title ? { title } : undefined);
  }, [toast]);

  const confirmAction = useCallback((
    message: string,
    onConfirm: () => void,
    title?: string
  ) => {
    dialog.confirm(message, {
      title: title || "Confirm Action",
      type: "warning",
      onConfirm: (confirmed) => {
        if (confirmed) onConfirm();
      }
    });
  }, [dialog]);

  return {
    showSuccess,
    showError,
    confirmAction
  };
}

// Usage
function MyComponent() {
  const { showSuccess, showError, confirmAction } = useNotifications();

  const handleSave = async () => {
    try {
      await saveData();
      showSuccess("Data saved successfully!", "Success");
    } catch (error) {
      showError("Failed to save data", "Error");
    }
  };

  const handleDelete = () => {
    confirmAction(
      "Delete this item permanently?",
      () => {
        deleteItem();
        showSuccess("Item deleted!");
      },
      "Confirm Delete"
    );
  };

  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
```

## Theme Configuration

```tsx
import { useEffect } from 'react';
import { useBFKR } from '@pakoor/ui-alerts/react';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useBFKR();

  useEffect(() => {
    // Set custom colors
    theme.setColors({
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
      primary: "#8b5cf6",
      dark: "#1f2937"
    });

    // Set theme
    theme.setTheme("modern");
  }, [theme]);

  return <>{children}</>;
}

// Wrap your app
function App() {
  return (
    <ThemeProvider>
      <MyApp />
    </ThemeProvider>
  );
}
```

## Form Integration

```tsx
import { useState } from 'react';
import { useBFKR } from '@pakoor/ui-alerts/react';

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const { toast } = useBFKR();
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields", {
        title: "Validation Error"
      });
      return;
    }

    if (!formData.email.includes('@')) {
      toast.warning("Please enter a valid email address");
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

## TypeScript Best Practices

```tsx
import React from 'react';
import { useBFKR } from '@pakoor/ui-alerts/react';
import type { ToastOptions, DialogOptions, ToastType } from '@pakoor/ui-alerts';

// Define custom props for your notification component
interface NotificationButtonProps {
  message: string;
  type: ToastType;
  options?: ToastOptions;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({
  message,
  type,
  options
}) => {
  const { toast } = useBFKR();

  const handleClick = () => {
    toast[type](message, options);
  };

  return <button onClick={handleClick}>Show {type} Toast</button>;
};

// Custom hook with proper typing
export function useAppNotifications() {
  const { toast, dialog } = useBFKR();

  const notifySuccess = useCallback(
    (message: string, options?: ToastOptions) => {
      toast.success(message, options);
    },
    [toast]
  );

  const notifyError = useCallback(
    (message: string, options?: ToastOptions) => {
      toast.error(message, options);
    },
    [toast]
  );

  const confirmDelete = useCallback(
    (itemName: string, onDelete: () => void) => {
      const options: DialogOptions = {
        type: 'warning',
        title: 'Confirm Delete',
        onConfirm: (confirmed) => {
          if (confirmed) onDelete();
        }
      };

      dialog.confirm(`Delete ${itemName}? This action cannot be undone.`, options);
    },
    [dialog]
  );

  return {
    notifySuccess,
    notifyError,
    confirmDelete
  };
}
```

## Real-World Examples

### E-commerce Cart Management

```tsx
import React, { useState } from 'react';
import { useBFKR } from '@pakoor/ui-alerts/react';
import type { ToastOptions } from '@pakoor/ui-alerts';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

function ShoppingCart() {
  const { toast, dialog } = useBFKR();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      const successOptions: ToastOptions = {
        title: "Cart Updated",
        icon: "🔄",
        animation: "bounce",
        position: "top-right"
      };

      setCartItems(items =>
        items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

      toast.success(
        `Updated ${product.name} quantity in cart`,
        successOptions
      );
    } else {
      const successOptions: ToastOptions = {
        title: "Added to Cart",
        icon: "🛒",
        animation: "slide",
        duration: 4000,
        customStyle: {
          background: "linear-gradient(135deg, #10b981, #059669)",
          borderLeft: "4px solid #047857"
        }
      };

      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      toast.success(
        `${product.name} added to cart!`,
        successOptions
      );
    }
  };

  const removeFromCart = (item: CartItem) => {
    dialog.confirm(
      `Remove ${item.name} from your cart?`,
      {
        type: "warning",
        title: "Remove Item",
        icon: "🗑️",
        width: "400px",
        buttonStyle: {
          ok: {
            background: "#ef4444",
            text: "Remove"
          },
          cancel: {
            background: "#6b7280",
            text: "Keep"
          }
        },
        onConfirm: (confirmed) => {
          if (confirmed) {
            setCartItems(items => items.filter(i => i.id !== item.id));

            toast.warning(
              `${item.name} removed from cart`,
              {
                title: "Item Removed",
                icon: "🗑️",
                duration: 3000
              }
            );
          }
        }
      }
    );
  };

  const clearCart = () => {
    if (cartItems.length === 0) {
      toast.info("Your cart is already empty", {
        title: "Cart Empty",
        icon: "🛒"
      });
      return;
    }

    dialog.confirm(
      `Clear all ${cartItems.length} items from your cart?`,
      {
        type: "error",
        title: "Clear Cart",
        icon: "⚠️",
        width: "450px",
        onConfirm: (confirmed) => {
          if (confirmed) {
            setCartItems([]);

            toast.info("Cart cleared successfully", {
              title: "Cart Cleared",
              icon: "✅",
              duration: 4000,
              animation: "zoom"
            });
          }
        }
      }
    );
  };

  const checkout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty", {
        title: "Cannot Checkout",
        icon: "🛒"
      });
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    dialog.confirm(
      `Proceed to checkout? Total: $${total.toFixed(2)}`,
      {
        type: "info",
        title: "Checkout Confirmation",
        icon: "💳",
        width: "450px",
        onConfirm: async (confirmed) => {
          if (confirmed) {
            // Show processing toast
            const processingToast = toast.info(
              "Processing your order...",
              {
                title: "Processing",
                icon: "⏳",
                duration: 0 // Won't auto-close
              }
            );

            try {
              // Simulate API call
              await new Promise(resolve => setTimeout(resolve, 2000));

              // Close processing toast and show success
              setTimeout(() => processingToast.close?.(), 100);

              toast.success(
                `Order placed successfully! Total: $${total.toFixed(2)}`,
                {
                  title: "Order Complete",
                  icon: "🎉",
                  duration: 6000,
                  animation: "bounce",
                  customStyle: {
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "#ffffff",
                    borderLeft: "4px solid #047857"
                  }
                }
              );

              setCartItems([]);
            } catch (error) {
              processingToast.close?.();
              toast.error("Failed to process order. Please try again.", {
                title: "Checkout Failed",
                icon: "❌",
                duration: 5000
              });
            }
          }
        }
      }
    );
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart ({cartItems.length} items)</h2>

      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="cart-actions">
        <button onClick={clearCart} className="clear-btn">Clear Cart</button>
        <button onClick={checkout} className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
}
```

### File Upload Progress

```tsx
import React, { useState, useCallback } from 'react';
import { useBFKR } from '@pakoor/ui-alerts/react';
import type { ToastOptions } from '@pakoor/ui-alerts';

interface FileUpload {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

function FileUploader() {
  const { toast, dialog } = useBFKR();
  const [uploads, setUploads] = useState<FileUpload[]>([]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const showToastForUpload = useCallback((upload: FileUpload) => {
    const baseOptions: ToastOptions = {
      title: upload.name,
      duration: upload.status === 'error' ? 8000 : 4000,
      position: "bottom-right"
    };

    switch (upload.status) {
      case 'success':
        toast.success(
          `✅ Upload complete (${formatFileSize(upload.size)})`,
          {
            ...baseOptions,
            animation: "bounce",
            customStyle: {
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#ffffff"
            }
          }
        );
        break;

      case 'error':
        toast.error(
          `❌ Upload failed: ${upload.error}`,
          {
            ...baseOptions,
            animation: "shake",
            customStyle: {
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "#ffffff"
            }
          }
        );
        break;
    }
  }, [toast]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newUploads: FileUpload[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'pending'
    }));

    setUploads(prev => [...prev, ...newUploads]);

    // Start upload process
    newUploads.forEach(upload => {
      simulateUpload(upload);
    });
  };

  const simulateUpload = async (upload: FileUpload) => {
    // Show starting toast
    toast.info(`Starting upload: ${upload.name}`, {
      title: "Upload Started",
      icon: "📤",
      duration: 2000
    });

    // Update status to uploading
    setUploads(prev =>
      prev.map(u => u.id === upload.id ? { ...u, status: 'uploading' } : u)
    );

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));

      setUploads(prev =>
        prev.map(u => u.id === upload.id ? { ...u, progress } : u)
      );
    }

    // Random success/error for demonstration
    const isSuccess = Math.random() > 0.2; // 80% success rate
    const finalUpload = {
      ...upload,
      status: isSuccess ? 'success' as const : 'error' as const,
      error: isSuccess ? undefined : 'Network connection failed'
    };

    setUploads(prev =>
      prev.map(u => u.id === upload.id ? finalUpload : u)
    );

    showToastForUpload(finalUpload);
  };

  const retryUpload = async (upload: FileUpload) => {
    const retryUpload = {
      ...upload,
      progress: 0,
      status: 'pending' as const,
      error: undefined
    };

    setUploads(prev =>
      prev.map(u => u.id === upload.id ? retryUpload : u)
    );

    await simulateUpload(retryUpload);
  };

  const cancelUpload = (upload: FileUpload) => {
    dialog.confirm(
      `Cancel upload of ${upload.name}?`,
      {
        type: "warning",
        title: "Cancel Upload",
        icon: "⏹️",
        width: "400px",
        onConfirm: (confirmed) => {
          if (confirmed) {
            setUploads(prev => prev.filter(u => u.id !== upload.id));

            toast.warning(`Upload cancelled: ${upload.name}`, {
              title: "Upload Cancelled",
              icon: "⏹️",
              duration: 3000
            });
          }
        }
      }
    );
  };

  return (
    <div className="file-uploader">
      <h2>File Uploader</h2>

      <div className="upload-area">
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          accept="*"
        />
        <button onClick={() => document.querySelector('input[type="file"]')?.click()}>
          📤 Select Files
        </button>
      </div>

      <div className="uploads-list">
        {uploads.map(upload => (
          <div key={upload.id} className={`upload-item status-${upload.status}`}>
            <div className="upload-info">
              <span className="filename">{upload.name}</span>
              <span className="filesize">{formatFileSize(upload.size)}</span>
            </div>

            {upload.status === 'uploading' && (
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${upload.progress}%` }}
                >
                  {upload.progress}%
                </div>
              </div>
            )}

            {upload.status === 'error' && (
              <div className="error-info">
                <span className="error-message">{upload.error}</span>
                <button onClick={() => retryUpload(upload)} className="retry-btn">
                  🔄 Retry
                </button>
              </div>
            )}

            {upload.status === 'success' && (
              <div className="success-info">
                <span className="success-icon">✅</span>
              </div>
            )}

            {(upload.status === 'pending' || upload.status === 'uploading') && (
              <button
                onClick={() => cancelUpload(upload)}
                className="cancel-btn"
              >
                ❌
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Authentication Flow

```tsx
import React, { useState } from 'react';
import { useBFKR } from '@pakoor/ui-alerts/react';
import type { ToastOptions, DialogOptions } from '@pakoor/ui-alerts';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

function AuthSystem() {
  const { toast, dialog } = useBFKR();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showLoginToast = (message: string, type: 'info' | 'success' | 'error') => {
    const options: ToastOptions = {
      title: "Authentication",
      icon: type === 'success' ? '✅' : type === 'error' ? '❌' : '🔐',
      duration: type === 'error' ? 6000 : 4000,
      position: "top-center"
    };

    toast[type](message, options);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    showLoginToast("Attempting to log in...", 'info');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication
      if (email === 'user@example.com' && password === 'password123') {
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email: 'user@example.com',
          avatar: '👤'
        };

        setUser(mockUser);

        toast.success(
          `Welcome back, ${mockUser.name}!`,
          {
            title: "Login Successful",
            icon: "🎉",
            duration: 5000,
            animation: "bounce",
            customStyle: {
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#ffffff"
            }
          }
        );
      } else {
        showLoginToast("Invalid email or password", 'error');
      }
    } catch (error) {
      showLoginToast("Login failed. Please try again.", 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showLoginDialog = () => {
    let email = '';
    let password = '';

    dialog.prompt(
      `Please enter your email address:`,
      {
        type: "info",
        title: "📧 Email Required",
        width: "400px",
        onSubmit: (emailValue) => {
          if (!emailValue || !emailValue.includes('@')) {
            toast.warning("Please enter a valid email address", {
              title: "Invalid Email",
              icon: "⚠️"
            });
            return;
          }

          email = emailValue;

          // Now ask for password
          dialog.prompt(
            `Please enter your password:`,
            {
              type: "info",
              title: "🔒 Password Required",
              width: "400px",
              inputType: "password",
              onSubmit: (passwordValue) => {
                if (!passwordValue || passwordValue.length < 6) {
                  toast.warning("Password must be at least 6 characters", {
                    title: "Invalid Password",
                    icon: "⚠️"
                  });
                  return;
                }

                password = passwordValue;
                login(email, password);
              }
            }
          );
        }
      }
    );
  };

  const logout = () => {
    const options: DialogOptions = {
      type: "warning",
      title: "🚪 Confirm Logout",
      icon: "⚠️",
      width: "400px",
      buttonStyle: {
        ok: {
          background: "#ef4444",
          text: "Logout"
        },
        cancel: {
          background: "#6b7280",
          text: "Stay Logged In"
        }
      },
      onConfirm: (confirmed) => {
        if (confirmed) {
          setUser(null);

          toast.info("You have been logged out successfully", {
            title: "Logged Out",
            icon: "👋",
            duration: 4000,
            animation: "fade"
          });
        }
      }
    };

    dialog.confirm("Are you sure you want to logout?", options);
  };

  const showUserProfile = () => {
    if (!user) return;

    dialog.alert(
      `
      <div style="text-align: left; padding: 20px;">
        <h3 style="margin-top: 0; color: #1f2937;">👤 User Profile</h3>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>User ID:</strong> ${user.id}</p>
        <p><strong>Status:</strong> <span style="color: #10b981;">✅ Active</span></p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p><small>Last login: ${new Date().toLocaleString()}</small></p>
      </div>
      `,
      {
        title: "📋 Profile Information",
        type: "info",
        width: "450px",
        icon: "👤"
      }
    );
  };

  if (user) {
    return (
      <div className="auth-system">
        <div className="user-info">
          <span className="avatar">{user.avatar}</span>
          <span className="username">{user.name}</span>
        </div>

        <div className="auth-actions">
          <button onClick={showUserProfile} className="profile-btn">
            👤 Profile
          </button>
          <button onClick={logout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-system">
      <h2>Authentication System</h2>
      <p>Click below to simulate login (use: user@example.com / password123)</p>

      <button
        onClick={showLoginDialog}
        disabled={isLoading}
        className="login-btn"
      >
        {isLoading ? '⏳ Logging in...' : '🔐 Login'}
      </button>

      <div className="demo-info">
        <h3>Demo Credentials:</h3>
        <p>Email: user@example.com</p>
        <p>Password: password123</p>
      </div>
    </div>
  );
}
```

## Performance Optimization

### Memoized Hook Usage

```tsx
import React, { useCallback, useMemo } from 'react';
import { useBFKR } from '@pakoor/ui-alerts/react';
import type { ToastOptions } from '@pakoor/ui-alerts';

// Optimized notification hook with memoization
export function useOptimizedNotifications() {
  const { toast, dialog } = useBFKR();

  // Memoized toast options to prevent unnecessary re-renders
  const defaultSuccessOptions = useMemo<ToastOptions>(() => ({
    animation: 'bounce',
    position: 'bottom-right',
    duration: 4000
  }), []);

  const defaultErrorOptions = useMemo<ToastOptions>(() => ({
    animation: 'shake',
    position: 'top-center',
    duration: 6000
  }), []);

  // Memoized notification functions
  const showSuccess = useCallback((message: string, options?: Partial<ToastOptions>) => {
    const mergedOptions = { ...defaultSuccessOptions, ...options };
    toast.success(message, mergedOptions);
  }, [toast, defaultSuccessOptions]);

  const showError = useCallback((message: string, options?: Partial<ToastOptions>) => {
    const mergedOptions = { ...defaultErrorOptions, ...options };
    toast.error(message, mergedOptions);
  }, [toast, defaultErrorOptions]);

  const confirmAction = useCallback((
    message: string,
    onConfirm: () => void | Promise<void>,
    options?: {
      title?: string;
      type?: 'warning' | 'error' | 'info';
      confirmText?: string;
      cancelText?: string;
    }
  ) => {
    dialog.confirm(message, {
      title: options?.title || 'Confirm Action',
      type: options?.type || 'warning',
      buttonStyle: {
        ok: { text: options?.confirmText || 'Confirm' },
        cancel: { text: options?.cancelText || 'Cancel' }
      },
      onConfirm: async (confirmed) => {
        if (confirmed) {
          await onConfirm();
        }
      }
    });
  }, [dialog]);

  return useMemo(() => ({
    showSuccess,
    showError,
    confirmAction
  }), [showSuccess, showError, confirmAction]);
}

// Usage in component
function OptimizedComponent() {
  const { showSuccess, showError, confirmAction } = useOptimizedNotifications();

  const handleDelete = useCallback(async (id: string) => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    showSuccess('Item deleted successfully!');
  }, [showSuccess]);

  const handleDeleteClick = useCallback(() => {
    confirmAction(
      'Are you sure you want to delete this item?',
      () => handleDelete('item-id'),
      {
        title: 'Delete Item',
        type: 'warning',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    );
  }, [confirmAction, handleDelete]);

  return (
    <button onClick={handleDeleteClick}>
      Delete Item
    </button>
  );
}
```

## Error Boundaries

```tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useBFKR } from '@pakoor/ui-alerts/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

function ErrorBoundaryFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  const { toast, dialog } = useBFKR();

  const handleReport = () => {
    dialog.alert(
      `Error details: ${error?.message || 'Unknown error'}`,
      {
        title: "🐛 Error Report",
        type: "info",
        width: "500px"
      }
    );
  };

  const handleReset = () => {
    toast.info("Application has been reset", {
      title: "Reset Complete",
      icon: "🔄"
    });
    resetError();
  };

  return (
    <div className="error-fallback">
      <h2>⚠️ Something went wrong</h2>
      <p>We're sorry, but something unexpected happened.</p>

      {error && (
        <details style={{ margin: '20px 0' }}>
          <summary>Error Details</summary>
          <pre style={{
            background: '#f3f4f6',
            padding: '10px',
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto'
          }}>
            {error.stack}
          </pre>
        </details>
      )}

      <div className="error-actions">
        <button onClick={handleReport} className="report-btn">
          🐛 Report Error
        </button>
        <button onClick={handleReset} className="reset-btn">
          🔄 Reset Application
        </button>
      </div>
    </div>
  );
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Log error to service (optional)
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorBoundaryFallback
          error={this.state.error}
          resetError={() => this.setState({ hasError: false, error: undefined })}
        />
      );
    }

    return this.props.children;
  }
}

// Wrap your app
function App() {
  return (
    <ErrorBoundary>
      <MyApp />
    </ErrorBoundary>
  );
}
```

## Next Steps

- Explore [Vue integration](/guide/vue)
- Learn about [theme customization](/guide/themes)
- Check [advanced configuration](/guide/config)
- Read about [dialog API](/guide/dialog)