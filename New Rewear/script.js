document.addEventListener('DOMContentLoaded', function () {
    // 3D Carousel/Slider Logic
    class Carousel3D {
        constructor() {
            this.track = document.getElementById('carouselTrack');
            this.dotsContainer = document.getElementById('carouselDots');
            this.prevBtn = document.querySelector('.prev-btn');
            this.nextBtn = document.querySelector('.next-btn');
            this.slides = Array.from(this.track.children);
            this.total = this.slides.length;
            this.current = 0;
            this.isAnimating = false;
            this.autoPlayInterval = null;
            this.init();
        }
        init() {
            this.createDots();
            this.update();
            this.bindEvents();
            this.startAutoPlay();
        }
        createDots() {
            this.dotsContainer.innerHTML = '';
            for (let i = 0; i < this.total; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                dot.addEventListener('click', () => this.goTo(i));
                this.dotsContainer.appendChild(dot);
            }
        }
        update() {
            const angleStep = 360 / this.total;
            this.slides.forEach((slide, i) => {
                const angle = angleStep * (i - this.current);
                slide.style.transform = `rotateY(${angle}deg) translateZ(340px)`;
                slide.classList.toggle('active', i === this.current);
            });
            Array.from(this.dotsContainer.children).forEach((dot, i) => {
                dot.classList.toggle('active', i === this.current);
            });
        }
        next() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.current = (this.current + 1) % this.total;
            this.update();
            setTimeout(() => { this.isAnimating = false; }, 600);
        }
        prev() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.current = (this.current - 1 + this.total) % this.total;
            this.update();
            setTimeout(() => { this.isAnimating = false; }, 600);
        }
        goTo(idx) {
            if (this.isAnimating || idx === this.current) return;
            this.isAnimating = true;
            this.current = idx;
            this.update();
            setTimeout(() => { this.isAnimating = false; }, 600);
        }
        bindEvents() {
            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            });
            // Touch/swipe
            let startX = 0;
            this.track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            this.track.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) this.next();
                    else this.prev();
                }
            });
        }
        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => {
                if (!this.isAnimating) this.next();
            }, 5000);
        }
    }
    // Initialize 3D Carousel
    if (document.getElementById('carouselTrack')) {
        new Carousel3D();
    }

    // --- Advanced Browse Page Logic ---
    (function(){
        if(!document.getElementById('browseProducts')) return;

        // --- Product Data (should match browse.html, demo only) ---
        const products = [
            {id:1, name:{en:"Floral Dress",hi:"फ्लोरल ड्रेस"}, desc:{en:"Size M | $12",hi:"साइज़ M | ₹999"}, category:"women", price:12, img:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&q=80", popular:true},
            {id:2, name:{en:"Blue Jeans",hi:"ब्लू जीन्स"}, desc:{en:"Size 32 | $15",hi:"साइज़ 32 | ₹1200"}, category:"men", price:15, img:"https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=300&q=80", popular:false},
            {id:3, name:{en:"White Shirt",hi:"सफेद शर्ट"}, desc:{en:"Size L | $10",hi:"साइज़ L | ₹800"}, category:"men", price:10, img:"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80", popular:true},
            {id:4, name:{en:"Kids Hoodie",hi:"किड्स हुडी"}, desc:{en:"Size S | $8",hi:"साइज़ S | ₹600"}, category:"kids", price:8, img:"https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=300&q=80", popular:false},
            {id:5, name:{en:"Leather Jacket",hi:"लेदर जैकेट"}, desc:{en:"Size M | $25",hi:"साइज़ M | ₹2000"}, category:"men", price:25, img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&q=80", popular:true},
            {id:6, name:{en:"Summer Dress",hi:"समर ड्रेस"}, desc:{en:"Size S | $18",hi:"साइज़ S | ₹1500"}, category:"women", price:18, img:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=300&q=80", popular:false},
            {id:7, name:{en:"Running Shoes",hi:"रनिंग शूज़"}, desc:{en:"Size 9 | $30",hi:"साइज़ 9 | ₹2500"}, category:"shoes", price:30, img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80", popular:true},
            {id:8, name:{en:"Denim Jacket",hi:"डेनिम जैकेट"}, desc:{en:"Size L | $20",hi:"साइज़ L | ₹1600"}, category:"women", price:20, img:"https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=300&q=80", popular:false},
            {id:9, name:{en:"Toddler Dress",hi:"टॉडलर ड्रेस"}, desc:{en:"Size 2T | $6",hi:"साइज़ 2T | ₹500"}, category:"kids", price:6, img:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80", popular:false},
            {id:10, name:{en:"Sunglasses",hi:"सनग्लासेज़"}, desc:{en:"One Size | $12",hi:"एक साइज़ | ₹1000"}, category:"accessories", price:12, img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80", popular:true},
            {id:11, name:{en:"Yoga Pants",hi:"योगा पैंट्स"}, desc:{en:"Size M | $14",hi:"साइज़ M | ₹1200"}, category:"sportswear", price:14, img:"https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=300&q=80", popular:false},
            {id:12, name:{en:"Winter Scarf",hi:"विंटर स्कार्फ"}, desc:{en:"One Size | $8",hi:"एक साइज़ | ₹700"}, category:"accessories", price:8, img:"https://images.unsplash.com/photo-1520903920245-00d872a2d1c9?auto=format&fit=crop&w=300&q=80", popular:false}
        ];

        // --- State ---
        let currentLang = 'en';
        let page = 1, perPage = 8, filtered = products.slice();
        let searchTimeout;

        // --- DOM ---
        const browseProducts = document.getElementById('browseProducts');
        const skeletonGrid = document.getElementById('skeletonGrid');
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const sortFilter = document.getElementById('sortFilter');
        const clearFilters = document.getElementById('clearFilters');
        const pagination = document.getElementById('pagination');
        const langSelect = document.getElementById('langSelect');
        const swapModal = document.getElementById('swapModal');
        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalAction = document.getElementById('modalAction');
        const modalClose = document.querySelector('.modal-close');

        // --- Skeletons ---
        function showSkeletons() {
            skeletonGrid.innerHTML = '';
            skeletonGrid.style.display = 'grid';
            browseProducts.style.opacity = 0.3;
            for(let i=0;i<perPage;i++) {
                skeletonGrid.innerHTML += `<div class='product-card skeleton'><div class='skeleton-img'></div><div class='skeleton-line' style='width:60%;'></div><div class='skeleton-line' style='width:40%;'></div></div>`;
            }
        }
        function hideSkeletons() {
            skeletonGrid.style.display = 'none';
            browseProducts.style.opacity = 1;
        }

        // --- Render Products with Animation ---
        function renderProducts(list) {
            browseProducts.style.opacity = 0;
            setTimeout(()=>{
                browseProducts.innerHTML = '';
                if(list.length === 0) {
                    browseProducts.innerHTML = `<div style='text-align:center;color:#888;font-size:1.2rem;margin:2rem 0;'>No products found.</div>`;
                } else {
                    list.forEach(prod => {
                        browseProducts.innerHTML += `
                        <div class="product-card" tabindex="0" aria-label="${prod.name[currentLang]||prod.name.en}">
                            <img src="${prod.img}" alt="${prod.name[currentLang]||prod.name.en}">
                            <h3>${prod.name[currentLang]||prod.name.en}</h3>
                            <p>${prod.desc[currentLang]||prod.desc.en}</p>
                            <div class="card-actions">
                                <button class="cta-btn swap-btn">${window.translations?.[currentLang]?.cta_swap||'Swap Now'}</button>
                                <button class="cta-btn info-btn" style="background:#fff;color:#388e3c;border:2px solid #388e3c;">${window.translations?.[currentLang]?.cta_info||'Request Info'}</button>
                            </div>
                        </div>`;
                    });
                }
                browseProducts.style.opacity = 1;
                attachCardEvents();
            }, 250);
        }

        // --- Pagination ---
        function renderPagination(total) {
            const totalPages = Math.ceil(total/perPage);
            let html = `<button class="cta-btn" ${page===1?'disabled':''} aria-label="Previous Page">&laquo;</button>`;
            for(let i=1;i<=totalPages;i++) {
                html += `<button class="cta-btn${i===page?' active':''}" style="margin:0 0.5rem;${i===page?'background:#388e3c;color:#fff;':''}">${i}</button>`;
            }
            html += `<button class="cta-btn" ${page===totalPages?'disabled':''} aria-label="Next Page">&raquo;</button>`;
            pagination.innerHTML = html;
            // Events
            const btns = pagination.querySelectorAll('button');
            btns[0].onclick = ()=>{if(page>1){page--;filterAndSort(true);}};
            btns[btns.length-1].onclick = ()=>{if(page<totalPages){page++;filterAndSort(true);}};
            for(let i=1;i<=totalPages;i++){
                btns[i].onclick = ()=>{page=i;filterAndSort(true);};
            }
        }

        // --- Filtering, Sorting, Debounced Search ---
        function filterAndSort(noAnim) {
            showSkeletons();
            setTimeout(()=>{
                let list = products.slice();
                const search = searchInput.value.trim().toLowerCase();
                const cat = categoryFilter.value;
                const sort = sortFilter.value;
                // Filter by search
                if(search) list = list.filter(p => (p.name[currentLang]||p.name.en).toLowerCase().includes(search) || (p.desc[currentLang]||p.desc.en).toLowerCase().includes(search));
                // Filter by category
                if(cat!=='all') list = list.filter(p=>p.category===cat);
                // Sort
                if(sort==='recent') list = list.sort((a,b)=>b.id-a.id);
                else if(sort==='popular') list = list.sort((a,b)=>b.popular-a.popular);
                else if(sort==='lowprice') list = list.sort((a,b)=>a.price-b.price);
                else if(sort==='highprice') list = list.sort((a,b)=>b.price-a.price);
                filtered = list;
                // Pagination
                const total = filtered.length;
                const start = (page-1)*perPage;
                const end = start+perPage;
                renderPagination(total);
                renderProducts(filtered.slice(start,end));
                hideSkeletons();
            }, noAnim?0:350);
        }

        searchInput.addEventListener('input', function(){
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(()=>{page=1;filterAndSort();}, 300);
        });
        categoryFilter.addEventListener('change', ()=>{page=1;filterAndSort();});
        sortFilter.addEventListener('change', ()=>{page=1;filterAndSort();});
        clearFilters.addEventListener('click', ()=>{
            searchInput.value = '';
            categoryFilter.value = 'all';
            sortFilter.value = 'recent';
            page = 1;
            filterAndSort();
        });

        // --- Card Hover/Focus Effects ---
        browseProducts.addEventListener('mouseover',e=>{
            const card = e.target.closest('.product-card');
            if(card) card.classList.add('hovered');
        });
        browseProducts.addEventListener('mouseout',e=>{
            const card = e.target.closest('.product-card');
            if(card) card.classList.remove('hovered');
        });
        browseProducts.addEventListener('focusin',e=>{
            const card = e.target.closest('.product-card');
            if(card) card.classList.add('hovered');
        });
        browseProducts.addEventListener('focusout',e=>{
            const card = e.target.closest('.product-card');
            if(card) card.classList.remove('hovered');
        });

        // --- Modal Logic ---
        function openModal(prod, action) {
            modalImg.src = prod.img;
            modalImg.alt = prod.name[currentLang]||prod.name.en;
            modalTitle.textContent = prod.name[currentLang]||prod.name.en;
            modalDesc.textContent = prod.desc[currentLang]||prod.desc.en;
            modalAction.innerHTML = action==='swap'
                ? `<div style='color:#388e3c;font-weight:600;margin:1rem 0;'>${window.translations?.[currentLang]?.modal_swap_msg||'Ready to swap? Log in or sign up to proceed.'}</div>`
                : `<div style='color:#388e3c;font-weight:600;margin:1rem 0;'>${window.translations?.[currentLang]?.modal_info_msg||'Request more info about this item.'}</div>`;
            swapModal.style.display = 'flex';
            setTimeout(()=>{swapModal.classList.add('open');swapModal.focus();},10);
        }
        function closeModal() {
            swapModal.classList.remove('open');
            setTimeout(()=>{swapModal.style.display='none';},200);
        }
        modalClose.onclick = closeModal;
        swapModal.onclick = e=>{if(e.target===swapModal)closeModal();};
        document.addEventListener('keydown',e=>{if(swapModal.style.display==='flex'&&e.key==='Escape')closeModal();});

        function attachCardEvents() {
            document.querySelectorAll('.swap-btn').forEach((btn,i)=>{
                btn.onclick = ()=>openModal(filtered[(page-1)*perPage+i],'swap');
            });
            document.querySelectorAll('.info-btn').forEach((btn,i)=>{
                btn.onclick = ()=>openModal(filtered[(page-1)*perPage+i],'info');
            });
        }

        // --- Language Support ---
        window.translations = window.translations||{};
        langSelect.addEventListener('change', function() {
            currentLang = this.value;
            page = 1;
            filterAndSort();
        });

        // --- Initial Render ---
        // Handle URL parameters for category filtering
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        if(categoryParam && categoryFilter) {
            categoryFilter.value = categoryParam;
            filterAndSort();
        } else {
            filterAndSort();
        }
    })();
}); 