# MovieHub - React Movies Website

MovieHub is a modern, responsive movie streaming website built with React, TypeScript, and Vite.

## Features

- ✨ **Responsive Navbar**: Sticky header with animated logo and mobile hamburger menu
- 🎬 **Category Tabs**: Browse movies by 9 different categories
- 🎞️ **Movie Grid**: Beautiful responsive grid displaying movies with images and ratings
- 🎯 **Smooth Animations**: Elegant animations for page transitions and hover effects
- 🌙 **Dark Theme**: Professional dark design with gradient accents
- 📱 **Mobile Optimized**: Fully responsive design for all devices

## Quick Start

### Prerequisites
- Node.js 18+ installed

### Installation & Development

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

The website will be available at `http://localhost:5173/`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx           # Navigation bar with mobile toggle
│   ├── Navbar.css
│   ├── CategoryTabs.tsx     # Category filter tabs
│   ├── CategoryTabs.css
│   ├── MovieCard.tsx        # Individual movie card
│   ├── MovieCard.css
│   ├── MovieGrid.tsx        # Movie grid container
│   └── MovieGrid.css
├── App.tsx                  # Main application component
├── App.css
├── index.css               # Global styles
└── main.tsx                # Application entry point
```

## Key Features Explained

### Responsive Navigation
- Sticky navbar with gradient background
- Animated bounce effect on logo
- Mobile hamburger menu with smooth animations
- Active link underline effect

### Category Filtering
- Filter movies by 9 categories
- Smooth tab transitions
- Active state visual feedback
- Responsive tab layout

### Movie Display
- Grid layout that adapts to screen size
- Movie cards with hover effects
- Play button animation
- Star ratings display
- Staggered loading animation

### Dark Theme
- Modern dark background (#0f0f0f)
- Purple gradient accents
- Cyan secondary color (#00d4ff)
- Smooth transitions and animations

## Customization

### Add More Movies

Edit the `MOVIES` array in `src/App.tsx`:

```typescript
{
  id: number,
  title: string,
  image: string (image URL),
  category: string,
  rating: number (0-10)
}
```

### Change Colors

Update CSS variables in `src/index.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-color: #00d4ff;
  --dark-bg: #0f0f0f;
  --card-bg: #1a1a1a;
}
```

### Add New Categories

Update the `CATEGORIES` array in `src/App.tsx`:

```typescript
const CATEGORIES = ['All', 'Action', 'Adventure', /* ... */]
```

## Technologies

- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **CSS3** - Animations and responsive design

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- ⚡ Built with Vite for ultra-fast builds
- 🎨 GPU-accelerated CSS animations
- 📦 Optimized bundle size (~61KB gzipped)
- 🖼️ Responsive image loading

## Future Enhancements

- Movie details modal with synopsis
- Search functionality
- User ratings and reviews
- Watchlist feature
- Light/Dark theme toggle
- Backend integration for dynamic content
- Video player integration
- Recommendation algorithm

## License

MIT

## Author

Created with ❤️ using React + Vite
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
