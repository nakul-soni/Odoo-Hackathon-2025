// theme.js - Shared theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (!themeToggle) return;
    
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
        
        // Optional: Add a subtle transition effect to the entire page
        body.style.transition = 'all 0.3s ease';
    });
    
    // Apply theme to iframes or other elements if needed
    function applyThemeToElements() {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            try {
                iframe.contentDocument.body.setAttribute('data-theme', body.getAttribute('data-theme'));
            } catch (e) {
                // Cross-origin iframe, can't access
            }
        });
    }
    
    // Apply theme on page load
    applyThemeToElements();
}); 