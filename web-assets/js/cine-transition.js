document.addEventListener("DOMContentLoaded", () => {
  // 1. INTRO: Hilangkan loader & munculkan konten secara halus
  setTimeout(() => {
    document.body.classList.add("is-loaded");
  }, 200); // Jeda tipis 200ms agar mata sempat menangkap transisi smooth-nya

  // 2. OUTRO: Intersepsi semua klik pada link untuk efek keluar
  const links = document.querySelectorAll("a");
  
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.getAttribute("href");

      // Validasi: Pastikan link internal, bukan tab baru (_blank), dan bukan anchor (#)
      if (
        link.hostname === window.location.hostname && 
        !link.getAttribute("target") && 
        targetUrl && 
        !targetUrl.startsWith("#") &&
        targetUrl !== "#"
      ) {
        e.preventDefault(); // Tahan browser agar tidak langsung pindah

        // Picu animasi outro (blur & fade out)
        document.body.classList.remove("is-loaded");
        document.body.classList.add("is-exiting");

        // Tunggu hingga animasi CSS selesai (600ms - 800ms), lalu pindah halaman
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 700);
      }
    });
  });
});

// Penyelamat jika user klik tombol "Back" di browser agar halaman tidak nge-stuck blur
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    document.body.classList.remove("is-exiting");
    document.body.classList.add("is-loaded");
  }
});