# Vue Integration

UI Alerts provides seamless Vue integration through a plugin and composable that gives you access to all toast and dialog functionality with excellent TypeScript support.

## Installation

```bash
npm install @pakoor/ui-alerts
# or
yarn add @pakoor/ui-alerts
# or
pnpm add @pakoor/ui-alerts
```

## Setup

### 1. Plugin Installation (Recommended)

```typescript
// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { BFKRPlugin } from '@pakoor/ui-alerts/vue';
import '@pakoor/ui-alerts/dist/style.min.css';

const app = createApp(App);

app.use(BFKRPlugin);
app.mount('#app');
```

### 2. Styles Import

Make sure to import the CSS styles in your main application file:

```typescript
import '@pakoor/ui-alerts/dist/style.min.css';
```

## Usage

### Options API

```vue
<template>
  <div>
    <button @click="showSuccess">Show Success</button>
    <button @click="showConfirm">Show Confirm</button>
  </div>
</template>

<script>
export default {
  methods: {
    showSuccess() {
      this.$bfkr.toast.success("Operation completed successfully!");
    },
    showConfirm() {
      this.$bfkr.dialog.confirm("Are you sure you want to delete this item?", {
        type: "warning",
        title: "Confirm Delete",
        onConfirm: (confirmed) => {
          if (confirmed) {
            this.$bfkr.toast.success("Item deleted!");
          }
        }
      });
    }
  }
}
</script>
```

### Composition API

```vue
<template>
  <div>
    <button @click="showSuccess">Show Success</button>
    <button @click="showConfirm">Show Confirm</button>
  </div>
</template>

<script setup>
import { useBFKR } from '@pakoor/ui-alerts/vue';

const { toast, dialog, theme } = useBFKR();

const showSuccess = () => {
  toast.success("Operation completed successfully!");
};

const showConfirm = () => {
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
</script>
```

## API Reference

### Composable API

The `useBFKR` composable returns an object with three main properties:

```typescript
interface BFKRComposable {
  toast: ToastAPI;
  dialog: DialogAPI;
  theme: {
    setTheme: (theme: string) => void;
    setColors: (colors: GlobalColors) => void;
  };
}
```

### Plugin API

When using the plugin, you get access to `$bfkr` on all components:

```typescript
// Available via this.$bfkr in Options API
// Or via getCurrentInstance()?.appContext.config.globalProperties.$bfkr in Composition API
```

## Toast Examples

### All Toast Types

```vue
<template>
  <div class="toast-demo">
    <button
      v-for="type in toastTypes"
      :key="type"
      @click="showToast(type)"
      :class="`btn-${type}`"
    >
      {{ type.charAt(0).toUpperCase() + type.slice(1) }}
    </button>
  </div>
</template>

<script setup>
import { useBFKR } from '@pakoor/ui-alerts/vue';
import type { ToastType } from '@pakoor/ui-alerts';

const { toast } = useBFKR();

const toastTypes: ToastType[] = ['success', 'error', 'warning', 'info', 'primary', 'dark'];

const showToast = (type: ToastType) => {
  const messages = {
    success: '✅ Operation completed successfully!',
    error: '❌ An error occurred!',
    warning: '⚠️ Please check your input',
    info: 'ℹ️ Here\'s some information',
    primary: '🎯 Primary action completed!',
    dark: '🌙 Dark mode notification'
  };

  toast[type](messages[type]);
};
</script>

<style scoped>
.toast-demo {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-success { background: #10b981; color: white; }
.btn-error { background: #ef4444; color: white; }
.btn-warning { background: #f59e0b; color: white; }
.btn-info { background: #3b82f6; color: white; }
.btn-primary { background: #8b5cf6; color: white; }
.btn-dark { background: #1f2937; color: white; }
</style>
```

### Advanced Toast with Options

```vue
<template>
  <div>
    <button @click="showAdvancedToast">Show Advanced Toast</button>
  </div>
</template>

<script setup>
import { useBFKR } from '@pakoor/ui-alerts/vue';
import type { ToastOptions } from '@pakoor/ui-alerts';

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
</script>
```

## Dialog Examples

### Confirmation Dialog

```vue
<template>
  <div>
    <button @click="handleDelete" class="delete-btn">
      Delete Item
    </button>
  </div>
</template>

<script setup>
import { useBFKR } from '@pakoor/ui-alerts/vue';
import type { DialogOptions } from '@pakoor/ui-alerts';

const { dialog, toast } = useBFKR();

const emit = defineEmits(['delete']);

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
    onConfirm: (confirmed: boolean) => {
      if (confirmed) {
        emit('delete');
        toast.success("Item deleted successfully!");
      } else {
        toast.info("Deletion cancelled");
      }
    }
  };

  dialog.confirm("This action cannot be undone. Are you sure you want to continue?", options);
};
</script>

<style scoped>
.delete-btn {
  background: #ef4444;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
```

### Prompt Dialog

```vue
<template>
  <div>
    <button @click="handlePrompt">Get User Input</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBFKR } from '@pakoor/ui-alerts/vue';

const { dialog, toast } = useBFKR();
const userName = ref('');

const handlePrompt = () => {
  dialog.prompt("Please enter your name:", {
    type: "info",
    title: "User Information",
    width: "400px",
    onSubmit: (value: string | null) => {
      if (value && value.trim()) {
        userName.value = value;
        toast.success(`Hello, ${value}! 👋`);
      } else {
        toast.warning("Please enter a valid name");
      }
    }
  });
};
</script>
```

## Composables

### Custom Notification Composable

```typescript
// composables/useNotifications.ts
import { useCallback } from 'vue';
import { useBFKR } from '@pakoor/ui-alerts/vue';

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
      onConfirm: (confirmed: boolean) => {
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
```

### Usage in Components

```vue
<template>
  <div>
    <button @click="handleSave">Save Data</button>
    <button @click="handleDelete">Delete Item</button>
  </div>
</template>

<script setup>
import { useNotifications } from '@/composables/useNotifications';

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

// Simulated API calls
const saveData = () => Promise.resolve();
const deleteItem = () => Promise.resolve();
</script>
```

## Theme Configuration

```vue
<template>
  <div>
    <App />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useBFKR } from '@pakoor/ui-alerts/vue';
import App from './App.vue';

const { theme } = useBFKR();

onMounted(() => {
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
});
</script>
```

## Form Integration

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="email">Email:</label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        required
      />
    </div>

    <div class="form-group">
      <label for="password">Password:</label>
      <input
        id="password"
        v-model="formData.password"
        type="password"
        required
      />
    </div>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useBFKR } from '@pakoor/ui-alerts/vue';

interface FormData {
  email: string;
  password: string;
}

const { toast } = useBFKR();
const loading = ref(false);

const formData = reactive<FormData>({
  email: '',
  password: ''
});

const handleSubmit = async () => {
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

  loading.value = true;

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Login successful!");
  } catch (error) {
    toast.error("Login failed. Please try again.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
</style>
```

## TypeScript with Vue

```vue
<template>
  <div>
    <NotificationButton
      v-for="notification in notifications"
      :key="notification.id"
      :message="notification.message"
      :type="notification.type"
      :options="notification.options"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useBFKR } from '@pakoor/ui-alerts/vue';
import type { ToastType, ToastOptions } from '@pakoor/ui-alerts';

interface Notification {
  id: number;
  message: string;
  type: ToastType;
  options?: ToastOptions;
}

const { toast } = useBFKR();

const notifications = reactive<Notification[]>([
  {
    id: 1,
    message: "Welcome to the app!",
    type: "success",
    options: {
      title: "Welcome",
      icon: "👋"
    }
  },
  {
    id: 2,
    message: "New update available",
    type: "info",
    options: {
      duration: 5000,
      position: "top-right"
    }
  }
]);

const NotificationButton = defineComponent({
  props: {
    message: String,
    type: String as PropType<ToastType>,
    options: Object as PropType<ToastOptions>
  },
  setup(props) {
    const { toast } = useBFKR();

    return () => h('button', {
      onClick: () => toast[props.type!](
        props.message!,
        props.options
      )
    }, `Show ${props.type} Toast`);
  }
});
</script>
```

## Real-World Examples

### Vue Store Integration

```vue
<template>
  <div class="product-management">
    <h2>Product Management</h2>

    <div class="actions">
      <button @click="addNewProduct" class="btn-primary">
        ➕ Add Product
      </button>
      <button @click="loadProducts" :disabled="loading" class="btn-secondary">
        {{ loading ? '🔄 Loading...' : '📦 Refresh' }}
      </button>
    </div>

    <div class="products-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <h3>{{ product.name }}</h3>
        <p>Price: ${{ product.price }}</p>
        <p>Stock: {{ product.stock }} units</p>

        <div class="product-actions">
          <button @click="editProduct(product)" class="btn-edit">
            ✏️ Edit
          </button>
          <button @click="deleteProduct(product)" class="btn-delete">
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useBFKR } from '@pakoor/ui-alerts/vue';
import { useProductsStore } from '@/stores/products';
import type { ToastOptions } from '@pakoor/ui-alerts';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const { toast, dialog } = useBFKR();
const productsStore = useProductsStore();

const products = ref<Product[]>([]);
const loading = ref(false);

const showSuccessToast = (message: string, options?: Partial<ToastOptions>) => {
  toast.success(message, {
    title: 'Success',
    animation: 'bounce',
    position: 'bottom-right',
    ...options
  });
};

const showErrorToast = (message: string, options?: Partial<ToastOptions>) => {
  toast.error(message, {
    title: 'Error',
    animation: 'shake',
    position: 'top-center',
    duration: 6000,
    ...options
  });
};

const loadProducts = async () => {
  loading.value = true;

  const loadingToast = toast.info('Loading products...', {
    title: 'Loading',
    icon: '🔄',
    duration: 0
  });

  try {
    await productsStore.fetchProducts();
    products.value = productsStore.products;

    loadingToast.close?.();
    showSuccessToast(`Loaded ${products.value.length} products successfully`, {
      icon: '📦'
    });
  } catch (error) {
    loadingToast.close?.();
    showErrorToast('Failed to load products. Please try again.');
  } finally {
    loading.value = false;
  }
};

const addNewProduct = () => {
  dialog.prompt('Enter product name:', {
    type: 'info',
    title: '➕ Add New Product',
    width: '450px',
    onSubmit: async (name) => {
      if (!name?.trim()) {
        toast.warning('Product name is required');
        return;
      }

      // Ask for price
      dialog.prompt('Enter product price:', {
        type: 'info',
        title: '💰 Product Price',
        inputType: 'number',
        width: '450px',
        onSubmit: async (priceStr) => {
          const price = parseFloat(priceStr || '0');
          if (isNaN(price) || price <= 0) {
            toast.warning('Please enter a valid price');
            return;
          }

          // Ask for stock
          dialog.prompt('Enter initial stock quantity:', {
            type: 'info',
            title: '📦 Stock Quantity',
            inputType: 'number',
            width: '450px',
            onSubmit: async (stockStr) => {
              const stock = parseInt(stockStr || '0');
              if (isNaN(stock) || stock < 0) {
                toast.warning('Please enter a valid stock quantity');
                return;
              }

              // Create product
              try {
                const newProduct = await productsStore.createProduct({
                  name: name.trim(),
                  price,
                  stock
                });

                products.value.push(newProduct);

                toast.success(`Product "${name}" added successfully!`, {
                  title: '✅ Product Created',
                  icon: '🎉',
                  duration: 5000,
                  customStyle: {
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderLeft: '4px solid #047857'
                  }
                });
              } catch (error) {
                showErrorToast('Failed to create product');
              }
            }
          });
        }
      });
    }
  });
};

const editProduct = (product: Product) => {
  dialog.prompt('Update product name:', {
    type: 'info',
    title: '✏️ Edit Product',
    width: '450px',
    defaultValue: product.name,
    onSubmit: async (newName) => {
      if (!newName?.trim()) {
        toast.warning('Product name is required');
        return;
      }

      try {
        await productsStore.updateProduct(product.id, {
          ...product,
          name: newName.trim()
        });

        const index = products.value.findIndex(p => p.id === product.id);
        if (index !== -1) {
          products.value[index].name = newName.trim();
        }

        toast.success(`Product updated to "${newName}"`, {
          title: '✅ Product Updated',
          icon: '🔄'
        });
      } catch (error) {
        showErrorToast('Failed to update product');
      }
    }
  });
};

const deleteProduct = (product: Product) => {
  dialog.confirm(
    `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
    {
      type: 'warning',
      title: '🗑️ Delete Product',
      icon: '⚠️',
      width: '450px',
      buttonStyle: {
        ok: {
          background: '#ef4444',
          text: 'Delete',
          icon: '🗑️'
        },
        cancel: {
          background: '#6b7280',
          text: 'Cancel'
        }
      },
      onConfirm: async (confirmed) => {
        if (confirmed) {
          try {
            await productsStore.deleteProduct(product.id);
            products.value = products.value.filter(p => p.id !== product.id);

            toast.success(`Product "${product.name}" deleted successfully`, {
              title: '✅ Product Deleted',
              icon: '🗑️',
              animation: 'zoom',
              customStyle: {
                background: 'linear-gradient(135deg, #10b981, #059669)'
              }
            });
          } catch (error) {
            showErrorToast('Failed to delete product');
          }
        }
      }
    }
  );
};

onMounted(() => {
  loadProducts();
});
</script>

<style scoped>
.product-management {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.actions {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-card h3 {
  margin: 0 0 10px 0;
  color: #1f2937;
}

.product-actions {
  margin-top: 15px;
  display: flex;
  gap: 8px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-edit {
  background: #f59e0b;
  color: white;
}

.btn-delete {
  background: #ef4444;
  color: white;
}

button:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
```

### Real-time Notifications with WebSocket

```vue
<template>
  <div class="notification-center">
    <div class="header">
      <h2>🔔 Notification Center</h2>
      <div class="status-indicator" :class="{ connected: isConnected }">
        {{ isConnected ? '🟢 Connected' : '🔴 Disconnected' }}
      </div>
    </div>

    <div class="controls">
      <button @click="connect" :disabled="isConnected" class="btn-connect">
        🔌 Connect
      </button>
      <button @click="disconnect" :disabled="!isConnected" class="btn-disconnect">
        🔌 Disconnect
      </button>
      <button @click="clearNotifications" class="btn-clear">
        🗑️ Clear All
      </button>
    </div>

    <div class="notifications-list">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notification-item', `type-${notification.type}`]"
      >
        <div class="notification-content">
          <span class="notification-icon">{{ notification.icon }}</span>
          <div class="notification-text">
            <h4>{{ notification.title }}</h4>
            <p>{{ notification.message }}</p>
            <small>{{ formatTime(notification.timestamp) }}</small>
          </div>
        </div>
        <button @click="removeNotification(notification.id)" class="remove-btn">
          ❌
        </button>
      </div>
    </div>

    <div v-if="notifications.length === 0" class="empty-state">
      <p>No notifications yet</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useBFKR } from '@pakoor/ui-alerts/vue';
import type { ToastType } from '@pakoor/ui-alerts';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: ToastType;
  icon: string;
  timestamp: Date;
}

const { toast } = useBFKR();

const notifications = ref<Notification[]>([]);
const isConnected = ref(false);
let websocket: WebSocket | null = null;
let notificationId = 0;

const connect = () => {
  if (websocket?.readyState === WebSocket.OPEN) return;

  // Simulate WebSocket connection (replace with real WebSocket URL)
  websocket = new WebSocket('wss://api.example.com/notifications');

  websocket.onopen = () => {
    isConnected.value = true;
    toast.success('Connected to real-time notifications', {
      title: '🔗 Connected',
      icon: '🔌'
    });

    // Simulate receiving notifications
    const simulateNotifications = setInterval(() => {
      if (!isConnected.value) {
        clearInterval(simulateNotifications);
        return;
      }

      const types: ToastType[] = ['success', 'error', 'warning', 'info'];
      const icons = ['✅', '❌', '⚠️', 'ℹ️'];
      const messages = [
        { title: 'New Order', message: 'Order #1234 has been placed' },
        { title: 'User Activity', message: 'New user registered' },
        { title: 'System Alert', message: 'Server maintenance scheduled' },
        { title: 'Update Available', message: 'New features are available' }
      ];

      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];

      addNotification({
        title: randomMessage.title,
        message: randomMessage.message,
        type: randomType,
        icon: randomIcon
      });
    }, 5000);
  };

  websocket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      handleIncomingNotification(data);
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  };

  websocket.onclose = () => {
    isConnected.value = false;
    toast.warning('Disconnected from notification server', {
      title: '🔌 Disconnected',
      icon: '⚠️'
    });
  };

  websocket.onerror = (error) => {
    toast.error('Failed to connect to notification server', {
      title: 'Connection Error',
      icon: '❌'
    });
    console.error('WebSocket error:', error);
  };
};

const disconnect = () => {
  if (websocket) {
    websocket.close();
    websocket = null;
  }
};

const handleIncomingNotification = (data: any) => {
  addNotification({
    title: data.title || 'Notification',
    message: data.message || '',
    type: data.type || 'info',
    icon: data.icon || '📢'
  });

  // Also show as toast if important
  if (data.showToast !== false) {
    toast[data.type || 'info'](data.message, {
      title: data.title,
      icon: data.icon,
      duration: data.type === 'error' ? 6000 : 4000
    });
  }
};

const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
  const newNotification: Notification = {
    ...notification,
    id: `notif-${++notificationId}`,
    timestamp: new Date()
  };

  notifications.value.unshift(newNotification);

  // Keep only last 50 notifications
  if (notifications.value.length > 50) {
    notifications.value = notifications.value.slice(0, 50);
  }
};

const removeNotification = (id: string) => {
  const index = notifications.value.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications.value.splice(index, 1);
  }
};

const clearNotifications = () => {
  if (notifications.value.length === 0) {
    toast.info('No notifications to clear');
    return;
  }

  dialog.confirm(
    `Clear all ${notifications.value.length} notifications?`,
    {
      type: 'warning',
      title: '🗑️ Clear Notifications',
      onConfirm: (confirmed) => {
        if (confirmed) {
          notifications.value = [];
          toast.info('All notifications cleared', {
            title: '✅ Cleared',
            icon: '🗑️'
          });
        }
      }
    }
  );
};

const formatTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

onMounted(() => {
  // Auto-connect on mount
  connect();
});

onUnmounted(() => {
  disconnect();
});
</script>

<style scoped>
.notification-center {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.status-indicator {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  background: #ef4444;
  color: white;
}

.status-indicator.connected {
  background: #10b981;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.notifications-list {
  max-height: 500px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  border-left: 4px solid;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.notification-item.type-success {
  border-left-color: #10b981;
}

.notification-item.type-error {
  border-left-color: #ef4444;
}

.notification-item.type-warning {
  border-left-color: #f59e0b;
}

.notification-item.type-info {
  border-left-color: #3b82f6;
}

.notification-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.notification-icon {
  font-size: 20px;
  margin-right: 12px;
}

.notification-text h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
}

.notification-text p {
  margin: 0 0 4px 0;
  font-size: 13px;
  color: #6b7280;
}

.notification-text small {
  color: #9ca3af;
  font-size: 11px;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.remove-btn:hover {
  opacity: 1;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-connect {
  background: #10b981;
  color: white;
}

.btn-disconnect {
  background: #ef4444;
  color: white;
}

.btn-clear {
  background: #6b7280;
  color: white;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
```

### Multi-step Form with Progress

```vue
<template>
  <div class="multi-step-form">
    <div class="progress-bar">
      <div class="progress-steps">
        <div
          v-for="(step, index) in steps"
          :key="index"
          :class="[
            'progress-step',
            { active: currentStep === index },
            { completed: currentStep > index }
          ]"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-label">{{ step.title }}</div>
        </div>
      </div>
    </div>

    <div class="form-content">
      <h2>{{ steps[currentStep].title }}</h2>
      <p>{{ steps[currentStep].description }}</p>

      <!-- Step 1: Personal Info -->
      <div v-if="currentStep === 0" class="form-fields">
        <div class="form-group">
          <label for="name">Full Name *</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            placeholder="John Doe"
          />
        </div>
        <div class="form-group">
          <label for="email">Email Address *</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            placeholder="john@example.com"
          />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input
            id="phone"
            v-model="formData.phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <!-- Step 2: Address -->
      <div v-if="currentStep === 1" class="form-fields">
        <div class="form-group">
          <label for="street">Street Address *</label>
          <input
            id="street"
            v-model="formData.address.street"
            type="text"
            required
            placeholder="123 Main St"
          />
        </div>
        <div class="form-group">
          <label for="city">City *</label>
          <input
            id="city"
            v-model="formData.address.city"
            type="text"
            required
            placeholder="New York"
          />
        </div>
        <div class="form-group">
          <label for="state">State *</label>
          <input
            id="state"
            v-model="formData.address.state"
            type="text"
            required
            placeholder="NY"
          />
        </div>
        <div class="form-group">
          <label for="zip">ZIP Code *</label>
          <input
            id="zip"
            v-model="formData.address.zip"
            type="text"
            required
            placeholder="10001"
          />
        </div>
      </div>

      <!-- Step 3: Preferences -->
      <div v-if="currentStep === 2" class="form-fields">
        <div class="form-group">
          <label>Notification Preferences</label>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input
                v-model="formData.preferences.emailNotifications"
                type="checkbox"
              />
              Email notifications
            </label>
            <label class="checkbox-label">
              <input
                v-model="formData.preferences.smsNotifications"
                type="checkbox"
              />
              SMS notifications
            </label>
            <label class="checkbox-label">
              <input
                v-model="formData.preferences.newsletter"
                type="checkbox"
              />
              Newsletter subscription
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="theme">Theme Preference</label>
          <select id="theme" v-model="formData.preferences.theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>

      <!-- Step 4: Review -->
      <div v-if="currentStep === 3" class="review-section">
        <h3>Review Your Information</h3>
        <div class="review-grid">
          <div class="review-section">
            <h4>Personal Information</h4>
            <p><strong>Name:</strong> {{ formData.name }}</p>
            <p><strong>Email:</strong> {{ formData.email }}</p>
            <p><strong>Phone:</strong> {{ formData.phone || 'Not provided' }}</p>
          </div>
          <div class="review-section">
            <h4>Address</h4>
            <p>{{ formData.address.street }}</p>
            <p>{{ formData.address.city }}, {{ formData.address.state }} {{ formData.address.zip }}</p>
          </div>
          <div class="review-section">
            <h4>Preferences</h4>
            <p>Email: {{ formData.preferences.emailNotifications ? '✅' : '❌' }}</p>
            <p>SMS: {{ formData.preferences.smsNotifications ? '✅' : '❌' }}</p>
            <p>Newsletter: {{ formData.preferences.newsletter ? '✅' : '❌' }}</p>
            <p>Theme: {{ formData.preferences.theme }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <button
        v-if="currentStep > 0"
        @click="previousStep"
        class="btn-secondary"
        :disabled="processing"
      >
        ← Previous
      </button>

      <button
        v-if="currentStep < steps.length - 1"
        @click="nextStep"
        class="btn-primary"
        :disabled="!isStepValid || processing"
      >
        Next →
      </button>

      <button
        v-if="currentStep === steps.length - 1"
        @click="submitForm"
        class="btn-success"
        :disabled="processing"
      >
        {{ processing ? '🔄 Processing...' : '✅ Complete Registration' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useBFKR } from '@pakoor/ui-alerts/vue';
import type { ToastOptions } from '@pakoor/ui-alerts';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    newsletter: boolean;
    theme: 'light' | 'dark' | 'auto';
  };
}

const { toast, dialog } = useBFKR();

const currentStep = ref(0);
const processing = ref(false);

const steps = [
  {
    title: 'Personal Information',
    description: 'Tell us about yourself'
  },
  {
    title: 'Address',
    description: 'Where can we reach you?'
  },
  {
    title: 'Preferences',
    description: 'Customize your experience'
  },
  {
    title: 'Review',
    description: 'Confirm your details'
  }
];

const formData = ref<FormData>({
  name: '',
  email: '',
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: ''
  },
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    newsletter: false,
    theme: 'light'
  }
});

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 0:
      return formData.value.name.trim() && formData.value.email.trim() && formData.value.email.includes('@');
    case 1:
      return formData.value.address.street.trim() &&
             formData.value.address.city.trim() &&
             formData.value.address.state.trim() &&
             formData.value.address.zip.trim();
    case 2:
      return true;
    case 3:
      return true;
    default:
      return false;
  }
});

const nextStep = () => {
  if (!isStepValid.value) {
    showValidationError();
    return;
  }

  currentStep.value++;
  showStepNotification();
};

const previousStep = () => {
  currentStep.value--;
};

const showValidationError = () => {
  const errors = [];

  if (currentStep.value === 0) {
    if (!formData.value.name.trim()) errors.push('Name is required');
    if (!formData.value.email.trim()) errors.push('Email is required');
    else if (!formData.value.email.includes('@')) errors.push('Valid email is required');
  } else if (currentStep.value === 1) {
    if (!formData.value.address.street.trim()) errors.push('Street address is required');
    if (!formData.value.address.city.trim()) errors.push('City is required');
    if (!formData.value.address.state.trim()) errors.push('State is required');
    if (!formData.value.address.zip.trim()) errors.push('ZIP code is required');
  }

  if (errors.length > 0) {
    toast.error(errors.join(', '), {
      title: '⚠️ Validation Error',
      duration: 5000,
      customStyle: {
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: '#ffffff'
      }
    });
  }
};

const showStepNotification = () => {
  const stepNames = ['Personal Info', 'Address', 'Preferences'];
  const stepIcons = ['👤', '🏠', '⚙️'];

  if (currentStep.value < stepNames.length) {
    toast.info(`${stepNames[currentStep.value]} completed`, {
      title: `✅ Step ${currentStep.value + 1} Complete`,
      icon: stepIcons[currentStep.value],
      duration: 2000,
      position: 'top-right'
    });
  }
};

const submitForm = async () => {
  processing.value = true;

  // Show processing notification
  const processingToast = toast.info('Creating your account...', {
    title: '🔄 Processing',
    icon: '⏳',
    duration: 0
  });

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));

    processingToast.close?.();

    // Show success dialog
    dialog.alert(
      `
      <div style="text-align: center; padding: 20px;">
        <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
        <h2 style="color: #10b981; margin-bottom: 16px;">Welcome, ${formData.value.name}!</h2>
        <p style="margin-bottom: 20px;">Your account has been created successfully.</p>
        <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; text-align: left;">
          <strong>Account Details:</strong><br>
          Email: ${formData.value.email}<br>
          Address: ${formData.value.address.street}, ${formData.value.address.city}<br>
          Preferences: ${formData.value.preferences.emailNotifications ? 'Email' : 'No email'} notifications
        </div>
      </div>
      `,
      {
        title: '✅ Registration Complete',
        type: 'success',
        width: '500px',
        buttonStyle: {
          ok: {
            background: '#10b981',
            text: 'Get Started'
          }
        }
      }
    );

    // Reset form
    resetForm();

    toast.success('Registration completed successfully!', {
      title: '🎊 Welcome!',
      duration: 6000,
      animation: 'bounce',
      customStyle: {
        background: 'linear-gradient(135deg, #10b981, #059669)',
        color: '#ffffff',
        borderLeft: '4px solid #047857'
      }
    });

  } catch (error) {
    processingToast.close?.();

    dialog.alert(
      'We encountered an issue creating your account. Please try again or contact support if the problem persists.',
      {
        title: '❌ Registration Failed',
        type: 'error',
        width: '450px',
        buttonStyle: {
          ok: {
            background: '#ef4444',
            text: 'Try Again'
          }
        }
      }
    );

  } finally {
    processing.value = false;
  }
};

const resetForm = () => {
  currentStep.value = 0;
  formData.value = {
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      newsletter: false,
      theme: 'light'
    }
  };
};
</script>

<style scoped>
.multi-step-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.progress-bar {
  margin-bottom: 30px;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.progress-steps::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 2px;
  background: #e5e7eb;
  z-index: 0;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5e7eb;
  color: #6b7280;
  font-weight: 600;
  margin-bottom: 8px;
}

.progress-step.active .step-number {
  background: #3b82f6;
  color: white;
}

.progress-step.completed .step-number {
  background: #10b981;
  color: white;
}

.step-label {
  font-size: 12px;
  color: #6b7280;
  text-align: center;
}

.progress-step.active .step-label {
  color: #3b82f6;
  font-weight: 600;
}

.progress-step.completed .step-label {
  color: #10b981;
}

.form-content {
  margin-bottom: 30px;
}

.form-content h2 {
  color: #1f2937;
  margin-bottom: 8px;
}

.form-content p {
  color: #6b7280;
  margin-bottom: 20px;
}

.form-fields {
  display: grid;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 4px;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  font-weight: normal;
  margin-bottom: 0;
}

.checkbox-label input {
  margin-right: 8px;
}

.review-section h3 {
  color: #1f2937;
  margin-bottom: 20px;
}

.review-grid {
  display: grid;
  gap: 20px;
}

.review-section {
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.review-section h4 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #1f2937;
}

.review-section p {
  margin: 4px 0;
  color: #6b7280;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

button {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-success {
  background: #10b981;
  color: white;
}

button:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
</style>
```

## Advanced Vue Patterns

### Provide/Inject for Global Notifications

```typescript
// plugins/notifications.ts
import { provide, inject } from 'vue';
import { useBFKR } from '@pakoor/ui-alerts/vue';
import type { ToastOptions, DialogOptions } from '@pakoor/ui-alerts';

const NotificationSymbol = Symbol('notifications');

export interface NotificationService {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  confirm: (message: string, onConfirm: () => void, options?: DialogOptions) => void;
  prompt: (message: string, onSubmit: (value: string) => void, options?: DialogOptions) => void;
}

export function provideNotifications() {
  const { toast, dialog } = useBFKR();

  const notificationService: NotificationService = {
    success: (message, options) => toast.success(message, options),
    error: (message, options) => toast.error(message, options),
    warning: (message, options) => toast.warning(message, options),
    info: (message, options) => toast.info(message, options),
    confirm: (message, onConfirm, options) => {
      dialog.confirm(message, {
        ...options,
        onConfirm: (confirmed) => confirmed && onConfirm()
      });
    },
    prompt: (message, onSubmit, options) => {
      dialog.prompt(message, {
        ...options,
        onSubmit
      });
    }
  };

  provide(NotificationSymbol, notificationService);
  return notificationService;
}

export function useNotifications(): NotificationService {
  const notifications = inject<NotificationService>(NotificationSymbol);

  if (!notifications) {
    throw new Error('useNotifications must be used within a component that provides notifications');
  }

  return notifications;
}
```

### Custom Directive for Click Confirmation

```typescript
// directives/confirmClick.ts
import { DirectiveBinding } from 'vue';
import { useBFKR } from '@pakoor/ui-alerts/vue';

interface ConfirmClickValue {
  message?: string;
  title?: string;
  type?: 'warning' | 'error' | 'info';
  onConfirm: () => void;
}

export const vConfirmClick = {
  mounted(el: HTMLElement, binding: DirectiveBinding<ConfirmClickValue>) {
    const { dialog } = useBFKR();

    el.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const { message = 'Are you sure?', title = 'Confirm Action', type = 'warning', onConfirm } = binding.value;

      dialog.confirm(message, {
        title,
        type,
        onConfirm: (confirmed) => {
          if (confirmed) {
            onConfirm();
          }
        }
      });
    });
  }
};
```

## Next Steps

- Explore [React integration](/guide/react)
- Learn about [theme customization](/guide/themes)
- Check [advanced configuration](/guide/config)
- Read about [dialog API](/guide/dialog)