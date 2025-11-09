# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Reactionair.nl is a Hugo-based static site generator (SSG) website serving as a Dutch content publication platform. The site combines:
- Article publishing with author profiles and theme taxonomies
- E-commerce shop (primarily books) with shopping cart and checkout
- Search functionality via Pagefind
- Comment system and newsletter subscription

The frontend uses Alpine.js for interactivity and integrates with a backend API at admin.reactionair.nl for cart management, orders, and payments.

## Build and Development Commands

### Development
```bash
# Start Hugo development server
hugo server
```

### Production Build
```bash
# Install dependencies
yarn install

# Build site (production)
hugo --cleanDestinationDir -d build

# Build search index (run after Hugo build)
pagefind --site build
```

### Full Deployment
```bash
# Deploy with optional git pull
./deploy.fish           # Build and deploy
./deploy.fish --pull    # Pull from git first, then build and deploy
```

The deploy.fish script:
1. Optionally pulls latest changes from git
2. Installs dependencies via yarn
3. Builds Hugo site to temporary `/www/reactionair.nl/build` directory
4. Atomically replaces `/www/reactionair.nl/public` with build output
5. Generates Pagefind search index

## Architecture

### Technology Stack
- **SSG**: Hugo (Go-based static site generator)
- **JavaScript**: Alpine.js 3.x with plugins (persist, mask, collapse, anchor, focus)
- **Styling**: Sass/SCSS with responsive breakpoints (mobile: ≤1024px, desktop: ≥1025px)
- **Search**: Pagefind (static search index, generated post-build)
- **Audio**: WaveSurfer.js for article audio playback
- **Currency**: Currency.js for price formatting
- **Backend API**: admin.reactionair.nl for cart, orders, payments, address lookup, comments

### Directory Structure
```
assets/
├── js/main.js          # Alpine.js initialization, cart logic, global store
├── sass/               # Sass stylesheets (main, mobile, desktop, light, dark)
│   ├── partials/       # Component styles
│   └── shop/           # Shop-specific styles
└── images/             # Source images

content/                # Markdown content files
├── articles/           # Main articles
├── authors/            # Author profiles
├── shop/               # Shop products and pages
├── theme/              # Theme taxonomy
└── [other sections]    # donate, newsletter, quiz, search, etc.

layouts/
├── _default/           # Default layouts (baseof.html, home.html, single.html, list.html)
├── shop/               # Shop layouts (single.html, cart.html, checkout.html)
├── partials/           # Reusable components (head, header, articles, shop, comments)
└── shortcodes/         # Content shortcodes

static/                 # Static files (fonts, images, favicons) copied as-is
data/                   # Data files (e.g., months.toml for Dutch month names)
public/                 # Generated build output (do not edit)
resources/              # Hugo cache (do not edit)
```

### Hugo Configuration (hugo.toml)
- Language: Dutch (nl)
- API base URL: https://admin.reactionair.nl (params.api)
- Pagination: 10 items per page, path "pagina"
- Custom taxonomies: authors, theme
- Related content: Weighted by tags (100), theme (60), authors (20), date (20)
- Permalinks:
  - Articles: `/artikelen/:slug/`
  - Shop: `/winkel/producten/:sections[last]/:slug/`
  - Authors: `/auteurs/:slug/`
  - Themes: `/themas/:slug/`
- Goldmark: autoHeadingID disabled, unsafe HTML enabled
- HTTP caching enabled for admin API calls

### Asset Pipeline
Hugo processes assets with:
- JavaScript: `js.Build` for ES modules
- Sass: `toCSS` with libsass
- Fingerprinting for cache busting
- Minification enabled (hugo.toml: minifyOutput = true)

### JavaScript Architecture (assets/js/main.js)
Alpine.js global store contains:
- `mobile`: Media query detection for responsive behavior
- `wavesurfer`: Audio player library reference
- `cart`: Persistent shopping cart (localStorage via Alpine.persist)
  - Add/remove items
  - Currency formatting
  - API integration for shipping/orders
  - Cart restoration from URL params

Key interactive features:
- Dynamic Pagefind search in header
- Shopping cart management (client-side)
- WaveSurfer audio player with custom visualizations
- Form validation (address lookup, checkout)
- Collapsible content ("read more")
- Hide-on-scroll responsive header

### Content Types
1. **Articles**: Front matter with title, subtitle, authors, theme, date
   - Featured images with responsive processing
   - Optional audio recordings with waveform visualization
   - Reading time calculation
   - Related articles

2. **Shop Products**: Books and miscellany
   - Multiple variants (formats, ISBNs, pricing)
   - Front/back cover images
   - Product details table
   - Reviews/ratings

3. **Authors**: Profile pages with images and bio

4. **Static Pages**: Donation, newsletter, search, terms

### Search Implementation
- Pagefind generates static search index post-build
- Lazy-loaded client-side at `/pagefind/pagefind.js`
- Content marked with `data-pagefind-body` attribute
- Metadata via `data-pagefind-meta` attributes
- Filters: author, language, publisher, format, theme
- Results limited to 10, debounced input

### E-commerce Flow
1. **Product pages**: Add variants to cart (client-side localStorage)
2. **Cart page** (`/winkel/winkelwagen/`): Review items, calculate shipping via API
3. **Checkout** (`/winkel/afrekenen/`): Form with Dutch address lookup API
4. **Payment**: Redirect to external payment processor
5. **Thank you page**: Order confirmation

API endpoints (admin.reactionair.nl):
- `/api/shop/shipping` - Calculate shipping costs
- `/api/shop/address` - Dutch postal code address lookup
- `/api/shop/payment` - Process payment
- `/api/shop/order/:id` - Retrieve order details

### Styling Architecture
- Responsive strategy: Separate mobile.sass and desktop.sass files
- Media queries: mobile (max-width: 1024px), desktop (min-width: 1025px)
- Theme support: light.sass and dark.sass via prefers-color-scheme
- Component organization: Modular Sass partials in partials/ directory
- Shop pages conditionally load additional shop stylesheets

### Hugo Patterns and Conventions
1. **Partials**: Heavy use of reusable components with dict parameters for context
2. **Partial Caching**: Strategic use of `partialCached` for performance
3. **Component Sizing**: Multiple size variants (micro, small, medium, large, featured) for article cards
4. **Progressive Enhancement**: JavaScript enhances static HTML foundation
5. **Responsive-First**: Separate mobile/desktop stylesheets rather than mobile-first CSS
6. **Dutch Localization**: All content and UI in Dutch

## Development Notes

### Working with Articles
- Articles live in `content/articles/`
- Front matter includes: title, subtitle, authors (array), theme (array), date
- Featured images should be placed alongside article markdown
- Audio files (.mp3) can be added with waveform data in front matter

### Working with Shop Products
- Products in `content/shop/` with subdirectories for categories
- Front matter includes variants array with format, ISBN, price
- Cover images: front.jpg and back.jpg
- Product details rendered in table format via partials/shop/details.html

### Modifying Styles
- Main entry: `assets/sass/main.sass`
- Mobile-specific: `assets/sass/mobile.sass`
- Desktop-specific: `assets/sass/desktop.sass`
- Component styles: `assets/sass/partials/`
- Shop styles: `assets/sass/shop/`
- Theme colors: `assets/sass/light.sass` and `assets/sass/dark.sass`

### Modifying JavaScript
- Main entry: `assets/js/main.js`
- Alpine.js store initialization happens here
- Cart logic is in the `cart` store object
- Add new Alpine components inline in HTML templates or extend the global store

### Creating Layouts
- Base template: `layouts/_default/baseof.html`
- Override per content type: `layouts/{section}/single.html` or `layouts/{section}/list.html`
- Reusable components: `layouts/partials/`
- Custom shortcodes: `layouts/shortcodes/`

### Backend API Integration
- API base URL configured in hugo.toml as `params.api`
- Access in templates: `{{ .Site.Params.api }}`
- Access in JavaScript: Check main.js for fetch() calls
- API is cached during build via Hugo's httpcache feature

### Search Customization
- Pagefind configuration is in the deploy.fish script
- To exclude content from search: Remove `data-pagefind-body` attribute
- To add metadata filters: Use `data-pagefind-meta` attributes in templates
- Search UI is in `layouts/partials/header/search.html`

### Adding New Shortcodes
- Create file in `layouts/shortcodes/{name}.html`
- Use in content with `{{< name >}}` or `{{< name param="value" >}}`
- Existing shortcodes: slider, button, newsletter, etc.
