# MovieHub - React Movies Website

MovieHub is a modern, responsive movie streaming website built with React, TypeScript, and Vite.

## Features

- **Responsive Navbar**: Sticky header with animated logo and mobile hamburger menu
- **Category Tabs**: Browse movies by categories (Action, Adventure, Comedy, Romance, Horror, Sci-Fi, Drama, Thriller, Fantasy)
- **Movie Grid**: Beautiful responsive grid displaying movies with images and ratings
- **Smooth Animations**: Elegant animations for page transitions, hover effects, and UI interactions
- **Perfect Design**: Dark theme with gradient accents and professional styling
- **Mobile Optimized**: Fully responsive design for mobile, tablet, and desktop devices

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Responsive navigation bar
│   ├── Navbar.css
│   ├── CategoryTabs.tsx    # Category filter tabs
│   ├── CategoryTabs.css
│   ├── MovieCard.tsx       # Individual movie card component
│   ├── MovieCard.css
│   ├── MovieGrid.tsx       # Movie grid container
│   └── MovieGrid.css
├── App.tsx                 # Main app component
├── App.css
├── index.css              # Global styles
└── main.tsx               # Entry point
```

## Setup & Development

### Installation
All dependencies are already installed. To reinstall if needed:
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
The website will be available at `http://localhost:5173/`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Key Components

### Navbar Component
- Sticky header with purple gradient
- Animated logo with bounce effect
- Responsive hamburger menu for mobile
- Smooth link animations with underline effect

### CategoryTabs Component
- Tab buttons for filtering movies
- Active state styling with gradient background
- Smooth transitions between categories
- Responsive tab layout

### MovieCard Component
- Image with overlay hover effect
- Play button animation on hover
- Movie title and rating display
- Smooth scale and filter effects

### MovieGrid Component
- Responsive CSS Grid layout
- Staggered animation on load
- Adapts from 1-4 columns based on screen size
- Smooth appearance animations

## Customization

### Adding More Movies
Edit the `MOVIES` array in [src/App.tsx](src/App.tsx) to add more movies. Each movie requires:
```typescript
{
  id: number,
  title: string,
  image: string (image URL),
  category: string,
  rating: number (0-10)
}
```

### Changing Colors
Update the CSS variables in [src/index.css](src/index.css):
- `--primary-gradient`: Main gradient color
- `--secondary-color`: Accent color (#00d4ff)
- `--dark-bg`: Background color
- `--card-bg`: Card background color

### Adding New Categories
Add new categories to the `CATEGORIES` array in [src/App.tsx](src/App.tsx).

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **CSS3** - Animations and responsive design
- **Unsplash API** - Movie poster images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Built with Vite for fast development and production builds
- Optimized asset loading
- CSS animations using GPU acceleration
- Lazy-loaded images with optimized URLs

## Future Enhancements

- Add movie details modal
- Search functionality
- User ratings and reviews
- Watchlist feature
- Dark/Light theme toggle
- Backend integration for dynamic content
- Video player integration
