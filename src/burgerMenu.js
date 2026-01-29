// Gestion du menu burger
const menuToggle = document.querySelector('.menu-toggle-mobile');
const nav = document.querySelector('.nav-mobile');
const menuOverlay = document.querySelector('.menu-overlay');

// Fonction pour ouvrir/fermer le menu
function toggleMenu() {
    if (nav && menuToggle && menuOverlay) {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');

        // Empêcher le scroll du body quand le menu est ouvert
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Fonction pour fermer le menu
function closeMenu() {
    if (nav && menuToggle && menuOverlay) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Ouvrir/fermer le menu avec le bouton burger
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// Fermer le menu quand on clique sur l'overlay
if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
}

// Close menu when clicking a link (without preventing default)
if (nav) {
    nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            // Just close the menu, let the link navigate naturally
            closeMenu();
        }
    }, false);
}

// Gestion du header qui se cache au scroll
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Si on descend la page, on cache le header
        header.classList.add('hide');
    } else {
        // Si on remonte, on affiche le header
        header.classList.remove('hide');
    }

    lastScrollY = window.scrollY;
});

// Scroll doux pour les liens avec #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

