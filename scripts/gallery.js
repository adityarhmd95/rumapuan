/**
 * Ramapuan - Gallery JavaScript
 * Handles filtering and lightbox functionality
 */

// ==========================================================================
// Gallery State
// ==========================================================================
const galleryState = {
  currentFilter: 'all',
  currentIndex: 0,
  items: [],
  filteredItems: [],
  isLightboxOpen: false
};

// ==========================================================================
// Gallery Filters
// ==========================================================================
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length === 0 || galleryItems.length === 0) return;

  // Store all gallery items
  galleryState.items = Array.from(galleryItems);
  galleryState.filteredItems = galleryState.items;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
      button.classList.add('filter-btn--active');

      // Filter gallery items
      filterGallery(filter);
    });
  });
}

function filterGallery(filter) {
  galleryState.currentFilter = filter;

  galleryState.items.forEach(item => {
    const category = item.dataset.category;
    const shouldShow = filter === 'all' || category === filter;

    if (shouldShow) {
      item.classList.remove('gallery-item--hidden');
      item.style.display = '';
    } else {
      item.classList.add('gallery-item--hidden');
      item.style.display = 'none';
    }
  });

  // Update filtered items for lightbox navigation
  galleryState.filteredItems = galleryState.items.filter(item => {
    return !item.classList.contains('gallery-item--hidden');
  });
}

// ==========================================================================
// Lightbox
// ==========================================================================
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');

  if (!lightbox || galleryItems.length === 0) return;

  const lightboxImage = lightbox.querySelector('.lightbox__image');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.lightbox__nav--next');

  // Click on gallery item to open lightbox
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      // Find index in filtered items
      const filteredIndex = galleryState.filteredItems.indexOf(item);
      if (filteredIndex !== -1) {
        openLightbox(filteredIndex);
      }
    });

    // Keyboard accessibility for gallery items
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View image ${index + 1}`);

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const filteredIndex = galleryState.filteredItems.indexOf(item);
        if (filteredIndex !== -1) {
          openLightbox(filteredIndex);
        }
      }
    });
  });

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  // Navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', showPrevImage);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', showNextImage);
  }

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', handleLightboxKeyboard);
}

function openLightbox(index) {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  galleryState.currentIndex = index;
  galleryState.isLightboxOpen = true;

  updateLightboxImage();

  lightbox.classList.add('lightbox--open');
  lightbox.setAttribute('aria-hidden', 'false');

  // Prevent body scroll
  document.body.style.overflow = 'hidden';

  // Focus the lightbox for keyboard navigation
  const closeBtn = lightbox.querySelector('.lightbox__close');
  if (closeBtn) {
    closeBtn.focus();
  }
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  galleryState.isLightboxOpen = false;

  lightbox.classList.remove('lightbox--open');
  lightbox.setAttribute('aria-hidden', 'true');

  // Restore body scroll
  document.body.style.overflow = '';

  // Return focus to the gallery item that was clicked
  const currentItem = galleryState.filteredItems[galleryState.currentIndex];
  if (currentItem) {
    currentItem.focus();
  }
}

function updateLightboxImage() {
  const lightboxImage = document.querySelector('.lightbox__image');
  if (!lightboxImage) return;

  const currentItem = galleryState.filteredItems[galleryState.currentIndex];
  if (!currentItem) return;

  // Get the image source from the gallery item
  const img = currentItem.querySelector('img');
  const src = img ? img.src : '';
  const alt = img ? img.alt : `Image ${galleryState.currentIndex + 1}`;

  // If it's a placeholder (no actual image), just update the alt text
  if (lightboxImage.tagName === 'DIV') {
    lightboxImage.setAttribute('aria-label', alt);
  } else {
    lightboxImage.src = src;
    lightboxImage.alt = alt;
  }

  // Update navigation button states
  updateNavButtons();
}

function updateNavButtons() {
  const prevBtn = document.querySelector('.lightbox__nav--prev');
  const nextBtn = document.querySelector('.lightbox__nav--next');

  if (prevBtn) {
    prevBtn.disabled = galleryState.currentIndex === 0;
    prevBtn.style.opacity = galleryState.currentIndex === 0 ? '0.5' : '1';
  }

  if (nextBtn) {
    const lastIndex = galleryState.filteredItems.length - 1;
    nextBtn.disabled = galleryState.currentIndex === lastIndex;
    nextBtn.style.opacity = galleryState.currentIndex === lastIndex ? '0.5' : '1';
  }
}

function showPrevImage() {
  if (galleryState.currentIndex > 0) {
    galleryState.currentIndex--;
    updateLightboxImage();
  }
}

function showNextImage() {
  if (galleryState.currentIndex < galleryState.filteredItems.length - 1) {
    galleryState.currentIndex++;
    updateLightboxImage();
  }
}

function handleLightboxKeyboard(e) {
  if (!galleryState.isLightboxOpen) return;

  switch (e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      showPrevImage();
      break;
    case 'ArrowRight':
      e.preventDefault();
      showNextImage();
      break;
    case 'Tab':
      // Trap focus within lightbox
      trapFocus(e);
      break;
  }
}

function trapFocus(e) {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  const focusableElements = lightbox.querySelectorAll(
    'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.shiftKey) {
    // Shift + Tab
    if (document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
  } else {
    // Tab
    if (document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
}

// ==========================================================================
// Initialize Gallery
// ==========================================================================
function initGallery() {
  initGalleryFilters();
  initLightbox();
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGallery);
} else {
  initGallery();
}
