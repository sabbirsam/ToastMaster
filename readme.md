# ToastMaster- by SABBIRSAM

A lightweight, versatile modal and toast notification library that works seamlessly with vanilla JavaScript, React, Vue, PHP, and other frameworks.

## Features

- 🚀 Lightweight and fast
- 🎨 Highly customizable (size, position, colors, animations)
- 🌗 Dark mode support
- 🧩 Framework-agnostic (works with any JS framework)
- 📱 Responsive design
- ⌨️ Keyboard navigation (ESC to close, ENTER for OK)
- ⏱️ Auto-close with progress bar
- 🔄 Promise-based API
- 📏 No dependencies

## Installation

### Option 1: Direct Download

1. Download `toastmaster.js` from the repository
2. Include it in your HTML:

```html
<script src="path/to/toastmaster.js"></script>
```

### Option 2: CDN

```html
<script src="https://cdn.example.com/toastmaster/1.0.0/toastmaster.min.js"></script>
```

### Option 3: NPM (for usage with module bundlers)

```bash
npm install toastmaster --save
```

Then import it in your JavaScript:

```javascript
import Toast from 'toastmaster';
```

## Basic Usage

### Simple Alert

```javascript
Toast.fire({
  title: 'Welcome!',
  content: 'Thanks for using ToastMaster.',
  icon: 'success'
});
```

### Confirmation Dialog

```javascript
Toast.ask('Delete Confirmation', 'Are you sure you want to delete this item?')
  .then((result) => {
    if (result.ok) {
      // User clicked "Yes"
      console.log('Deleting item...');
    } else if (result.cancel) {
      // User clicked "No"
      console.log('Action cancelled');
    }
  });
```

### Loading Indicator

```javascript
// Show loading
Toast.loading('Processing your request...');

// Hide loading after task completion
setTimeout(() => {
  Toast.loading(false);
  Toast.success('Task completed!');
}, 3000);
```

### Custom Styling

```javascript
Toast.fire({
  title: 'Custom Style',
  content: 'This modal has custom styling.',
  icon: 'info',
  iconColor: '#9c27b0',
  okColor: '#9c27b0',
  position: 'top-center',
  animation: 'shakeY',
  size: 'md'
});
```

## Shortcut Methods

### Success Message

```javascript
Toast.success('Operation completed successfully!', 4000);
// Will auto-close after 4 seconds
```

### Error Message

```javascript
Toast.error('Error', 'Something went wrong!');
```

### Warning Message

```javascript
Toast.warn('Warning', 'Please fill in all required fields.');
```

### Information Message

```javascript
Toast.info('Information', 'The system will be under maintenance tomorrow.');
```

### Notification

```javascript
Toast.notify('New Message', 'You have received a new message from John.');
```

## Customization

### Creating a Custom Configuration

```javascript
const customToast = Toast.mixin({
  position: 'top-right',
  animation: 'fadeIn',
  darkMode: true,
  okColor: '#9c27b0',
  iconColor: '#9c27b0'
});

// Use the custom configuration
customToast.fire({
  title: 'Custom Modal',
  content: 'This modal uses a custom configuration.'
});
```

## Configuration Options

| Option          | Type                | Default             | Description                                         |
|-----------------|---------------------|---------------------|-----------------------------------------------------|
| `title`         | String/Boolean      | `false`            | Modal title text. Set `false` to hide.              |
| `content`       | String/Boolean      | `false`            | Modal content text. Set `false` to hide.            |
| `ok`            | String/Boolean      | `'OK'`             | OK button text. Set `false` to hide.                |
| `okColor`       | String              | `'#2980b9'`        | OK button background color.                         |
| `cancel`        | String/Boolean      | `'Cancel'`         | Cancel button text. Set `false` to hide.            |
| `cancelColor`   | String              | `'transparent'`    | Cancel button background color.                     |
| `icon`          | String/Boolean      | `'success'`        | Icon type ('success', 'error', 'warning', 'info', 'question') or custom SVG. Set `false` to hide. |
| `iconColor`     | String              | `'#2980b9'`        | Icon color.                                         |
| `backdrop`      | String/Boolean      | `'rgba(0,0,0,0.7)'`| Backdrop color. Set `false` to hide.                |
| `backdropClose` | Boolean             | `true`             | Close modal on backdrop click.                      |
| `enterOk`       | Boolean             | `false`            | Press Enter key to trigger OK button.               |
| `escClose`      | Boolean             | `true`             | Press Escape key to close modal.                    |
| `bodyClose`     | Boolean             | `false`            | Close modal when clicking anywhere on the modal.    |
| `closeButton`   | Boolean             | `true`             | Show close button (×) in top-right corner.          |
| `size`          | String              | `'sm'`             | Modal size ('sm', 'md', 'lg', 'xl', 'full') or custom size (e.g., '400px') |
| `position`      | String              | `'center'`         | Modal position ('center', 'top', 'bottom', 'left', 'right', etc.) |
| `timeout`       | Number/Boolean      | `false`            | Auto-close timeout in milliseconds. Set `false` to disable. |
| `progress`      | Boolean             | `false`            | Show progress bar for auto-close timeout.           |
| `animation`     | String/Boolean      | `'tilt'`           | Animation type ('tilt', 'fadeIn', 'shakeY', 'shakeX'). Set `false` to disable. |
| `darkMode`      | Boolean             | `false`            | Enable dark mode.                                   |
| `classes`       | Object              | `{}`               | Custom CSS classes for modal elements.              |

## Browser Support

ToastMaster works in all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)



## Installation

### Option 1: Via NPM
```bash
# Install the package
npm install toastmaster

# Build the minified version
npm run build
```

### Option 2: Via CDN
```html
<script src="https://cdn.example.com/npm/toastmaster@1.0.0/dist/toastmaster.min.js"></script>
```

### Option 3: Direct Download
1. Download `toastmaster.min.js` from the `dist` folder
2. Include it in your HTML:
```html
<script src="path/to/toastmaster.min.js"></script>
```
## License
MIT License# ToastMaster- sabbirsam
