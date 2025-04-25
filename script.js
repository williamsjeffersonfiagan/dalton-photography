document.addEventListener('DOMContentLoaded', function() {
    // Menu burger
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });
    
    // Images de portfolio
    const galleryItems = [
        { img: 'images/portrait/IMG_0741.jpg', category: 'portrait', title: 'Portrait masculin' },
        { img: 'images/portrait/IMG_0751.jpg', category: 'portrait', title: 'Portrait' },
        { img: 'images/miss/IMG_9426.jpg', category: 'miss', title: 'evenement' },
        { img: 'images/eglise/IMG_1438 - Copie.jpg', category: 'Eglise', title: 'culte' },
        { img: 'images/eglise/IMG_1521.jpg', category: 'Eglise', title: 'culte' },
        { img: 'images/eglise/IMG_1542.jpg', category: 'Eglise', title: 'culte' },
        { img: 'images/football/IMG_3185-109.JPG', category: 'paysage', title: 'football' },
        { img: 'images/football/IMG_3198-122.JPG', category: 'paysage', title: 'football' },
        { img: 'images/football/IMG_3205-129.JPG', category: 'paysage', title: 'football' },
        { img: 'images/nature/IMG_8714.JPG', category: 'nature', title: 'Séance nature' },
        { img: 'images/nature/IMG_8718.JPG', category: 'nature', title: 'nature' },
        { img: 'images/nature/IMG_8719.JPG', category: 'nature', title: 'nature' }
    ];
    
    const gallery = document.querySelector('.gallery');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Charger les images
    function loadGalleryItems(items) {
        gallery.innerHTML = '';
        
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${item.category}`;
            galleryItem.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="overlay">
                    <h3>${item.title}</h3>
                    <p>${item.category}</p>
                </div>
            `;
            gallery.appendChild(galleryItem);
            
            // Ajouter l'événement click pour le modal
            galleryItem.addEventListener('click', () => {
                openModal(item.img, item.title);
            });
        });
    }
    
    // Filtrer les images
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            if (filter === 'all') {
                loadGalleryItems(galleryItems);
            } else {
                const filteredItems = galleryItems.filter(item => item.category === filter);
                loadGalleryItems(filteredItems);
            }
        });
    });
    
    // Charger toutes les images au démarrage
    loadGalleryItems(galleryItems);
    
    // Modal
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');
    
    function openModal(imgSrc, caption) {
        modal.style.display = 'block';
        modalImg.src = imgSrc;
        modalCaption.innerHTML = caption;
        document.body.style.overflow = 'hidden';
    }
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Notification
    const notification = document.getElementById('notification');
    
    function showNotification(message, type = 'success') {
        notification.textContent = message;
        notification.className = 'notification show';
        
        if (type === 'error') {
            notification.style.backgroundColor = '#e74c3c';
        } else {
            notification.style.backgroundColor = '#2ecc71';
        }
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Formulaire de réservation
    const bookingForm = document.getElementById('booking-form');
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);
        
        
        console.log('Données de réservation:', data);
        
        // Afficher une notification
        showNotification('Votre demande de réservation a été envoyée avec succès !');
        
        // Réinitialiser le formulaire
        bookingForm.reset();
    });
    
    // Formulaire de contact
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        
        console.log('Message de contact:', data);
        
        // Afficher une notification
        showNotification('Votre message a été envoyé avec succès !');
        
        // Réinitialiser le formulaire
        contactForm.reset();
    });
    
    // Newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input').value;
        
        
        console.log('Email newsletter:', email);
        
        // Afficher une notification
        showNotification('Merci pour votre inscription à notre newsletter !');
        
        // Réinitialiser le formulaire
        newsletterForm.reset();
    });
    
    // Animation au défilement
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.about-content, .service-card, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Ajouter des styles initiaux pour l'animation
    document.querySelectorAll('.about-content, .service-card, .contact-content').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter une fois au chargement
});