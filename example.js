/* 
 * ToastMaster Usage Examples 
 * These examples showcase how to use ToastMaster in different environments
 */

// ===============================
// 1. Basic Usage in Plain HTML/JS
// ===============================

// Include the library in your HTML
// <script src="path/to/toastmaster.js"></script>

// Basic alert modal
Toast.fire({
    title: 'Welcome to ToastMaster!',
    content: 'A lightweight modal and toast notification library.',
    icon: 'success'
  });
  
  // Using shortcuts
  Toast.success('Operation completed successfully!');
  Toast.error('Error', 'Something went wrong!');
  Toast.warn('Warning', 'Please fill in all required fields.');
  Toast.info('Information', 'The system will be under maintenance tomorrow.');
  Toast.ask('Confirmation', 'Are you sure you want to delete this item?');
  Toast.notify('New Message', 'You have received a new message from John.');
  
  // Show loading
  Toast.loading('Processing your request...');
  
  // Hide loading after 3 seconds
  setTimeout(() => {
    Toast.loading(false);
  }, 3000);
  
  // Using promises
  Toast.ask('Delete Confirmation', 'Are you sure you want to delete this file?')
    .then((result) => {
      if (result.ok) {
        // User clicked "Yes"
        Toast.success('File deleted successfully!');
      } else if (result.cancel) {
        // User clicked "No"
        Toast.info('Action cancelled');
      }
    });
  
  // Creating a custom configuration with mixin
  const customToast = Toast.mixin({
    position: 'top-center',
    animation: 'shakeY',
    darkMode: true,
    okColor: '#9c27b0',
    iconColor: '#9c27b0'
  });
  
  customToast.fire({
    title: 'Custom Style',
    content: 'This modal uses a custom style configuration.'
  });
  
  // ===============================
  // 2. Usage with jQuery
  // ===============================
  
  // Assuming jQuery is loaded
  // Show modal on button click
  $('#showModalBtn').on('click', function() {
    Toast.fire({
      title: 'jQuery Integration',
      content: 'You can easily integrate ToastMaster with jQuery!'
    });
  });
  
  // Form validation example
  $('#myForm').on('submit', function(e) {
    e.preventDefault();
    
    const name = $('#name').val();
    const email = $('#email').val();
    
    if (!name || !email) {
      Toast.warn('Incomplete Form', 'Please fill in all required fields.');
      return;
    }
    
    Toast.loading('Submitting form...');
    
    // Simulate form submission
    setTimeout(() => {
      Toast.loading(false);
      Toast.success('Form submitted successfully!');
    }, 2000);
  });
  
  // ===============================
  // 3. Usage with React
  // ===============================
  
  // In your React component
  import React, { useEffect } from 'react';
  
  // Import ToastMaster (assuming you've set it up with a module bundler)
  // import Toast from './toastmaster.js';
  
  function App() {
    useEffect(() => {
      // Show welcome modal when component mounts
      Toast.info('Welcome to React App', 'This is a React integration example.');
    }, []);
    
    const handleClick = async () => {
      const result = await Toast.ask('React Integration', 'Do you like using ToastMaster with React?');
      
      if (result.ok) {
        Toast.success('Great!', 'We\'re glad you like it!');
      } else {
        Toast.info('Thanks for your feedback!');
      }
    };
    
    return (
      <div>
        <h1>ToastMaster React Example</h1>
        <button onClick={handleClick}>Show Modal</button>
      </div>
    );
  }
  
  export default App;
  
  // ===============================
  // 4. Usage with Vue.js
  // ===============================
  
  // In your Vue component
  // <template>
  //   <div>
  //     <h1>ToastMaster Vue Example</h1>
  //     <button @click="showModal">Show Modal</button>
  //   </div>
  // </template>
  
  // <script>
  // import Toast from './toastmaster.js';
  
  /* 
  export default {
    name: 'App',
    mounted() {
      // Show welcome modal when component mounts
      Toast.info('Welcome to Vue App', 'This is a Vue integration example.');
    },
    methods: {
      async showModal() {
        const result = await Toast.ask('Vue Integration', 'Do you like using ToastMaster with Vue?');
        
        if (result.ok) {
          Toast.success('Great!', 'We\'re glad you like it!');
        } else {
          Toast.info('Thanks for your feedback!');
        }
      }
    }
  } 
    */
  // </script>
  
  // ===============================
  // 5. Usage with PHP
  // ===============================
  
  // Include the library in your PHP page
  // <?php
  // // PHP logic...
  // $showModal = true;
  // $modalTitle = "PHP Integration";
  // $modalContent = "You can control ToastMaster with PHP variables!";
  // ?>
  
  // <!-- HTML part -->
  // <script src="path/to/toastmaster.js"></script>
  // <script>
  // // Use PHP variables in JavaScript
  // <?php if ($showModal): ?>
  window.addEventListener('DOMContentLoaded', function() {
    Toast.fire({
      title: '<?php echo $modalTitle; ?>',
      content: '<?php echo $modalContent; ?>',
      icon: 'info'
    });
  });
  // <?php endif; ?>
  // </script>
  
  // ===============================
  // 6. Advanced Examples
  // ===============================
  
  // Custom styling
  Toast.fire({
    title: 'Custom Styling',
    content: 'You can customize nearly everything!',
    icon: '<svg viewBox="0 0 24 24" width="40" height="40" fill="#FF5722"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
    okColor: '#FF5722',
    size: 'md',
    classes: {
      modal: 'toastmaster-custom-modal',
      content: 'toastmaster-custom-content'
    }
  });
  
  // Image content
  Toast.fire({
    title: 'Beautiful View',
    content: '<img src="https://picsum.photos/500/300" alt="Random Image" style="max-width: 100%; border-radius: 8px; margin-top: 10px;">',
    size: 'md'
  });
  
  // Custom animation
  const slideToast = Toast.mixin({
    animation: 'fadeIn',
    position: 'bottom-right',
    timeout: 5000,
    progress: true,
    ok: false,
    cancel: false
  });
  
  slideToast.fire({
    title: 'Custom Animation',
    content: 'This notification uses a custom animation and position.'
  });
  
  // Form in modal
  Toast.fire({
    title: 'Subscribe to Newsletter',
    content: `
      <form id="subscribeForm">
        <div style="margin-bottom: 15px;">
          <input type="email" placeholder="Your email address" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
        </div>
        <div>
          <label>
            <input type="checkbox"> I agree to receive newsletters
          </label>
        </div>
      </form>
    `,
    ok: 'Subscribe',
    cancel: 'Cancel',
    size: 'md'
  }).then((result) => {
    if (result.ok) {
      const form = document.getElementById('subscribeForm');
      const email = form.querySelector('input[type="email"]').value;
      const checked = form.querySelector('input[type="checkbox"]').checked;
      
      if (!email) {
        Toast.warn('Please enter your email address');
      } else if (!checked) {
        Toast.warn('Please agree to receive newsletters');
      } else {
        Toast.success('Thank you for subscribing!');
      }
    }
  });
  
  // Multi-step modal flow
  async function multiStepExample() {
    const step1 = await Toast.fire({
      title: 'Step 1 of 3',
      content: 'This is a multi-step modal example.',
      ok: 'Next',
      cancel: 'Cancel'
    });
    
    if (step1.ok) {
      const step2 = await Toast.fire({
        title: 'Step 2 of 3',
        content: 'Please select your preferences.',
        ok: 'Next',
        cancel: 'Back'
      });
      
      if (step2.ok) {
        const step3 = await Toast.fire({
          title: 'Step 3 of 3',
          content: 'Confirm your details.',
          ok: 'Confirm',
          cancel: 'Back'
        });
        
        if (step3.ok) {
          Toast.success('Process completed!');
        }
      }
    }
  }
  
  // multiStepExample();
  
  // Dark mode example
  const darkToast = Toast.mixin({
    darkMode: true,
    okColor: '#9c27b0',
    iconColor: '#9c27b0'
  });
  
  darkToast.fire({
    title: 'Dark Mode',
    content: 'ToastMaster also supports dark mode for a modern look.',
    icon: 'info'
  });