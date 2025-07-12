// update-languages.js
// Script to update all HTML files to have only English and Hindi language options

const fs = require('fs');
const path = require('path');

// List of HTML files to update
const htmlFiles = [
    'index.html',
    'browse.html', 
    'login.html',
    'register.html',
    'dashboard.html',
    'profile.html',
    'messages.html',
    'list-item.html'
];

// New language dropdown HTML (only English and Hindi)
const newLanguageDropdown = `        <div style="display:flex;align-items:center;gap:0.5rem;">
            <span style="font-size:1.2rem; color:#388e3c; margin-right:0.2rem;">🌐</span>
            <select id="langSelect" aria-label="Select Language">
                <option value="en" selected>English</option>
                <option value="hi">हिन्दी (Hindi)</option>
            </select>
        </div>`;

// Old language dropdown pattern to replace
const oldLanguageDropdownPattern = /        <div style="display:flex;align-items:center;gap:0\.5rem;">\s*<span style="font-size:1\.2rem; color:#388e3c; margin-right:0\.2rem;">🌐<\/span>\s*<select id="langSelect" aria-label="Select Language">[\s\S]*?<\/select>\s*<\/div>/g;

htmlFiles.forEach(filename => {
    if (fs.existsSync(filename)) {
        let content = fs.readFileSync(filename, 'utf8');
        
        // Replace the language dropdown
        content = content.replace(oldLanguageDropdownPattern, newLanguageDropdown);
        
        // Write back the updated content
        fs.writeFileSync(filename, content, 'utf8');
        console.log(`Updated ${filename}`);
    } else {
        console.log(`File ${filename} not found`);
    }
});

console.log('Language dropdowns updated successfully!'); 