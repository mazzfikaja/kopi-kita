document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger, Draggable);

    gsap.to(".hero-bg", {
        scrollTrigger: { 
            trigger: "#hero", 
            start: "top top", 
            end: "bottom top", 
            scrub: true 
        },
        y: 250
    });
    
    const animatedElements = gsap.utils.toArray(".section-title, #paket .paket-card");
    animatedElements.forEach((el) => {
        gsap.fromTo(el, 
            { opacity: 0, y: 50 }, 
            {
                opacity: 1, 
                y: 0, 
                duration: 1, 
                ease: "power2.out",
                scrollTrigger: { 
                    trigger: el, 
                    start: "top 85%", 
                    toggleActions: "play none none none" 
                }
            }
        );
    });
    
    function createSlider(sliderSelector) {
        const sliderElement = document.querySelector(sliderSelector);
        if (!sliderElement) return;

        const track = sliderElement.querySelector('.slider-track');
        const cards = gsap.utils.toArray(sliderElement.querySelectorAll('.slider-card'));
        const prevButton = sliderElement.querySelector('.slider-button.prev');
        const nextButton = sliderElement.querySelector('.slider-button.next');

        if (!track || cards.length === 0 || !prevButton || !nextButton) return;
        
        let currentIndex = 0;
        let isAnimating = false;

        function goToSlide(index, duration = 0.8) {
            if (index < 0 || index >= cards.length || isAnimating) return;
            isAnimating = true;

            const containerWidth = sliderElement.querySelector('.slider-container').offsetWidth;
            const card = cards[index];
            const cardWidth = card.offsetWidth;
            const cardMargin = parseInt(getComputedStyle(card).marginLeft) * 2;
            const targetX = -(index * (cardWidth + cardMargin)) + (containerWidth / 2) - (cardWidth / 2);

            gsap.to(track, {
                x: targetX,
                duration: duration,
                ease: 'power3.inOut',
                onComplete: () => {
                    isAnimating = false;
                }
            });

            cards.forEach((card, i) => {
                let scale = (i === index) ? 1.2 : (i === index - 1 || i === index + 1) ? 0.9 : 0.7;
                let opacity = (i === index) ? 1 : (i === index - 1 || i === index + 1) ? 0.7 : 0;
                let zIndex = (i === index) ? 2 : (i === index - 1 || i === index + 1) ? 1 : 0;
                
                gsap.to(card, {
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });

            currentIndex = index;
            updateButtons();
        }

        function updateButtons() {
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === cards.length - 1;
        }

        const draggableInstance = Draggable.create(track, {
            type: "x",
            edgeResistance: 0.65,
            bounds: sliderElement.querySelector('.slider-container'),
            inertia: true,
            onDragEnd: function() {
                if (this.isThrowing) return;
                
                const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginLeft) * 2;
                const closestIndex = Math.round(this.x / -cardWidth);
                const clampedIndex = gsap.utils.clamp(0, cards.length - 1, closestIndex);
                
                goToSlide(clampedIndex);
            }
        })[0];

        nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
        prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));

        const initSlider = () => goToSlide(0, 0);
        setTimeout(initSlider, 100);
        window.addEventListener('resize', () => goToSlide(currentIndex, 0));
    }

    createSlider('#proses');
    createSlider('#pilihan-kopi');

    const modal = document.getElementById('order-modal');
    if (modal) {
        const closeButton = modal.querySelector('.close-button');
        const paketTerpilihEl = modal.querySelector('#paket-terpilih');
        const bijiKopiSelect = modal.querySelector('#biji-kopi-select');
        const kirimPesananBtn = modal.querySelector('#kirim-pesanan-btn');
        const tombolBerlangganan = document.querySelectorAll('#paket .cta-button');
        let paketYangDipilih = '';

        const openModal = () => {
            paketTerpilihEl.textContent = paketYangDipilih;
            modal.classList.add('show');
        };
        const closeModal = () => modal.classList.remove('show');

        tombolBerlangganan.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                paketYangDipilih = this.closest('.paket-card').querySelector('h3').textContent;
                openModal();
            });
        });

        kirimPesananBtn.addEventListener('click', function() {
            const bijiKopiYangDipilih = bijiKopiSelect.value;
            if (!bijiKopiYangDipilih) {
                alert('Silakan pilih jenis biji kopi terlebih dahulu.');
                return;
            }
            
            const nomorWhatsApp = '6281234567890'; 
            const pesan = `Halo Kopi Kita,\n\nSaya tertarik untuk berlangganan:\n- Paket: *${paketYangDipilih}*\n- Biji Kopi: *${bijiKopiYangDipilih}*\n\nMohon informasinya untuk langkah selanjutnya. Terima kasih.`;
            const linkWhatsApp = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;
            
            window.open(linkWhatsApp, '_blank');
            closeModal();
        });

        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    }
    
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        };

        const scrollToTop = (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        window.addEventListener('scroll', toggleVisibility);
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }
});