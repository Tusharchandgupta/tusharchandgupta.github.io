document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle (accessible)
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu') || document.querySelector('.nav-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            const expanded = mobileMenu.getAttribute('aria-expanded') === 'true';
            mobileMenu.setAttribute('aria-expanded', (!expanded).toString());
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        }
    }));

    // Smooth Scrolling for Anchor Links (skip generic '#')
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // ignore placeholder links
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // Contact Form Handling (Simulation)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            
            // Simulate network request and show accessible toast
            setTimeout(() => {
                showToast('Thank you — I will get back to you soon!');
                contactForm.reset();
                btn.innerText = originalText;
            }, 900);
        });
    }

    // Scroll Animation (Optional Polish)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.project-card, .skill-item').forEach((el) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Small accessible toast utility
function showToast(message, timeout = 3000) {
    let toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerText = message;
    document.body.appendChild(toast);
    // allow CSS transition
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, timeout);
}
