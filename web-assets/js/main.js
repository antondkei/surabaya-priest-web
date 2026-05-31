   document.addEventListener('DOMContentLoaded', () => {
  const sbyPriestHeader = document.getElementById('sby-priest-header');
  
  if (sbyPriestHeader) {
    const handleScroll = () => {
      // Mengaktifkan efek sticky jika layar di-scroll lebih dari 40px
      if (window.scrollY > 40) {
        sbyPriestHeader.classList.add('is-sticky');
      } else {
        sbyPriestHeader.classList.remove('is-sticky');
      }
    };

    // Jalankan sekali saat halaman dimuat untuk memeriksa posisi scroll awal
    handleScroll();
    
    // Dengarkan event scroll user
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
});

// Reveal Animations
  document.addEventListener("DOMContentLoaded", function() {
    // Pengaturan deteksi: elemen akan memicu animasi saat 15% bagiannya sudah terlihat di layar
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Tambahkan class is-visible untuk memicu CSS
          entry.target.classList.add("is-visible");
          
          // Hentikan observasi setelah animasi berjalan sekali agar tidak berulang-ulang mengganggu mata
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Cari semua elemen yang memiliki class reveal atau stagger-group
    const revealElements = document.querySelectorAll(".reveal, .stagger-group");
    revealElements.forEach(el => observer.observe(el));
  });

  // CInematic Reveal Animations
  document.addEventListener("DOMContentLoaded", function() {
    // Pengaturan deteksi: elemen akan memicu animasi saat 15% bagiannya sudah terlihat di layar
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Tambahkan class is-visible untuk memicu CSS
          entry.target.classList.add("is-visible");
          
          // Hentikan observasi setelah animasi berjalan sekali agar tidak berulang-ulang mengganggu mata
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Cari semua elemen yang memiliki class reveal atau stagger-group
    const revealElements = document.querySelectorAll(".cine-reveal, .cine-stagger-group");
    revealElements.forEach(el => observer.observe(el));
  });

// Mobile Menu & Dropdown Logic
document.addEventListener("DOMContentLoaded", function() {
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const headerNav = document.querySelector(".header-nav");
  const dropdownToggles = document.querySelectorAll(".nav-item.has-dropdown > a");

  // === FUNGSI BANTUAN: Menutup Menu & Reset Dropdown ===
  function closeMobileMenu() {
    if (mobileToggle) mobileToggle.classList.remove("is-active");
    if (headerNav) headerNav.classList.remove("is-active");
    
    // Kembalikan kemampuan scroll halaman
    document.body.style.overflow = ""; 

    // Reset/Tutup semua dropdown menu yang terbuka di mobile
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
      menu.style.maxHeight = null;
    });
    // Kembalikan putaran ikon panah ke semula
    document.querySelectorAll(".dropdown-icon").forEach(icon => {
      icon.style.transform = "rotate(0deg)";
    });
  }

  // 1. Fungsi Klik Tombol Hamburger
  if (mobileToggle && headerNav) {
    mobileToggle.addEventListener("click", function(e) {
      e.stopPropagation(); // Mencegah bentrok dengan fungsi klik area luar
      
      if (headerNav.classList.contains("is-active")) {
        // Jika menu sedang terbuka, tutup semuanya
        closeMobileMenu();
      } else {
        // Jika menu tertutup, buka menu
        this.classList.add("is-active");
        headerNav.classList.add("is-active");
        document.body.style.overflow = "hidden"; // Kunci scroll agar background tidak jalan
      }
    });
  }

  // 2. Fungsi Klik di Luar Area (Untuk Menutup Menu)
  document.addEventListener("click", function(e) {
    // Pastikan menu sedang terbuka sebelum menjalankan logika ini
    if (headerNav && headerNav.classList.contains("is-active")) {
      // Jika yang diklik BUKAN area menu dan BUKAN tombol hamburger
      if (!headerNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  // 3. (Opsional & UX Cerdas) Tutup menu jika pengguna mengklik link biasa
  const regularLinks = document.querySelectorAll(".nav-item:not(.has-dropdown) > a");
  regularLinks.forEach(link => {
    link.addEventListener("click", () => {
      // Hanya berjalan di versi mobile
      if (window.innerWidth <= 991) {
        closeMobileMenu();
      }
    });
  });

  // 4. Fungsi Klik Dropdown Mobile (Akordeon)
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", function(e) {
      // Hanya aktifkan logika akordeon ini di mode Mobile (lebar layar <= 991px)
      if (window.innerWidth <= 991) {
        e.preventDefault(); // Cegah klik link agar tidak pindah halaman
        
        const dropdownMenu = this.nextElementSibling;
        const icon = this.querySelector(".dropdown-icon");

        // Sistem Buka-Tutup Akordeon
        if (dropdownMenu.style.maxHeight) {
          // Jika terbuka, tutup dia
          dropdownMenu.style.maxHeight = null;
          if (icon) icon.style.transform = "rotate(0deg)";
        } else {
          // Jika tertutup, TUTUP DULU dropdown lain yang sedang terbuka
          document.querySelectorAll(".dropdown-menu").forEach(menu => menu.style.maxHeight = null);
          document.querySelectorAll(".dropdown-icon").forEach(ic => ic.style.transform = "rotate(0deg)");
          
          // Lalu BUKA dropdown yang sedang diklik
          dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
          if (icon) icon.style.transform = "rotate(180deg)";
        }
      }
    });
  });
});
