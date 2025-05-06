/**
 * ToastMaster.js - A lightweight, customizable modal and toast notification library
 * 
 * @version 1.0.0
 * @author SabbirSam
 * @license MIT
 */

(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Toast = factory());
  })(this, function() {
    'use strict';
  
    // Default options for the library
    const DEFAULT_OPTIONS = {
      // Basic content
      title: false,
      content: false,
      
      // Buttons
      ok: 'OK',
      okColor: '#2980b9',
      cancel: 'Cancel',
      cancelColor: 'transparent',
      
      // Appearance
      icon: 'success',
      iconColor: '#2980b9',
      backdrop: 'rgba(0, 0, 0, 0.7)',
      size: 'sm',
      position: 'center',
      animation: 'tilt',
      darkMode: false,
      
      // Behavior
      backdropClose: true,
      enterOk: false,
      escClose: true,
      bodyClose: false,
      closeButton: true,
      timeout: false,
      progress: false,
      
      // Custom classes
      classes: {
        modal: '',
        icon: '',
        content: '',
        contentTitle: '',
        contentText: '',
        closeButton: '',
        buttons: '',
        ok: '',
        cancel: '',
        backdrop: '',
        loading: '',
        loadingText: '',
        loadingSpinner: '',
        progress: ''
      }
    };
  
    // Icons for different states
    const ICONS = {
      success: `<svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
      error: `<svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
      warning: `<svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      info: `<svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
      question: `<svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      loading: `<div class="tm-spinner"><div></div><div></div><div></div><div></div></div>`
    };
  
    // Animation definitions
    const ANIMATIONS = {
      tilt: {
        in: 'tm-animation-tilt-in',
        out: 'tm-animation-tilt-out'
      },
      fadeIn: {
        in: 'tm-animation-fade-in',
        out: 'tm-animation-fade-out'
      },
      shakeY: {
        in: 'tm-animation-shake-y',
        out: 'tm-animation-fade-out'
      },
      shakeX: {
        in: 'tm-animation-shake-x',
        out: 'tm-animation-fade-out'
      }
    };
  
    // Size definitions
    const SIZES = {
      sm: '300px',
      md: '500px',
      lg: '700px',
      xl: '900px',
      full: '100%'
    };
  
    // Position definitions
    const POSITIONS = {
      'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
      'top': { top: '30px', left: '50%', transform: 'translateX(-50%)' },
      'bottom': { bottom: '30px', left: '50%', transform: 'translateX(-50%)' },
      'left': { top: '50%', left: '30px', transform: 'translateY(-50%)' },
      'right': { top: '50%', right: '30px', transform: 'translateY(-50%)' },
      'top-left': { top: '30px', left: '30px' },
      'top-right': { top: '30px', right: '30px' },
      'bottom-left': { bottom: '30px', left: '30px' },
      'bottom-right': { bottom: '30px', right: '30px' },
      'top-center': { top: '30px', left: '50%', transform: 'translateX(-50%)' },
      'bottom-center': { bottom: '30px', left: '50%', transform: 'translateX(-50%)' },
      'left-center': { top: '50%', left: '30px', transform: 'translateY(-50%)' },
      'right-center': { top: '50%', right: '30px', transform: 'translateY(-50%)' }
    };
  
    // Main ToastMaster class
    class ToastMaster {
      constructor(options = {}) {
        this.options = this._mergeOptions(DEFAULT_OPTIONS, options);
        this.currentModal = null;
        this.timer = null;
        this.progressTimer = null;
        this.isLoading = false;
        this._injectStyles();
      }
  
      /**
       * Merge default options with user options
       * 
       * @param {Object} defaultOptions - Default options
       * @param {Object} userOptions - User options
       * @returns {Object} - Merged options
       */
      _mergeOptions(defaultOptions, userOptions) {
        const options = { ...defaultOptions };
        
        for (const key in userOptions) {
          if (key === 'classes' && userOptions.classes) {
            options.classes = { ...options.classes, ...userOptions.classes };
          } else {
            options[key] = userOptions[key];
          }
        }
        
        return options;
      }
  
      /**
       * Inject CSS styles into the document
       */
      _injectStyles() {
        if (document.getElementById('toast-master-styles')) return;
  
        const style = document.createElement('style');
        style.id = 'toast-master-styles';
        style.textContent = `
          .tm-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .tm-modal {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            position: absolute;
            max-width: 100%;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
          }
          
          .tm-dark-mode {
            background-color: #333;
            color: #fff;
          }
          
          .tm-dark-mode .tm-close-button {
            color: #fff;
          }
          
          .tm-icon-container {
            display: flex;
            justify-content: center;
            padding: 20px 0 0;
          }
          
          .tm-content {
            padding: 20px;
            text-align: center;
            overflow-y: auto;
          }
          
          .tm-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          
          .tm-message {
            font-size: 16px;
            margin-bottom: 10px;
          }
          
          .tm-buttons {
            display: flex;
            justify-content: center;
            padding: 15px;
            gap: 10px;
          }
          
          .tm-button {
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            border: none;
            font-size: 14px;
            font-weight: bold;
            transition: opacity 0.2s;
          }
          
          .tm-button:hover {
            opacity: 0.8;
          }
          
          .tm-ok-button {
            color: white;
          }
          
          .tm-cancel-button {
            background-color: transparent;
            border: 1px solid #ccc;
          }
          
          .tm-close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            background: none;
            border: none;
            font-size: 20px;
            color: #666;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
          }
          
          .tm-progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 4px;
            background-color: #2980b9;
            width: 100%;
            transform-origin: left center;
            transform: scaleX(0);
          }
          
          .tm-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 30px;
          }
          
          .tm-loading-text {
            margin-top: 15px;
            font-size: 16px;
          }
          
          .tm-spinner {
            display: inline-block;
            position: relative;
            width: 40px;
            height: 40px;
          }
          
          .tm-spinner div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 32px;
            height: 32px;
            margin: 4px;
            border: 4px solid currentColor;
            border-radius: 50%;
            animation: tm-spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: currentColor transparent transparent transparent;
          }
          
          .tm-spinner div:nth-child(1) {
            animation-delay: -0.45s;
          }
          
          .tm-spinner div:nth-child(2) {
            animation-delay: -0.3s;
          }
          
          .tm-spinner div:nth-child(3) {
            animation-delay: -0.15s;
          }
          
          @keyframes tm-spinner {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* Animation: Tilt */
          .tm-animation-tilt-in {
            animation: tm-tilt-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          }
          
          .tm-animation-tilt-out {
            animation: tm-tilt-out 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          }
          
          @keyframes tm-tilt-in {
            0% { transform: translateY(-50px) rotate(-8deg); opacity: 0; }
            100% { transform: translateY(0) rotate(0); opacity: 1; }
          }
          
          @keyframes tm-tilt-out {
            0% { transform: translateY(0) rotate(0); opacity: 1; }
            100% { transform: translateY(-50px) rotate(-8deg); opacity: 0; }
          }
          
          /* Animation: Fade */
          .tm-animation-fade-in {
            animation: tm-fade-in 0.3s ease-in both;
          }
          
          .tm-animation-fade-out {
            animation: tm-fade-out 0.3s ease-out both;
          }
          
          @keyframes tm-fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          
          @keyframes tm-fade-out {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
          
          /* Animation: ShakeY */
          .tm-animation-shake-y {
            animation: tm-shake-y 0.5s cubic-bezier(.36,.07,.19,.97) both;
          }
          
          @keyframes tm-shake-y {
            0%, 100% { transform: translateY(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateY(-10px); }
            20%, 40%, 60%, 80% { transform: translateY(10px); }
          }
          
          /* Animation: ShakeX */
          .tm-animation-shake-x {
            animation: tm-shake-x 0.5s cubic-bezier(.36,.07,.19,.97) both;
          }
          
          @keyframes tm-shake-x {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }
        `;
        
        document.head.appendChild(style);
      }
  
      /**
       * Create and show a modal
       * 
       * @param {Object} options - Modal options
       * @returns {Promise} - Promise that resolves when modal is closed
       */
      fire(options = {}) {
        return new Promise((resolve) => {
          // Close any existing modal
          if (this.currentModal) {
            this._close();
          }
          
          // Merge options
          const modalOptions = this._mergeOptions(this.options, options);
          
          // Create modal elements
          const modal = this._createModal(modalOptions);
          document.body.appendChild(modal.backdrop);
          
          // Set up event listeners
          this._setupEvents(modal, modalOptions, resolve);
          
          // Handle auto-close timer
          if (modalOptions.timeout && typeof modalOptions.timeout === 'number') {
            this._setupTimer(modal, modalOptions.timeout, resolve);
          }
          
          // Store current modal
          this.currentModal = modal;
          
          // Apply animation
          this._applyAnimation(modal.modal, modalOptions.animation, 'in');
        });
      }
  
      /**
       * Create modal elements
       * 
       * @param {Object} options - Modal options
       * @returns {Object} - Modal elements
       */
      _createModal(options) {
        // Create backdrop
        const backdrop = document.createElement('div');
        backdrop.className = `tm-backdrop ${options.classes.backdrop || ''}`;
        
        if (options.backdrop) {
          backdrop.style.backgroundColor = options.backdrop;
        }
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = `tm-modal ${options.classes.modal || ''} ${options.darkMode ? 'tm-dark-mode' : ''}`;
        
        // Set size
        const size = SIZES[options.size] || options.size;
        modal.style.width = size;
        
        // Set position
        const position = POSITIONS[options.position] || POSITIONS.center;
        for (const prop in position) {
          modal.style[prop] = position[prop];
        }
        
        // Add content to modal
        modal.innerHTML = this._getModalContent(options);
        
        // Append modal to backdrop
        backdrop.appendChild(modal);
        
        return { backdrop, modal };
      }
  
      /**
       * Generate modal content HTML
       * 
       * @param {Object} options - Modal options
       * @returns {String} - Modal content HTML
       */
      _getModalContent(options) {
        let html = '';
        
        // Add progress bar
        if (options.progress) {
          html += `<div class="tm-progress ${options.classes.progress || ''}"></div>`;
        }
        
        // Add close button
        if (options.closeButton) {
          html += `<button class="tm-close-button ${options.classes.closeButton || ''}">&times;</button>`;
        }
        
        // If loading is active, show loading content
        if (this.isLoading) {
          html += `
            <div class="tm-loading ${options.classes.loading || ''}">
              ${ICONS.loading}
              <div class="tm-loading-text ${options.classes.loadingText || ''}">${typeof options.loadingText === 'string' ? options.loadingText : 'Please wait...'}</div>
            </div>
          `;
          return html;
        }
        
        // Add icon
        if (options.icon) {
          html += `
            <div class="tm-icon-container ${options.classes.icon || ''}">
              <div style="color: ${options.iconColor}">
                ${this._getIcon(options.icon)}
              </div>
            </div>
          `;
        }
        
        // Add content
        if (options.title || options.content) {
          html += `<div class="tm-content ${options.classes.content || ''}">`;
          
          if (options.title) {
            html += `<div class="tm-title ${options.classes.contentTitle || ''}">${options.title}</div>`;
          }
          
          if (options.content) {
            html += `<div class="tm-message ${options.classes.contentText || ''}">${options.content}</div>`;
          }
          
          html += '</div>';
        }
        
        // Add buttons
        if (options.ok || options.cancel) {
          html += `<div class="tm-buttons ${options.classes.buttons || ''}">`;
          
          if (options.cancel) {
            html += `
              <button class="tm-button tm-cancel-button ${options.classes.cancel || ''}" 
                      style="color: ${options.cancelColor === 'transparent' ? '#333' : '#fff'}; background-color: ${options.cancelColor};">
                ${options.cancel}
              </button>
            `;
          }
          
          if (options.ok) {
            html += `
              <button class="tm-button tm-ok-button ${options.classes.ok || ''}" 
                      style="background-color: ${options.okColor}">
                ${options.ok}
              </button>
            `;
          }
          
          html += '</div>';
        }
        
        return html;
      }
  
      /**
       * Get icon HTML
       * 
       * @param {String} icon - Icon type or SVG string
       * @returns {String} - Icon HTML
       */
      _getIcon(icon) {
        // Check if it's a predefined icon
        if (ICONS[icon]) {
          return ICONS[icon];
        }
        
        // Check if it's an SVG string
        if (icon.trim().startsWith('<svg')) {
          return icon;
        }
        
        // Check if it's an image URL
        if (icon.match(/\.(jpeg|jpg|gif|png|svg)$/) || icon.startsWith('data:image')) {
          return `<img src="${icon}" alt="Icon" style="max-width: 80px; max-height: 80px;">`;
        }
        
        // Default to info icon
        return ICONS.info;
      }
  
      /**
       * Set up event listeners for modal
       * 
       * @param {Object} modal - Modal elements
       * @param {Object} options - Modal options
       * @param {Function} resolve - Promise resolve function
       */
      _setupEvents(modal, options, resolve) {
        // Close button click
        if (options.closeButton) {
          const closeButton = modal.modal.querySelector('.tm-close-button');
          if (closeButton) {
            closeButton.addEventListener('click', () => {
              this._close();
              resolve({ close: true });
            });
          }
        }
        
        // Backdrop click
        if (options.backdropClose && options.backdrop) {
          modal.backdrop.addEventListener('click', (e) => {
            if (e.target === modal.backdrop) {
              this._close();
              resolve({ close: true });
            }
          });
        }
        
        // Body click
        if (options.bodyClose) {
          modal.modal.addEventListener('click', () => {
            this._close();
            resolve({ close: true });
          });
        }
        
        // ESC key press
        if (options.escClose) {
          const escHandler = (e) => {
            if (e.key === 'Escape') {
              this._close();
              resolve({ close: true });
              document.removeEventListener('keydown', escHandler);
            }
          };
          document.addEventListener('keydown', escHandler);
        }
        
        // Enter key press
        if (options.enterOk) {
          const enterHandler = (e) => {
            if (e.key === 'Enter') {
              this._close();
              resolve({ ok: true });
              document.removeEventListener('keydown', enterHandler);
            }
          };
          document.addEventListener('keydown', enterHandler);
        }
        
        // OK button click
        const okButton = modal.modal.querySelector('.tm-ok-button');
        if (okButton) {
          okButton.addEventListener('click', () => {
            this._close();
            resolve({ ok: true });
          });
        }
        
        // Cancel button click
        const cancelButton = modal.modal.querySelector('.tm-cancel-button');
        if (cancelButton) {
          cancelButton.addEventListener('click', () => {
            this._close();
            resolve({ cancel: true });
          });
        }
      }
  
      /**
       * Set up auto-close timer and progress bar
       * 
       * @param {Object} modal - Modal elements
       * @param {Number} timeout - Timeout in milliseconds
       * @param {Function} resolve - Promise resolve function
       */
      _setupTimer(modal, timeout, resolve) {
        this.timer = setTimeout(() => {
          this._close();
          resolve({ timeout: true });
        }, timeout);
        
        // Set up progress bar if enabled
        const progressBar = modal.modal.querySelector('.tm-progress');
        if (progressBar) {
          progressBar.style.transition = `transform ${timeout}ms linear`;
          
          // Use requestAnimationFrame to ensure the initial state is rendered
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              progressBar.style.transform = 'scaleX(1)';
            });
          });
        }
      }
  
      /**
       * Apply animation to modal
       * 
       * @param {HTMLElement} element - Element to animate
       * @param {String} animationName - Animation name
       * @param {String} direction - Animation direction ('in' or 'out')
       */
      _applyAnimation(element, animationName, direction) {
        if (!animationName) return;
        
        const animation = ANIMATIONS[animationName] || ANIMATIONS.tilt;
        element.classList.add(animation[direction]);
        
        element.addEventListener('animationend', () => {
          element.classList.remove(animation[direction]);
        }, { once: true });
      }
  
      /**
       * Close the current modal
       */
      _close() {
        if (!this.currentModal) return;
        
        const { backdrop, modal } = this.currentModal;
        
        // Clear timers
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        
        if (this.progressTimer) {
          clearTimeout(this.progressTimer);
          this.progressTimer = null;
        }
        
        // Apply exit animation
        const animationName = this.options.animation;
        if (animationName) {
          this._applyAnimation(modal, animationName, 'out');
          
          modal.addEventListener('animationend', () => {
            document.body.removeChild(backdrop);
          }, { once: true });
        } else {
          document.body.removeChild(backdrop);
        }
        
        this.currentModal = null;
        this.isLoading = false;
      }
  
      /**
       * Show or hide loading indicator
       * 
       * @param {Boolean|String} state - Loading state or loading text
       * @returns {ToastMaster} - ToastMaster instance for chaining
       */
      loading(state = true) {
        this.isLoading = state !== false && state !== null && state !== 0;
        let loadingText = 'Please wait...';
        
        if (typeof state === 'string') {
          loadingText = state;
        }
        
        if (this.isLoading) {
          return this.fire({ 
            title: false,
            content: false,
            icon: false,
            ok: false, 
            cancel: false,
            closeButton: false,
            loadingText: loadingText
          });
        } else if (this.currentModal) {
          this._close();
        }
        
        return this;
      }
  
      /**
       * Show success modal
       * 
       * @param {String} title - Modal title
       * @param {Number|Boolean} timeout - Auto-close timeout
       * @returns {Promise} - Promise that resolves when modal is closed
       */
      success(title = '', timeout = 4000) {
        return this.fire({
          title: title,
          icon: 'success',
          iconColor: '#28a745',
          ok: false,
          cancel: false,
          timeout: timeout,
          progress: timeout !== false
        });
      }
  
      /**
       * Show error modal
       * 
       * @param {String} title - Modal title
       * @param {String} content - Modal content
       * @returns {Promise} - Promise that resolves when modal is closed
       */
      error(title = '', content = '') {
        return this.fire({
          title: title,
          content: content,
          icon: 'error',
          iconColor: '#dc3545',
          ok: 'OK',
          okColor: '#dc3545',
          cancel: false
        });
      }
  
      /**
       * Show warning modal
       * 
       * @param {String} title - Modal title
       * @param {String} content - Modal content
       * @returns {Promise} - Promise that resolves when modal is closed
       */
      warn(title = '', content = '') {
        return this.fire({
          title: title,
          content: content,
          icon: 'warning',
          iconColor: '#ffc107',
          ok: 'OK',
          okColor: '#ffc107',
          cancel: false
        });
      }
  
      /**
       * Show info modal
       * 
       * @param {String} title - Modal title
       * @param {String} content - Modal content
       * @returns {Promise} - Promise that resolves when modal is closed
       */
      info(title = '', content = '') {
        return this.fire({
          title: title,
          content: content,
          icon: 'info',
          iconColor: '#17a2b8',
          ok: 'OK',
          okColor: '#17a2b8',
          cancel: false
        });
      }
  
      /**
       * Show question modal
       * 
       * @param {String} title - Modal title
       * @param {String} content - Modal content
       * @returns {Promise} - Promise that resolves when modal is closed
       */
      ask(title = '', content = '') {
        return this.fire({
          title: title,
          content: content,
          icon: 'question',
          iconColor: '#6c757d',
          ok: 'Yes',
          okColor: '#28a745',
          cancel: 'No'
        });
      }
  
      /**
       * Show notification
       * 
       * @param {String} title - Notification title
       * @param {String} content - Notification content
       * @returns {Promise} - Promise that resolves when notification is closed
       */
      notify(title = '', content = '') {
        return this.fire({
          title: title,
          content: content,
          icon: 'info',
          iconColor: '#17a2b8',
          position: 'top-right',
          ok: false,
          cancel: false,
          timeout: 5000,
          progress: true
        });
      }
  
      /**
       * Create a new instance with predefined options
       * 
       * @param {Object} options - Predefined options
       * @returns {ToastMaster} - New ToastMaster instance
       */
      mixin(options = {}) {
        return new ToastMaster(options);
      }
    }
  
    // Create default instance
    const instance = new ToastMaster();
    
    // Add static methods
    const staticMethods = [
      'fire', 'success', 'error', 'warn', 'info', 'ask', 'notify', 'loading', 'mixin'
    ];
    
    staticMethods.forEach(method => {
      ToastMaster[method] = (...args) => instance[method](...args);
    });
    
    return ToastMaster;
  });