# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Reactionair.nl is a Dutch-language Hugo static blog site with e-commerce functionality. The site uses Hugo for content management and Alpine.js for interactive features, particularly the shopping cart system.

## Build and Development Commands

### Local Development
```bash
hugo server
```

### Production Build
```bash
hugo --cleanDestinationDir
```

### Production Deployment
The `deploy.fish` script handles production deployment:
```bash
./deploy.fish          # Build and deploy
./deploy.fish --pull   # Pull latest changes, then build and deploy
```

This script:
1. Installs yarn dependencies
2. Builds Hugo site to a temporary `build` directory
3. Moves build to `public` directory
4. Runs Pagefind to generate search index

### Search Index
After building, run Pagefind to update search functionality:
```bash
pagefind --site public
```

### Dependencies
```bash
yarn install
```

## Architecture

### Content Structure
- **articles/** - Blog articles with author and theme taxonomies
- **shop/** - E-commerce products and pages (cart, checkout, thank-you)
- **authors/** - Author taxonomy pages
- **theme/** - Theme taxonomy pages
- **newsletter/** - Newsletter subscription pages
- **donate/** - Donation pages
- **quiz/** - Interactive quiz pages

### Frontend Architecture

#### Alpine.js State Management
The site uses Alpine.js stores for global state management (assets/js/main.js:19-84):

**cart store** - Persistent shopping cart using Alpine.persist:
- `contents` - Array of cart items (variant, quantity, price)
- `find(variant)` - Find item by variant ID
- `add(variant, price)` - Add item to cart
- `remove(variant)` - Remove item from cart
- `cache()` - Cache cart to backend API for shipping calculations
- `currency(value)` - Format currency values

**mobile store** - Media query matcher for responsive behavior

**wavesurfer store** - Audio player library for media content

#### API Integration
Backend API base URL: `https://admin.reactionair.nl` (hugo.toml:18)

Cart shipping calculations POST to: `/api/shop/shipping`

#### Interactive Features
- Footnote tooltips with hover behavior (layouts/partials/body.html)
- Smooth scroll navigation for footnote references
- First sentence styling using custom font (IM FELL English SC)
- Audio players using WaveSurfer.js

### Layout Structure
- **layouts/_default/** - Base templates for different page types
  - `baseof.html` - Base template
  - `home.html` - Homepage layout
  - `single.html` - Single page/article layout
  - `list.html` - List pages
  - `donate.html` - Donation page
  - `quiz.html` - Quiz page
  - `search.html` - Search results page
- **layouts/shop/** - E-commerce-specific layouts
  - `single.html` - Product detail page
  - `list.html` - Product listing page
  - `cart.html` - Shopping cart
  - `checkout.html` - Checkout flow
- **layouts/partials/** - Reusable components
  - `body.html` - Article body with footnote handling
  - `article.html` - Article component
  - `newsletter.html` - Newsletter signup
  - `footer.html` - Site footer
  - `paginator.html` - Pagination component
  - `theme.html` - Theme display
- **layouts/shortcodes/** - Content shortcodes
  - `image.html`, `quote.html`, `slider.html`, `advert.html`, etc.

### Hugo Configuration (hugo.toml)

**Key Settings:**
- Language: Dutch (nl)
- Pagination: 10 items per page with Dutch path "pagina"
- Taxonomies: authors, theme
- Related content weighted by tags (100), theme (60), authors (20), date (20)
- Custom permalinks for articles and shop sections
- RSS feeds for home, section, taxonomy, and term pages
- HTTP caching for admin API requests
- Audio media type support (mp3)

### Asset Processing
- **assets/js/main.js** - Alpine.js initialization and store setup
- **assets/sass/** - Styling (processed by Hugo)
- **assets/images/** - Images (processed by Hugo)

### Content Parameters
Check `hugo.toml` params section for:
- `api` - Backend API URL
- `advert` - Current site-wide advertisement text

## Key Development Notes

### Modifying Cart Functionality
Cart state is persisted to localStorage via Alpine.persist. Changes to cart structure require considering backward compatibility with existing persisted data.

### Adding Product Variants
Products use variant-based pricing. Each variant has a unique ID used as the cart key.

### Footnote System
The footnote tooltip system (layouts/partials/body.html) automatically detects footnote references and creates hover tooltips. It's disabled on mobile and includes collision detection for edge positioning.

### Search
Pagefind must be run after each production build to update the search index. Search functionality won't work without it.

### API Responses
The cart caching system sends cart contents to the backend for shipping calculations but doesn't wait for responses. Ensure the backend API is running for full checkout functionality.
