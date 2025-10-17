# RuneFlow Redesigned

A hyper-modern, high-performance redesign of the RuneFlow proposal landing page with cutting-edge animations, smooth scrolling, and interactive elements optimized for 2025-2027.

## 🚀 Features

- **Hyper-Modern Aesthetic**: Luminous dark UI with gradient accents, glassmorphism, and micrograin textures
- **Advanced Animations**: GSAP-powered scroll triggers, smooth reveals, and micro-interactions
- **Buttery Smooth Scrolling**: Lenis integration for inertia-based scroll experience
- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Accessibility**: WCAG AA compliant with full keyboard navigation and reduced-motion support
- **Performance Optimized**: Lazy loading, code splitting, and asset compression
- **Dynamic Pricing**: Interactive toggle between Non-Baked and Baked pricing models
- **Canvas Animations**: Animated gradient background in hero section
- **Interactive Elements**: Magnetic buttons, tilt cards, ripple effects, custom cursor

## 📋 Tech Stack

- **Vite**: Fast build tool with HMR
- **GSAP 3**: Professional animation library with ScrollTrigger
- **Lenis**: Smooth scroll framework
- **Three.js**: WebGL support for advanced effects
- **SCSS**: Modern CSS with design tokens system
- **Inter & Space Grotesk**: Variable fonts for typography

## 🎨 Design System

### Colors

- **Surface**: `#0b0f14` (Deep Space) → `#242f3e` (Tertiary)
- **Ink**: `#e8eef8` (Primary) → `#7a87a0` (Tertiary)
- **Accents**:
  - Cyan: `#7df9ff` (Luminous)
  - Fuchsia: `#ff66c4` (Hyper)
  - Lime: `#a8ff76` (Neo)
  - Gold: `#ffb500` (CTA)

### Spacing

4px-based scale: `--space-1` through `--space-24` (4px to 96px)

### Typography

- **Display**: Space Grotesk (headings)
- **Body**: Inter (all text)
- **Mono**: JetBrains Mono (code)

## 📂 Project Structure

```
src/
├── index.html           # Main page
├── main.js              # Entry point with animations
├── styles/
│   ├── main.scss        # Imports all styles
│   ├── tokens.scss      # Design tokens & variables
│   ├── base.scss        # Reset and global styles
│   ├── animations.scss  # Keyframes and utility classes
│   ├── layout.scss      # Grid, containers, utilities
│   └── components.scss  # Component-specific styles
├── content/
│   └── content.json     # Structured content (generated)
├── shaders/             # GLSL shaders (future expansion)
├── assets/              # Images, icons, lottie files
└── scripts/
    └── extract-content.mjs  # Content extraction script
```

## 🚀 Getting Started

### Installation

```bash
cd /Volumes/extremeUno/runeflow-redesigned
pnpm install
```

### Development

```bash
pnpm run dev
```

Opens at `http://localhost:5173` with hot module reloading.

### Build for Production

```bash
pnpm run build
```

Output: `dist/` directory with optimized production build.

### Preview Production Build

```bash
pnpm run preview
```

## 🎨 Animation System

RuneFlow features a comprehensive animation system with multiple layers:

### Canvas Background Animations
- **Hero Section**: Three-layer animated gradient system using Canvas API
- **Layer 1 (Cyan)**: Main oscillating radial gradient
- **Layer 2 (Fuchsia)**: Secondary depth layer with offset waves
- **Layer 3 (Lime)**: Accent gradient for color balance
- **Noise Texture**: Subtle grain prevents banding

### CSS Keyframe Animations
- **Gradient Flows**: `gradientShift`, `gradientWave`, `gradientOrbit` (8-15s)
- **Glow Effects**: `glowShift`, `borderGlow`, `textGlow` (3-4s)
- **Motion**: `float`, `softPulse`, `backgroundBreathe` (2-14s)
- **Interactive**: `ripple`, `accentFlow` (0.6-3s)

### Interactive Elements
- **Cards**: Continuous `softPulse` with hover `glowShift` animation
- **Buttons**: Enhanced hover glows with ripple on click
- **Glass Containers**: `backgroundBreathe` animation for depth
- **Section Headers**: Animated text glow effect

### Performance
- All animations use GPU-accelerated transforms and opacity
- Respects `prefers-reduced-motion` for accessibility
- Optimized for 60fps smooth scrolling

**See [ANIMATIONS.md](./ANIMATIONS.md) for detailed documentation.**

## 🎬 Content Management

All content is sourced from `src/content/content.json`. To update:

1. Edit the original proposal HTML if needed
2. Run:
   ```bash
   node scripts/extract-content.mjs
   ```
3. Content will be regenerated in `src/content/content.json`

### Content Structure

```json
{
  "meta": {},
  "hero": {},
  "about": {},
  "services": {},
  "pricing": {},
  "timeline": {},
  "support": {},
  "contact": {},
  "legal": {}
}
```

## ⚙️ Customization

### Adjusting Animations

Edit `src/main.js`:

- **Scroll speed**: Change `lerp: 0.08` (lower = smoother, higher = more responsive)
- **Reveal delay**: Modify `data-reveal-delay-*` values in HTML
- **Duration**: Adjust GSAP `duration` properties

### Modifying Colors

Edit `src/styles/tokens.scss`:

```scss
--accent-1: #7df9ff;  // Change any color here
--accent-2: #ff66c4;
--accent-3: #a8ff76;
--accent-4: #ffb500;
```

### Changing Typography

Edit font family variables in `src/styles/tokens.scss`:

```scss
--font-family-display: 'Space Grotesk', ...;
--font-family-body: 'Inter', ...;
--font-family-mono: 'JetBrains Mono', ...;
```

### Responsive Breakpoints

Defined in media queries throughout `layout.scss` and `components.scss`:

- `xs`: 360px
- `sm`: 480px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## ♿ Accessibility

- ✓ WCAG AA contrast ratios
- ✓ Full keyboard navigation
- ✓ Semantic HTML structure
- ✓ ARIA labels and roles
- ✓ Reduced motion support
- ✓ Focus management
- ✓ Skip navigation links (can be added)

## ⚡ Performance

- **Lighthouse Target**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1

### Optimization Techniques

- Code splitting via Rollup
- SCSS minification
- Image optimization (WebP/AVIF ready)
- Font preloading
- Lazy loading for heavy libraries
- RequestAnimationFrame throttling

## 🔍 Quality Assurance

### Testing Commands

```bash
pnpm run lint          # ESLint checks
pnpm run format        # Prettier formatting
```

### Cross-Browser Support

Tested and optimized for:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## 📦 Build Output

Production build includes:

- Minified HTML, CSS, JavaScript
- Code-split chunks for faster loading
- Source maps for debugging
- Favicon and meta assets
- Optimized images

## 🚀 Deployment

```bash
pnpm run build
# Deploy the dist/ directory to your hosting service
```

### Hosting Options

- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Push to `gh-pages` branch
- **AWS S3 + CloudFront**: `aws s3 sync dist/ s3://bucket-name`

## 🎯 Future Enhancements

- [ ] Three.js WebGL hero background
- [ ] Lottie animation integrations
- [ ] Advanced form validation
- [ ] CMS integration (Contentful/Strapi)
- [ ] Analytics tracking
- [ ] A/B testing framework
- [ ] Email notification API

## 📝 License

© 2025 Primitive Success Group & RuneFlow. All rights reserved.

## 🤝 Support

For questions or issues:
- Email: webhalla@proton.me
- Phone: +1 (520) 427-2131

---

**Built with ✦ by Webhalla**

*Ancient Power. Modern Automation.*
