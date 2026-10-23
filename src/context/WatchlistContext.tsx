import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie } from '../types/movie';

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: string | number) => void;
  isInWatchlist: (movieId: string | number) => boolean;
  toggleWatchlist: (movie: Movie) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    try {
      const saved = localStorage.getItem('u_movie_hub_watchlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('u_movie_hub_watchlist', JSON.stringify(watchlist));
    } catch (e) {
      console.error('Failed to save watchlist to localStorage', e);
    }
  }, [watchlist]);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist(prev => {
      if (prev.some(m => m.id === movie.id)) return prev;
      return [movie, ...prev];
    });
  };

  const removeFromWatchlist = (movieId: string | number) => {
    setWatchlist(prev => prev.filter(m => m.id !== movieId));
  };

  const isInWatchlist = (movieId: string | number) => {
    return watchlist.some(m => m.id === movieId);
  };

  const toggleWatchlist = (movie: Movie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
