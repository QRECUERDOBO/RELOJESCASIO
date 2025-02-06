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
        { color: 'Plateado fondo azul', price: 200, images: ['plateadofondoazul1.jpg', 'plateadofondoazul2.jpg', 'plateadofondoazul3.jpg', 'plateadofondoazul4.PNG'] },
        { color: 'Plateado fondo negro', price: 200, images: ['plateadofondonegro1.jpg', 'plateadofondonegro2.jpg', 'plateadofondonegro3.jpg', 'plateadofondonegro4.jpg'] },
        { color: 'Plateado fondo plata', price: 200, images: ['plateadofondoplata1.jpg', 'plateadofondoplata2.jpg', 'plateadofondoplata3.jpg', 'plateadofondoplata4.jpg'] },
        { color: 'Negro fondo azul', price: 200, images: ['negrofondoazul1.jpg', 'negrofondoazul2.jpg', 'negrofondoazul3.jpg', 'negrofondoazul4.jpg'] },
        { color: 'Negro fondo negro', price: 200, images: ['negrofondonegro1.jpg', 'negrofondonegro2.jpg', 'negrofondonegro3.jpg', 'negrofondonegro4.jpg'] },
        { color: 'Negro fondo plata', price: 200, images: ['negrofondoplata1.jpg', 'negrofondoplata2.jpg', 'negrofondoplata3.jpg', 'negrofondoplata4.jpg'] },
        { color: 'Dorado fondo azul', price: 200, images: ['doradondoazul1.jpg', 'doradondoazul2.jpg', 'doradondoazul3.jpg', 'doradondoazul4.jpg'] },
        { color: 'Dorado fondo plata', price: 200, images: ['doradondoplata1.jpg', 'doradondoplata2.jpg', 'doradondoplata3.jpg', 'doradondoplata4.jpg'] },
        { color: 'Dorado fondo dorado', price: 200, images: ['doradondodorado1.jpg', 'doradondodorado2.jpg', 'doradondodorado3.jpg', 'doradondodorado4.jpg'] }
    ],
    UNISEX: [
        { color: 'Dorado', price: 100, images: ['dorado1.jpg', 'dorado2.jpg', 'dorado3.jpg', 'dorado4.jpg'] },
        { color: 'Rosa Gold', price: 100, images: ['rosagold1.jpg', 'rosagold2.jpg', 'rosagold3.jpg', 'rosagold4.jpg'] },
        { color: 'Negro', price: 100, images: ['negro1.jpg', 'negro2.jpg', 'negro3.jpg', 'negro4.jpg'] },
        { color: 'Plateado', price: 100, images: ['plateado1.jpg', 'plateado2.jpg', 'plateado3.jpg', 'plateado4.jpg'] }
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

        // Seleccionamos la primera imagen como la imagen principal de la tarjeta
        const mainImage = `images/${watch.images[0]}`;

        card.innerHTML = `
            <img src="${mainImage}" alt="${model} ${watch.color}" class="product-image">
            <div class="product-info">
                <h3>${model} - ${watch.color}</h3>
                <p class="price">${watch.price} Bs.</p>
                <button onclick="openModal('${model}', '${watch.color}', ${watch.price}, ${JSON.stringify(watch.images)})" class="whatsapp-button">
                    Ver Detalles
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

function openModal(model, color, price, images) {
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

    // Add images to the modal
    modalImages.innerHTML = '';
    images = JSON.parse(images); // Convertir de string a array
    images.forEach(img => {
        modalImages.innerHTML += `
            <img src="images/${img}" alt="${model} ${color}" class="modal-image">
        `;
    });

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
