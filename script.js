// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe 'animate-on-scroll'
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .project-card, .team-member');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Navigation smooth scroll
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

// Animation de la navbar au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Animation des particules flottantes
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #00ffff;
        border-radius: 50%;
        pointer-events: none;
        animation: particleFloat 8s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    
    document.querySelector('.floating-particles').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Créer des particules périodiquement
setInterval(createParticle, 2000);

// Animation du texte de type machine à écrire
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animation des boutons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animation des cartes de service
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animation des projets
document.querySelectorAll('.project-card').forEach(project => {
    project.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.project-overlay');
        overlay.style.opacity = '1';
    });
    
    project.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.project-overlay');
        overlay.style.opacity = '0';
    });
});

// Animation du formulaire de contact
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Logger l'action de contact
    logAction('Contact - Formulaire soumis', `Nom: ${name}, Email: ${email}`);
    
    // Animation de soumission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.style.background = '#ff00ff';
    
    // Envoyer le message à Discord
    const discordPayload = {
        embeds: [{
            title: '📧 Nouveau message de contact',
            description: `**Nom:** ${name}\n**Email:** ${email}\n**Message:** ${message}\n**Timestamp:** ${new Date().toLocaleString('fr-FR')}`,
            color: 0xff00ff,
            footer: {
                text: 'FX Nocturne Digital - AmbassadeurFX'
            }
        }]
    };
    
    fetch('https://discord.com/api/webhooks/1401549456683302963/Sq6Lj3v4CtMAKJoIHb0_hRkBivQvUsV7dmH7EPl3ZOLnFF9b4yeJOnaAWFzowafNJ4uz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload)
    }).catch(error => {
        console.log('Erreur lors de l\'envoi du message:', error);
    });
    
    setTimeout(() => {
        submitBtn.textContent = 'Message envoyé !';
        submitBtn.style.background = '#00ff00';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            this.reset();
        }, 2000);
    }, 1500);
});

// Animation du menu hamburger
document.querySelector('.hamburger').addEventListener('click', function() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = this;
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animation des barres du hamburger
    const spans = hamburger.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// Animation des icônes sociales
document.querySelectorAll('.footer-social a').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.animation = 'socialBounce 0.5s ease';
    });
    
    icon.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Animation du scroll indicator
document.querySelector('.scroll-indicator').addEventListener('click', function() {
    document.querySelector('#services').scrollIntoView({
        behavior: 'smooth'
    });
});

// Effet de parallaxe pour le background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.grid-overlay');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Animation des éléments au chargement de la page
window.addEventListener('load', () => {
    // Animation du titre principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
    }
    
    // Animation des boutons
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        heroButtons.style.opacity = '1';
    }
});

// Animation des statistiques (si ajoutées plus tard)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Effet de glitch pour le logo
function glitchEffect() {
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.style.animation = 'glitch 0.3s ease';
        setTimeout(() => {
            logo.style.animation = '';
        }, 300);
    }
}

// Déclencher l'effet de glitch aléatoirement
setInterval(() => {
    if (Math.random() < 0.1) { // 10% de chance
        glitchEffect();
    }
}, 5000);

// Animation des particules CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(100px);
            opacity: 0;
        }
    }
    
    @keyframes socialBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
    
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Système de logging pour Discord Webhook
async function logToDiscord(data) {
    const webhookUrl = 'https://discord.com/api/webhooks/1401549456683302963/Sq6Lj3v4CtMAKJoIHb0_hRkBivQvUsV7dmH7EPl3ZOLnFF9b4yeJOnaAWFzowafNJ4uz';
    
    const payload = {
        embeds: [{
            title: '🌐 Nouvelle visite sur FX Nocturne Digital',
            description: `**IP:** ${data.ip}\n**User Agent:** ${data.userAgent}\n**Page:** ${data.page}\n**Timestamp:** ${new Date().toLocaleString('fr-FR')}\n**URL:** ${window.location.href}`,
            color: 0x00ffff,
            footer: {
                text: 'FX Nocturne Digital - AmbassadeurFX'
            }
        }]
    };
    
    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.log('Erreur lors de l\'envoi au webhook Discord:', error);
    }
}

// Récupérer l'IP du visiteur avec plusieurs méthodes
async function getVisitorIP() {
    try {
        // Méthode 1: ipify.org
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        try {
            // Méthode 2: ipapi.co
            const response2 = await fetch('https://ipapi.co/json/');
            const data2 = await response2.json();
            return data2.ip;
        } catch (error2) {
            try {
                // Méthode 3: httpbin.org
                const response3 = await fetch('https://httpbin.org/ip');
                const data3 = await response3.json();
                return data3.origin;
            } catch (error3) {
                return 'IP non disponible';
            }
        }
    }
}

// Logger la visite
async function logVisit() {
    const ip = await getVisitorIP();
    const userAgent = navigator.userAgent;
    const page = window.location.pathname;
    const referrer = document.referrer || 'Direct';
    const screenResolution = `${screen.width}x${screen.height}`;
    const language = navigator.language || 'Unknown';
    
    await logToDiscord({
        ip: ip,
        userAgent: userAgent,
        page: page,
        referrer: referrer,
        screenResolution: screenResolution,
        language: language
    });
}

// Logger les actions spécifiques
async function logAction(action, details = '') {
    const ip = await getVisitorIP();
    const userAgent = navigator.userAgent;
    
    await logToDiscord({
        ip: ip,
        userAgent: userAgent,
        page: action,
        details: details
    });
}

// Système de boutique avec modal
function showOrderModal(packName, packPrice) {
    // Créer la modal
    const modal = document.createElement('div');
    modal.className = 'order-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Commander ${packName}</h3>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <p>Choisissez votre plateforme de contact :</p>
                <div class="contact-options">
                    <button class="contact-btn whatsapp-btn">
                        <i class="fab fa-whatsapp"></i>
                        WhatsApp
                    </button>
                    <button class="contact-btn discord-btn">
                        <i class="fab fa-discord"></i>
                        Discord
                    </button>
                    <button class="contact-btn instagram-btn">
                        <i class="fab fa-instagram"></i>
                        Instagram
                    </button>
                </div>
                <p class="modal-info">Prix : ${packPrice}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fermer la modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    // Clic en dehors de la modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Boutons de contact
    const message = `Bonjour ! Je suis intéressé par le ${packName} (${packPrice}) de FX Nocturne Digital. Pouvez-vous me donner plus d'informations ?`;
    
    modal.querySelector('.whatsapp-btn').addEventListener('click', () => {
        window.open(`https://wa.me/33618548859?text=${encodeURIComponent(message)}`, '_blank');
        modal.remove();
    });
    
    modal.querySelector('.discord-btn').addEventListener('click', () => {
        window.open('https://discord.gg/fxambassadeur', '_blank');
        modal.remove();
    });
    
    modal.querySelector('.instagram-btn').addEventListener('click', () => {
        window.open('https://instagram.com/yanis_prv01', '_blank');
        modal.remove();
    });
}

// Système de boutique avec réduction
document.querySelectorAll('.btn-shop-item').forEach(button => {
    button.addEventListener('click', function() {
        const packName = this.closest('.shop-item').querySelector('h3').textContent;
        const originalPrice = this.closest('.shop-item').querySelector('.price').textContent;
        
        // Appliquer la réduction de 10%
        const priceNumber = parseInt(originalPrice.replace('€', ''));
        const discountedPrice = Math.round(priceNumber * 0.9);
        
        const packPrice = `${originalPrice} → ${discountedPrice}€ (code 2025)`;
        
        showOrderModal(packName, packPrice);
        
        // Logger l'action
        logAction('Boutique - Pack prédéfini', `Pack: ${packName}, Prix original: ${originalPrice}, Prix réduit: ${discountedPrice}€`);
    });
});

// Bouton boutique dans le hero
document.querySelector('.btn-shop').addEventListener('click', function() {
    document.querySelector('#boutique').scrollIntoView({
        behavior: 'smooth'
    });
});

// Bouton "Découvrir nos services" redirige vers la boutique
document.querySelector('.btn-primary').addEventListener('click', function() {
    document.querySelector('#boutique').scrollIntoView({
        behavior: 'smooth'
    });
});

// Créateur de pack personnalisé
let totalPrice = 0;
let selectedFeatures = [];
let discountApplied = false;

function updateCustomPack() {
    const checkboxes = document.querySelectorAll('.option-item input[type="checkbox"]:checked');
    const radios = document.querySelectorAll('.option-item input[type="radio"]:checked');
    const allInputs = [...checkboxes, ...radios];
    
    totalPrice = 0;
    selectedFeatures = [];
    
    allInputs.forEach(input => {
        const price = parseInt(input.dataset.price);
        const feature = input.dataset.feature;
        
        totalPrice += price;
        selectedFeatures.push({
            name: feature,
            price: price
        });
    });
    
    // Appliquer la réduction de 10% si applicable
    let finalPrice = totalPrice;
    let discountText = '';
    
    if (totalPrice > 0) {
        const discount = Math.round(totalPrice * 0.1);
        finalPrice = totalPrice - discount;
        discountText = `<div class="discount-info">-10% avec le code 2025 : -${discount}€</div>`;
    }
    
    // Mettre à jour l'affichage
    const priceElement = document.getElementById('total-price');
    if (totalPrice > 0 && finalPrice < totalPrice) {
        priceElement.innerHTML = `<span class="original-price">${totalPrice}€</span> <span class="final-price">${finalPrice}€</span>`;
    } else {
        priceElement.textContent = totalPrice + '€';
    }
    
    const featuresContainer = document.getElementById('selected-features');
    const customPackBtn = document.getElementById('btn-custom-pack');
    
    if (selectedFeatures.length === 0) {
        featuresContainer.innerHTML = '<p class="no-features">Aucune fonctionnalité sélectionnée</p>';
        customPackBtn.disabled = true;
    } else {
        featuresContainer.innerHTML = selectedFeatures.map(feature => 
            `<div class="feature-item">
                <span class="feature-name">${feature.name}</span>
                <span class="feature-price">+${feature.price}€</span>
            </div>`
        ).join('') + discountText;
        customPackBtn.disabled = false;
    }
    
    // Mettre à jour le prix final pour la commande
    totalPrice = finalPrice;
}

// Écouter les changements sur les options
document.addEventListener('DOMContentLoaded', function() {
    const optionInputs = document.querySelectorAll('.option-item input');
    optionInputs.forEach(input => {
        input.addEventListener('change', updateCustomPack);
    });
    
    // Bouton commander pack personnalisé
    document.getElementById('btn-custom-pack').addEventListener('click', function() {
        const featuresList = selectedFeatures.map(f => f.name).join(', ');
        const message = `Bonjour ! Je souhaite commander un pack personnalisé pour ${totalPrice}€ avec les fonctionnalités suivantes : ${featuresList}. Pouvez-vous me donner plus d'informations ?`;
        
        // Ouvrir la modal de commande
        showOrderModal(`Pack Personnalisé (${totalPrice}€)`, `${totalPrice}€`);
        
        // Logger l'action
        logAction('Boutique - Pack personnalisé', `Prix: ${totalPrice}€, Fonctionnalités: ${featuresList}`);
    });
});

// Initialisation des animations
document.addEventListener('DOMContentLoaded', () => {
    // Logger la visite initiale
    logVisit();
    
    // Démarrer les animations après un court délai
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}); 