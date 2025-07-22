/**
 * Optimized JavaScript for My Blog
 * Performance-focused, accessible, and maintainable code
 */

// Utility functions
const utils = {
    // Safe element selector
    $(selector) {
        return document.querySelector(selector);
    },
    
    // Safe multiple element selector
    $$(selector) {
        return document.querySelectorAll(selector);
    },
    
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Show notification
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    },
    
    // Validate email
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    // Sanitize input
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
};

// Theme Manager
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        this.applyTheme();
        this.bindEvents();
    }
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeIcon = utils.$('#theme-icon');
        if (themeIcon) {
            themeIcon.className = this.theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
        }
    }
    
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        
        // Smooth transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    bindEvents() {
        const themeToggle = utils.$('#theme-toggle') || utils.$('#toggle-theme');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Comment Manager
class CommentManager {
    constructor() {
        this.comments = JSON.parse(localStorage.getItem('blogComments')) || [];
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadComments();
    }
    
    addComment() {
        const commentInput = utils.$('#comment-input');
        const nameInput = utils.$('#comment-name');
        
        if (!commentInput) return;
        
        const commentText = commentInput.value.trim();
        const name = nameInput ? nameInput.value.trim() : 'Anonymous';
        
        if (!commentText) {
            utils.showNotification('Please enter a comment.', 'warning');
            return;
        }
        
        if (commentText.length < 3) {
            utils.showNotification('Comment must be at least 3 characters long.', 'warning');
            return;
        }
        
        const comment = {
            id: Date.now(),
            name: utils.sanitizeInput(name),
            text: utils.sanitizeInput(commentText),
            timestamp: new Date().toISOString(),
            approved: true
        };
        
        this.comments.push(comment);
        this.saveComments();
        this.renderComment(comment);
        
        // Clear inputs
        commentInput.value = '';
        if (nameInput) nameInput.value = '';
        
        utils.showNotification('Comment added successfully!');
    }
    
    renderComment(comment) {
        const commentsList = utils.$('#comments-list');
        if (!commentsList) return;
        
        const commentElement = document.createElement('div');
        commentElement.className = 'comment mb-3 p-3 bg-light rounded';
        commentElement.setAttribute('data-comment-id', comment.id);
        
        const date = new Date(comment.timestamp).toLocaleDateString();
        
        commentElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-start mb-2">
                <strong>${comment.name}</strong>
                <small class="text-muted">${date}</small>
            </div>
            <p class="mb-0">${comment.text}</p>
        `;
        
        commentsList.appendChild(commentElement);
    }
    
    loadComments() {
        const commentsList = utils.$('#comments-list');
        if (!commentsList) return;
        
        // Clear existing dynamic comments
        const dynamicComments = commentsList.querySelectorAll('[data-comment-id]');
        dynamicComments.forEach(comment => comment.remove());
        
        // Render stored comments
        this.comments.forEach(comment => {
            if (comment.approved) {
                this.renderComment(comment);
            }
        });
    }
    
    saveComments() {
        localStorage.setItem('blogComments', JSON.stringify(this.comments));
    }
    
    bindEvents() {
        // Handle both old onclick and modern event listeners
        const addCommentBtn = utils.$('.btn[onclick="addComment()"]') || utils.$('#add-comment-btn');
        if (addCommentBtn) {
            addCommentBtn.removeAttribute('onclick');
            addCommentBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addComment();
            });
        }
        
        // Handle Enter key in comment input
        const commentInput = utils.$('#comment-input');
        if (commentInput) {
            commentInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    this.addComment();
                }
            });
        }
    }
}

// Form Manager
class FormManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.bindContactForm();
        this.bindNewsletterForm();
    }
    
    bindContactForm() {
        const contactForm = utils.$('#contact-form') || utils.$('form[action*="contact"]');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmit(contactForm);
        });
    }
    
    bindNewsletterForm() {
        const newsletterForms = utils.$$('.newsletter-form');
        newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmit(form);
            });
        });
    }
    
    handleContactSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validation
        const errors = this.validateContactForm(data);
        if (errors.length > 0) {
            utils.showNotification(errors.join('<br>'), 'danger');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            form.reset();
            utils.showNotification('Thank you for your message! We\'ll get back to you soon.');
        }, 2000);
    }
    
    handleNewsletterSubmit(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!utils.isValidEmail(email)) {
            utils.showNotification('Please enter a valid email address.', 'warning');
            return;
        }
        
        // Check if already subscribed
        const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
        if (subscribers.includes(email)) {
            utils.showNotification('You are already subscribed to our newsletter.', 'info');
            return;
        }
        
        // Add to subscribers
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
        
        form.reset();
        utils.showNotification('Successfully subscribed to our newsletter!');
    }
    
    validateContactForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long.');
        }
        
        if (!utils.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address.');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long.');
        }
        
        return errors;
    }
}

// Main App Class
class BlogApp {
    constructor() {
        this.themeManager = new ThemeManager();
        this.commentManager = new CommentManager();
        this.formManager = new FormManager();
        this.init();
    }
    
    init() {
        this.bindGlobalEvents();
        this.improveAccessibility();
        this.createBackToTopButton();
    }
    
    bindGlobalEvents() {
        // Smooth scroll for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
        
        // Handle navbar scroll effect
        const navbar = utils.$('.navbar');
        if (navbar) {
            const throttledScroll = utils.debounce(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }, 16);
            
            window.addEventListener('scroll', throttledScroll);
        }
    }
    
    createBackToTopButton() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
        backToTop.className = 'btn btn-primary position-fixed';
        backToTop.style.cssText = 'bottom: 20px; right: 20px; z-index: 1000; border-radius: 50%; width: 50px; height: 50px; opacity: 0; visibility: hidden; transition: all 0.3s ease;';
        backToTop.setAttribute('aria-label', 'Back to top');
        
        document.body.appendChild(backToTop);
        
        const throttledScroll = utils.debounce(() => {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        }, 16);
        
        window.addEventListener('scroll', throttledScroll);
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    improveAccessibility() {
        // Add focus indicators for keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Add ARIA labels to elements that need them
        const cards = utils.$$('.card');
        cards.forEach((card, index) => {
            card.setAttribute('role', 'article');
            card.setAttribute('aria-labelledby', `card-title-${index}`);
            
            const title = card.querySelector('.card-title');
            if (title) {
                title.id = `card-title-${index}`;
            }
        });
    }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new BlogApp());
} else {
    new BlogApp();
}

// Legacy function support for existing onclick handlers
function addComment() {
    if (window.blogApp && window.blogApp.commentManager) {
        window.blogApp.commentManager.addComment();
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BlogApp, utils };
}
