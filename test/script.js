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
  
  // Log when the library is loaded
  console.log('ToastMaster.js loaded successfully!');
  
  // Display a welcome message
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      ToastMaster.notify('Welcome!', 'ToastMaster.js demo is ready.');
    }, 1000);
  });