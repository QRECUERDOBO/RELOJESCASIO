// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true
    });
});

// Watch Data
const watches = {
    CASIO: [
        { color: 'Plateado fondo azul', price: 200, images: [1,2,3,4] },
        { color: 'Plateado fondo negro', price: 200, images: [1,2,3,4] },
        { color: 'Plateado fondo plata', price: 200, images: [1,2,3,4] },
        { color: 'Negro fondo azul', price: 200, images: [1,2,3,4] },
        { color: 'Negro fondo negro', price: 200, images: [1,2,3,4] },
        { color: 'Negro fondo plata', price: 200, images: [1,2,3,4] },
        { color: 'Dorado fondo azul', price: 200, images: [1,2,3,4] },
        { color: 'Dorado fondo plata', price: 200, images: [1,2,3,4] },
        { color: 'Dorado fondo dorado', price: 200, images: [1,2,3,4] }
    ],
    UNISEX: [
        { color: 'Dorado', price: 100, images: [1,2,3,4] },
        { color: 'Rosa Gold', price: 100, images: [1,2,3,4] },
        { color: 'Negro', price: 100, images: [1,2,3,4] },
        { color: 'Plateado', price: 100, images: [1,2,3,4] }
    ]
};

// Check if we're on the models page
if (document.querySelector('.model-selector')) {
    // Initialize products display
    displayProducts('CASIO');

    // Add event listeners to model buttons
    document.querySelectorAll('.model-button').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.model-button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            displayProducts(e.target.dataset.model);
        });
    });

    // Add modal close functionality
    document.querySelector('.close-button').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('productModal')) {
            closeModal();
        }
    });
}

function displayProducts(model) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    watches[model].forEach((watch, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100).toString());

        card.innerHTML = `
            <img src="/api/placeholder/400/400" alt="${model} ${watch.color}" class="product-image">
            <div class="product-info">
                <h3>${model} - ${watch.color}</h3>
                <p class="price">${watch.price} Bs.</p>
                <button onclick="openModal('${model}', '${watch.color}', ${watch.price})" class="whatsapp-button">
                    Ver Detalles
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

function openModal(model, color, price) {
    const modal = document.getElementById('productModal');
    const modalImages = modal.querySelector('.modal-images');
    const modalTitle = modal.querySelector('h2');
    const modalPrice = modal.querySelector('.price');
    const whatsappButton = modal.querySelector('.whatsapp-button');

    modalTitle.textContent = `${model} - ${color}`;
    modalPrice.textContent = `${price} Bs.`;

    // Generate WhatsApp message
    const message = encodeURIComponent(
        `Me gusta este modelo y color "${model} - ${color}" ¿Cómo puedo adquirirlo?`
    );
    whatsappButton.href = `https://wa.me/59172645173?text=${message}`;

    // Add images
    modalImages.innerHTML = '';
    for (let i = 1; i <= 4; i++) {
        modalImages.innerHTML += `
            <img src="/api/placeholder/400/400" alt="${model} ${color} - Imagen ${i}" class="modal-image">
        `;
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add animation to hero section images on index page
if (document.querySelector('.hero-images')) {
    const images = document.querySelectorAll('.hero-images img');
    images.forEach((img, index) => {
        img.style.animationDelay = `${index * 0.2}s`;
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add parallax effect to hero section
if (document.querySelector('.hero')) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add intersection observer for animation triggers
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature, .product-card').forEach(element => {
    observer.observe(element);
});
