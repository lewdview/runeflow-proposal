# RuneFlow Redesigned - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd /Volumes/extremeUno/runeflow-redesigned
pnpm install
```

### 2. Start Development Server
```bash
pnpm run dev
```
Opens at `http://localhost:5173` with hot reloading

### 3. Build for Production
```bash
pnpm run build
```
Output: `src/dist/` with optimized assets

---

## 📋 Available Commands

| Command | Purpose |
|---------|---------|
| `pnpm run dev` | Start dev server on :5173 |
| `pnpm run build` | Create production build |
| `pnpm run preview` | Preview production build locally |
| `pnpm run lint` | Check code quality with ESLint |
| `pnpm run format` | Format code with Prettier |

---

## 📁 Key Files to Know

| File | Purpose |
|------|---------|
| `src/index.html` | Main page structure |
| `src/main.js` | Animations & interactions |
| `src/styles/tokens.scss` | Design tokens (colors, spacing) |
| `src/styles/main.scss` | Master stylesheet |
| `src/content/content.json` | All page content |
| `vite.config.js` | Build configuration |

---

## 🎨 Customize Colors

Edit `src/styles/tokens.scss`:

```scss
--accent-1: #7df9ff;  // Cyan
--accent-2: #ff66c4;  // Fuchsia
--accent-3: #a8ff76;  // Lime
--accent-4: #ffb500;  // Gold
```

---

## 📝 Update Content

### Option 1: Direct Edit
Edit `src/content/content.json` and refresh

### Option 2: Extract from Original
```bash
node scripts/extract-content.mjs
```

---

## 🚀 Deploy

### Vercel
```bash
vercel deploy src/dist
```

### Netlify
Drag & drop `src/dist` folder to Netlify

### S3 + CloudFront
```bash
aws s3 sync src/dist s3://your-bucket
```

---

## ⚡ Adjust Animation Speed

Edit `src/main.js` line 8:

```js
const lenis = new Lenis({
  lerp: 0.08,  // Lower = smoother, Higher = snappier
});
```

---

## 📊 Project Stats

- **Build Size**: 173 KB (gzipped: 59 KB)
- **Colors**: 4 accent + 3 surface + 3 ink
- **Sections**: 8 (hero, about, services, pricing, timeline, support, contact, footer)
- **Animations**: 30+
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+

---

## 🆘 Troubleshooting

### Dev server won't start?
```bash
# Clear cache
rm -rf node_modules/.vite
pnpm run dev
```

### Build fails?
```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install
pnpm run build
```

### Changes not showing?
```bash
# Hard refresh browser
Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)
```

---

## 📚 Learn More

- **README.md** – Full technical documentation
- **DELIVERY.md** – Project summary & features
- **vite.config.js** – Build tool configuration
- **src/styles/tokens.scss** – Complete design system

---

**Built with ✦ by Webhalla**

*Ancient Power. Modern Automation.*
