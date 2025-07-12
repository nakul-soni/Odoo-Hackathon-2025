// camera.js - Camera functionality for image upload
class CameraManager {
    constructor() {
        this.stream = null;
        this.capturedImage = null;
        this.isCameraActive = false;
        
        // DOM elements
        this.startCameraBtn = document.getElementById('startCamera');
        this.takePhotoBtn = document.getElementById('takePhoto');
        this.stopCameraBtn = document.getElementById('stopCamera');
        this.retakePhotoBtn = document.getElementById('retakePhoto');
        this.cameraVideo = document.getElementById('cameraVideo');
        this.cameraCanvas = document.getElementById('cameraCanvas');
        
        this.init();
    }
    
    init() {
        if (!this.startCameraBtn) return;
        
        this.bindEvents();
        this.checkCameraSupport();
        this.setupToggle();
    }
    
    setupToggle() {
        const toggleBtn = document.getElementById('toggleCamera');
        const cameraSection = document.querySelector('.camera-section');
        
        if (toggleBtn && cameraSection) {
            toggleBtn.addEventListener('click', () => {
                const isVisible = cameraSection.style.display !== 'none';
                cameraSection.style.display = isVisible ? 'none' : 'block';
                toggleBtn.innerHTML = isVisible ? 
                    '<span class="camera-icon">📷</span>Use Camera' : 
                    '<span class="camera-icon">❌</span>Hide Camera';
                
                // If hiding camera, stop it
                if (isVisible && this.isCameraActive) {
                    this.stopCamera();
                }
            });
        }
    }
    
    bindEvents() {
        this.startCameraBtn?.addEventListener('click', () => this.startCamera());
        this.takePhotoBtn?.addEventListener('click', () => this.takePhoto());
        this.stopCameraBtn?.addEventListener('click', () => this.stopCamera());
        this.retakePhotoBtn?.addEventListener('click', () => this.retakePhoto());
    }
    
    checkCameraSupport() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            this.showError('Camera is not supported in this browser');
            this.startCameraBtn.disabled = true;
        }
    }
    
    async startCamera() {
        try {
            this.showLoading('Starting camera...');
            
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Use back camera if available
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            
            this.cameraVideo.srcObject = this.stream;
            this.cameraVideo.style.display = 'block';
            this.isCameraActive = true;
            
            // Update UI
            this.startCameraBtn.style.display = 'none';
            this.takePhotoBtn.style.display = 'inline-block';
            this.stopCameraBtn.style.display = 'inline-block';
            
            this.hideLoading();
            this.showSuccess('Camera started successfully!');
            
        } catch (error) {
            console.error('Camera access error:', error);
            this.handleCameraError(error);
        }
    }
    
    takePhoto() {
        if (!this.isCameraActive) return;
        
        try {
            const context = this.cameraCanvas.getContext('2d');
            this.cameraCanvas.width = this.cameraVideo.videoWidth;
            this.cameraCanvas.height = this.cameraVideo.videoHeight;
            
            // Draw video frame to canvas
            context.drawImage(this.cameraVideo, 0, 0, this.cameraCanvas.width, this.cameraCanvas.height);
            
            // Convert to blob
            this.cameraCanvas.toBlob((blob) => {
                this.capturedImage = blob;
                
                // Create file from blob
                const file = new File([blob], `camera-photo-${Date.now()}.jpg`, { 
                    type: 'image/jpeg' 
                });
                
                // Add to image preview
                this.addImageToPreview(file);
                
                // Update UI
                this.takePhotoBtn.style.display = 'none';
                this.retakePhotoBtn.style.display = 'inline-block';
                
                this.showSuccess('Photo captured!');
                
            }, 'image/jpeg', 0.8);
            
        } catch (error) {
            console.error('Photo capture error:', error);
            this.showError('Failed to capture photo');
        }
    }
    
    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        
        this.isCameraActive = false;
        this.capturedImage = null;
        
        // Update UI
        this.cameraVideo.style.display = 'none';
        this.cameraVideo.srcObject = null;
        this.startCameraBtn.style.display = 'inline-block';
        this.takePhotoBtn.style.display = 'none';
        this.stopCameraBtn.style.display = 'none';
        this.retakePhotoBtn.style.display = 'none';
        
        this.showSuccess('Camera stopped');
    }
    
    retakePhoto() {
        this.capturedImage = null;
        this.retakePhotoBtn.style.display = 'none';
        this.takePhotoBtn.style.display = 'inline-block';
    }
    
    addImageToPreview(file) {
        // Check if we have a global image handler
        if (window.handleImageFiles) {
            window.handleImageFiles([file]);
        } else {
            // Fallback: create preview manually
            this.createImagePreview(file);
        }
    }
    
    createImagePreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewGrid = document.getElementById('imagePreviewGrid');
            if (previewGrid) {
                const previewDiv = document.createElement('div');
                previewDiv.className = 'image-preview-item';
                previewDiv.innerHTML = `
                    <img src="${e.target.result}" alt="Camera photo">
                    <button class="remove-image" onclick="this.parentElement.remove()">×</button>
                `;
                previewGrid.appendChild(previewDiv);
            }
        };
        reader.readAsDataURL(file);
    }
    
    handleCameraError(error) {
        this.hideLoading();
        
        let message = 'Camera access denied';
        
        if (error.name === 'NotAllowedError') {
            message = 'Camera permission denied. Please allow camera access in your browser settings.';
        } else if (error.name === 'NotFoundError') {
            message = 'No camera found on this device.';
        } else if (error.name === 'NotReadableError') {
            message = 'Camera is already in use by another application.';
        } else if (error.name === 'OverconstrainedError') {
            message = 'Camera does not meet the required specifications.';
        }
        
        this.showError(message);
    }
    
    showLoading(message) {
        // Create loading indicator
        const loading = document.createElement('div');
        loading.className = 'camera-loading';
        loading.innerHTML = `
            <div class="loading-spinner"></div>
            <p>${message}</p>
        `;
        
        const cameraSection = document.querySelector('.camera-section');
        if (cameraSection) {
            cameraSection.appendChild(loading);
        }
    }
    
    hideLoading() {
        const loading = document.querySelector('.camera-loading');
        if (loading) {
            loading.remove();
        }
    }
    
    showSuccess(message) {
        this.showNotification(message, 'success');
    }
    
    showError(message) {
        this.showNotification(message, 'error');
    }
    
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `camera-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Public method to check if camera is available
    isAvailable() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }
    
    // Public method to get current camera state
    getState() {
        return {
            isActive: this.isCameraActive,
            hasCapturedImage: !!this.capturedImage
        };
    }
}

// Initialize camera manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cameraManager = new CameraManager();
});

// Add CSS for camera notifications
const cameraStyles = `
.camera-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
    z-index: 1000;
}

.camera-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease;
}

.camera-notification.success {
    background: #4caf50;
}

.camera-notification.error {
    background: #f44336;
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

.loading-spinner {
    width: 30px;
    height: 30px;
    border: 3px solid #ffffff;
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 0.5rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cameraStyles;
document.head.appendChild(styleSheet); 