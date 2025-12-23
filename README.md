# hystericca - experimental personal site

Avant-garde monochromatic personal website with experimental JavaScript effects.

## Setup

```bash
bun install
```

## Development

Build JavaScript (with watch mode):
```bash
bun run dev
```

Build for production:
```bash
bun run build
```

## Features

### Visual Effects
- **Glitch animations** - RGB chromatic aberration on headers and text
- **Floating geometric shapes** - Parallax animated shapes with blend modes
- **Custom cursor trail** - Smooth following cursor with magnetic interactions
- **Text scramble** - Hover effects that scramble and reveal text
- **Experimental typography** - Variable spacing and transformations

### JavaScript Interactions (GSAP)
- **Parallax scrolling** - Multi-layer depth scrolling effects
- **Scroll-triggered animations** - Elements animate in as you scroll
- **Magnetic elements** - Social links and buttons follow cursor
- **3D tilt effects** - Profile picture has realistic tilt on hover
- **Random glitches** - Spontaneous glitch effects
- **Enhanced transitions** - Smooth GSAP-powered section switching

### Easter Egg
Try the Konami code: `↑ ↑ ↓ ↓ ← → ← → B A`

## Tech Stack
- Pure HTML/CSS
- JavaScript (ES6+)
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Bun](https://bun.sh) - Fast bundler and runtime

## Structure
```
├── index.html          # Main page
├── grimkeeper.html     # Project page
├── style.css           # All styles
├── src/
│   └── main.js        # Source JavaScript
├── dist/
│   └── main.js        # Bundled JavaScript
└── package.json
```

## Notes
- All effects are GPU-accelerated where possible
- Fallbacks for users with JS disabled
- Monochromatic black/white aesthetic
- Experimental and artistic approach to web design

---

made with ☕ in seattle
