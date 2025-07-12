// Admin Script
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add animation
        themeToggle.style.transform = 'scale(1.2)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 200);
    });

    // Password Toggle
    const passwordToggle = document.getElementById('passwordToggle');
    const adminPassword = document.getElementById('adminPassword');
    
    passwordToggle.addEventListener('click', function() {
        const type = adminPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        adminPassword.setAttribute('type', type);
        passwordToggle.classList.toggle('show-password');
    });

    // Form Validation and Submission
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminUsername = document.getElementById('adminUsername');
    const adminCode = document.getElementById('adminCode');
    const loginBtn = document.querySelector('.admin-login-btn');
    
    // Demo admin credentials (in real app, this would be server-side)
    const demoCredentials = {
        username: 'admin',
        password: 'admin123',
        code: 'ADMIN2024'
    };

    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const username = adminUsername.value.trim();
        const password = adminPassword.value.trim();
        const code = adminCode.value.trim();
        
        // Basic validation
        if (!username || !password || !code) {
            showError('Please fill in all fields');
            return;
        }
        
        // Show loading state
        loginBtn.classList.add('loading');
        
        // Simulate authentication delay
        setTimeout(() => {
            // Check credentials (demo only)
            if (username === demoCredentials.username && 
                password === demoCredentials.password && 
                code === demoCredentials.code) {
                showSuccess();
            } else {
                showError('Invalid credentials. Please try again.');
                loginBtn.classList.remove('loading');
            }
        }, 2000);
    });

    // Error Modal
    function showError(message) {
        const errorModal = document.getElementById('adminErrorModal');
        const errorMessage = document.getElementById('errorMessage');
        
        errorMessage.textContent = message;
        errorModal.style.display = 'block';
        
        // Add shake animation to form
        adminLoginForm.classList.add('shake');
        setTimeout(() => {
            adminLoginForm.classList.remove('shake');
        }, 500);
        
        // Close modal on click
        const closeBtn = errorModal.querySelector('.modal-close');
        closeBtn.onclick = () => {
            errorModal.style.display = 'none';
        };
        
        // Close modal on outside click
        errorModal.onclick = (e) => {
            if (e.target === errorModal) {
                errorModal.style.display = 'none';
            }
        };
    }

    // Success Modal
    function showSuccess() {
        const successModal = document.getElementById('adminSuccessModal');
        successModal.style.display = 'block';
        
        // Close modal on click
        const closeBtn = successModal.querySelector('.modal-close');
        closeBtn.onclick = () => {
            successModal.style.display = 'none';
        };
        
        // Close modal on outside click
        successModal.onclick = (e) => {
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        };
        
        // Redirect to admin panel after 3 seconds
        setTimeout(() => {
            // In a real app, this would redirect to the admin dashboard
            alert('Admin access granted! Redirecting to admin panel...');
            // window.location.href = 'admin-dashboard.html';
        }, 3000);
    }

    // Input focus effects
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Add fade-in animation to container
    const container = document.querySelector('.admin-login-container');
    container.classList.add('fade-in');

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus username
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            adminUsername.focus();
        }
        
        // Ctrl/Cmd + L to focus password
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            adminPassword.focus();
        }
        
        // Ctrl/Cmd + J to focus code
        if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
            e.preventDefault();
            adminCode.focus();
        }
    });

    // Security features
    let loginAttempts = 0;
    const maxAttempts = 3;
    
    function checkLoginAttempts() {
        loginAttempts++;
        if (loginAttempts >= maxAttempts) {
            showError('Too many failed attempts. Please try again later.');
            loginBtn.disabled = true;
            setTimeout(() => {
                loginBtn.disabled = false;
                loginAttempts = 0;
            }, 30000); // 30 seconds lockout
        }
    }

    // Add security warning
    console.log('%c⚠️ SECURITY WARNING ⚠️', 'color: red; font-size: 20px; font-weight: bold;');
    console.log('%cThis is a demo admin login. In production, use proper authentication and security measures.', 'color: orange; font-size: 14px;');
}); 