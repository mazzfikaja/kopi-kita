document.addEventListener("DOMContentLoaded", function() {

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".hero-bg", {
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
        y: 200
    });

    const prosesSection = document.querySelector("#proses");
    const prosesTrack = document.querySelector(".proses-track");
    if (prosesSection && prosesTrack) {
        const prosesScrollAmount = prosesTrack.offsetWidth - window.innerWidth;
        if (prosesScrollAmount > 0) {
            prosesSection.style.height = `calc(100vh + ${prosesScrollAmount}px)`;
            gsap.to(prosesTrack, {
                x: -prosesScrollAmount, ease: "none",
                scrollTrigger: {
                    trigger: ".proses-container", start: "top top", end: () => `+=${prosesScrollAmount}`,
                    pin: true, scrub: 1, invalidateOnRefresh: true
                }
            });
        }
    }

    const pilihanKopiSection = document.querySelector("#pilihan-kopi");
    const pilihanKopiTrack = document.querySelector(".pilihan-kopi-track");
    if (pilihanKopiSection && pilihanKopiTrack) {
        const pilihanKopiScrollAmount = pilihanKopiTrack.offsetWidth - window.innerWidth;
        if (pilihanKopiScrollAmount > 0) {
            pilihanKopiSection.style.height = `calc(100vh + ${pilihanKopiScrollAmount}px)`;
            gsap.to(pilihanKopiTrack, {
                x: -pilihanKopiScrollAmount, ease: "none",
                scrollTrigger: {
                    trigger: ".pilihan-kopi-container", start: "top top", end: () => `+=${pilihanKopiScrollAmount}`,
                    pin: true, scrub: 1, invalidateOnRefresh: true
                }
            });
        }
    }

    const sectionTitles = gsap.utils.toArray(".section-title");
    sectionTitles.forEach(title => {
        gsap.to(title, {
            opacity: 1, y: 0, duration: 1, ease: "power2.out",
            scrollTrigger: { trigger: title, start: "top 85%", toggleActions: "play none none none" }
        });
    });
    const planCards = gsap.utils.toArray(".paket-card");
    planCards.forEach((card, index) => {
        gsap.to(card, {
            opacity: 1, y: 0, duration: 0.8, delay: index * 0.15, ease: "power2.out",
            scrollTrigger: { trigger: ".paket-wrapper", start: "top 80%", toggleActions: "play none none none" }
        });
    });

    const modal = document.getElementById('order-modal');
    const closeButton = document.querySelector('.close-button');
    const paketTerpilihEl = document.getElementById('paket-terpilih');
    const bijiKopiSelect = document.getElementById('biji-kopi-select');
    const kirimPesananBtn = document.getElementById('kirim-pesanan-btn');
    const tombolBerlangganan = document.querySelectorAll('#paket .cta-button');

    let paketYangDipilih = '';

    function openModal() {
        paketTerpilihEl.textContent = paketYangDipilih;
        modal.classList.add('show');
    }

    function closeModal() {
        modal.classList.remove('show');
    }

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

        const pesan = `Halo Kopi Kita,

Saya tertarik untuk berlangganan:
- Paket: *${paketYangDipilih}*
- Biji Kopi: *${bijiKopiYangDipilih}*

Mohon informasinya untuk langkah selanjutnya. Terima kasih.`;

        const linkWhatsApp = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;
        
        window.open(linkWhatsApp, '_blank');
        closeModal();
    });

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) { 
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});