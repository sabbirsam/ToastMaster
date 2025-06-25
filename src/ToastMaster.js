/**
 * ToastMaster.js - A lightweight, customizable modal, pricing, tags and toast notification library
 * 
 * @version 2.0.0
 * @author SabbirSam
 * @license MIT
 */

// Immediately Invoked Function Expression (IIFE) to avoid polluting the global scope
(function() {
  'use strict';

  // Default options for the library
  const DEFAULT_OPTIONS = {
    // Basic content
    title: false,         // Modal title
    content: false,       // Modal content/message
    
    // Buttons
    ok: 'OK',             // OK button text
    okColor: '#2980b9',   // OK button color
    cancel: 'Cancel',     // Cancel button text
    cancelColor: 'transparent', // Cancel button color
    
    // Appearance
    icon: 'success',      // Icon type
    iconColor: '#2980b9', // Icon color
    backdrop: 'rgba(0, 0, 0, 0.7)', // Backdrop color
    size: 'sm',           // Modal size
    position: 'center',   // Modal position
    animation: 'fadeIn',  // Animation type
    darkMode: false,      // Dark mode toggle
    
    // Behavior
    backdropClose: true,  // Close on backdrop click
    enterOk: false,       // Submit on Enter key
    escClose: true,       // Close on Escape key
    bodyClose: false,     // Close on modal body click
    closeButton: true,    // Show close button
    timeout: false,       // Auto-close timeout
    progress: false,      // Show progress bar
    
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
      this.currentModal = null;  // Tracks currently open modal
      this.timer = null; // Timeout timer
      this.progressTimer = null; // Progress bar timer
      this.isLoading = false; // Loading state
      this._injectStyles();  // Inject CSS
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

      // Pricing modal styles
      style.textContent += `
        /* Pricing Modal Styles */
        .tm-pricing-modal {
          max-width: 900px !important;
        }
        
        .tm-price-modal-container {
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        .tm-price-modal-header {
          text-align: center;
          padding: 0 15px 15px;
          position: relative;
        }
        
        .tm-price-modal-header h2 {
          margin: 0 0 10px;
          font-size: 24px;
          font-weight: 700;
        }
        
        .tm-price-modal-header p {
          margin: 0;
          color: #6c757d;
        }
        
        .tm-price-modal-toggle {
          display: flex;
          justify-content: center;
          background-color: #f8f9fa;
          border-radius: 30px;
          padding: 5px;
          margin: 15px auto;
          max-width: 300px;
        }
        
        .tm-price-modal-toggle button {
          flex: 1;
          border: none;
          padding: 8px 16px;
          border-radius: 30px;
          background: transparent;
          cursor: pointer;
          position: relative;
          font-weight: 500;
          transition: all 0.2s;
          color: #171717;
        }
        
        .tm-price-modal-toggle button.active {
          background-color: #fff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .tm-price-modal-save {
          position: absolute;
          top: -12px;
          right: -10px;
          background-color: #28a745;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: bold;
        }
        
        .tm-price-modal-plans {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          margin: 20px 0;
        }
        
        .tm-price-modal-plan {
          flex: 1;
          min-width: 220px;
          max-width: 280px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          padding: 20px;
          position: relative;
          transition: transform 0.3s;
        }
        
        .tm-price-modal-plan:hover {
          transform: translateY(-5px);
        }
        
        .tm-price-modal-plan.recommended {
          transform: scale(1.05);
          border: 2px solid #007bff;
        }
        
        .tm-price-modal-plan.recommended:hover {
          transform: scale(1.05) translateY(-5px);
        }
        
        .tm-price-modal-recommended {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #007bff;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
        }
        
        .tm-price-modal-tag {
          position: absolute;
          top: 20px;
          right: -8px;
          padding: 4px 12px;
          color: white;
          font-size: 12px;
          font-weight: bold;
          border-radius: 4px 0 0 4px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .tm-price-modal-tag:after {
          content: '';
          position: absolute;
          right: 0;
          bottom: -8px;
          border-top: 8px solid;
          border-right: 8px solid transparent;
          filter: brightness(70%);
        }
        
        .tm-price-modal-plan h3 {
          text-align: center;
          margin: 0 0 15px;
          font-size: 20px;
          font-weight: 700;
        }
        
        .tm-price-modal-price {
          text-align: center;
          margin-bottom: 20px;
          position: relative;
          padding: 10px 0;
        }
        
        .tm-price-modal-original {
          color: #dc3545;
          text-decoration: line-through;
          font-size: 14px;
          opacity: 0.7;
        }
        
        .tm-price-modal-discount {
          position: absolute;
          top: 0;
          right: 30px;
          background-color: #28a745;
          color: white;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: bold;
        }
        
        .tm-price-modal-current {
          font-size: 28px;
          font-weight: 700;
          color: #333;
        }
        
        .tm-price-modal-period {
          color: #6c757d;
          font-size: 14px;
        }
        
        .tm-price-modal-features {
          list-style: none;
          padding: 0;
          margin: 0 0 20px;
        }
        
        .tm-price-modal-features li {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          color: #333;
        }
        
        .tm-price-modal-features svg {
          color: #28a745;
          margin-right: 10px;
          flex-shrink: 0;
        }
        
        .tm-price-modal-select {
          width: 100%;
          padding: 10px 16px;
          border: none;
          border-radius: 6px;
          background-color: #007bff;
          color: white;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background-color 0.2s;
        }
        
        .tm-price-modal-select:hover {
          background-color: #0069d9;
        }
        
        .tm-price-modal-guarantee {
          display: flex;
          align-items: center;
          max-width: 500px;
          margin: 20px auto;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 10px;
        }
        
        .tm-price-modal-guarantee-badge {
          background-color: #28a745;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          margin-right: 15px;
          flex-shrink: 0;
        }
        
        .tm-price-modal-guarantee-text h4 {
          margin: 0 0 5px;
          font-size: 16px;
          font-weight: 600;
        }
        
        .tm-price-modal-guarantee-text p {
          margin: 0;
          color: #6c757d;
          font-size: 14px;
        }
        
        @media (max-width: 768px) {
          .tm-price-modal-plans {
            flex-direction: column;
            align-items: center;
          }
          
          .tm-price-modal-plan {
            width: 100%;
            max-width: 320px;
          }
          
          .tm-price-modal-plan.recommended {
            order: -1;
          }
        }
      `;

       // Tag styles
      style.textContent += `
        /* Tag Styles */
        .tm-tag {
          display: inline-block;
          padding: 2px 6px;
          margin: 0 5px;
          border-radius: 3px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          vertical-align: middle;
          white-space: nowrap;
          line-height: 1.4;
          user-select: none;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        /* Some predefined tag styles */
        .tm-tag-pro {
          background-color: #ff6b6b;
          color: white;
        }

        .tm-tag-new {
          background-color: #4ecdc4;
          color: white;
        }

        .tm-tag-upcoming {
          background-color: #a66efa;
          color: white;
        }

        .tm-tag-beta {
          background-color: #f39c12;
          color: white;
        }

        .tm-tag-hot {
          background-color: #e74c3c;
          color: white;
        }

        .tm-tag-sale {
          background-color: #3498db;
          color: white;
        }

        .tm-tag-free {
          background-color: #2ecc71;
          color: white;
        }
      `;
      
      document.head.appendChild(style);
    }

    /**
     * Create and show a modal- The main method for creating and showing a modal
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
        
        // Store current modal
        this.currentModal = modal;
        
        // Apply animation
        this._applyAnimation(modal.modal, modalOptions.animation, 'in');
        
        // Special handling for pricing modal
        if (modalOptions.isPricingModal) {
          this._setupPricingEvents(modal.modal, modalOptions, resolve);
        } else {
          // Standard event setup for regular modals
          this._setupEvents(modal, modalOptions, resolve);
        }
        
        // Handle auto-close timer
        if (modalOptions.timeout && typeof modalOptions.timeout === 'number') {
          this._setupTimer(modal, modalOptions.timeout, resolve);
        }
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
     * Set up pricing modal event handlers - FIXED VERSION
     * 
     * @param {HTMLElement} modalElement - Modal element
     * @param {Object} options - Pricing options
     * @param {Function} resolve - Promise resolve function
     */
    _setupPricingEvents(modalElement, options, resolve) {
      console.log("Setting up pricing events", options);

      if (options.closeButton) {
        const closeButton = modalElement.querySelector('.tm-close-button');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            this._close();
            resolve({ close: true });
          });
        }
      }
      
      // Backdrop click
      if (options.backdropClose && options.backdrop && modalElement.parentElement) {
        modalElement.parentElement.addEventListener('click', (e) => {
          if (e.target === modalElement.parentElement) {
            this._close();
            resolve({ close: true });
          }
        });
      }

      // Body click
      if (options.bodyClose) {
        modalElement.addEventListener('click', () => {
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
      
      // Get the toggle buttons
      const toggleButtons = modalElement.querySelectorAll('.tm-price-modal-toggle button');
      
      // Define a function that updates prices based on selected toggle
      const updatePrices = (selectedToggle) => {
        console.log("Updating prices for toggle:", selectedToggle);
        
        // Make sure we have plans data
        if (!options.plans || !Array.isArray(options.plans)) {
          console.error("Plans data is missing or invalid");
          return;
        }
        
        options.plans.forEach(plan => {
          // Make sure we have prices for this toggle option
          const prices = plan.prices?.[selectedToggle];
          if (!prices) {
            console.error(`No prices found for plan ${plan.name} with toggle ${selectedToggle}`);
            return;
          }
          
          // Find the plan element using the plan name
          const planElement = modalElement.querySelector(`.tm-price-modal-plan[data-plan="${plan.name}"]`);
          if (!planElement) {
            console.error(`Plan element not found for ${plan.name}`);
            return;
          }
          
          // Now update the pricing elements
          const originalPrice = planElement.querySelector('.tm-price-modal-original');
          const discountEl = planElement.querySelector('.tm-price-modal-discount');
          const currentPrice = planElement.querySelector('.tm-price-modal-current');
          const periodEl = planElement.querySelector('.tm-price-modal-period');
          
          // Calculate discount if applicable
          const discount = prices.original && prices.current && prices.original !== prices.current ? 
            Math.round((1 - prices.current / prices.original) * 100) : 0;
          
          // Update original price display
          if (originalPrice) {
            if (discount > 0) {
              originalPrice.textContent = `$${prices.original.toFixed(2)}`;
              originalPrice.style.display = 'block';
            } else {
              originalPrice.style.display = 'none';
            }
          }
          
          // Update discount display
          if (discountEl) {
            if (discount > 0) {
              discountEl.textContent = `-${discount}%`;
              discountEl.style.display = 'inline-block';
            } else {
              discountEl.style.display = 'none';
            }
          }
          
          // Always update the current price and period
          if (currentPrice && prices.current) {
            currentPrice.textContent = `$${prices.current.toFixed(2)}`;
          }
          
          if (periodEl && prices.period) {
            periodEl.textContent = prices.period;
          }
        });
      };

      // Add click event to each toggle button
      toggleButtons.forEach(button => {
        console.log("Setting up toggle button:", button.textContent);
        
        button.addEventListener('click', (event) => {
          // Prevent default button behavior
          event.preventDefault();
          console.log("Toggle button clicked:", button.textContent);
          
          // Remove active class from all buttons
          toggleButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          button.classList.add('active');
          
          // Get selected toggle value
          const selectedToggle = button.getAttribute('data-toggle');
          console.log("Selected toggle:", selectedToggle);
          
          // Update all prices based on the selected toggle
          updatePrices(selectedToggle);
        });
      });
      
      // Set up "Upgrade Now" buttons
      const selectButtons = modalElement.querySelectorAll('.tm-price-modal-select');
      console.log("Found select buttons:", selectButtons.length);
      
      selectButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          console.log("Select button clicked");
          
          // Prevent default button behavior
          event.preventDefault();
          
          // Get plan name and URL from button attributes
          const planName = button.getAttribute('data-plan');
          const url = button.getAttribute('data-url');
          console.log("Plan:", planName, "URL:", url);
          
          // Get the currently active toggle
          const activeToggle = modalElement.querySelector('.tm-price-modal-toggle button.active');
          const selectedToggle = activeToggle ? activeToggle.getAttribute('data-toggle') : null;
          
          // Handle URL navigation if provided
          if (url && url !== '#') {
            console.log("Navigating to:", url);
            window.location.href = url;
          }
          
          // Find the selected plan in options
          const selectedPlan = options.plans.find(p => p.name === planName);
          
          if (selectedPlan && selectedPlan.button && 
              selectedPlan.button.callback && 
              typeof selectedPlan.button.callback === 'function') {
            console.log("Calling plan callback");
            selectedPlan.button.callback({
              plan: selectedPlan,
              toggle: selectedToggle,
              prices: selectedToggle ? selectedPlan.prices[selectedToggle] : null
            });
          }
          
          // Close the modal and resolve the promise
          this._close();
          resolve({ 
            plan: planName, 
            selectedToggle: selectedToggle
          });
        });
      });
      
      // Make sure pricing is initialized correctly with the default active toggle
      const activeToggle = modalElement.querySelector('.tm-price-modal-toggle button.active');
      if (activeToggle) {
        const selectedToggle = activeToggle.getAttribute('data-toggle');
        console.log("Initializing with active toggle:", selectedToggle);
        updatePrices(selectedToggle);
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
     * Show pricing modal
     * 
     * @param {Object} options - Pricing modal options
     * @returns {Promise} - Promise that resolves when modal is closed
     */
    price(options = {}) {
      const defaultOptions = {
        title: '🚀 Hello its a pricing modal',
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
              url: '#',
              callback: null
            },
            tag: null
          }
        ],
        guarantee: { days: 14, title: '14-Day Money-Back Guarantee', text: 'Try it risk-free.' },
        recommended: 'Pro',
        closeButton: true,
        size: 'xl',
        classes: {
          modal: '',
          toggle: '',
          plans: '',
          plan: '',
          guarantee: ''
        }
      };
      
      // Merge user options with defaults
      const config = this._mergeOptions(defaultOptions, options);
      
      // Generate HTML content for the pricing modal
      const content = this._generatePricingModalContent(config);
      
      // Return the modal using the main fire method, flagging it as a pricing modal
      return this.fire({
        content: content,
        icon: false,
        ok: false,
        cancel: false,
        backdrop: 'rgba(0, 0, 0, 0.7)',
        animation: 'fadeIn',
        size: config.size,
        closeButton: config.closeButton,
        classes: {
          modal: `tm-pricing-modal ${config.classes.modal || ''}`,
          content: 'tm-pricing-content'
        },
        isPricingModal: true, // Flag to identify this as a pricing modal
        plans: config.plans, // Pass the plans to the modal
        toggles: config.toggles // Pass the toggles to the modal
      });
    }

    /**
     * Generate HTML content for pricing modal
     * 
     * @param {Object} config - Pricing configuration
     * @returns {String} - HTML content
     */
    _generatePricingModalContent(config) {
      let html = `
        <div class="tm-price-modal-container">
          <div class="tm-price-modal-header">
            <h2>${config.title}</h2>
            ${config.subtitle ? `<p>${config.subtitle}</p>` : ''}
          </div>
      `;


      // Add toggle options if provided
      if (config.toggles && config.toggles.options.length > 1) {
        html += `<div class="tm-price-modal-toggle ${config.classes.toggle || ''}">`;
        config.toggles.options.forEach(toggle => {
          const isActive = toggle === config.toggles.active;
          const savings = config.toggles.savings?.[toggle] || '';
          html += `
            <button class="${isActive ? 'active' : ''}" data-toggle="${toggle}">
              ${toggle}${savings ? `<span class="tm-price-modal-save">${savings}</span>` : ''}
            </button>
          `;
        });
        html += `</div>`;
      }
      
      // Add pricing plans
      html += `<div class="tm-price-modal-plans ${config.classes.plans || ''}">`;
      
      config.plans.forEach(plan => {
      const isRecommended = plan.name === config.recommended;
      const prices = plan.prices[config.toggles.active] || {};
      const discount = prices.original !== prices.current ? 
      Math.round((1 - prices.current / prices.original) * 100) : 0;
      
        html += `
          <div class="tm-price-modal-plan ${config.classes.plan || ''} ${isRecommended ? 'recommended' : ''}" data-plan="${plan.name}">
            ${isRecommended ? '<div class="tm-price-modal-recommended">MOST POPULAR</div>' : ''}
            ${plan.tag ? this._generateTag(plan.tag) : ''}
            <h3>${plan.name}</h3>
            <div class="tm-price-modal-price">
              ${prices.original !== prices.current ? 
                `<div class="tm-price-modal-original">$${prices.original.toFixed(2)}</div>` : ''}
              ${discount > 0 ? 
                `<div class="tm-price-modal-discount">-${discount}%</div>` : ''}
              <div class="tm-price-modal-current">$${prices.current.toFixed(2)}</div>
              <div class="tm-price-modal-period">${prices.period}</div>
            </div>
            <ul class="tm-price-modal-features">
              ${plan.features.map(feature => `
                <li>
                  <svg class="check-icon" viewBox="0 0 512 512" width="1em" height="1em">
                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                  </svg>
                  ${feature}
                </li>
              `).join('')}
            </ul>
            <button class="tm-price-modal-select" data-plan="${plan.name}" ${plan.button.url ? `data-url="${plan.button.url}"` : ''}>
              ${plan.button.text} 
              <svg class="arrow-icon" viewBox="0 0 448 512" width="1em" height="1em">
                <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
              </svg>
            </button>
          </div>
        `;
      });
      
      html += `</div>`;
      
      // Add guarantee if provided
      if (config.guarantee) {
        html += `
          <div class="tm-price-modal-guarantee ${config.classes.guarantee || ''}">
            <div class="tm-price-modal-guarantee-badge">${config.guarantee.days}</div>
            <div class="tm-price-modal-guarantee-text">
              <h4>${config.guarantee.title}</h4>
              <p>${config.guarantee.text}</p>
            </div>
          </div>
        `;
      }
      
      html += `</div>`;
      
      return html;
    }

    /**
     * Generate HTML for tags (PRO, NEW, UPCOMING)
     * 
     * @param {String|Object} tag - Tag configuration
     * @returns {String} - HTML content
     */
    _generateTag(tag) {
      let tagType, text, color;
      
      if (typeof tag === 'string') {
        tagType = tag.toLowerCase();
        text = tag.toUpperCase();
        
        // Default colors for predefined tags
        switch(tagType) {
          case 'pro':
            color = '#ff6b6b';
          case 'new':
            color = '#4ecdc4';
          case 'upcoming':
            color = '#a66efa';
          case 'beta':
            color = '#f39c12';
          case 'hot':
            color = '#e74c3c';
          case 'sale':
            color = '#3498db';
          case 'free':
            color = '#2ecc71';
          default:
            color = '#6c757d';
        }
      } else {
        tagType = tag.type || 'custom';
        text = tag.text || 'CUSTOM';
        color = tag.color || '#6c757d';
      }
      
      return `
        <div class="tm-price-modal-tag tm-tag-${tagType}" style="background-color: ${color}">
          ${text}
        </div>
      `;
    }

    /**
     * Create a tag that can be used in pricing plans or elsewhere
     * 
     * @param {String|Object} type - Tag type ('pro', 'new', 'upcoming', or custom) or tag configuration object
     * @param {String} text - Tag text (optional)
     * @param {String|Object} color - Tag color or options object (optional)
     * @returns {Object} - Tag configuration for use in price modal or elsewhere
     */
      tag(type, text = '', color = '') {
        // Handle different parameter formats
        let tagConfig = {};
        let options = {};
        
        if (typeof type === 'object') {
          // If first parameter is an object, use it as the full configuration
          tagConfig = type;
          options = text || {};
        } else {
          // Build basic tag configuration
          tagConfig = {
            type: type || 'custom',
            text: text || type.toUpperCase(),
            color: ''
          };
          
          // Handle the color/options parameter
          if (typeof color === 'object') {
            options = color;
            tagConfig.color = options.color || this._getDefaultTagColor(tagConfig.type);
          } else {
            tagConfig.color = color || this._getDefaultTagColor(tagConfig.type);
            options = {};
          }
        }
        
        // If no rendering options are provided, just return the tag config for use in price modal
        if (!options.selector && !options.target) {
          return tagConfig;
        }
        
        // Otherwise, render the tag as an HTML element
        return this._renderTag(tagConfig, options);
      }


      /**
       * Render a tag as an HTML element
       * 
       * @param {Object} tagConfig - Tag configuration
       * @param {Object} options - Rendering options
       * @returns {HTMLElement} - The created tag element
       * @private
       */
      _renderTag(tagConfig, options = {}) {
        // Default options for rendering
        const defaultOptions = {
          target: null,  // DOM element to append the tag to
          prepend: false, // Whether to prepend or append the tag
          position: 'after', // Position relative to selector: 'before', 'after', 'append', 'prepend'
          selector: null, // CSS selector to find the target element
          textColor: '#fff', // Text color
          borderRadius: '3px', // Border radius
          padding: '2px 6px', // Padding
          fontSize: '12px', // Font size
          fontWeight: 'bold', // Font weight
          margin: '0 5px', // Margin
          display: 'inline-block', // Display property
          className: '', // Additional class names
          style: {} // Additional inline styles
        };
        
        // Merge options
        const finalOptions = { ...defaultOptions, ...options };
        
        // Create the tag element
        const tagElement = document.createElement('span');
        tagElement.className = `tm-tag tm-tag-${tagConfig.type.toLowerCase()} ${finalOptions.className}`;
        tagElement.textContent = tagConfig.text;
        
        // Apply styles
        const styles = {
          backgroundColor: tagConfig.color,
          color: finalOptions.textColor,
          borderRadius: finalOptions.borderRadius,
          padding: finalOptions.padding,
          fontSize: finalOptions.fontSize, 
          fontWeight: finalOptions.fontWeight,
          margin: finalOptions.margin,
          display: finalOptions.display,
          ...finalOptions.style
        };
        
        Object.keys(styles).forEach(key => {
          if (styles[key]) {
            tagElement.style[key] = styles[key];
          }
        });
        
        // Handle rendering to DOM if requested
        if (finalOptions.selector) {
          const targetEl = document.querySelector(finalOptions.selector);
          if (targetEl) {
            if (finalOptions.position === 'before') {
              targetEl.parentNode.insertBefore(tagElement, targetEl);
            } else if (finalOptions.position === 'after') {
              if (targetEl.nextSibling) {
                targetEl.parentNode.insertBefore(tagElement, targetEl.nextSibling);
              } else {
                targetEl.parentNode.appendChild(tagElement);
              }
            } else if (finalOptions.position === 'prepend') {
              targetEl.insertBefore(tagElement, targetEl.firstChild);
            } else { // Default to append
              targetEl.appendChild(tagElement);
            }
          }
        } else if (finalOptions.target && finalOptions.target instanceof HTMLElement) {
          if (finalOptions.prepend) {
            finalOptions.target.insertBefore(tagElement, finalOptions.target.firstChild);
          } else {
            finalOptions.target.appendChild(tagElement);
          }
        }
        
        return tagElement;
      }



    /**
     * Get default color for predefined tag types
     * 
     * @param {String} type - Tag type
     * @returns {String} - Default color for the tag type
     * @private
     */
    _getDefaultTagColor(type) {
      switch(type.toLowerCase()) {
        case 'pro':
          return '#ff6b6b';
        case 'new':
          return '#4ecdc4';
        case 'upcoming':
          return '#a66efa';
        case 'beta':
          return '#f39c12';
        case 'hot':
          return '#e74c3c';
        case 'sale':
          return '#3498db';
        case 'free':
          return '#2ecc71';
        default:
          return '#6c757d';
      }
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
     * @param {Number|Object} options - Auto-close timeout or configuration object
     * @returns {Promise} - Promise that resolves when modal is closed
     */
      success(title = '', options = 4000) {
        const config = {
        title: title,
        icon: 'success',
        iconColor: '#28a745',
        ok: false,
        cancel: false,
        progress: true
        };
        
        if (typeof options === 'number' || options === false) {
        // Legacy behavior: options is just the timeout
        config.timeout = options;
        } else if (typeof options === 'object') {
        // New behavior: options is a configuration object
        Object.assign(config, options);
        }
        
        return this.fire(config);
      }


    /**
     * Show error modal
     * 
     * @param {String} title - Modal title
     * @param {String} content - Modal content
     * @returns {Promise} - Promise that resolves when modal is closed
     */
    error(title = '', content = '') {
      const config = {
          title: title,
          icon: 'error',
          iconColor: '#dc3545',
          ok: 'OK',
          okColor: '#dc3545',
          cancel: false
      };
      
      if (typeof content === 'object') {
          // content is a configuration object
          Object.assign(config, content);
      } else {
          // content is just a string
          config.content = content;
      }
      
      return this.fire(config);
    }
      

    /**
     * Show warning modal
     * 
     * @param {String} title - Modal title
     * @param {String} content - Modal content
     * @returns {Promise} - Promise that resolves when modal is closed
     */
    warn(title = '', content = '') {
      const config = {
          title: title,
          icon: 'warning',
          iconColor: '#ffc107',
          ok: 'OK',
          okColor: '#ffc107',
          cancel: false
      };
      
      if (typeof content === 'object') {
          // content is a configuration object
          Object.assign(config, content);
      } else {
          // content is just a string
          config.content = content;
      }
      
      return this.fire(config);
    }
      

    /**
     * Show info modal
     * 
     * @param {String} title - Modal title
     * @param {String} content - Modal content
     * @returns {Promise} - Promise that resolves when modal is closed
     */
    info(title = '', content = '') {
      const config = {
        title: title,
        icon: 'info',
        iconColor: '#17a2b8',
        ok: 'OK',
        okColor: '#17a2b8',
        cancel: false
      };
      
      if (typeof content === 'object') {
        // content is a configuration object
        Object.assign(config, content);
      } else {
        // content is just a string
        config.content = content;
      }
      
      return this.fire(config);
    }

    /**
     * Show question modal
     * 
     * @param {String} title - Modal title
     * @param {String} content - Modal content
     * @returns {Promise} - Promise that resolves when modal is closed
     */
    ask(title = '', content = '') {
      const config = {
        title: title,
        icon: 'question',
        iconColor: '#6c757d',
        ok: 'Yes',
        okColor: '#28a745',
        cancel: 'No'
      };
      
      if (typeof content === 'object') {
        // content is a configuration object
        Object.assign(config, content);
      } else {
        // content is just a string
        config.content = content;
      }
      
      return this.fire(config);
    }

    /**
     * Show notification
     * 
     * @param {String} title - Notification title
     * @param {String} content - Notification content
     * @returns {Promise} - Promise that resolves when notification is closed
     */
    notify(title = '', content = '') {
      const config = {
        title: title,
        icon: 'info',
        iconColor: '#17a2b8',
        position: 'top-right',
        ok: false,
        cancel: false,
        timeout: 5000,
        progress: true
      };
      
      if (typeof content === 'object') {
        // content is a configuration object
        Object.assign(config, content);
      } else {
        // content is just a string
        config.content = content;
      }
      
      return this.fire(config);
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
     'fire', 'success', 'error', 'warn', 'info', 'ask', 'notify', 'loading', 'mixin', 'price', 'tag'
  ];
  
  staticMethods.forEach(method => {
    ToastMaster[method] = (...args) => instance[method](...args);
  });
  
  // Explicitly assign to window/global object
  if (typeof window !== 'undefined') {
    window.ToastMaster = ToastMaster;
    window.Toast = ToastMaster;
  }

  // CommonJS
  if (typeof module === 'object' && module.exports) {
    module.exports = ToastMaster;
  }

  // AMD
  if (typeof define === 'function' && define.amd) {
    define(function() { return ToastMaster; });
  }

  // Auto-render tags for elements with class toast-tag-<type>
  document.addEventListener('DOMContentLoaded', function() {
    var tagClassRegex = /toast-tag-([a-zA-Z0-9_-]+)/g;
    var all = document.querySelectorAll('[class*="toast-tag-"]');
    all.forEach(function(el) {
      var matches = Array.from(el.classList).map(function(cls) {
        var m = cls.match(/^toast-tag-([a-zA-Z0-9_-]+)$/);
        return m ? m[1] : null;
      }).filter(Boolean);
      matches.forEach(function(type) {
        // Avoid duplicate tags
        if (!el.nextSibling || !el.nextSibling.classList || !el.nextSibling.classList.contains('tm-tag')) {
          window.Toast.tag(type, '', { target: el.parentNode, position: 'after', selector: null });
        }
      });
    });
  });
})();