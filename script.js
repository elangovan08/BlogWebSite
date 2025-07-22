/**
 * Optimized Blog JavaScript - Enhanced Performance & Error Handling
 * Features: Cached DOM queries, error handling, modern ES6+ syntax
 */

class BlogManager {
    constructor() {
        this.cache = new Map();
        this.init();
    }

    // Efficient DOM caching system
    getElement(id) {
        if (!this.cache.has(id)) {
            const element = document.getElementById(id);
            if (element) {
                this.cache.set(id, element);
            }
        }
        return this.cache.get(id) || null;
    }

    // Safe event listener attachment
    attachEventListener(elementId, event, callback) {
        const element = this.getElement(elementId);
        if (element) {
            element.addEventListener(event, callback);
            return true;
        }
        console.warn(`Element with ID '${elementId}' not found`);
        return false;
    }

    // Optimized theme toggle with localStorage persistence
    initThemeToggle() {
        const themeToggle = this.getElement("toggle-theme");
        if (!themeToggle) return;

        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = 'Light Mode';
        }

        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isDarkMode = document.body.classList.toggle('dark-mode');
            themeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
            
            // Persist theme preference
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }

    // Enhanced comment system with validation and sanitization
    initCommentSystem() {
        const addCommentBtn = document.querySelector('[onclick="addComment()"]');
        if (addCommentBtn) {
            // Remove inline onclick and use proper event listener
            addCommentBtn.removeAttribute('onclick');
            addCommentBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addComment();
            });
        }
    }

    addComment() {
        const commentInput = this.getElement("comment-input");
        const commentsList = this.getElement("comments-list");
        
        if (!commentInput || !commentsList) {
            console.error('Comment elements not found');
            return;
        }

        const commentText = commentInput.value.trim();
        
        // Enhanced validation
        if (!commentText) {
            this.showMessage("Please enter a comment.", 'warning');
            commentInput.focus();
            return;
        }

        if (commentText.length < 3) {
            this.showMessage("Comment must be at least 3 characters long.", 'warning');
            commentInput.focus();
            return;
        }

        if (commentText.length > 500) {
            this.showMessage("Comment must be less than 500 characters.", 'warning');
            commentInput.focus();
            return;
        }

        // Create comment element with better structure
        const commentWrapper = document.createElement("div");
        commentWrapper.className = "comment-item mb-2 p-2 border rounded";
        
        const commentElement = document.createElement("p");
        commentElement.className = "mb-1";
        // Sanitize input to prevent XSS
        commentElement.textContent = commentText;
        
        const timestamp = document.createElement("small");
        timestamp.className = "text-muted";
        timestamp.textContent = `Posted on ${new Date().toLocaleString()}`;
        
        commentWrapper.appendChild(commentElement);
        commentWrapper.appendChild(timestamp);
        commentsList.appendChild(commentWrapper);
        
        // Clear input and show success message
        commentInput.value = "";
        this.showMessage("Comment added successfully!", 'success');
        
        // Smooth scroll to new comment
        commentWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Enhanced form validation with better UX
    initContactForm() {
        const contactForm = this.getElement("contact-form");
        if (!contactForm) return;

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const formData = {
                name: this.getElement("name")?.value.trim() || '',
                email: this.getElement("email")?.value.trim() || '',
                message: this.getElement("message")?.value.trim() || ''
            };

            // Comprehensive validation
            const validation = this.validateContactForm(formData);
            
            if (!validation.isValid) {
                this.showMessage(validation.message, 'error');
                // Focus on first invalid field
                const firstInvalidField = this.getElement(validation.field);
                if (firstInvalidField) {
                    firstInvalidField.focus();
                    firstInvalidField.classList.add('is-invalid');
                    setTimeout(() => firstInvalidField.classList.remove('is-invalid'), 3000);
                }
                return;
            }

            // Simulate form submission
            this.submitContactForm(formData, contactForm);
        });

        // Real-time validation feedback
        ['name', 'email', 'message'].forEach(fieldId => {
            const field = this.getElement(fieldId);
            if (field) {
                field.addEventListener('blur', () => this.validateField(fieldId, field.value.trim()));
                field.addEventListener('input', () => field.classList.remove('is-invalid', 'is-valid'));
            }
        });
    }

    validateContactForm(data) {
        if (!data.name) {
            return { isValid: false, message: "Name is required!", field: "name" };
        }
        if (data.name.length < 2) {
            return { isValid: false, message: "Name must be at least 2 characters long!", field: "name" };
        }
        if (!data.email) {
            return { isValid: false, message: "Email is required!", field: "email" };
        }
        if (!this.isValidEmail(data.email)) {
            return { isValid: false, message: "Please enter a valid email address!", field: "email" };
        }
        if (!data.message) {
            return { isValid: false, message: "Message is required!", field: "message" };
        }
        if (data.message.length < 10) {
            return { isValid: false, message: "Message must be at least 10 characters long!", field: "message" };
        }
        
        return { isValid: true };
    }

    validateField(fieldId, value) {
        const field = this.getElement(fieldId);
        if (!field) return;

        let isValid = true;
        
        switch(fieldId) {
            case 'name':
                isValid = value.length >= 2;
                break;
            case 'email':
                isValid = this.isValidEmail(value);
                break;
            case 'message':
                isValid = value.length >= 10;
                break;
        }
        
        field.classList.toggle('is-valid', isValid && value.length > 0);
        field.classList.toggle('is-invalid', !isValid && value.length > 0);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async submitContactForm(formData, form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn?.textContent;
        
        try {
            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.showMessage("Thank you for your message! We'll get back to you soon.", 'success');
            form.reset();
            
            // Clear validation classes
            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
            
        } catch (error) {
            this.showMessage("Sorry, there was an error sending your message. Please try again.", 'error');
            console.error('Form submission error:', error);
        } finally {
            // Restore button state
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    }

    // Enhanced message system with auto-dismiss
    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.blog-message');
        existingMessages.forEach(msg => msg.remove());

        const messageEl = document.createElement('div');
        messageEl.className = `blog-message alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        messageEl.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        
        messageEl.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        document.body.appendChild(messageEl);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.classList.remove('show');
                setTimeout(() => messageEl.remove(), 150);
            }
        }, 5000);
    }

    // Initialize all functionality
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupComponents());
        } else {
            this.setupComponents();
        }
    }

    setupComponents() {
        this.initThemeToggle();
        this.initCommentSystem();
        this.initContactForm();
        
        // Initialize smooth scrolling for anchor links
        this.initSmoothScrolling();
        
        console.log('Blog Manager initialized successfully');
    }

    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize the blog manager
const blogManager = new BlogManager();

// Legacy function support for existing HTML
window.addComment = () => blogManager.addComment();
