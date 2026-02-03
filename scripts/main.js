/**
 * Ramapuan - Main JavaScript
 * A minimalist, women-focused multi-service business website
 */

// ==========================================================================
// Site Configuration
// ==========================================================================
const siteConfig = {
  businessName: 'Ramapuan',
  tagline: 'A Minimal Space for Women to Gather, Recharge, and Thrive',

  // WhatsApp configuration
  whatsapp: {
    number: '6281234567890', // Replace with actual number
    defaultMessage: 'Hai Ramapuan, saya mau tanya info.'
  },

  // Contact information
  contact: {
    address: 'Your Address Here, City, Indonesia',
    phone: '+62 812 3456 7890',
    email: 'hello@ramapuan.com'
  },

  // Operating hours
  hours: {
    cafe: {
      weekdays: '08:00 - 21:00',
      weekends: '09:00 - 22:00'
    },
    salon: {
      daily: '10:00 - 20:00 (by appointment)'
    },
    gym: {
      daily: '06:00 - 22:00 (by booking)'
    },
    venue: {
      daily: 'By reservation'
    }
  },

  // Social media links (placeholders)
  social: {
    instagram: 'https://instagram.com/ramapuan',
    facebook: 'https://facebook.com/ramapuan',
    tiktok: 'https://tiktok.com/@ramapuan'
  },

  // Prefilled WhatsApp messages for each service
  messages: {
    general: "Hai Ramapuan, saya mau tahu lebih banyak soal layanan kalian.",
    cafe: "Hai Ramapuan, mau tanya soal kafe (jam buka/menu).",
    venue: "Hai Ramapuan, saya mau booking venue.\n\nTanggal: [ ]\nJumlah tamu: [ ]\nAcara: [ ]\nWaktu: [ ]",
    salon: "Hai Ramapuan, saya mau booking salon khusus wanita.\n\nTanggal: [ ]\nLayanan: [ ]",
    gym: "Hai Ramapuan, saya mau sewa ruang gym privat khusus wanita.\n\nTanggal: [ ]\nDurasi: [ ]\nTrainer: [Ya/Tidak]"
  }
};

// ==========================================================================
// WhatsApp Link Builder
// ==========================================================================
/**
 * Builds a WhatsApp chat link with optional prefilled message
 * @param {string} serviceKey - Key from siteConfig.messages or custom message
 * @param {Object} extraFields - Additional fields to append to message
 * @returns {string} WhatsApp chat URL
 */
function buildWhatsAppLink(serviceKey = 'general', extraFields = {}) {
  const baseUrl = 'https://wa.me/';
  const number = siteConfig.whatsapp.number;

  // Get the base message
  let message = siteConfig.messages[serviceKey] || siteConfig.messages.general;

  // Append extra fields if provided
  if (Object.keys(extraFields).length > 0) {
    const fieldString = Object.entries(extraFields)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    message += '\n\n' + fieldString;
  }

  // URL encode the message
  const encodedMessage = encodeURIComponent(message);

  return `${baseUrl}${number}?text=${encodedMessage}`;
}

/**
 * Opens WhatsApp link in a new tab
 * @param {string} serviceKey - Service type key
 * @param {Object} extraFields - Additional fields
 */
function openWhatsApp(serviceKey = 'general', extraFields = {}) {
  const link = buildWhatsAppLink(serviceKey, extraFields);
  window.open(link, '_blank', 'noopener,noreferrer');
}

// ==========================================================================
// Mobile Navigation
// ==========================================================================
function initMobileNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');

  if (!menuToggle || !mobileNav) return;

  // Toggle menu
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileNav.setAttribute('aria-hidden', isExpanded);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  });

  // Close menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.getAttribute('aria-hidden') === 'false') {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      menuToggle.focus();
    }
  });
}

// ==========================================================================
// Smooth Scroll
// ==========================================================================
function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      // Skip if it's just "#"
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        // Get header height for offset
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Set focus to target for accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}

// ==========================================================================
// WhatsApp Buttons
// ==========================================================================
function initWhatsAppButtons() {
  // General WhatsApp buttons
  const waButtons = document.querySelectorAll('[data-wa-service]');

  waButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const service = button.dataset.waService || 'general';
      openWhatsApp(service);
    });
  });

  // Floating WhatsApp button
  const floatingBtn = document.querySelector('.whatsapp-float__btn');
  if (floatingBtn) {
    floatingBtn.href = buildWhatsAppLink('general');
  }
}

// ==========================================================================
// Contact Form to WhatsApp
// ==========================================================================
function initContactForm() {
  const form = document.querySelector('#contact-form');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = new FormData(form);
    const name = formData.get('name') || '';
    const service = formData.get('service') || '';
    const datetime = formData.get('datetime') || '';
    const message = formData.get('message') || '';

    // Build custom message
    let waMessage = `Hai Ramapuan, saya mau tanya.`;
    waMessage += `\n\nNama: ${name}`;
    if (service) waMessage += `\nLayanan: ${service}`;
    if (datetime) waMessage += `\nTanggal/Waktu yang diinginkan: ${datetime}`;
    if (message) waMessage += `\n\nPesan:\n${message}`;

    // Open WhatsApp with the compiled message
    const link = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(waMessage)}`;
    window.open(link, '_blank', 'noopener,noreferrer');
  });
}

// ==========================================================================
// Dynamic Content Injection
// ==========================================================================
function injectDynamicContent() {
  // Inject current year in footer
  const yearElements = document.querySelectorAll('[data-year]');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });

  // Inject business name where needed
  const nameElements = document.querySelectorAll('[data-business-name]');
  nameElements.forEach(el => {
    el.textContent = siteConfig.businessName;
  });

  // Update WhatsApp floating button link
  const floatingWaBtn = document.querySelector('.whatsapp-float__btn');
  if (floatingWaBtn) {
    floatingWaBtn.href = buildWhatsAppLink('general');
  }
}

// ==========================================================================
// Active Navigation Link
// ==========================================================================
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;

    // Check if current path matches or starts with link path (for nested pages)
    if (currentPath === linkPath ||
        (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('nav__link--active');
    } else {
      link.classList.remove('nav__link--active');
    }
  });
}

// ==========================================================================
// Intersection Observer for Animations (optional enhancement)
// ==========================================================================
function initScrollAnimations() {
  // Only run if user hasn't requested reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const animatedElements = document.querySelectorAll('.card, .value-item, .content-box');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }
}

// ==========================================================================
// Initialize
// ==========================================================================
function init() {
  initMobileNav();
  initSmoothScroll();
  initWhatsAppButtons();
  initContactForm();
  injectDynamicContent();
  setActiveNavLink();
  initScrollAnimations();
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for use in other scripts if needed
window.siteConfig = siteConfig;
window.buildWhatsAppLink = buildWhatsAppLink;
window.openWhatsApp = openWhatsApp;
