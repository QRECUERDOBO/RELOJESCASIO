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
        { color: 'Negro fondo azul', price: 200, images: ['negrofondoazul1.jpg', 'negrofondoazul2.jpg', 'negrofondoazul3.jpg', 'negrofondoazul4.jpg'] },
        { color: 'Dorado fondo azul', price: 200, images: ['doradondoazul1.jpg', 'doradondoazul2.jpg', 'doradondoazul3.jpg', 'doradondoazul4.jpg'] }
    ],
    UNISEX: [
        { color: 'Dorado', price: 100, images: ['dorado1.jpg', 'dorado2.jpg', 'dorado3.jpg', 'dorado4.jpg'] },
        { color: 'Negro', price: 100, images: ['negro1.jpg', 'negro2.jpg', 'negro3.jpg', 'negro4.jpg'] }
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

        const mainImage = watch.images[0]; // Primera imagen del array

        card.innerHTML = `
            <img src="${mainImage}" alt="${model} ${watch.color}" class="product-image" onerror="this.src='placeholder.jpg'">
            <div class="product-info">
                <h3>${model} - ${watch.color}</h3>
                <p class="price">${watch.price} Bs.</p>
                <button onclick="openModal('${model}', '${watch.color}', ${watch.price}, '${watch.images.join(",")}')" class="whatsapp-button">
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

    // Mensaje para WhatsApp
    const message = encodeURIComponent(`Me gusta este modelo y color "${model} - ${color}" ¿Cómo puedo adquirirlo?`);
    whatsappButton.href = `https://wa.me/59172645173?text=${message}`;

    // Agregar imágenes al modal
    modalImages.innerHTML = '';
    images.split(',').forEach(img => {
        modalImages.innerHTML += `
            <img src="${img}" alt="${model} ${color}" class="modal-image" onerror="this.src='placeholder.jpg'">
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
