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
        { color: 'Plateado → Azul', price: 200, images: ['plateadofondoazul1.jpg', 'plateadofondoazul2.jpg', 'plateadofondoazul3.jpg', 'plateadofondoazul4.PNG'], details: 'Regulables, resistente al agua, con fecha, Acero inoxidable.' },
        { color: 'Plateado → Negro', price: 200, images: ['plateadofondonegro1.jpg', 'plateadofondonegro2.jpg', 'plateadofondonegro3.jpg', 'plateadofondonegro4.jpg'], details: 'Regulables, resistente al agua, con fecha, Acero inoxidable.' },
        { color: 'Negro → Azul', price: 200, images: ['negrofondoazul1.jpg', 'negrofondoazul2.jpg', 'negrofondoazul3.jpg', 'negrofondoazul4.jpg'], details: 'Regulables, resistente al agua, con fecha, Acero inoxidable.' },
        { color: 'Plateado → Celeste', price: 200, images: ['plateadofondoceleste1.jpg', 'plateadofondoceleste2.jpg', 'plateadofondoceleste3.jpg', 'plateadofondoceleste4.jpg'], details: 'Regulables, resistente al agua, con fecha, Acero inoxidable.' },
        { color: 'Plateado → Blanco', price: 200, images: ['plateadofondoblanco1.jpg', 'plateadofondoblanco2.jpg', 'plateadofondoblanco3.jpg', 'plateadofondoblanco4.jpg'], details: 'Regulables, resistente al agua, con fecha, Acero inoxidable.' },
        { color: 'Plateado → Calipso', price: 200, images: ['plateadofondocalipso1.jpg', 'plateadofondocalipso2.jpg', 'plateadofondocalipso3.jpg', 'plateadofondocalipso4.jpg'], details: 'Regulables, resistente al agua, con fecha, Acero inoxidable.' },
        { color: 'Dorado → Dorado', price: 200, images: ['doradofondodorado1.jpg', 'doradofondodorado2.jpg', 'doradofondodorado3.jpg', 'doradofondodorado4.jpg'], details: 'Regulables, resistente al agua, con fecha, Acero inoxidable.' },
         { color: 'Negro → Negro', price: 200, images: ['negrofondonegro1.jpg', 'negrofondonegro2.jpg', 'negrofondonegro3.jpg', 'negrofondonegro4.jpg'], details: 'Regulables, resistente al agua, con fecha, Acero inoxidable.' }
  
    ], 
    UNISEX: [
        { color: 'Dorado', price: 100, images: ['dorado1.jpg', 'dorado2.jpg', 'dorado3.jpg', 'dorado4.jpg'], details: 'Regulables, resistente al agua, Acero inoxidable.' },
        { color: 'Negro', price: 100, images: ['negro1.jpg', 'negro2.jpg', 'negro3.jpg', 'negro4.jpg'], details: 'Regulables, resistente al agua, Acero inoxidable.' },
        { color: 'Plateado', price: 100, images: ['plateado1.jpg', 'plateado2.jpg', 'plateado3.jpg', 'plateado4.jpg'], details: 'Regulables, resistente al agua, Acero inoxidable.' },
        { color: 'Rosa Gold', price: 100, images: ['rosado1.jpg', 'rosado2.jpg', 'rosado3.jpg', 'rosado4.jpg'], details: 'Regulables, resistente al agua, Acero inoxidable.' }
    ],
    "CASIO REDONDO": [
        { color: 'Negro → Negro ', price: 250, images: ['casio_redondo_negro1.jpg', 'casio_redondo_negro2.jpg', 'casio_redondo_negro3.jpg', 'casio_redondo_negro4.jpg'], details: 'Regulables, resistente al agua.' },
        { color: 'Dorado → Dorado', price: 250, images: ['casio_redondo_dorado1.jpg', 'casio_redondo_dorado2.jpg', 'casio_redondo_dorado3.jpg', 'casio_redondo_dorado4.jpg'], details: 'Regulables, resistente al agua.' },
        { color: 'Dorado → Negro', price: 250, images: ['casio_redondo_doradonegro1.jpg', 'casio_redondo_doradonegro2.jpg', 'casio_redondo_doradonegro3.jpg', 'casio_redondo_doradonegro4.jpg'], details: 'Regulables, resistente al agua.' },
        { color: 'Plateado → Blanco', price: 250, images: ['casio_redondo_plateado1.jpg', 'casio_redondo_plateado2.jpg', 'casio_redondo_plateado3.jpg', 'casio_redondo_plateado4.jpg'], details: 'Regulables, resistente al agua.' }
    ],
    "CASIO NUEVO": [
        { color: 'Plateado', price: 250, images: ['casio_nuevo_plateado1.jpg', 'casio_nuevo_plateado2.jpg'], details: 'Regulable, resistente al agua.' }
    ],
   "RELOJ OFERTA 50BS 'WOMEN'": [
    { 
        color: 'Oferta Especial', 
        price: 50, 
        images: ['reloj1.jpg', 'reloj2.jpg', 'reloj3.jpg', 'reloj25.jpg', 'reloj6.jpg', 'reloj7.jpg', 'reloj8.jpg', 'reloj9.jpg', 'reloj10.jpg'], 
        details: 'Reloj oferta, precio 50bs. Promoción 2 x 90bs.' 
    }
]

};

// Verifica si estamos en la página de modelos
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productsGrid')) {
        displayProducts('CASIO');

        document.querySelectorAll('.model-button').forEach(button => {
            button.addEventListener('click', (e) => {
                document.querySelectorAll('.model-button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                displayProducts(e.target.dataset.model);
            });
        });

        document.querySelector('.close-button').addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('productModal')) {
                closeModal();
            }
        });

        document.getElementById('prevImage').addEventListener('click', prevImage);
        document.getElementById('nextImage').addEventListener('click', nextImage);
    }
});

function displayProducts(model) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    watches[model].forEach((watch, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100).toString());

        const mainImage = watch.images[0];

        card.innerHTML = `
            <img src="${mainImage}" alt="${model} ${watch.color}" class="product-image" onerror="this.src='placeholder.jpg'">
            <div class="product-info">
                <h3>${model} - ${watch.color}</h3>
                <p class="price">${watch.price} Bs.</p>
                <button onclick="openModal('${model}', '${watch.color}', ${watch.price}, '${watch.images.join(",")}', '${watch.details}')" class="whatsapp-button">
                    Ver Detalles
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

let currentImages = [];
let currentIndex = 0;

function openModal(model, color, price, images, details) {
    currentImages = images.split(',');
    currentIndex = 0;

    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = modal.querySelector('h2');
    const modalPrice = modal.querySelector('.price');
    const modalDetails = modal.querySelector('.details');
    const whatsappButton = modal.querySelector('.whatsapp-button');

    modalTitle.textContent = `${model} - ${color}`;
    
    // Si es la opción "RELOJ OFERTA 50BS 'WOMEN'", personalizamos los detalles
    if (model === "RELOJ OFERTA 50BS 'WOMEN'") {
        modalPrice.innerHTML = `<strong>Precio:</strong> 50 Bs.<br><strong>Promoción:</strong> 2 x 90 Bs.`;
    } else {
        modalPrice.textContent = `${price} Bs.`;
    }
    
    modalDetails.textContent = `Características: ${details}`;
    
    // Mostrar solo la primera imagen si es "RELOJ OFERTA 50BS 'WOMEN'"
    modalImage.src = currentImages[0];

    // Mensaje personalizado para WhatsApp
    const message = encodeURIComponent(`Me interesa el modelo "RELOJ OFERTA 50BS WOMEN". ¿Cómo puedo adquirirlo?`);
    whatsappButton.href = `https://wa.me/59172645173?text=${message}`;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}


function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function prevImage() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentImages.length - 1;
    document.getElementById('modalImage').src = currentImages[currentIndex];
}

function nextImage() {
    currentIndex = (currentIndex < currentImages.length - 1) ? currentIndex + 1 : 0;
    document.getElementById('modalImage').src = currentImages[currentIndex];
}
