// auth.js - User Authentication Management
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.init();
    }
    
    init() {
        this.checkLoginStatus();
        this.updateNavigation();
        this.bindEvents();
    }
    
    checkLoginStatus() {
        // Check if user is logged in from localStorage
        const userData = localStorage.getItem('userData');
        const loginTime = localStorage.getItem('loginTime');
        
        if (userData && loginTime) {
            // Check if login is still valid (24 hours)
            const now = Date.now();
            const loginTimestamp = parseInt(loginTime);
            const validDuration = 24 * 60 * 60 * 1000; // 24 hours
            
            if (now - loginTimestamp < validDuration) {
                this.currentUser = JSON.parse(userData);
                this.isLoggedIn = true;
            } else {
                // Session expired
                this.logout();
            }
        }
    }
    
    login(userData) {
        this.currentUser = userData;
        this.isLoggedIn = true;
        
        // Store user data and login time
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('loginTime', Date.now().toString());
        
        this.updateNavigation();
        this.showNotification('Login successful!', 'success');
        
        // Redirect to dashboard after successful login
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }
    
    logout() {
        console.log('Logging out...');
        this.currentUser = null;
        this.isLoggedIn = false;
        
        // Clear stored data
        localStorage.removeItem('userData');
        localStorage.removeItem('loginTime');
        
        // Force update navigation
        this.updateNavigation();
        this.showNotification('Logged out successfully!', 'success');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
    
    updateNavigation() {
        console.log('Updating navigation...');
        console.log('Is logged in:', this.isLoggedIn);
        console.log('Current user:', this.currentUser);
        
        // Ensure header-right exists on all pages
        this.ensureHeaderRight();
        
        // Remove existing auth buttons and user menu
        this.removeExistingAuthElements();
        
        if (this.isLoggedIn) {
            console.log('User is logged in, showing user menu...');
            // User is logged in - show user menu and hide auth buttons
            this.createUserMenu();
            this.hideAuthButtons();
        } else {
            console.log('User is not logged in, showing auth buttons...');
            // User is not logged in - show auth buttons and hide user menu
            this.showAuthButtons();
            this.hideUserMenu();
        }
    }
    
    ensureHeaderRight() {
        const header = document.querySelector('header');
        if (!header) return;
        
        // Check if header-right already exists
        let headerRight = header.querySelector('.header-right');
        
        if (!headerRight) {
            // Create header-right div
            headerRight = document.createElement('div');
            headerRight.className = 'header-right';
            
            // Move theme toggle to header-right if it exists
            const themeToggle = header.querySelector('.theme-toggle');
            if (themeToggle) {
                headerRight.appendChild(themeToggle);
            }
            
            header.appendChild(headerRight);
        }
    }
    
    removeExistingAuthElements() {
        // Remove existing auth buttons
        const existingAuthButtons = document.querySelectorAll('.auth-buttons');
        existingAuthButtons.forEach(btn => btn.remove());
        
        // Remove existing user menu
        const existingUserMenu = document.querySelectorAll('.user-menu');
        existingUserMenu.forEach(menu => menu.remove());
    }
    
    createUserMenu() {
        const headerRight = document.querySelector('.header-right');
        if (!headerRight) return;
        
        // Create user menu
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <div class="user-menu-trigger">
                <span class="user-avatar">👤</span>
                <span class="user-name">${this.currentUser?.name || 'User'}</span>
                <span class="dropdown-arrow">▼</span>
            </div>
            <div class="user-menu-dropdown">
                <a href="dashboard.html" class="menu-item">
                    <span class="menu-icon">📊</span>
                    Dashboard
                </a>
                <a href="profile.html" class="menu-item">
                    <span class="menu-icon">👤</span>
                    Profile
                </a>
                <a href="messages.html" class="menu-item">
                    <span class="menu-icon">💬</span>
                    Messages
                </a>
                <a href="list-item.html" class="menu-item">
                    <span class="menu-icon">➕</span>
                    List Item
                </a>
                <div class="menu-divider"></div>
                <button class="menu-item logout-btn" onclick="authManager.logout()">
                    <span class="menu-icon">🚪</span>
                    Logout
                </button>
            </div>
        `;
        
        headerRight.appendChild(userMenu);
        
        // Add click event for user menu toggle
        const trigger = userMenu.querySelector('.user-menu-trigger');
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenu.contains(e.target)) {
                userMenu.classList.remove('active');
            }
        });
    }
    
    hideAuthButtons() {
        const authButtons = document.querySelectorAll('.auth-buttons');
        authButtons.forEach(btn => {
            btn.style.display = 'none';
        });
    }
    
    showAuthButtons() {
        const headerRight = document.querySelector('.header-right');
        if (!headerRight) {
            console.error('Header right not found');
            return;
        }
        
        console.log('Showing auth buttons...');
        
        // Check if auth buttons already exist
        let authButtons = headerRight.querySelector('.auth-buttons');
        
        if (!authButtons) {
            console.log('Creating new auth buttons...');
            // Create auth buttons as simple navigation links
            authButtons = document.createElement('div');
            authButtons.className = 'auth-buttons';
            authButtons.innerHTML = `
                <a href="login.html" class="auth-btn login-btn">Login</a>
                <a href="register.html" class="auth-btn signup-btn">Sign Up</a>
            `;
            
            // Insert before theme toggle
            const themeToggle = headerRight.querySelector('.theme-toggle');
            if (themeToggle) {
                headerRight.insertBefore(authButtons, themeToggle);
            } else {
                headerRight.appendChild(authButtons);
            }
        }
        
        authButtons.style.display = 'flex';
        console.log('Auth buttons should be visible now');
    }
    
    hideUserMenu() {
        const userMenu = document.querySelectorAll('.user-menu');
        userMenu.forEach(menu => {
            menu.style.display = 'none';
        });
    }
    
    requireAuth() {
        if (!this.isLoggedIn) {
            this.showNotification('Please login to access this page', 'error');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
            return false;
        }
        return true;
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
    
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.auth-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `auth-notification ${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    bindEvents() {
        // Listen for login events from other pages
        window.addEventListener('storage', (e) => {
            if (e.key === 'userData' || e.key === 'loginTime') {
                this.checkLoginStatus();
                this.updateNavigation();
            }
        });
    }
}

// Initialize auth manager
let authManager;
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing auth manager...');
    authManager = new AuthManager();
    window.authManager = authManager;
    
    // Force initial navigation update
    setTimeout(() => {
        console.log('Forcing initial navigation update...');
        authManager.updateNavigation();
    }, 100);
});

// Add CSS for auth components
const authStyles = `
.auth-buttons {
    display: flex !important;
    gap: 1rem;
    align-items: center;
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: auto !important;
    z-index: 1000;
}

.auth-btn {
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    cursor: pointer;
    display: inline-block;
    pointer-events: auto !important;
    position: relative;
    z-index: 1001;
}

.login-btn {
    color: #388e3c;
    background: transparent;
    border-color: #388e3c;
}

.login-btn:hover {
    background: #388e3c;
    color: white;
    transform: translateY(-2px);
}

.signup-btn {
    background: #388e3c;
    color: white;
}

.signup-btn:hover {
    background: #2e7d32;
    transform: translateY(-2px);
}

.user-menu {
    position: relative;
    cursor: pointer;
}

.user-menu-trigger {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    background: #388e3c;
    color: white;
    transition: all 0.3s ease;
}

.user-menu-trigger:hover {
    background: #2e7d32;
}

.user-avatar {
    font-size: 1.2rem;
}

.user-name {
    font-weight: 600;
}

.dropdown-arrow {
    font-size: 0.8rem;
    transition: transform 0.3s ease;
}

.user-menu.active .dropdown-arrow {
    transform: rotate(180deg);
}

.user-menu-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e0e0e0);
    border-radius: 10px;
    box-shadow: var(--shadow, 0 4px 12px rgba(0,0,0,0.1));
    min-width: 200px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    z-index: 1000;
    margin-top: 0.5rem;
}

.user-menu.active .user-menu-dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1rem;
    text-decoration: none;
    color: var(--text-color, #333);
    transition: background 0.3s ease;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-size: 0.9rem;
}

.menu-item:hover {
    background: var(--nav-hover, #f5f5f5);
}

.menu-item:first-child {
    border-radius: 10px 10px 0 0;
}

.menu-item:last-child {
    border-radius: 0 0 10px 10px;
}

.menu-icon {
    font-size: 1.1rem;
}

.menu-divider {
    height: 1px;
    background: var(--border-color, #e0e0e0);
    margin: 0.5rem 0;
}

.logout-btn {
    color: #f44336;
}

.logout-btn:hover {
    background: #ffebee;
}

.auth-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e0e0e0);
    border-radius: 8px;
    padding: 1rem 1.5rem;
    box-shadow: var(--shadow, 0 4px 12px rgba(0,0,0,0.1));
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 10000;
    animation: slideIn 0.3s ease;
}

.auth-notification.success {
    border-color: #4caf50;
    background: #e8f5e9;
    color: #2e7d32;
}

.auth-notification.error {
    border-color: #f44336;
    background: #ffebee;
    color: #c62828;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .auth-buttons {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .user-menu-dropdown {
        right: -50px;
        min-width: 180px;
    }
}
`;

// Inject styles
const authStyleSheet = document.createElement('style');
authStyleSheet.textContent = authStyles;
document.head.appendChild(authStyleSheet); 