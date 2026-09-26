// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open);
        navToggle.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Project filter (projects page only)
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            const match = filter === 'all' || card.dataset.category.split(' ').includes(filter);
            card.classList.toggle('is-hidden', !match);
        });

        // Hide a category heading when none of its projects match
        document.querySelectorAll('.project-group').forEach(group => {
            const visible = group.querySelector('.project-card:not(.is-hidden)');
            group.classList.toggle('is-hidden', !visible);
        });
    });
});

// Lightbox for board galleries: links with data-lightbox open the full image in an overlay
const galleryLinks = document.querySelectorAll('a[data-lightbox]');
if (galleryLinks.length) {
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<button aria-label="Close"><i class="fas fa-xmark"></i></button><img alt=""><p></p>';
    document.body.appendChild(box);
    const img = box.querySelector('img');
    const caption = box.querySelector('p');
    const close = () => { box.classList.remove('open'); img.src = ''; };

    galleryLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            img.src = link.href;
            img.alt = link.querySelector('img')?.alt || '';
            caption.textContent = link.dataset.caption || img.alt;
            box.classList.add('open');
        });
    });
    box.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// Keep the footer year current
document.querySelectorAll('.year').forEach(el => { el.textContent = new Date().getFullYear(); });
