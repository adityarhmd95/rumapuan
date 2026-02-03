# Ramapuan Website

A minimalist, multi-page static website for **Ramapuan** — a women-focused multi-service business offering:

- Cafe
- Event Venue (bookable for gatherings, engagements/lamaran, etc.)
- Women-only Salon
- Women-only Private Gym Room

## Overview

Ramapuan is a calm, modern destination for women — a place to enjoy coffee, beauty care, host events, and access private training space. The website reflects this positioning with:

- Minimalist, calm aesthetic
- Soft, women-centric color palette (muted rose accent)
- Clean typography and generous whitespace
- Mobile-first responsive design
- Full accessibility support

## Tech Stack

- Pure HTML5
- CSS3 (custom properties, flexbox, grid)
- Vanilla JavaScript (no frameworks or libraries)
- No backend required

## Project Structure

```
/site
├── index.html              # Homepage
├── robots.txt              # Search engine directives
├── sitemap.xml             # XML sitemap for SEO
├── /assets
│   └── /icons
│       └── whatsapp.svg    # WhatsApp icon
├── /styles
│   └── main.css            # All styles
├── /scripts
│   ├── main.js             # Core functionality & site config
│   └── gallery.js          # Gallery filters & lightbox
├── /cafe
│   └── index.html          # Cafe service page
├── /venue
│   └── index.html          # Event venue service page
├── /salon
│   └── index.html          # Women-only salon page
├── /gym
│   └── index.html          # Women-only gym room page
├── /gallery
│   └── index.html          # Photo gallery page
└── /contact
    └── index.html          # Contact page with inquiry form
```

## Running Locally

This is a static website. Serve it using any static file server:

### Using Python (built-in)
```bash
cd site
python -m http.server 8000
# Open http://localhost:8000
```

### Using Node.js (npx)
```bash
cd site
npx serve
# Open the URL shown in terminal
```

### Using VS Code Live Server
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Configuration

### Site Configuration (main.js)

Edit the `siteConfig` object in `/scripts/main.js` to customize:

```javascript
const siteConfig = {
  businessName: 'Ramapuan',

  // WhatsApp configuration
  whatsapp: {
    number: '6281234567890',  // Replace with actual WhatsApp number
    defaultMessage: 'Hi Ramapuan, I have an inquiry.'
  },

  // Contact information
  contact: {
    address: 'Your Address Here, City, Indonesia',
    phone: '+62 812 3456 7890',
    email: 'hello@ramapuan.com'
  },

  // Operating hours
  hours: {
    cafe: { weekdays: '08:00 - 21:00', weekends: '09:00 - 22:00' },
    salon: { daily: '10:00 - 20:00 (by appointment)' },
    gym: { daily: '06:00 - 22:00 (by booking)' },
    venue: { daily: 'By reservation' }
  },

  // Social media links
  social: {
    instagram: 'https://instagram.com/ramapuan',
    facebook: 'https://facebook.com/ramapuan',
    tiktok: 'https://tiktok.com/@ramapuan'
  }
};
```

### Customizing Colors (main.css)

Edit CSS variables in `:root` at the top of `/styles/main.css`:

```css
:root {
  --color-bg: #FDFCFB;           /* Background */
  --color-text: #2D2926;         /* Text color */
  --color-accent: #C4A4A4;       /* Muted rose accent */
  --color-accent-hover: #B08E8E; /* Darker accent for hover */
  /* ... more variables */
}
```

## Replacing Placeholder Images

All images are currently gray gradient placeholders. To replace them:

### Recommended Image Sizes

| Location | Recommended Size | Aspect Ratio |
|----------|------------------|--------------|
| Hero banners | 1600 x 900 px | 16:9 |
| Service card thumbnails | 800 x 600 px | 4:3 |
| Gallery images | 1200 x 900 px | 4:3 |
| OG images | 1200 x 630 px | ~1.9:1 |

### Steps to Replace

1. Create an `/assets/images/` folder
2. Add optimized images (WebP recommended, with JPG fallback)
3. Update the HTML to reference image files:

```html
<!-- Before (placeholder) -->
<div class="card__image placeholder-image"></div>

<!-- After (real image) -->
<div class="card__image">
  <img src="/assets/images/cafe-thumb.jpg"
       alt="Interior view of Ramapuan Cafe"
       loading="lazy"
       width="800"
       height="600">
</div>
```

4. Update gallery items similarly
5. Update Open Graph images in each page's `<head>`

## SEO Checklist

Before going live, complete these items:

### Essential
- [ ] Replace placeholder WhatsApp number in `siteConfig`
- [ ] Update address in all pages and `siteConfig`
- [ ] Replace `https://ramapuan.com` with actual domain in:
  - All canonical URLs
  - All Open Graph URLs
  - sitemap.xml
  - robots.txt
- [ ] Update `lastmod` dates in sitemap.xml

### Images & Media
- [ ] Replace all placeholder images with real photos
- [ ] Add descriptive `alt` text to all images
- [ ] Create and add favicon (replace the text-based placeholder)
- [ ] Add Open Graph images (1200x630px) for social sharing

### Google & Analytics
- [ ] Set up Google Search Console
- [ ] Submit sitemap.xml
- [ ] Set up Google Business Profile
- [ ] Add Google Analytics or alternative tracking (if desired)
- [ ] Embed actual Google Maps on contact page

### Content
- [ ] Review and finalize all copy
- [ ] Add real menu items to cafe page (if applicable)
- [ ] Add pricing information (if desired)
- [ ] Add testimonials section (when available)

### Technical
- [ ] Test all WhatsApp links
- [ ] Test on multiple devices and browsers
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Validate HTML (W3C validator)
- [ ] Check accessibility (WAVE tool)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 14+)
- Chrome for Android

## Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states visible
- Respects `prefers-reduced-motion`
- Color contrast meets WCAG AA standards

## WhatsApp Integration

All booking actions redirect to WhatsApp with prefilled messages. The messages are configured in `siteConfig.messages`:

- **Cafe**: General inquiry about hours/menu
- **Venue**: Booking request with date, guests, event type, time placeholders
- **Salon**: Appointment booking (women-only noted)
- **Gym**: Room rental booking (women-only noted)

## License

This website template is provided for the Ramapuan business. All rights reserved.

---

Built with care for women who value comfort, privacy, and thoughtful design.
# rumapuan
