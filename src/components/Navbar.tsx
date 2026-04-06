import { useState } from 'react';
import './Navbar.css';

interface ViralData {
  id: number;
  title: string;
  category: string;
  image: string;
  rating: number;
  views: string;
  trending: boolean;
  description: string;
}

interface NavbarProps {
  onCategorySelect?: (category: string, data: ViralData[]) => void;
}

function Navbar({ onCategorySelect }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viralData, setViralData] = useState<ViralData[]>([]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const loadData = async () => {
    try {
      // Make sure data.json is in the public folder
      const response = await fetch('/data.json');
      const data = await response.json();
      console.log('Loaded data:', data.trendingUsaViral.length, 'videos'); // Debug log
      setViralData(data.trendingUsaViral);
      return data.trendingUsaViral;
    } catch (error) {
      console.error('Error loading data:', error);
      return [];
    }
  };

  const handleNavigation = async (e: React.MouseEvent<HTMLAnchorElement>, category: string) => {
    e.preventDefault();
    
    // If "All" category is selected, clear filters
    if (category === 'All') {
      localStorage.removeItem('selectedCategory');
      localStorage.removeItem('filteredData');
      window.location.href = '/';
      return;
    }
    
    // Load data if not already loaded
    let data = viralData;
    if (data.length === 0) {
      data = await loadData();
    }
    
    console.log('Selected category:', category);
    console.log('Total videos:', data.length);
    
    // Filter data by category - exact match
    const filteredData = data.filter(item => item.category === category);
    
    console.log(`Found ${filteredData.length} videos in category: ${category}`);
    
    // Store in localStorage
    localStorage.setItem('selectedCategory', category);
    localStorage.setItem('filteredData', JSON.stringify(filteredData));
    
    // Call parent callback if provided
    if (onCategorySelect) {
      onCategorySelect(category, filteredData);
    }
    
    // Force a page reload to ensure data loads
    window.location.href = '/';
  };

  // Categories exactly matching your JSON data
  const categories = [
    '🇺🇸 USA VIRAL XXX',
    '🔥 HOT TRENDING USA',
    'XXX ACTION USA',
    'XXX COMEDY USA',
    'XXX ROMANCE USA',
    'AMERICA VIRAL XXX',
    'USA XXX NIGHTMARE',
    'HOLLYWOOD XXX USA',
    'USA DESI VIRAL',
    'UK USA VIRAL XXX'
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-text">🇺🇸 USA VIRAL XXX 🔥</span>
        </div>

        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a 
              href="/" 
              className="nav-link"
              onClick={(e) => handleNavigation(e, 'All')}
            >
              🏠 ALL VIDEOS
            </a>
          </li>
          {categories.map((category) => (
            <li key={category} className="nav-item">
              <a 
                href="/" 
                className="nav-link"
                onClick={(e) => handleNavigation(e, category)}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;