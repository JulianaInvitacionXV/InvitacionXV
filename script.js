// === Configuración general ===

// Fecha del evento
const EVENT_DATE = '2026-01-17T17:30:00';

// Coordenadas de lugares
const CHURCH = { 
  lat: 19.41642502872382, 
  lng: -99.05137168215246, 
  title: 'Parroquia del Señor de las Maravillas' 
};
const HALL = { 
  lat: 19.412817494642226, 
  lng: -99.02174200059135, 
  title: 'Salón de Eventos Metrópolis' 
};

// === Countdown ===
(function() {
  const target = new Date(EVENT_DATE);
  const el = document.getElementById('countdown');
  
  function update() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) { 
      el.textContent = '¡Hoy es el gran día!'; 
      return; 
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    el.textContent = `${d}d ${h}h ${m}m`;
  }

  setInterval(update, 1000);
  update();
})();

// === Swiper (galería) y AOS (animaciones) ===
new Swiper('.mySwiper', {
  loop: true,
  autoplay: { delay: 3500 },
  pagination: { el: '.swiper-pagination' },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
});

AOS.init({ once: true, duration: 700 });

// === Google Maps ===
function initMap() {
  // --- Mapa Iglesia ---
  const mapChurch = new google.maps.Map(document.getElementById("map-church"), {
    center: CHURCH,
    zoom: 15,
    styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }]
  });
  new google.maps.Marker({ position: CHURCH, map: mapChurch, title: CHURCH.title });

  // --- Mapa Salón ---
  const mapHall = new google.maps.Map(document.getElementById("map-hall"), {
    center: HALL,
    zoom: 15,
    styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }]
  });
  new google.maps.Marker({ position: HALL, map: mapHall, title: HALL.title });
}

// === Música ===
const bg = document.getElementById('bgMusic');
const playToggle = document.getElementById('playToggle');
const enterBtn = document.getElementById('enterBtn');

if (playToggle && bg) {
  playToggle.addEventListener('click', () => {
    bg.paused ? bg.play() : bg.pause();
  });
}

if (enterBtn && bg) {
  enterBtn.addEventListener('click', () => {
    document.getElementById('entryOverlay').style.display = 'none';
    bg.play().catch(() => {});
  });
}


// Animación del overlay
document.getElementById("enterBtn").addEventListener("click", () => {
  const overlay = document.getElementById("entryOverlay");
  overlay.classList.add("fade-out");
  setTimeout(() => overlay.style.display = "none", 900);
});


// === RSVP ===
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    setTimeout(() => alert('¡Gracias por confirmar tu asistencia!'), 500);
    rsvpForm.reset();
  });
}


// Swiper de la sección historia
new Swiper('.myHistorySwiper', {
  loop: true,
  autoplay: { delay: 3500 },
  pagination: { el: '.myHistorySwiper .swiper-pagination' },
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  }
});

// Swiper de la sección historia (usar selector y paginación correctos)
new Swiper('.myHistorySwiper', {
  loop: true,
  autoplay: { delay: 3500 },
  pagination: { el: '.myHistorySwiper .swiper-pagination', clickable: true },
  effect: 'slide' // usa 'slide' o 'fade' o 'coverflow'
});
