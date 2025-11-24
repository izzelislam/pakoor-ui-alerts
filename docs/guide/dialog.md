# Dialog API

UI Alerts provides a powerful dialog system with alert, confirm, and prompt dialogs that are fully customizable and themeable.

## Dialog Types

### Alert Dialog

Simple information dialog with an OK button:

```javascript
import { Dialog } from '@pakoor/ui-alerts';

// Basic alert
Dialog.alert("This is an important message!");

// With options
Dialog.alert("System maintenance is scheduled for tonight", {
  title: "System Notice",
  type: "info",
  icon: "ℹ️",
  width: "450px"
});
```

### Confirm Dialog

Dialog with OK and Cancel buttons for user confirmation:

```javascript
import { Dialog, Toast } from '@pakoor/ui-alerts';

// Basic confirm
Dialog.confirm("Are you sure you want to continue?", {
  type: "warning",
  onConfirm: (result) => {
    if (result) {
      Toast.success("Action confirmed!");
    }
  }
});

// Advanced confirm
Dialog.confirm("Delete this item permanently?", {
  title: "Confirm Delete",
  type: "warning",
  icon: "🗑️",
  width: "400px",
  buttonStyle: {
    ok: {
      background: "#ef4444",
      color: "#ffffff"
    },
    cancel: {
      background: "#6b7280",
      color: "#ffffff"
    }
  },
  onConfirm: (confirmed) => {
    if (confirmed) {
      // Perform delete operation
      Toast.success("Item deleted successfully!");
    } else {
      Toast.info("Action cancelled");
    }
  }
});
```

### Prompt Dialog

Dialog that prompts user for input:

```javascript
import { Dialog, Toast } from '@pakoor/ui-alerts';

// Basic prompt
Dialog.prompt("Please enter your name:", {
  type: "info",
  onSubmit: (value) => {
    if (value) {
      Toast.success(`Hello, ${value}!`);
    }
  }
});

// Advanced prompt with validation
Dialog.prompt("Enter your email address:", {
  title: "Email Required",
  type: "info",
  icon: "📧",
  width: "400px",
  onSubmit: (value) => {
    if (!value) {
      Toast.warning("Email is required");
      return;
    }

    if (!value.includes('@')) {
      Toast.error("Please enter a valid email address");
      return;
    }

    Toast.success(`Email registered: ${value}`);
  }
});
```

## Dialog Options

### Complete Options Reference

```typescript
interface DialogOptions {
  type?: ToastType;              // 'success' | 'error' | 'warning' | 'info' | 'primary' | 'dark' | 'custom'
  title?: string;                // Dialog title
  icon?: string;                 // Custom icon (emoji or HTML)
  width?: string;                // Dialog width (CSS value)
  style?: Partial<CSSStyleDeclaration>;    // Custom dialog styles
  buttonStyle?: {
    ok?: DialogButtonStyles;     // OK/Confirm button styles
    cancel?: DialogButtonStyles; // Cancel button styles
  };
  onConfirm?: (value: boolean) => void;    // Callback for confirm dialogs
  onSubmit?: (value: string | null) => void; // Callback for prompt dialogs
}

interface DialogButtonStyles {
  background?: string;
  color?: string;
  border?: string;
  borderRadius?: string;
  padding?: string;
  boxShadow?: string;
  fontWeight?: string;
  fontSize?: string;
}
```

### Styling Examples

#### Custom Dialog Appearance

```javascript
Dialog.confirm("Custom styled dialog", {
  title: "Custom Design",
  type: "info",
  width: "500px",
  style: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    borderRadius: "20px",
    border: "none",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    padding: "30px",
    fontSize: "16px"
  },
  buttonStyle: {
    ok: {
      background: "#10b981",
      color: "#ffffff",
      borderRadius: "12px",
      padding: "12px 24px",
      fontWeight: "bold",
      border: "none"
    },
    cancel: {
      background: "rgba(255, 255, 255, 0.2)",
      color: "#ffffff",
      borderRadius: "12px",
      padding: "12px 24px",
      fontWeight: "bold",
      border: "1px solid rgba(255, 255, 255, 0.3)"
    }
  }
});
```

#### Button Styling Variations

```javascript
// Success-style buttons
Dialog.confirm("Save changes?", {
  type: "success",
  buttonStyle: {
    ok: {
      background: "#10b981",
      color: "#ffffff",
      borderRadius: "8px",
      padding: "10px 20px"
    },
    cancel: {
      background: "#f3f4f6",
      color: "#374151",
      borderRadius: "8px",
      padding: "10px 20px",
      border: "1px solid #d1d5db"
    }
  }
});

// Danger-style buttons
Dialog.confirm("Delete permanently?", {
  type: "error",
  buttonStyle: {
    ok: {
      background: "#ef4444",
      color: "#ffffff",
      borderRadius: "6px",
      padding: "8px 16px"
    },
    cancel: {
      background: "transparent",
      color: "#6b7280",
      borderRadius: "6px",
      padding: "8px 16px",
      border: "1px solid #d1d5db"
    }
  }
});
```

## Framework Integration

### React Examples

```tsx
import React, { useState } from 'react';
import { useBFKR } from '@pakoor/ui-alerts/react';
import type { DialogOptions } from '@pakoor/ui-alerts';

function DeleteConfirmDialog({ itemId, onDelete }: {
  itemId: string;
  onDelete: (id: string) => void;
}) {
  const { dialog, toast } = useBFKR();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    const options: DialogOptions = {
      type: "warning",
      title: "Confirm Delete",
      icon: "🗑️",
      width: "400px",
      buttonStyle: {
        ok: {
          background: "#ef4444",
          color: "#ffffff"
        }
      },
      onConfirm: async (confirmed: boolean) => {
        if (confirmed) {
          setIsDeleting(true);
          try {
            await onDelete(itemId);
            toast.success("Item deleted successfully!");
          } catch (error) {
            toast.error("Failed to delete item");
          } finally {
            setIsDeleting(false);
          }
        }
      }
    };

    dialog.confirm(`Delete item #${itemId}? This action cannot be undone.`, options);
  };

  return (
    <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
```

### Vue Examples

```vue
<template>
  <button @click="showConfirmDialog" :disabled="isDeleting">
    {{ isDeleting ? 'Deleting...' : 'Delete' }}
  </button>
</template>

<script setup>
import { ref } from 'vue';
import { useBFKR } from '@pakoor/ui-alerts/vue';
import type { DialogOptions } from '@pakoor/ui-alerts';

const props = defineProps({
  itemId: String
});

const emit = defineEmits(['delete']);

const { dialog, toast } = useBFKR();
const isDeleting = ref(false);

const showConfirmDialog = () => {
  const options: DialogOptions = {
    type: "warning",
    title: "Confirm Delete",
    icon: "🗑️",
    width: "400px",
    buttonStyle: {
      ok: {
        background: "#ef4444",
        color: "#ffffff"
      }
    },
    onConfirm: async (confirmed: boolean) => {
      if (confirmed) {
        isDeleting.value = true;
        try {
          await emit('delete', props.itemId);
          toast.success("Item deleted successfully!");
        } catch (error) {
          toast.error("Failed to delete item");
        } finally {
          isDeleting.value = false;
        }
      }
    }
  };

  dialog.confirm(`Delete item #${props.itemId}? This action cannot be undone.`, options);
};
</script>
```

## Advanced Patterns

### Form Confirmation

```javascript
async function confirmFormSubmission(formData) {
  return new Promise((resolve) => {
    Dialog.confirm(`Submit the following form data?\n\n${JSON.stringify(formData, null, 2)}`, {
      title: "Confirm Submission",
      type: "info",
      width: "500px",
      style: {
        fontFamily: "monospace",
        whiteSpace: "pre-wrap"
      },
      onConfirm: (confirmed) => {
        resolve(confirmed);
      }
    });
  });
}

// Usage
const formData = { name: "John", email: "john@example.com" };
const shouldSubmit = await confirmFormSubmission(formData);

if (shouldSubmit) {
  // Submit form
  Toast.success("Form submitted successfully!");
}
```

### Multi-Step Confirmation

```javascript
function multiStepDeleteConfirmation(item) {
  // Step 1: Initial confirmation
  Dialog.confirm(`Delete "${item.name}"?`, {
    title: "Step 1: Initial Confirmation",
    type: "warning",
    onConfirm: (confirmed) => {
      if (confirmed) {
        // Step 2: Warning about consequences
        Dialog.confirm("This will delete all associated data. Continue?", {
          title: "Step 2: Final Warning",
          type: "error",
          buttonStyle: {
            ok: {
              background: "#ef4444",
              color: "#ffffff"
            }
          },
          onConfirm: (finalConfirmed) => {
            if (finalConfirmed) {
              // Step 3: Type confirmation
              Dialog.prompt(`Type "DELETE" to confirm:`, {
                title: "Step 3: Type Confirmation",
                type: "error",
                onSubmit: (value) => {
                  if (value === "DELETE") {
                    // Perform deletion
                    deleteItem(item.id);
                    Toast.success("Item deleted permanently");
                  } else {
                    Toast.error("Confirmation text incorrect");
                  }
                }
              });
            }
          }
        });
      }
    }
  });
}
```

### Async Operations

```javascript
async function confirmAsyncOperation(operation) {
  return new Promise((resolve) => {
    Dialog.confirm(`Run ${operation.name}?`, {
      title: "Confirm Operation",
      type: "info",
      buttonStyle: {
        ok: {
          background: "#3b82f6",
          color: "#ffffff"
        }
      },
      onConfirm: async (confirmed) => {
        if (confirmed) {
          // Show loading state
          Toast.info("Starting operation...");

          try {
            const result = await operation.execute();
            Toast.success("Operation completed successfully!");
            resolve(result);
          } catch (error) {
            Toast.error("Operation failed: " + error.message);
            resolve(null);
          }
        } else {
          resolve(null);
        }
      }
    });
  });
}

// Usage
const operation = {
  name: "Database Backup",
  execute: () => backupDatabase()
};

const result = await confirmAsyncOperation(operation);
```

## Dialog Types Reference

### Type-Specific Behavior

```javascript
// Success dialog - green color scheme
Dialog.alert("Operation completed successfully!", {
  type: "success",
  title: "Success"
});

// Error dialog - red color scheme
Dialog.alert("An error occurred while processing", {
  type: "error",
  title: "Error"
});

// Warning dialog - orange color scheme
Dialog.confirm("This action cannot be undone", {
  type: "warning",
  title: "Warning"
});

// Info dialog - blue color scheme
Dialog.alert("New updates are available", {
  type: "info",
  title: "Information"
});

// Primary dialog - purple color scheme
Dialog.confirm("Save your progress?", {
  type: "primary",
  title: "Save Changes"
});

// Dark dialog - dark color scheme
Dialog.confirm("Proceed with dark mode?", {
  type: "dark",
  title: "Dark Mode"
});

// Custom dialog - custom colors
Dialog.alert("Custom notification", {
  type: "custom",
  title: "Custom",
  style: {
    background: "#8b5cf6",
    color: "#ffffff"
  }
});
```

## Best Practices

### Do's

- **Clear messaging**: Use clear, concise messages that explain what's happening
- **Appropriate types**: Choose the right dialog type for your use case
- **Consistent styling**: Use consistent button styles across your application
- **Handle cancellation**: Always handle when users cancel dialogs
- **Provide context**: Include relevant context in dialog titles and messages

### Don'ts

- **Don't overuse**: Avoid showing too many dialogs in succession
- **Don't ignore errors**: Always handle errors properly in dialog callbacks
- **Don't block unnecessarily**: Don't block the UI with non-critical dialogs
- **Don't use complex HTML**: Keep dialog messages simple and readable

## Advanced Dialog Patterns

### Custom Dialog Components

```javascript
// Create reusable dialog components
class DialogComponents {
  static successDialog(message, title = 'Success') {
    return Dialog.alert(message, {
      type: 'success',
      title,
      icon: '✅',
      width: '400px',
      buttonStyle: {
        ok: {
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#ffffff',
          borderRadius: '12px',
          padding: '12px 24px',
          fontWeight: '600',
          border: 'none',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
        }
      },
      style: {
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(16, 185, 129, 0.2)',
        border: '1px solid rgba(16, 185, 129, 0.2)'
      }
    });
  }

  static errorDialog(message, title = 'Error', retryCallback = null) {
    const buttons = retryCallback ? {
      ok: {
        background: '#ef4444',
        color: '#ffffff',
        text: 'Retry'
      },
      cancel: {
        background: '#6b7280',
        color: '#ffffff',
        text: 'Cancel'
      }
    } : {
      ok: {
        background: '#ef4444',
        color: '#ffffff'
      }
    };

    return Dialog.alert(message, {
      type: 'error',
      title,
      icon: '❌',
      width: '450px',
      buttonStyle: buttons,
      style: {
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(239, 68, 68, 0.2)',
        border: '1px solid rgba(239, 68, 68, 0.2)'
      },
      ...(retryCallback && { onConfirm: retryCallback })
    });
  }

  static warningDialog(message, onConfirm, title = 'Warning') {
    return Dialog.confirm(message, {
      type: 'warning',
      title,
      icon: '⚠️',
      width: '400px',
      buttonStyle: {
        ok: {
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: '#ffffff',
          borderRadius: '10px',
          padding: '12px 24px',
          fontWeight: '600',
          border: 'none'
        },
        cancel: {
          background: '#f3f4f6',
          color: '#374151',
          borderRadius: '10px',
          padding: '12px 24px',
          border: '1px solid #d1d5db'
        }
      },
      style: {
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(245, 158, 11, 0.2)',
        border: '1px solid rgba(245, 158, 11, 0.2)'
      },
      onConfirm
    });
  }

  static infoDialog(message, title = 'Information') {
    return Dialog.alert(message, {
      type: 'info',
      title,
      icon: 'ℹ️',
      width: '500px',
      buttonStyle: {
        ok: {
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          color: '#ffffff',
          borderRadius: '12px',
          padding: '12px 24px',
          fontWeight: '600',
          border: 'none',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
        }
      },
      style: {
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      }
    });
  }
}

// Usage
DialogComponents.successDialog('Your profile has been updated successfully!');
DialogComponents.errorDialog('Failed to save changes', 'Save Error', () => saveChanges());
```

### Progressive Disclosure Dialogs

```javascript
// Multi-level dialogs for complex workflows
class ProgressiveDialog {
  constructor() {
    this.dialogHistory = [];
    this.currentStep = 0;
  }

  async startWorkflow(steps) {
    this.steps = steps;
    this.currentStep = 0;

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const result = await this.executeStep(step);

      if (result === false && step.required) {
        this.showCancellationDialog();
        return false;
      }

      this.dialogHistory.push({
        step: i,
        result,
        timestamp: Date.now()
      });
    }

    this.showCompletionDialog();
    return true;
  }

  executeStep(step) {
    return new Promise((resolve) => {
      const options = {
        title: step.title,
        type: step.type || 'info',
        width: step.width || '400px',
        icon: step.icon,
        buttonStyle: step.buttonStyle,
        style: step.style
      };

      if (step.type === 'prompt') {
        options.onSubmit = (value) => {
          if (step.validator && !step.validator(value)) {
            this.showValidationError(step.validationMessage);
            return false; // Don't close dialog
          }
          resolve(value);
        };
        Dialog.prompt(step.message, options);
      } else if (step.type === 'confirm') {
        options.onConfirm = (confirmed) => {
          resolve(confirmed);
        };
        Dialog.confirm(step.message, options);
      } else {
        Dialog.alert(step.message, options);
        setTimeout(() => resolve(true), step.autoCloseDelay || 2000);
      }
    });
  }

  showValidationError(message) {
    Dialog.alert(message, {
      title: 'Validation Error',
      type: 'error',
      width: '350px'
    });
  }

  showCancellationDialog() {
    Dialog.alert('The operation was cancelled at your request.', {
      title: 'Operation Cancelled',
      type: 'info',
      width: '400px'
    });
  }

  showCompletionDialog() {
    Dialog.alert('All steps completed successfully!', {
      title: '✅ Workflow Complete',
      type: 'success',
      width: '400px'
    });
  }
}

// Usage example
const progressDialog = new ProgressiveDialog();

const onboardingSteps = [
  {
    title: 'Welcome!',
    message: 'Let\'s set up your account in a few simple steps.',
    type: 'info',
    icon: '👋',
    required: true
  },
  {
    title: 'Your Name',
    message: 'What should we call you?',
    type: 'prompt',
    icon: '👤',
    validator: (value) => value && value.trim().length >= 2,
    validationMessage: 'Please enter a valid name (at least 2 characters)',
    required: true
  },
  {
    title: 'Email Address',
    message: 'Enter your email address:',
    type: 'prompt',
    icon: '📧',
    validator: (value) => value && value.includes('@'),
    validationMessage: 'Please enter a valid email address',
    required: true
  },
  {
    title: 'Notifications',
    message: 'Would you like to receive email notifications?',
    type: 'confirm',
    icon: '🔔',
    required: false
  }
];

progressDialog.startWorkflow(onboardingSteps);
```

### Dialog Queue Management

```javascript
// Manage multiple dialogs to prevent overwhelming users
class DialogQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.maxConcurrent = 1;
    this.highPriorityTypes = ['error', 'warning'];
  }

  add(dialogConfig, priority = 'normal') {
    const dialog = {
      ...dialogConfig,
      id: this.generateId(),
      priority,
      timestamp: Date.now()
    };

    // High priority dialogs go to the front
    if (this.highPriorityTypes.includes(dialogConfig.type)) {
      this.queue.unshift(dialog);
    } else {
      this.queue.push(dialog);
    }

    this.processQueue();
  }

  generateId() {
    return 'dialog_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const dialog = this.queue.shift();
      await this.showDialog(dialog);
    }

    this.isProcessing = false;
  }

  showDialog(dialog) {
    return new Promise((resolve) => {
      const options = {
        ...dialog,
        onConfirm: (result) => {
          resolve(result);
          if (dialog.onConfirm) {
            dialog.onConfirm(result);
          }
        },
        onSubmit: (value) => {
          resolve(value);
          if (dialog.onSubmit) {
            dialog.onSubmit(value);
          }
        }
      };

      // Auto-resolve for alert dialogs
      if (dialog.type === 'alert' || !dialog.type) {
        Dialog.alert(dialog.message, options);
        setTimeout(() => resolve(true), dialog.autoCloseDelay || 3000);
      } else if (dialog.type === 'confirm') {
        Dialog.confirm(dialog.message, options);
      } else if (dialog.type === 'prompt') {
        Dialog.prompt(dialog.message, options);
      }
    });
  }

  clear() {
    this.queue = [];
    this.isProcessing = false;
  }

  getQueueStatus() {
    return {
      queueLength: this.queue.length,
      isProcessing: this.isProcessing,
      nextDialog: this.queue[0] || null
    };
  }
}

// Global dialog queue instance
const dialogQueue = new DialogQueue();

// Usage
dialogQueue.add({
  type: 'info',
  message: 'Welcome back!',
  title: 'Hello',
  icon: '👋'
});

dialogQueue.add({
  type: 'error',
  message: 'Connection lost. Attempting to reconnect...',
  title: 'Network Error',
  priority: 'high'
});
```

### Interactive Form Dialogs

```javascript
// Create rich form dialogs with custom content
class FormBuilder {
  static createFormDialog(config) {
    const { fields, title, onSubmit, validation, width = '500px' } = config;

    // Generate form HTML
    const formHTML = this.generateFormHTML(fields);

    return Dialog.confirm(formHTML, {
      title,
      type: 'info',
      width,
      style: {
        textAlign: 'left',
        padding: '20px'
      },
      buttonStyle: {
        ok: {
          text: 'Submit',
          background: '#10b981',
          color: '#ffffff'
        },
        cancel: {
          text: 'Cancel',
          background: '#6b7280',
          color: '#ffffff'
        }
      },
      onConfirm: (confirmed) => {
        if (confirmed) {
          const formData = this.extractFormData(fields);
          const errors = this.validateFormData(formData, validation);

          if (errors.length > 0) {
            this.showValidationErrors(errors);
            return false; // Prevent dialog from closing
          }

          onSubmit(formData);
        }
      }
    });
  }

  static generateFormHTML(fields) {
    return `
      <form id="dynamicForm" style="display: flex; flex-direction: column; gap: 16px;">
        ${fields.map(field => this.renderField(field)).join('')}
      </form>
    `;
  }

  static renderField(field) {
    const { name, label, type, placeholder, required, options } = field;

    switch (type) {
      case 'select':
        return `
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 600;">
              ${label}${required ? ' *' : ''}
            </label>
            <select
              name="${name}"
              style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px;"
              ${required ? 'required' : ''}
            >
              <option value="">Select...</option>
              ${options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
            </select>
          </div>
        `;

      case 'textarea':
        return `
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 600;">
              ${label}${required ? ' *' : ''}
            </label>
            <textarea
              name="${name}"
              placeholder="${placeholder || ''}"
              rows="4"
              style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px; resize: vertical;"
              ${required ? 'required' : ''}
            ></textarea>
          </div>
        `;

      case 'checkbox':
        return `
          <div style="display: flex; align-items: center; gap: 8px;">
            <input
              type="checkbox"
              name="${name}"
              id="${name}"
              style="width: 16px; height: 16px;"
            />
            <label for="${name}" style="font-weight: 600;">
              ${label}${required ? ' *' : ''}
            </label>
          </div>
        `;

      default: // text, email, number, etc.
        return `
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 600;">
              ${label}${required ? ' *' : ''}
            </label>
            <input
              type="${type}"
              name="${name}"
              placeholder="${placeholder || ''}"
              style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px;"
              ${required ? 'required' : ''}
            />
          </div>
        `;
    }
  }

  static extractFormData(fields) {
    const form = document.getElementById('dynamicForm');
    const formData = new FormData(form);
    const data = {};

    fields.forEach(field => {
      if (field.type === 'checkbox') {
        data[field.name] = formData.has(field.name);
      } else {
        data[field.name] = formData.get(field.name);
      }
    });

    return data;
  }

  static validateFormData(data, rules) {
    const errors = [];

    if (!rules) return errors;

    Object.keys(rules).forEach(fieldName => {
      const fieldRules = rules[fieldName];
      const value = data[fieldName];

      if (fieldRules.required && (!value || value.trim() === '')) {
        errors.push(`${fieldName} is required`);
        return;
      }

      if (fieldRules.type && value) {
        switch (fieldRules.type) {
          case 'email':
            if (!value.includes('@')) {
              errors.push(`${fieldName} must be a valid email`);
            }
            break;
          case 'number':
            if (isNaN(Number(value))) {
              errors.push(`${fieldName} must be a number`);
            }
            break;
        }
      }

      if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
        errors.push(`${fieldName} must be at least ${fieldRules.minLength} characters`);
      }

      if (fieldRules.pattern && value && !fieldRules.pattern.test(value)) {
        errors.push(`${fieldName} format is invalid`);
      }
    });

    return errors;
  }

  static showValidationErrors(errors) {
    Dialog.alert(
      'Please fix the following errors:\n\n' + errors.map((error, index) => `${index + 1}. ${error}`).join('\n'),
      {
        title: 'Validation Errors',
        type: 'error',
        width: '400px'
      }
    );
  }
}

// Usage example
FormBuilder.createFormDialog({
  title: 'Create New User',
  fields: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      required: true
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'user@example.com',
      required: true
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      options: [
        { value: 'admin', label: 'Administrator' },
        { value: 'user', label: 'Regular User' },
        { value: 'guest', label: 'Guest' }
      ]
    },
    {
      name: 'bio',
      label: 'Biography',
      type: 'textarea',
      placeholder: 'Tell us about yourself...'
    },
    {
      name: 'newsletter',
      label: 'Subscribe to newsletter',
      type: 'checkbox'
    }
  ],
  validation: {
    name: {
      required: true,
      minLength: 2
    },
    email: {
      required: true,
      type: 'email'
    },
    role: {
      required: true
    }
  },
  onSubmit: (formData) => {
    console.log('Form submitted:', formData);
    Toast.success('User created successfully!');
  }
});
```

### Accessibility-Enhanced Dialogs

```javascript
// Dialogs with full accessibility support
class AccessibleDialog {
  static show(message, options = {}) {
    // Create accessible dialog container
    const dialogId = 'accessible-dialog-' + Date.now();
    const dialogHTML = this.createAccessibleHTML(message, options, dialogId);

    // Inject into DOM
    const dialogElement = this.injectDialog(dialogHTML);

    // Setup accessibility features
    this.setupAccessibility(dialogElement, options);

    // Show the dialog
    return this.showDialog(dialogElement, options);
  }

  static createAccessibleHTML(message, options, dialogId) {
    const {
      title = 'Dialog',
      type = 'info',
      showCloseButton = true,
      ariaLabel = null
    } = options;

    return `
      <div
        id="${dialogId}"
        class="accessible-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="${dialogId}-title"
        aria-describedby="${dialogId}-message"
        aria-label="${ariaLabel || title}"
        style="
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border: 2px solid #374151;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          z-index: 10000;
          max-width: 90vw;
          max-height: 90vh;
          overflow: auto;
        "
      >
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
          <h2 id="${dialogId}-title" style="margin: 0; color: #374151; font-size: 1.25rem; font-weight: 600;">
            ${this.getTypeIcon(type)} ${title}
          </h2>
          ${showCloseButton ? `
            <button
              type="button"
              aria-label="Close dialog"
              style="
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                color: #6b7280;
              "
              onclick="this.closest('.accessible-dialog').remove()"
            >
              ×
            </button>
          ` : ''}
        </div>

        <div id="${dialogId}-message" style="color: #4b5563; line-height: 1.5;">
          ${message}
        </div>

        <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: flex-end;">
          ${this.createButtons(options, dialogId)}
        </div>
      </div>

      <div
        class="accessible-dialog-backdrop"
        aria-hidden="true"
        style="
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9999;
        "
      ></div>
    `;
  }

  static getTypeIcon(type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
      primary: '🎯'
    };
    return icons[type] || 'ℹ️';
  }

  static createButtons(options, dialogId) {
    const buttons = [];

    if (options.type === 'confirm') {
      buttons.push(`
        <button
          type="button"
          class="dialog-cancel"
          style="
            background: #f3f4f6;
            color: #374151;
            border: 1px solid #d1d5db;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
          "
        >
          Cancel
        </button>
      `);

      buttons.push(`
        <button
          type="button"
          class="dialog-confirm"
          style="
            background: #3b82f6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
          "
        >
          Confirm
        </button>
      `);
    } else {
      buttons.push(`
        <button
          type="button"
          class="dialog-ok"
          style="
            background: #3b82f6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
          "
        >
          OK
        </button>
      `);
    }

    return buttons.join('');
  }

  static injectDialog(html) {
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
    return container.firstElementChild;
  }

  static setupAccessibility(dialogElement, options) {
    // Store focus element
    const previousFocus = document.activeElement;

    // Focus management
    const focusableElements = dialogElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus first element
    if (firstFocusable) {
      firstFocusable.focus();
    }

    // Trap focus within dialog
    dialogElement.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }

      // Close on Escape
      if (e.key === 'Escape') {
        this.closeDialog(dialogElement, previousFocus, options);
      }
    });

    // Close on backdrop click
    const backdrop = dialogElement.nextElementSibling;
    if (backdrop && backdrop.classList.contains('accessible-dialog-backdrop')) {
      backdrop.addEventListener('click', () => {
        this.closeDialog(dialogElement, previousFocus, options);
      });
    }

    // Store previous focus for restoration
    dialogElement.previousFocus = previousFocus;
  }

  static showDialog(dialogElement, options) {
    return new Promise((resolve) => {
      // Setup button handlers
      const confirmBtn = dialogElement.querySelector('.dialog-confirm');
      const cancelBtn = dialogElement.querySelector('.dialog-cancel');
      const okBtn = dialogElement.querySelector('.dialog-ok');

      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
          this.closeDialog(dialogElement, dialogElement.previousFocus, options);
          resolve(true);
        });
      }

      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          this.closeDialog(dialogElement, dialogElement.previousFocus, options);
          resolve(false);
        });
      }

      if (okBtn) {
        okBtn.addEventListener('click', () => {
          this.closeDialog(dialogElement, dialogElement.previousFocus, options);
          resolve(true);
        });
      }
    });
  }

  static closeDialog(dialogElement, previousFocus, options) {
    // Remove from DOM
    const backdrop = dialogElement.nextElementSibling;
    if (backdrop) {
      backdrop.remove();
    }
    dialogElement.remove();

    // Restore focus
    if (previousFocus && previousFocus.focus) {
      previousFocus.focus();
    }

    // Call custom onClose callback
    if (options.onClose) {
      options.onClose();
    }
  }
}

// Usage
AccessibleDialog.show('This is an accessible dialog message.', {
  title: 'Accessible Dialog',
  type: 'info',
  onClose: () => console.log('Dialog closed')
});
```

### Real-time Dialog Updates

```javascript
// Dialogs that can update their content dynamically
class DynamicDialog {
  constructor() {
    this.activeDialogs = new Map();
  }

  showProgressDialog(initialMessage = 'Processing...') {
    const dialogId = this.generateId();

    const content = `
      <div id="${dialogId}-content">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="spinner" style="
            width: 20px;
            height: 20px;
            border: 2px solid #e5e7eb;
            border-top: 2px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          "></div>
          <span id="${dialogId}-message">${initialMessage}</span>
        </div>
        <div id="${dialogId}-progress" style="
          margin-top: 16px;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
        ">
          <div id="${dialogId}-progress-bar" style="
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8);
            transition: width 0.3s ease;
          "></div>
        </div>
        <div id="${dialogId}-details" style="
          margin-top: 8px;
          font-size: 0.875rem;
          color: #6b7280;
        "></div>
      </div>
    `;

    this.activeDialogs.set(dialogId, {
      type: 'progress',
      startTime: Date.now()
    });

    Dialog.confirm(content, {
      title: 'Processing',
      type: 'info',
      showCancelButton: false,
      buttonStyle: {
        ok: {
          text: 'Cancel',
          background: '#ef4444',
          display: 'none' // Hide initially
        }
      },
      onConfirm: () => {
        this.cancelDialog(dialogId);
      }
    });

    return dialogId;
  }

  updateProgress(dialogId, progress, message, details = null) {
    const dialog = this.activeDialogs.get(dialogId);
    if (!dialog) return;

    const messageEl = document.getElementById(`${dialogId}-message`);
    const progressEl = document.getElementById(`${dialogId}-progress-bar`);
    const detailsEl = document.getElementById(`${dialogId}-details`);

    if (messageEl && message) {
      messageEl.textContent = message;
    }

    if (progressEl) {
      progressEl.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    if (detailsEl && details) {
      detailsEl.textContent = details;
    }

    // Show cancel button when progress is complete
    if (progress >= 100) {
      const okBtn = document.querySelector('[class*="dialog-ok"]');
      if (okBtn) {
        okBtn.style.display = 'block';
        okBtn.textContent = 'Close';
      }
    }
  }

  cancelDialog(dialogId) {
    const dialog = this.activeDialogs.get(dialogId);
    if (dialog && dialog.onCancel) {
      dialog.onCancel();
    }
    this.activeDialogs.delete(dialogId);
  }

  completeDialog(dialogId, finalMessage, success = true) {
    this.updateProgress(dialogId, 100, finalMessage);

    const content = document.getElementById(`${dialogId}-content`);
    if (content) {
      const spinner = content.querySelector('.spinner');
      if (spinner) {
        spinner.style.display = 'none';
      }

      const icon = success ? '✅' : '❌';
      spinner.insertAdjacentHTML('afterend', `<span style="font-size: 20px;">${icon}</span>`);
    }

    this.activeDialogs.delete(dialogId);
  }

  generateId() {
    return 'dynamic-dialog-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }
}

// Usage example
const dynamicDialog = new DynamicDialog();

const progressDialogId = dynamicDialog.showProgressDialog('Uploading file...');

// Simulate progress updates
let progress = 0;
const progressInterval = setInterval(() => {
  progress += Math.random() * 15;

  if (progress >= 100) {
    progress = 100;
    clearInterval(progressInterval);
    dynamicDialog.completeDialog(progressDialogId, 'File uploaded successfully!', true);
  } else {
    dynamicDialog.updateProgress(
      progressDialogId,
      progress,
      `Uploading... ${Math.round(progress)}%`,
      `${Math.round(progress / 10)} MB of 10 MB`
    );
  }
}, 500);
```

### Context-Aware Dialogs

```javascript
// Dialogs that adapt to user context and preferences
class ContextualDialog {
  constructor() {
    this.userPreferences = this.loadUserPreferences();
    this.contextData = this.gatherContextData();
  }

  loadUserPreferences() {
    try {
      return JSON.parse(localStorage.getItem('dialog-preferences') || '{}');
    } catch {
      return {};
    }
  }

  gatherContextData() {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenResolution: `${screen.width}x${screen.height}`,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
  }

  adaptDialogForContext(baseOptions) {
    const adaptedOptions = { ...baseOptions };

    // Adapt for mobile
    if (this.contextData.isMobile) {
      adaptedOptions.width = '90vw';
      adaptedOptions.style = {
        ...adaptedOptions.style,
        fontSize: '16px', // Prevent zoom on iOS
        padding: '16px'
      };
    }

    // Adapt for dark mode
    if (this.contextData.isDarkMode && !this.userPreferences.forceLightTheme) {
      adaptedOptions.style = {
        ...adaptedOptions.style,
        background: '#1f2937',
        color: '#f9fafb',
        borderColor: '#374151'
      };
    }

    // Adapt for reduced motion
    if (this.contextData.isReducedMotion) {
      adaptedOptions.animation = 'none';
    }

    // Adapt for user's preferred language
    if (this.userPreferences.language && this.userPreferences.language !== 'en') {
      adaptedOptions.title = this.translateText(adaptedOptions.title, this.userPreferences.language);
      adaptedOptions.message = this.translateText(adaptedOptions.message, this.userPreferences.language);
    }

    return adaptedOptions;
  }

  translateText(text, targetLanguage) {
    // Simple translation dictionary (in real app, use i18n library)
    const translations = {
      es: {
        'Confirm': 'Confirmar',
        'Cancel': 'Cancelar',
        'Success': 'Éxito',
        'Error': 'Error',
        'Warning': 'Advertencia'
      },
      fr: {
        'Confirm': 'Confirmer',
        'Cancel': 'Annuler',
        'Success': 'Succès',
        'Error': 'Erreur',
        'Warning': 'Avertissement'
      },
      de: {
        'Confirm': 'Bestätigen',
        'Cancel': 'Abbrechen',
        'Success': 'Erfolg',
        'Error': 'Fehler',
        'Warning': 'Warnung'
      }
    };

    return translations[targetLanguage]?.[text] || text;
  }

  showWithContext(baseMessage, baseOptions = {}) {
    const adaptedOptions = this.adaptDialogForContext(baseOptions);

    // Log dialog context for analytics
    this.logDialogContext(baseMessage, adaptedOptions);

    // Show the adapted dialog
    if (baseOptions.type === 'confirm') {
      return Dialog.confirm(baseMessage, adaptedOptions);
    } else if (baseOptions.type === 'prompt') {
      return Dialog.prompt(baseMessage, adaptedOptions);
    } else {
      return Dialog.alert(baseMessage, adaptedOptions);
    }
  }

  logDialogContext(message, options) {
    const contextData = {
      message: message.substring(0, 100), // Truncate long messages
      type: options.type || 'alert',
      context: this.contextData,
      preferences: this.userPreferences,
      timestamp: new Date().toISOString()
    };

    // Send to analytics (in real app)
    console.log('Dialog Context:', contextData);
  }

  setUserPreference(key, value) {
    this.userPreferences[key] = value;
    this.saveUserPreferences();
  }

  saveUserPreferences() {
    try {
      localStorage.setItem('dialog-preferences', JSON.stringify(this.userPreferences));
    } catch (error) {
      console.warn('Failed to save dialog preferences:', error);
    }
  }
}

// Usage
const contextualDialog = new ContextualDialog();

// Show dialog that adapts to context
contextualDialog.showWithContext('Would you like to save your changes?', {
  type: 'confirm',
  title: 'Save Changes'
});
```

### Dialog Performance Monitoring

```javascript
// Monitor and optimize dialog performance
class DialogMonitor {
  constructor() {
    this.metrics = {
      totalDialogs: 0,
      averageShowTime: 0,
      errorRate: 0,
      typeDistribution: {},
      performanceData: []
    };
    this.startTimes = new Map();
    this.setupMonitoring();
  }

  setupMonitoring() {
    // Monkey patch Dialog methods to add monitoring
    const originalAlert = Dialog.alert;
    const originalConfirm = Dialog.confirm;
    const originalPrompt = Dialog.prompt;

    Dialog.alert = (message, options = {}) => {
      const dialogId = this.trackDialogStart('alert', options);
      const result = originalAlert.call(this, message, options);
      this.trackDialogEnd(dialogId, 'alert', options);
      return result;
    };

    Dialog.confirm = (message, options = {}) => {
      const dialogId = this.trackDialogStart('confirm', options);
      const result = originalConfirm.call(this, message, options);
      this.trackDialogEnd(dialogId, 'confirm', options);
      return result;
    };

    Dialog.prompt = (message, options = {}) => {
      const dialogId = this.trackDialogStart('prompt', options);
      const result = originalPrompt.call(this, message, options);
      this.trackDialogEnd(dialogId, 'prompt', options);
      return result;
    };
  }

  trackDialogStart(type, options) {
    const dialogId = this.generateId();
    this.startTimes.set(dialogId, {
      startTime: performance.now(),
      type,
      options,
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    });
    return dialogId;
  }

  trackDialogEnd(dialogId, type, options) {
    const startTime = this.startTimes.get(dialogId);
    if (!startTime) return;

    const endTime = performance.now();
    const duration = endTime - startTime.startTime;

    this.updateMetrics(type, duration, options);
    this.startTimes.delete(dialogId);
  }

  updateMetrics(type, duration, options) {
    this.metrics.totalDialogs++;
    this.metrics.typeDistribution[type] = (this.metrics.typeDistribution[type] || 0) + 1;

    // Update average show time
    const totalDuration = this.metrics.averageShowTime * (this.metrics.totalDialogs - 1) + duration;
    this.metrics.averageShowTime = totalDuration / this.metrics.totalDialogs;

    // Store performance data
    this.metrics.performanceData.push({
      type,
      duration,
      timestamp: Date.now(),
      options: this.sanitizeOptions(options)
    });

    // Keep only last 100 entries
    if (this.metrics.performanceData.length > 100) {
      this.metrics.performanceData = this.metrics.performanceData.slice(-100);
    }

    // Log warnings for slow dialogs
    if (duration > 1000) {
      console.warn(`Slow dialog detected: ${type} took ${duration.toFixed(2)}ms`);
    }
  }

  sanitizeOptions(options) {
    const sanitized = { ...options };
    delete sanitized.onConfirm; // Remove functions to prevent circular references
    delete sanitized.onSubmit;
    return sanitized;
  }

  generateId() {
    return 'dialog-track-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  getMetrics() {
    return {
      ...this.metrics,
      slowestDialog: this.getSlowestDialog(),
      fastestDialog: this.getFastestDialog(),
      mostUsedType: this.getMostUsedType()
    };
  }

  getSlowestDialog() {
    if (this.metrics.performanceData.length === 0) return null;
    return this.metrics.performanceData.reduce((slowest, current) =>
      current.duration > slowest.duration ? current : slowest
    );
  }

  getFastestDialog() {
    if (this.metrics.performanceData.length === 0) return null;
    return this.metrics.performanceData.reduce((fastest, current) =>
      current.duration < fastest.duration ? current : fastest
    );
  }

  getMostUsedType() {
    const distribution = this.metrics.typeDistribution;
    return Object.keys(distribution).reduce((most, current) =>
      distribution[current] > distribution[most] ? current : most
    );
  }

  exportMetrics() {
    const metrics = this.getMetrics();
    const dataStr = JSON.stringify(metrics, null, 2);

    // Create download link
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportLink = document.createElement('a');
    exportLink.setAttribute('href', dataUri);
    exportLink.setAttribute('download', `dialog-metrics-${Date.now()}.json`);
    exportLink.click();
  }

  showMetricsDialog() {
    const metrics = this.getMetrics();

    const message = `
      <div style="text-align: left; font-family: monospace; font-size: 14px;">
        <h3>Dialog Performance Metrics</h3>
        <p><strong>Total Dialogs:</strong> ${metrics.totalDialogs}</p>
        <p><strong>Average Show Time:</strong> ${metrics.averageShowTime.toFixed(2)}ms</p>
        <p><strong>Most Used Type:</strong> ${metrics.mostUsedType || 'N/A'}</p>
        <p><strong>Slowest Dialog:</strong> ${metrics.slowestDialog?.type || 'N/A'} (${metrics.slowestDialog?.duration?.toFixed(2)}ms)</p>
        <p><strong>Fastest Dialog:</strong> ${metrics.fastestDialog?.type || 'N/A'} (${metrics.fastestDialog?.duration?.toFixed(2)}ms)</p>

        <h4>Type Distribution:</h4>
        <ul>
          ${Object.entries(metrics.typeDistribution).map(([type, count]) =>
            `<li>${type}: ${count} (${((count / metrics.totalDialogs) * 100).toFixed(1)}%)</li>`
          ).join('')}
        </ul>
      </div>
    `;

    Dialog.alert(message, {
      title: '📊 Performance Metrics',
      type: 'info',
      width: '600px',
      buttonStyle: {
        ok: {
          background: '#10b981',
          color: '#ffffff',
          text: 'Export Metrics'
        }
      },
      onConfirm: () => this.exportMetrics()
    });
  }
}

// Global dialog monitor instance
const dialogMonitor = new DialogMonitor();

// Export metrics button
// dialogMonitor.showMetricsDialog();
```

## Next Steps

- Learn about [theme customization](/guide/themes)
- Check [advanced configuration](/guide/config)
- Explore [React integration](/guide/react)
- Read about [Vue integration](/guide/vue)