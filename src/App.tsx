import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { MoviePlayerModal } from './components/MoviePlayerModal';
import { HomePage } from './pages/HomePage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { AboutPage } from './pages/AboutPage';
import { WatchlistProvider, useWatchlist } from './context/WatchlistContext';
import { MovieService } from './services/tmdb';
import { Movie } from './types/movie';
import { CategoriesPage } from './pages/CategoriesPage';
import { SitemapPage } from './pages/SitemapPage';
import { CategoryItem } from './data/categories';
import { Check } from 'lucide-react';
import { openSandboxFreePlayer } from './utils/playerHelper';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [popMovie, setPopMovie] = useState<Movie | null>(null);
  const [autoPlayStream, setAutoPlayStream] = useState<boolean>(false);
  const [globalLanguage, setGlobalLanguage] = useState<string>('All');
  const [categoryGenreFilter, setCategoryGenreFilter] = useState<string>('All');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [legalModalType, setLegalModalType] = useState<LegalDocType | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Track previous navigation tab for intuitive back button returns
  const previousTabRef = useRef<string>('home');

  const { watchlist } = useWatchlist();

  // Route parser for direct URLs (e.g., /movie/1514026 or #/movie/1514026) & history navigation
  useEffect(() => {
    const parseUrlRoute = async () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      let movieId: string | number | null = null;

      if (hash.startsWith('#/movie/')) {
        movieId = hash.replace('#/movie/', '').split('?')[0];
      } else if (path.startsWith('/movie/')) {
        movieId = path.replace('/movie/', '').split('?')[0];
      } else if (hash.startsWith('#/')) {
        const tab = hash.replace('#/', '').split('?')[0];
        if (['home', 'discover', 'movies', 'tv', 'watchlist', 'about', 'faq', 'categories', 'sitemap'].includes(tab)) {
          setCurrentTab(tab);
          setSelectedMovie(null);
          return;
        }
      } else if (!hash || hash === '#' || hash === '#/') {
        setCurrentTab('home');
        setSelectedMovie(null);
        return;
      }

      if (movieId) {
        const found = await MovieService.getById(movieId);
        if (found) {
          setSelectedMovie(found);
          setCurrentTab('movie-detail');
        }
      }
    };

    parseUrlRoute();

    // Listen for browser / mobile back button navigation
    const handleLocationChange = (e: PopStateEvent) => {
      // If an overlay modal was open when user pressed back, close modal first!
      if (isSearchOpen) {
        setIsSearchOpen(false);
      }
      if (popMovie) {
        setPopMovie(null);
      }
      if (legalModalType) {
        setLegalModalType(null);
      }

      parseUrlRoute();
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', parseUrlRoute);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', parseUrlRoute);
    };
  }, [isSearchOpen, popMovie, legalModalType]);

  // Keyboard shortcut: '/' opens search, 'Escape' closes search / modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        handleOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  /**
   * Universal Back Navigation:
   * Smoothly steps back one level across all features without exiting the website!
   */
  const handleAppBack = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      return;
    }
    if (popMovie) {
      setPopMovie(null);
      return;
    }
    if (legalModalType) {
      setLegalModalType(null);
      return;
    }

    if (currentTab === 'movie-detail') {
      const returnTab = previousTabRef.current || 'home';
      setCurrentTab(returnTab);
      setSelectedMovie(null);
      window.location.hash = `/${returnTab}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentTab !== 'home') {
      // If user came from categories to discover
      if (currentTab === 'discover' && previousTabRef.current === 'categories') {
        setCurrentTab('categories');
        window.location.hash = '/categories';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      // Return to home
      setCurrentTab('home');
      window.location.hash = '/home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
    }
  };

  /**
   * Clean Pop Window for all movies:
   * When user clicks to watch/play any movie, auto-activate the clean pop window immediately!
   */
  const handleSelectMovie = (movie: Movie, autoPlay = true) => {
    if (autoPlay) {
      // Auto-trigger clean pop window directly
      openSandboxFreePlayer(movie, 'vidsrc');
      setPopMovie(movie);
      window.history.pushState({ modal: 'player', id: movie.id }, '', window.location.hash || '#/');
    } else {
      previousTabRef.current = currentTab;
      setSelectedMovie(movie);
      setAutoPlayStream(false);
      setCurrentTab('movie-detail');
      window.history.pushState({ page: 'movie-detail', id: movie.id }, '', `#/movie/${movie.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
    window.history.pushState({ modal: 'search' }, '', window.location.hash || '#/');
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleOpenLegal = (type: LegalDocType) => {
    setLegalModalType(type);
    window.history.pushState({ modal: 'legal', doc: type }, '', window.location.hash || '#/');
  };

  const handleShare = (movie?: Movie) => {
    const targetMovie = movie || selectedMovie || popMovie;
    const shareTitle = targetMovie ? `${targetMovie.title} on U-MOVIE HUB` : 'U-MOVIE HUB — Watch Movies & TV Shows Online Free';
    const shareText = targetMovie ? `Stream ${targetMovie.title} in 4K UHD on U-MOVIE HUB!` : 'Stream trending movies and TV series across 10+ languages on U-MOVIE HUB!';
    const shareUrl = targetMovie ? `${window.location.origin}${window.location.pathname}#/movie/${targetMovie.id}` : window.location.href;

    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      }).catch(() => {
        navigator.clipboard.writeText(shareUrl);
        showToast('Direct movie link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      showToast('Direct movie link copied to clipboard!');
    }
  };

  const handleTabChange = (tab: string) => {
    if (currentTab !== 'movie-detail') {
      previousTabRef.current = currentTab;
    }
    setCurrentTab(tab);
    if (tab !== 'movie-detail') {
      setSelectedMovie(null);
      window.history.pushState({ page: 'tab', tab }, '', `/${tab}`);
      window.location.hash = `/${tab}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const canGoBack = currentTab !== 'home' || isSearchOpen || Boolean(popMovie) || Boolean(legalModalType);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#e5e5e5]">
      {/* Header Bar with Universal Back Button */}
      <Header
        currentTab={currentTab}
        onTabChange={handleTabChange}
        currentLanguage={globalLanguage}
        onLanguageChange={setGlobalLanguage}
        onOpenSearch={handleOpenSearch}
        watchlistCount={watchlist.length}
        onShare={() => handleShare()}
        canGoBack={canGoBack}
        onBack={handleAppBack}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onSelectMovie={handleSelectMovie}
            onNavigateTab={handleTabChange}
            globalLanguage={globalLanguage}
            onLanguageChange={setGlobalLanguage}
          />
        )}

        {currentTab === 'movie-detail' && selectedMovie && (
          <MovieDetailPage
            movie={selectedMovie}
            autoPlay={autoPlayStream}
            onBack={handleAppBack}
            onSelectMovie={(m) => handleSelectMovie(m, true)}
            onShare={handleShare}
          />
        )}

        {currentTab === 'categories' && (
          <CategoriesPage
            onBack={handleAppBack}
            onSelectCategory={(cat) => {
              previousTabRef.current = 'categories';
              setCategoryGenreFilter(cat.name);
              setCurrentTab('discover');
              window.history.pushState({ page: 'discover', filter: cat.name }, '', '#/discover');
              window.location.hash = '/discover';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'sitemap' && (
          <SitemapPage
            onBack={handleAppBack}
            onSelectMovie={(m) => handleSelectMovie(m, false)}
            onNavigateTab={handleTabChange}
          />
        )}

        {currentTab === 'discover' && (
          <DiscoverPage
            onBack={handleAppBack}
            onSelectMovie={(m) => handleSelectMovie(m, true)}
            initialType="All"
            initialGenre={categoryGenreFilter}
          />
        )}

        {currentTab === 'movies' && (
          <DiscoverPage
            key="movies-view"
            onBack={handleAppBack}
            onSelectMovie={(m) => handleSelectMovie(m, true)}
            initialType="Movies"
          />
        )}

        {currentTab === 'tv' && (
          <DiscoverPage
            key="tv-view"
            onBack={handleAppBack}
            onSelectMovie={(m) => handleSelectMovie(m, true)}
            initialType="Series"
          />
        )}

        {currentTab === 'watchlist' && (
          <WatchlistPage
            onSelectMovie={(m) => handleSelectMovie(m, true)}
            onNavigateHome={handleAppBack}
          />
        )}

        {(currentTab === 'about' || currentTab === 'faq') && <AboutPage />}
      </main>

      {/* Footer */}
      <Footer
        onNavClick={handleTabChange}
        onOpenLegal={handleOpenLegal}
      />

      {/* Clean Pop Window for All Movies with Auto-Active Server Switching */}
      <MoviePlayerModal
        movie={popMovie}
        onClose={handleAppBack}
        onViewFullDetails={(m) => handleSelectMovie(m, false)}
      />

      {/* Instant Search Modal with History Back Support */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={handleCloseSearch}
        onSelectMovie={(m) => handleSelectMovie(m, true)}
      />

      {/* Legal & Policy Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141622] border border-[#232738] text-white text-xs font-semibold shadow-2xl shadow-black animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4 text-[#E50914]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <WatchlistProvider>
      <AppContent />
    </WatchlistProvider>
  );
}
