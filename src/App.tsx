import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';

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



function App() {
  const [movies, setMovies] = useState<ViralData[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const [isAwarenessModalOpen, setIsAwarenessModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<ViralData | null>(null);
  const [closeCount, setCloseCount] = useState<number>(0);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    let isCleanup = false;

    const requestFullscreenMode = async () => {
      if (isCleanup || document.fullscreenElement) {
        return;
      }

      try {
        await document.documentElement.requestFullscreen();
      } catch (error) {
        console.warn('Fullscreen request was blocked or failed:', error);
      }
    };

    const activateFromGesture = () => {
      requestFullscreenMode();
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        requestFullscreenMode();
      }
    };

    requestFullscreenMode();

    window.addEventListener('click', activateFromGesture, { once: true });
    window.addEventListener('keydown', activateFromGesture, { once: true });
    window.addEventListener('touchstart', activateFromGesture, { once: true });
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      isCleanup = true;
      window.removeEventListener('click', activateFromGesture);
      window.removeEventListener('keydown', activateFromGesture);
      window.removeEventListener('touchstart', activateFromGesture);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!isAwarenessModalOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAwarenessModal();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isAwarenessModalOpen]);

  useEffect(() => {
    if (isAwarenessModalOpen || !selectedMovie || closeCount === 0 || closeCount > 5) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsAwarenessModalOpen(true);
    }, 650);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isAwarenessModalOpen, closeCount, selectedMovie]);

  const loadInitialData = async () => {
    setLoading(true);

    const storedData = localStorage.getItem('filteredData');
    const storedCategory = localStorage.getItem('selectedCategory');

    if (storedData && storedCategory && storedData !== '[]') {
      try {
        const parsedData = JSON.parse(storedData);
        setMovies(parsedData);
        setCurrentCategory(storedCategory);
        console.log('Loaded filtered data:', parsedData.length, 'videos');
      } catch (error) {
        console.error('Error parsing stored data:', error);
        await loadAllData();
      }
    } else {
      await loadAllData();
    }

    setLoading(false);
  };

  const loadAllData = async () => {
    try {
      const response = await fetch('/data.json');
      const data = await response.json();
      console.log('Loaded all data:', data.trendingUsaViral.length, 'videos');
      setMovies(data.trendingUsaViral);
      setCurrentCategory('All');

      localStorage.removeItem('filteredData');
      localStorage.removeItem('selectedCategory');
    } catch (error) {
      console.error('Error loading data:', error);
      setMovies([]);
    }
  };

  const handleCategorySelect = (category: string, data: ViralData[]) => {
    setMovies(data);
    setCurrentCategory(category);
  };

  const openAwarenessModal = (movie: ViralData) => {
    setSelectedMovie(movie);
    setCloseCount(0);
    setIsAwarenessModalOpen(true);
  };

  const closeAwarenessModal = () => {
    setCloseCount((previousCount) => {
      if (previousCount >= 5) {
        return previousCount;
      }

      return previousCount + 1;
    });
    setIsAwarenessModalOpen(false);
  };

  if (loading) {
    return (
      <div className="app">
        <Navbar onCategorySelect={handleCategorySelect} />
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading videos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar onCategorySelect={handleCategorySelect} />

      <div className="container">
        <div className="category-header">
          <h2>{currentCategory}</h2>
          <p>{movies.length} videos found</p>
        </div>

        {movies.length === 0 ? (
          <div className="no-results">
            <p>No videos found in this category.</p>
            <button onClick={() => (window.location.href = '/')}>View All Videos</button>
          </div>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="movie-image">
                  <button
                    type="button"
                    className="movie-image-button"
                    onClick={() => openAwarenessModal(movie)}
                    aria-label={`Open scam awareness demo for ${movie.title}`}
                  >
                    <img
                      src={movie.image}
                      alt={movie.title}
                      onError={(event) => {
                        console.error('Image failed to load:', movie.image);
                        event.currentTarget.src =
                          'https://via.placeholder.com/526x298?text=Image+Not+Found';
                      }}
                    />
                  </button>
                  {movie.trending && <span className="trending-badge">TRENDING</span>}
                </div>
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <div className="movie-meta">
                    <span className="rating">Rating {movie.rating}</span>
                    <span className="views">Views {movie.views}</span>
                  </div>
                  <p className="description">{movie.description}</p>
                  <button
                    type="button"
                    className="awareness-trigger"
                    onClick={() => openAwarenessModal(movie)}
                  >
                    Watch
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isAwarenessModalOpen && selectedMovie && (
        <div
          className="awareness-modal-backdrop"
          onClick={closeAwarenessModal}
          role="presentation"
        >
          <div
            className="awareness-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="awareness-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="awareness-close"
              onClick={closeAwarenessModal}
              aria-label="Close awareness modal"
            >
              x
            </button>

            <div className="awareness-copy">
              
              
              
            </div>

            <div className="awareness-visual">
              <img
                src="/images/scam-awareness-demo.png"
                alt="Training example of a fake security alert popup"
              />
            </div>

            

            
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
