// Function to log results
function logResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = JSON.stringify(result, null, 2);
    console.log('Result:', result);
  }
  
  // Success modal
  function showSuccess() {
    ToastMaster.success('Success!', 'Operation completed successfully.')
      .then(logResult);
  }
  
  // Error modal
  function showError() {
    ToastMaster.error('Error!', 'Something went wrong.')
      .then(logResult);
  }
  
  // Warning modal
  function showWarning() {
    ToastMaster.warn('Warning!', 'This action may have consequences.')
      .then(logResult);
  }
  
  // Info modal
  function showInfo() {
    ToastMaster.info('Information', 'Here is some important information.')
      .then(logResult);
  }
  
  // Question modal
  function showQuestion() {
    ToastMaster.ask('Confirmation', 'Are you sure you want to proceed?')
      .then(logResult);
  }
  
  // Notification
  function showNotification() {
    ToastMaster.notify('New Message', 'You have a new notification!')
      .then(logResult);
  }
  
  // Loading indicator
  function showLoading() {
    ToastMaster.loading('Processing your request...');
    
    // Simulate a process
    setTimeout(() => {
      ToastMaster.loading(false);
      ToastMaster.success('Completed!');
    }, 3000);
  }
  
  // Custom modal
  function showCustom() {
    ToastMaster.fire({
      title: 'Custom Modal',
      content: 'This is a fully customized modal with many options.',
      icon: 'info',
      iconColor: '#9c27b0',
      ok: 'Accept',
      okColor: '#9c27b0',
      cancel: 'Decline',
      animation: 'shakeY',
      position: 'top',
      darkMode: true
    }).then(logResult);
  }


  function showPrice() {
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
              text: 'Upgrade Now',
              url: 'google.com'
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
              text: 'Upgrade Now',
              url: 'google.com'
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
      }).then(result => {
        console.log('Selected plan:', result.plan);
        console.log('Selected toggle:', result.selectedToggle);
      });
  }
  function showPrice2() {
      // Example of usage with callback functions
    Toast.price({
      title: '🚀 Choose Your Plan',
      toggles: {
        options: ['Monthly', 'Yearly', 'Lifetime'],
        active: 'Yearly',
        savings: { 'Yearly': 'Save 20%', 'Lifetime': 'Save 80%' }
      },
      plans: [
        {
          name: 'Basic',
          prices: {
            'Monthly': { original: 12.99, current: 12.99, period: '/month' },
            'Yearly': { original: 155.88, current: 129.90, period: '/year' },
            'Lifetime': { original: 155.88, current: 30.49, period: '/lifetime' }
          },
          features: ['All Basic features', 'WooCommerce packages', 'Advanced security packages'],
          button: {
            text: 'Upgrade Now',
            url: 'https://example.com/basic', // URL to navigate to
            callback: function(data) {
              // Alternative: Execute this function when clicked
              console.log('Selected Basic plan', data);
              
              window.location.href = data.plan.button.url + '?toggle=' + data.toggle;
            }
          },
          tag: Toast.tag('new')
        },
        // More plans...
      ]
    }).then(function(result) {
      // This runs after the modal is closed
      console.log('Selected plan:', result.plan);
      console.log('Selected toggle:', result.selectedToggle);
    });
  }




  ToastMaster.tag('pro', null, {
      selector: 'h2'  
    });


   // Example 5: Adding a tag with custom inline styles
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

  
  // Log when the library is loaded
  console.log('ToastMaster.js loaded successfully!');
  
  // Display a welcome message
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      ToastMaster.notify('Welcome!', 'ToastMaster.js demo is ready.');
    }, 1000);
  });