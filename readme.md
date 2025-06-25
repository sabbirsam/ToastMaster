# ToastMaster by sabbirsam

A lightweight, versatile modal and toast notification library that works seamlessly with vanilla JavaScript, React, Vue and other frameworks.

## Features

- 🚀 Lightweight and fast
- 🎨 Highly customizable (size, position, colors, animations)
- 💳 Built-in pricing modal support
- 🏷️ Tag system for badges like New, Pro, Upcoming
- 🌗 Dark mode support
- 🧩 Framework-agnostic (works with any JS framework)
- 📱 Responsive design
- ⌨️ Keyboard navigation (ESC to close, ENTER for OK)
- ⏱️ Auto-close with progress bar
- 🔄 Promise-based API
- 📏 No dependencies


## Installation

### Option 1: Direct Download

1. Download `toastmaster.min.js` from the repository
2. Include it in your HTML:

```html
<script src="path/to/toastmaster.min.js"></script>
<script src="../dist/toastmaster.min.js"></script>
```

### Option 2: CDN

```html
<script src="https://cdn.example.com/toastmaster/2.0.1/toastmaster.min.js"></script>
```

### Option 3: NPM (for usage with module bundlers)

```bash
npm install toastmaster --save
```

Then import it in your JavaScript:

```javascript
import ToastMaster from '../node_modules/toastmaster';

ToastMaster.fire({
      title: 'Warning',
      content: 'There are no leads to export!',
      icon: 'warning',
      iconColor: '#ffc107'
    });

```

```javascript
const exampleinReact = () => {
  const ToastMaster = require('toastmaster');

  ToastMaster.fire({
      title: 'Warning',
      content: 'There are no leads to export!',
      icon: 'warning',
      iconColor: '#ffc107'
    });

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
```javascript
Toast.success('Operation completed!', {
  position: 'top-right',
  timeout: 3000,
  animation: 'fadeIn'
});
```

### Error Message

```javascript

Toast.error('Error', 'Something went wrong!');
```

```javascript
Toast.error('Error', {
  content: 'Something went wrong!',
  position: 'bottom-center',
  timeout: 5000,
  darkMode: true
});
```

### Warning Message

```javascript

Toast.warn('Warning', 'Please fill in all required fields.');
```
```javascript
Toast.warn('Warning', {
  content: 'Please fill in all required fields.',
  position: 'top-center',
  backdrop: 'rgba(0, 0, 0, 0.3)',
  animation: 'shakeY'
});
```

### Information Message

```javascript

Toast.info('Information', 'The system will be under maintenance tomorrow.');
```

```javascript
Toast.info('Information', {
  content: 'The system will be under maintenance tomorrow.',
  position: 'bottom-right',
  timeout: 8000,
  progress: true
});
```

### Notification

```javascript

Toast.notify('New Message', 'You have received a new message from John.');
```
```javascript
Toast.notify('New Message', {
  content: 'You have received a new message from John.',
  position: 'bottom-left',
  timeout: 6000,
  iconColor: '#4267B2'
});
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

## Usage Examples

### 1. Pricing Modal with Backdrop Close

You can allow users to close the pricing modal by clicking the backdrop (outside the modal) using `backdropClose: true`:

```javascript
Toast.price({
  title: 'Pricing Modal (Backdrop Close)',
  subtitle: 'Click outside the modal to close',
  backdropClose: true,
  plans: [
    {
      name: 'Demo',
      prices: {
        'Monthly': { original: 10, current: 10, period: '/month' }
      },
      features: ['Demo feature'],
      button: {
        text: 'Try',
        url: '#'
      }
    }
  ],
  toggles: { options: ['Monthly'], active: 'Monthly' },
  guarantee: { days: 7, title: '7-Day Guarantee', text: 'Demo only.' }
});
```

### 2. Pricing Modal with Button Function Callback

You can run any JavaScript function when a pricing modal button is pressed by using the `callback` property:

```javascript
function pricingCallbackDemo(data) {
  alert('Callback function called!\nPlan: ' + data.plan.name + '\nToggle: ' + data.toggle);
  // Custom logic here
}

Toast.price({
  title: 'Pricing Modal (Function Callback)',
  subtitle: 'Button will call a JS function',
  plans: [
    {
      name: 'Callback Plan',
      prices: {
        'Monthly': { original: 20, current: 15, period: '/month' }
      },
      features: ['Callback feature'],
      button: {
        text: 'Call Function',
        callback: pricingCallbackDemo
      }
    }
  ],
  toggles: { options: ['Monthly'], active: 'Monthly' },
  guarantee: { days: 3, title: '3-Day Guarantee', text: 'Callback demo.' }
});
```

## Pricing Modal

### Creating a Pricing Modal Configuration

```javascript

Toast.price({
  title: '🚀 Hello its a pricing modal',
  subtitle: 'Choose the plan that fits your needs',
  toggles: {
    options: ['Monthly', 'Yearly', 'Lifetime'],
    active: 'Yearly',
    savings: { 'Yearly': 'Save 20%', 'Lifetime': 'Save 80%' }
  },
  plans: [
    {
      name: 'Basic',
      tag: Toast.tag('new'),
      prices: {
        'Monthly': { original: 12.99, current: 12.99, period: '/month' },
        'Yearly': { original: 155.88, current: 129.90, period: '/year' },
        'Lifetime': { original: 155.88, current: 30.49, period: '/lifetime' }
      },
      features: ['All Basic features', 'WooCommerce packages', 'Security features'],
      button: {
        text: 'Visit Now',
        url: 'https://github.com/sabbirsam'
      }
    },
    {
      name: 'Pro',
      prices: {
        'Monthly': { original: 29.99, current: 29.99, period: '/month' },
        'Yearly': { original: 359.88, current: 287.90, period: '/year' },
        'Lifetime': { original: 426.75, current: 85.35, period: '/lifetime' }
      },
      features: ['All Basic features', 'WooCommerce packages', 'Advanced security', 'Priority support'],
      button: {
        text: 'Google Now',
        url: 'https://www.google.com/'
      },
      tag: Toast.tag('pro')
    },
    {
      name: 'Agency',
      prices: {
        'Monthly': { original: 49.99, current: 49.99, period: '/month' },
        'Yearly': { original: 599.88, current: 479.90, period: '/year' },
        'Lifetime': { original: 751.00, current: 150.20, period: '/lifetime' }
      },
      features: ['All Pro features', 'Unlimited sites', 'White labeling', 'Premium support'],
      button: {
        text: 'Upgrade Now',
        url: '/checkout?plan=agency'
      },
      tag: Toast.tag('new', 'HOT DEAL', '#e74c3c')
    }
  ],
  recommended: 'Pro',
  guarantee: { 
    days: 14, 
    title: '14-Day Money-Back Guarantee', 
    text: 'Try it risk-free. If you\'re not satisfied, get a full refund within 14 days.' 
  }
});

```

## Tags


### Creating Tags

```javascript
// Default tag
Toast.tag('new');

// Custom label
Toast.tag('pro');

// Custom label and color
Toast.tag('new', 'HOT DEAL', '#e74c3c');

```

```javascript
// Add tag next to an any element
ToastMaster.tag('pro', null, { 
  selector: 'h2'  
});
```
```javascript
// Adding a tag with custom inline styles
ToastMaster.tag('hot', 'TRENDING', {
  selector: 'h3',
  position: 'after',
  style: {
    backgroundImage: 'linear-gradient(to right, #ff416c, #ff4b2b)',
    transform: 'rotate(-5deg)',
    transformOrigin: 'center',
    textShadow: '0 1px 1px rgba(0,0,0,0.2)'
  }
});

```


### 3. Auto Tag Rendering via Class

You can add a tag to any HTML element by simply adding a class like `toast-tag-new`, `toast-tag-pro`, or `toast-tag-upcoming`:

```html
<span class="toast-tag-new">This is a NEW tag (auto)</span>
<span class="toast-tag-pro">This is a PRO tag (auto)</span>
<span class="toast-tag-upcoming">This is an UPCOMING tag (auto)</span>
```

On page load, the ToastMaster library will automatically render the corresponding tag after each element with a `toast-tag-<type>` class.


## Custom Tag Usage

ToastMaster supports auto-rendering custom tags using a special class format. This allows you to easily create styled badges/tags in your HTML with just a class name—no JavaScript required!

### Class Format

```
toast-ctag-Label-bgcolor-textcolor-radius-width-height-fontsize-padding
```
- **Label**: The text to display inside the tag
- **bgcolor**: Background color (named or hex)
- **textcolor**: Text color (named or hex)
- **radius**: Border radius (e.g., `12px`, `50%`) *(optional, default: `12px`)*
- **width**: Width (e.g., `60px`, `auto`) *(optional)*
- **height**: Height (e.g., `24px`, `auto`) *(optional)*
- **fontsize**: Font size (e.g., `1em`, `14px`) *(optional, default: `0.85em`)*
- **padding**: Padding (e.g., `2px_8px`, `0.5em_1em`) *(optional, default: `2px 8px`)*
  - Use underscores (`_`) instead of spaces in the class name for padding values.

You can omit any trailing values to use the default for that style.

### Supported Color Formats
- **Named colors**: e.g., `red`, `green`, `orange`, `blue`
- **Hex colors**: Use without the `#` (e.g., `ff9800`, `fff`, `2196f3`). The library will automatically prepend `#` if the value is 3 or 6 hex digits.

### Examples

**Basic custom tag:**
```html
<span class="toast-ctag-Beta-red-fff"></span>
```
- Label: Beta
- Background: red
- Text: #fff

**Custom radius, width, height, font size, and padding:**
```html
<span class="toast-ctag-Alpha-4caf50-222-16px-80px-32px-1.2em-6px_16px"></span>
```
- Label: Alpha
- Background: #4caf50
- Text: #222
- Border radius: 16px
- Width: 80px
- Height: 32px
- Font size: 1.2em
- Padding: 6px 16px

**Hex color for both background and text:**
```html
<span class="toast-ctag-Hot-ff9800-fff"></span>
```
- Label: Hot
- Background: #ff9800
- Text: #fff

**With only some custom styles:**
```html
<span class="toast-ctag-Info-2196f3-fff-8px"></span>
```
- Label: Info
- Background: #2196f3
- Text: #fff
- Border radius: 8px

### Dynamic Usage
If you add custom tags dynamically after page load, call:
```javascript
ToastMaster.renderCustomTags();
```
This will scan the DOM and apply styles to any new custom tags.

## Dark Mode & Theming

ToastMaster supports dark mode out of the box. Enable it by setting `darkMode: true` in your modal or toast configuration:

```javascript
Toast.fire({
  title: 'Dark Mode',
  content: 'This modal uses dark mode!',
  darkMode: true
});
```

You can also customize the appearance of any modal or toast by overriding the default CSS classes or using the `classes` option in your configuration.

## Animations

ToastMaster includes several built-in animation types:
- `'tilt'` (default)
- `'fadeIn'`
- `'shakeY'`
- `'shakeX'`

Set the animation type using the `animation` option:

```javascript
Toast.fire({
  title: 'Animated Modal',
  animation: 'fadeIn'
});
```

**Custom Animations:**
You can add your own CSS animation classes by extending the `ANIMATIONS` object in the source code, then use your custom key as the `animation` value.

## Accessibility

- Modals are keyboard accessible: use `ESC` to close, `ENTER` for OK (if enabled).
- All buttons are focusable and usable via keyboard.
- **Note:** ARIA attributes and focus trap are not yet implemented. For full accessibility, consider adding these features if needed.

## Event Hooks

ToastMaster supports `onOpen` and `onClose` callbacks directly in all modal types. These allow you to run custom code when a modal opens or closes.

- `onOpen`: Called immediately after the modal is added to the DOM and animation starts.
- `onClose`: Called right before the modal is removed from the DOM (after animation out, if any).

**Example:**
```javascript
Toast.fire({
  title: 'With Hooks',
  content: 'Check the console for onOpen and onClose logs.',
  onOpen: () => { console.log('Modal opened!'); },
  onClose: () => { console.log('Modal closed!'); }
});
```

These options work for all modal types (`fire`, `success`, `error`, `warn`, `info`, `ask`, `notify`, `price`, etc).

You can also use the returned Promise to detect when a modal is closed or a user action is taken:

```javascript
Toast.fire({
  title: 'Confirm',
  content: 'Are you sure?'
}).then(result => {
  if (result.ok) {
    // User confirmed
  } else if (result.cancel) {
    // User cancelled
  } else if (result.close) {
    // Modal was closed
  } else if (result.timeout) {
    // Modal auto-closed
  }
});
```

If you need to run code when a modal opens, you can do so immediately after calling `Toast.fire()`, or use the new `onOpen` callback.

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
| `loadingText`   | String              | `{Please wait...'}`| Text for loading modal.                             |
| `isPricingModal`| Boolean             | `{false'}`         | Internal flag for pricing modals.                   |


## Tag Configuration (tag() Method)

### Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| type | String | 'custom' | Tag type (`pro`, `new`, `upcoming`, `beta`, `hot`, `sale`, `free`). |
| text | String | type.toUpperCase() | Display text. |
| color | String | Auto-based on type | Background color. |
| textColor | String | '#fff' | Text color. |
| borderRadius | String | '3px' | Border radius. |
| padding | String | '2px 6px' | Inner spacing. |
| fontSize | String | '12px' | Font size. |
| fontWeight | String | 'bold' | Font weight. |
| margin | String | '0 5px' | Outer spacing. |
| display | String | 'inline-block' | Display style. |
| className | String | '' | Additional CSS classes. |
| style | Object | {} | Custom inline styles. |

### Predefined Tag Types

| Type | Default Color | Use Case |
|------|--------------|----------|
| pro | #ff6b6b | Professional plan. |
| new | #4ecdc4 | New feature. |
| upcoming | #a66efa | Coming soon. |
| beta | #f39c12 | Beta release. |
| hot | #e74c3c | Hot deal. |
| sale | #3498db | Discounted. |
| free | #2ecc71 | Free plan. |

## Pricing Modal (price() Method)

### Plan Object Options

| Property | Type | Description |
|----------|------|-------------|
| name | String | Plan name (e.g., 'Basic'). |
| prices | Object | Pricing for each toggle (e.g., Monthly: { current: 9.99 }). |
| features | Array | List of features (e.g., ['24/7 Support', '10GB Storage']). |
| button | Object | Config for the CTA button (text, url, callback). |
| tag | String/Object | Tag (e.g., 'pro' or { type: 'custom', text: 'LIMITED' }). |

### Toggle Options

| Property | Type | Description |
|----------|------|-------------|
| options | Array | Toggle choices (e.g., ['Monthly', 'Yearly']). |
| active | String | Default active toggle (e.g., 'Yearly'). |
| savings | Object | Savings text (e.g., { Yearly: 'Save 20%' }). |

## CSS Classes Customization

| Class Name | Element Targeted |
|------------|------------------|
| modal | Main modal container. |
| icon | Icon container. |
| content | Content area. |
| contentTitle | Title text. |
| contentText | Content text. |
| closeButton | Close button. |
| buttons | Buttons container. |
| ok | OK button. |
| cancel | Cancel button. |
| backdrop | Backdrop. |
| loading | Loading container. |
| loadingText | Loading text. |
| loadingSpinner | Loading spinner. |
| progress | Progress bar. |
| arrow-icon | Pricing modal arrows. |
| check-icon | Pricing modal checkmarks. |

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
