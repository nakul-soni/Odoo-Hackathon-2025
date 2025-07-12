// product-detail.js - Product Detail Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Product data (in a real app, this would come from an API)
    const products = {
        1: {
            id: 1,
            name: {en: "Floral Summer Dress", hi: "फ्लोरल समर ड्रेस"},
            category: {en: "Women's Wear", hi: "महिलाओं के कपड़े"},
            condition: {en: "Excellent", hi: "उत्कृष्ट"},
            price: 12,
            originalPrice: 45,
            size: "M",
            brand: {en: "Zara", hi: "ज़ारा"},
            color: {en: "Blue Floral", hi: "नीला फूलदार"},
            material: {en: "Cotton Blend", hi: "कॉटन ब्लेंड"},
            age: {en: "1 year", hi: "1 साल"},
            description: {
                en: "Beautiful floral summer dress in excellent condition. Perfect for spring and summer occasions. The dress features a comfortable fit with a flattering silhouette. Only worn a few times and well-maintained.",
                hi: "उत्कृष्ट स्थिति में सुंदर फूलदार गर्मियों की ड्रेस। वसंत और गर्मियों के अवसरों के लिए बिल्कुल सही। ड्रेस में आरामदायक फिट और आकर्षक सिल्हूट है। केवल कुछ बार पहनी गई और अच्छी तरह से बनाए रखी गई।"
            },
            images: [
                "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80"
            ],
            seller: {
                name: "Sarah Johnson",
                location: {en: "New York, NY", hi: "न्यूयॉर्क, एनवाई"},
                rating: 4.8,
                reviews: 24,
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=60&q=80"
            }
        },
        2: {
            id: 2,
            name: {en: "Classic Blue Jeans", hi: "क्लासिक ब्लू जीन्स"},
            category: {en: "Men's Wear", hi: "पुरुषों के कपड़े"},
            condition: {en: "Good", hi: "अच्छा"},
            price: 15,
            originalPrice: 60,
            size: "32",
            brand: {en: "Levi's", hi: "लेवी'स"},
            color: {en: "Dark Blue", hi: "गहरा नीला"},
            material: {en: "Denim", hi: "डेनिम"},
            age: {en: "2 years", hi: "2 साल"},
            description: {
                en: "Classic Levi's blue jeans in good condition. Perfect fit and comfortable wear. These jeans have been well-cared for and still look great. Ideal for casual wear or smart casual occasions.",
                hi: "अच्छी स्थिति में क्लासिक लेवी'स ब्लू जीन्स। बिल्कुल सही फिट और आरामदायक पहनावा। इन जीन्स की अच्छी देखभाल की गई है और अभी भी बहुत अच्छी लगती हैं। कैजुअल वियर या स्मार्ट कैजुअल अवसरों के लिए आदर्श।"
            },
            images: [
                "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80"
            ],
            seller: {
                name: "Mike Chen",
                location: {en: "Los Angeles, CA", hi: "लॉस एंजेल्स, सीए"},
                rating: 4.6,
                reviews: 18,
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80"
            }
        },
        3: {
            id: 3,
            name: {en: "White Cotton Shirt", hi: "सफेद कॉटन शर्ट"},
            category: {en: "Men's Wear", hi: "पुरुषों के कपड़े"},
            condition: {en: "Like New", hi: "नई जैसी"},
            price: 10,
            originalPrice: 35,
            size: "L",
            brand: {en: "Uniqlo", hi: "यूनिक्लो"},
            color: {en: "White", hi: "सफेद"},
            material: {en: "100% Cotton", hi: "100% कॉटन"},
            age: {en: "6 months", hi: "6 महीने"},
            description: {
                en: "Crisp white cotton shirt in like-new condition. Perfect for professional settings or casual wear. The shirt has been worn only a few times and is in excellent condition with no stains or damage.",
                hi: "नई जैसी स्थिति में कुरकुरी सफेद कॉटन शर्ट। पेशेवर सेटिंग या कैजुअल वियर के लिए बिल्कुल सही। शर्ट को केवल कुछ बार पहना गया है और कोई दाग या क्षति नहीं है।"
            },
            images: [
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"
            ],
            seller: {
                name: "David Kim",
                location: {en: "Chicago, IL", hi: "शिकागो, आईएल"},
                rating: 4.9,
                reviews: 31,
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=80"
            }
        }
    };

    // Get product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    let currentLang = 'en';
    let currentImageIndex = 0;

    // Initialize the page
    function init() {
        loadProduct(productId);
        setupImageGallery();
        setupEventListeners();
        setupLanguageSupport();
    }

    // Load product data
    function loadProduct(id) {
        const product = products[id];
        if (!product) {
            showError('Product not found');
            return;
        }

        // Update breadcrumb
        document.getElementById('productName').textContent = product.name[currentLang] || product.name.en;

        // Update product information
        document.getElementById('productTitle').textContent = product.name[currentLang] || product.name.en;
        document.getElementById('productCategory').textContent = product.category[currentLang] || product.category.en;
        document.getElementById('productCondition').textContent = product.condition[currentLang] || product.condition.en;
        document.getElementById('productPrice').textContent = `$${product.price}`;
        document.getElementById('productSize').textContent = product.size;
        document.getElementById('productBrand').textContent = product.brand[currentLang] || product.brand.en;
        document.getElementById('productColor').textContent = product.color[currentLang] || product.color.en;
        document.getElementById('productMaterial').textContent = product.material[currentLang] || product.material.en;
        document.getElementById('productAge').textContent = product.age[currentLang] || product.age.en;
        document.getElementById('productDescription').textContent = product.description[currentLang] || product.description.en;

        // Update seller information
        document.getElementById('sellerName').textContent = product.seller.name;
        document.getElementById('sellerLocation').textContent = product.seller.location[currentLang] || product.seller.location.en;
        document.getElementById('sellerRating').textContent = product.seller.rating;
        document.getElementById('sellerReviews').textContent = `(${product.seller.reviews} reviews)`;
        document.getElementById('sellerAvatar').src = product.seller.avatar;

        // Update original price
        const originalPriceElement = document.getElementById('originalPrice');
        if (product.originalPrice > product.price) {
            originalPriceElement.style.display = 'block';
            originalPriceElement.querySelector('.strikethrough').textContent = `$${product.originalPrice}`;
        } else {
            originalPriceElement.style.display = 'none';
        }

        // Load images
        loadProductImages(product.images);

        // Load similar products
        loadSimilarProducts(id);
    }

    // Load product images
    function loadProductImages(images) {
        const mainImage = document.getElementById('mainImage');
        const thumbnailContainer = document.getElementById('thumbnailContainer');
        
        if (images.length > 0) {
            mainImage.src = images[0];
            mainImage.alt = 'Product Image';
            
            // Create thumbnails
            thumbnailContainer.innerHTML = '';
            images.forEach((image, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = image;
                thumbnail.alt = `Product Image ${index + 1}`;
                thumbnail.className = 'thumbnail-image';
                thumbnail.addEventListener('click', () => {
                    currentImageIndex = index;
                    updateMainImage();
                });
                thumbnailContainer.appendChild(thumbnail);
            });

            // Update navigation buttons
            updateImageNavigation();
        }
    }

    // Update main image
    function updateMainImage() {
        const product = products[getCurrentProductId()];
        if (product && product.images[currentImageIndex]) {
            document.getElementById('mainImage').src = product.images[currentImageIndex];
            updateImageNavigation();
        }
    }

    // Update image navigation
    function updateImageNavigation() {
        const product = products[getCurrentProductId()];
        if (!product) return;

        const prevBtn = document.getElementById('prevImageBtn');
        const nextBtn = document.getElementById('nextImageBtn');

        prevBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = currentImageIndex < product.images.length - 1 ? 'block' : 'none';
    }

    // Setup image gallery
    function setupImageGallery() {
        const prevBtn = document.getElementById('prevImageBtn');
        const nextBtn = document.getElementById('nextImageBtn');

        prevBtn.addEventListener('click', () => {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                updateMainImage();
            }
        });

        nextBtn.addEventListener('click', () => {
            const product = products[getCurrentProductId()];
            if (product && currentImageIndex < product.images.length - 1) {
                currentImageIndex++;
                updateMainImage();
            }
        });
    }

    // Load similar products
    function loadSimilarProducts(currentId) {
        const similarProductsGrid = document.getElementById('similarProductsGrid');
        const currentProduct = products[currentId];
        
        if (!currentProduct) return;

        // Find similar products (same category, different ID)
        const similarProducts = Object.values(products).filter(p => 
            p.id !== currentId && p.category.en === currentProduct.category.en
        ).slice(0, 4);

        similarProductsGrid.innerHTML = '';
        
        similarProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'similar-product-card';
            productCard.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name[currentLang] || product.name.en}">
                <div class="similar-product-info">
                    <h4>${product.name[currentLang] || product.name.en}</h4>
                    <p class="similar-product-price">$${product.price}</p>
                    <p class="similar-product-condition">${product.condition[currentLang] || product.condition.en}</p>
                </div>
            `;
            
            productCard.addEventListener('click', () => {
                window.location.href = `product-detail.html?id=${product.id}`;
            });
            
            similarProductsGrid.appendChild(productCard);
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Action buttons
        document.getElementById('swapBtn').addEventListener('click', () => {
            showActionModal('swap');
        });

        document.getElementById('messageBtn').addEventListener('click', () => {
            showActionModal('message');
        });

        document.getElementById('saveBtn').addEventListener('click', () => {
            saveItem();
        });

        // Modal close
        document.querySelector('.modal-close').addEventListener('click', closeModal);
        document.getElementById('modalCancelBtn').addEventListener('click', closeModal);
        
        // Close modal when clicking outside
        document.getElementById('actionModal').addEventListener('click', (e) => {
            if (e.target.id === 'actionModal') {
                closeModal();
            }
        });
    }

    // Show action modal
    function showActionModal(action) {
        const modal = document.getElementById('actionModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        const confirmBtn = document.getElementById('modalConfirmBtn');

        if (action === 'swap') {
            modalTitle.textContent = window.translations[currentLang]?.swap_modal_title || 'Initiate Swap';
            modalContent.innerHTML = `
                <p>${window.translations[currentLang]?.swap_modal_content || 'Are you ready to swap this item? You\'ll be connected with the seller to arrange the exchange.'}</p>
            `;
            confirmBtn.textContent = window.translations[currentLang]?.swap_modal_confirm || 'Start Swap';
            confirmBtn.onclick = () => {
                initiateSwap();
                closeModal();
            };
        } else if (action === 'message') {
            modalTitle.textContent = window.translations[currentLang]?.message_modal_title || 'Message Seller';
            modalContent.innerHTML = `
                <p>${window.translations[currentLang]?.message_modal_content || 'Send a message to the seller about this item.'}</p>
                <textarea id="messageText" placeholder="${window.translations[currentLang]?.message_placeholder || 'Type your message here...'}" rows="4" style="width:100%;margin-top:1rem;padding:0.5rem;border:1px solid #ddd;border-radius:4px;"></textarea>
            `;
            confirmBtn.textContent = window.translations[currentLang]?.message_modal_confirm || 'Send Message';
            confirmBtn.onclick = () => {
                sendMessage();
                closeModal();
            };
        }

        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('open'), 10);
    }

    // Close modal
    function closeModal() {
        const modal = document.getElementById('actionModal');
        modal.classList.remove('open');
        setTimeout(() => modal.style.display = 'none', 200);
    }

    // Initiate swap
    function initiateSwap() {
        const product = products[getCurrentProductId()];
        if (!product) return;

        // Check if user is logged in
        if (window.authManager && !window.authManager.isLoggedIn) {
            alert(window.translations[currentLang]?.login_required || 'Please log in to initiate a swap.');
            return;
        }

        // In a real app, this would create a swap request
        console.log('Initiating swap for product:', product.id);
        showNotification('Swap request sent! The seller will contact you soon.', 'success');
    }

    // Send message
    function sendMessage() {
        const messageText = document.getElementById('messageText')?.value;
        if (!messageText || messageText.trim() === '') {
            alert(window.translations[currentLang]?.message_required || 'Please enter a message.');
            return;
        }

        // Check if user is logged in
        if (window.authManager && !window.authManager.isLoggedIn) {
            alert(window.translations[currentLang]?.login_required || 'Please log in to send a message.');
            return;
        }

        // In a real app, this would send the message
        console.log('Sending message:', messageText);
        showNotification('Message sent successfully!', 'success');
    }

    // Save item
    function saveItem() {
        const product = products[getCurrentProductId()];
        if (!product) return;

        // Check if user is logged in
        if (window.authManager && !window.authManager.isLoggedIn) {
            alert(window.translations[currentLang]?.login_required || 'Please log in to save items.');
            return;
        }

        // In a real app, this would save the item to user's favorites
        console.log('Saving item:', product.id);
        showNotification('Item saved to your favorites!', 'success');
    }

    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Show error
    function showError(message) {
        const main = document.querySelector('.product-detail-main');
        main.innerHTML = `
            <div class="error-container">
                <h2>${message}</h2>
                <a href="browse.html" class="cta-btn">Back to Browse</a>
            </div>
        `;
    }

    // Setup language support
    function setupLanguageSupport() {
        const langSelect = document.getElementById('langSelect');
        if (langSelect) {
            langSelect.addEventListener('change', function() {
                currentLang = this.value;
                loadProduct(getCurrentProductId());
            });
        }
    }

    // Get current product ID
    function getCurrentProductId() {
        return parseInt(new URLSearchParams(window.location.search).get('id')) || 1;
    }

    // Initialize the page
    init();
}); 