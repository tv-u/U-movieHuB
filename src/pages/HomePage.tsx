import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Flame, 
  Award, 
  PlayCircle, 
  Globe2, 
  ChevronRight, 
  Layers,
  Sparkles,
  CheckCircle2,
  Tv,
  Film,
  Search,
  Sliders,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { Movie } from '../types/movie';
import { HeroSection } from '../components/HeroSection';
import { MovieRow } from '../components/MovieRow';
import { MovieCard } from '../components/MovieCard';
import { MovieService } from '../services/tmdb';
import { GENRE_LIST, SUPPORTED_LANGUAGES } from '../data/movies';
import { AdsterraBanner } from '../components/AdsterraBanner';
import { ENTERTAINMENT_CATEGORIES } from '../data/categories';

interface HomePageProps {
  onSelectMovie: (movie: Movie, autoPlay?: boolean) => void;
  onNavigateTab: (tab: string) => void;
  globalLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectMovie,
  onNavigateTab,
  globalLanguage,
  onLanguageChange,
}) => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  
  // Trending pagination state
  const [trendingPage, setTrendingPage] = useState<number>(1);
  const [hasMoreTrending, setHasMoreTrending] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      const [feat, pop, top, now] = await Promise.all([
        MovieService.getFeaturedMovies(),
        MovieService.getPopular(),
        MovieService.getTopRated(),
        MovieService.getNowPlaying(),
      ]);
      setFeaturedMovies(feat);
      setPopularMovies(pop);
      setTopRatedMovies(top);
      setNowPlayingMovies(now);
    }
    loadData();
  }, []);

  // Reset and fetch trending when language changes
  useEffect(() => {
    async function fetchInitialTrending() {
      setTrendingPage(1);
      const result = await MovieService.getTrending(1, globalLanguage);
      setTrendingMovies(result.movies);
      setHasMoreTrending(true); // Unlimited load more feature active
    }
    fetchInitialTrending();
  }, [globalLanguage]);

  const handleLoadMoreTrending = async () => {
    setIsLoadingMore(true);
    const nextPage = trendingPage + 1;
    const result = await MovieService.getTrending(nextPage, globalLanguage);
    setTrendingMovies(prev => {
      const existingIds = new Set(prev.map(m => String(m.tmdbId || m.id)));
      const filteredNew = result.movies.filter(m => !existingIds.has(String(m.tmdbId || m.id)));
      return [...prev, ...filteredNew];
    });
    setHasMoreTrending(true); // Unlimited continuous load more
    setTrendingPage(nextPage);
    setIsLoadingMore(false);
  };

  // Filter movies for genre row
  const genreFilteredMovies = selectedGenre === 'All' 
    ? popularMovies 
    : popularMovies.filter(m => m.genres.includes(selectedGenre));

  return (
    <div className="w-full pb-16">
      {/* 1. Cinematic / Portal Hero Section */}
      <HeroSection
        featuredMovies={featuredMovies}
        onWatchNow={(movie) => onSelectMovie(movie, true)}
        onViewDetails={(movie) => onSelectMovie(movie, false)}
        onSearchSelect={(movie) => onSelectMovie(movie, true)}
        onExploreClick={() => {
          const el = document.getElementById('catalog-content');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <div id="catalog-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 mt-6">
        {/* 2. KPI Metrics Bar (from reference ym-metric) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="ym-metric">
            <p className="text-2xl sm:text-4xl font-black text-white mb-1">10,000+</p>
            <p className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-widest font-semibold">Movies & Episodes</p>
          </div>
          <div className="ym-metric">
            <p className="text-2xl sm:text-4xl font-black text-white mb-1">100%</p>
            <p className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-widest font-semibold">Free Streaming</p>
          </div>
          <div className="ym-metric">
            <p className="text-2xl sm:text-4xl font-black text-white mb-1">HD & 4K</p>
            <p className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-widest font-semibold">Quality Output</p>
          </div>
          <div className="ym-metric">
            <p className="text-2xl sm:text-4xl font-black text-white mb-1">No Sign-Up</p>
            <p className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-widest font-semibold">Instant Play</p>
          </div>
        </div>

        {/* 3. Browse by Language Bar */}
        <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-[#E50914]" />
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              Browse by Language:
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
            <button
              onClick={() => onLanguageChange('All')}
              className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${
                globalLanguage === 'All'
                  ? 'bg-[#E50914] text-white shadow-sm font-bold'
                  : 'bg-[#1e1e1e] text-slate-300 hover:bg-[#282828]'
              }`}
            >
              All Languages
            </button>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.name)}
                className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all flex items-center gap-1.5 ${
                  globalLanguage === lang.name
                    ? 'bg-[#E50914] text-white shadow-sm font-bold'
                    : 'bg-[#1e1e1e] text-slate-300 hover:bg-[#282828]'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 100 Entertainment Categories Quick Ribbon */}
        <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] space-y-2.5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E50914]" />
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                100 Global Categories & Micro-Themes:
              </span>
            </div>
            <button
              onClick={() => onNavigateTab('categories')}
              className="text-xs text-[#E50914] hover:underline font-semibold flex items-center gap-1"
            >
              <span>View All 100</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {ENTERTAINMENT_CATEGORIES.slice(0, 16).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigateTab('categories')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1d1d24] hover:bg-[#ff003c] hover:text-white border border-[#2b2b36] text-slate-300 text-xs font-semibold whitespace-nowrap transition-all shadow-sm"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Adsterra High-CPM Banner */}
        <AdsterraBanner
          variant="leaderboard"
          customTitle="⚡ High-Speed 4K Cloud Streaming & Direct File Download (No Buffer Ads)"
        />

        {/* 4. Trending Now Section (with Unlimited Load More & Numeric Pagination) */}
        <section className="py-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#E50914]/15 text-[#E50914]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  Trending Now
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Most watched cinema and entertainment today · Page {trendingPage}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('discover')}
              className="flex items-center gap-1 text-xs font-semibold text-[#E50914] hover:text-[#ff3864] transition-colors"
            >
              <span>Explore All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
            {trendingMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={(m) => onSelectMovie(m, false)}
                onPlayClick={(m) => onSelectMovie(m, true)}
              />
            ))}
          </div>

          {/* Dual Pagination: Unlimited Continuous Load More + Numeric Pages */}
          <div className="mt-8 flex flex-col items-center gap-4">
            {hasMoreTrending && (
              <button
                onClick={handleLoadMoreTrending}
                disabled={isLoadingMore}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#181818] hover:bg-[#252525] border border-[#383838] hover:border-[#E50914]/60 text-white font-bold text-xs tracking-wide transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {isLoadingMore ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#E50914] border-t-transparent rounded-full animate-spin" />
                    <span>Loading Next Batch...</span>
                  </>
                ) : (
                  <>
                    <span>Load More Movies (Unlimited Continuous)</span>
                    <ChevronRight className="w-4 h-4 text-[#E50914]" />
                  </>
                )}
              </button>
            )}

            {/* Quick Page Jump Buttons (1, 2, 3, 4, 5 ...) */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center pt-2">
              <span className="text-xs text-slate-500 mr-2">Jump to Page:</span>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
                <button
                  key={p}
                  onClick={async () => {
                    setIsLoadingMore(true);
                    setTrendingPage(p);
                    const res = await MovieService.getTrending(p, globalLanguage);
                    setTrendingMovies(res.movies);
                    setIsLoadingMore(false);
                    window.scrollTo({ top: 600, behavior: 'smooth' });
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                    trendingPage === p
                      ? 'bg-[#E50914] text-white shadow-md'
                      : 'bg-[#181818] hover:bg-[#252525] border border-[#2b2b2b] text-slate-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Popular Hits Section */}
        <MovieRow
          title="Popular Hits"
          subtitle="Critically acclaimed movies loved worldwide"
          icon={Flame}
          movies={popularMovies}
          onMovieClick={(m) => onSelectMovie(m, false)}
          onPlayClick={(m) => onSelectMovie(m, true)}
          onViewAll={() => onNavigateTab('movies')}
        />

        {/* 6. Top Rated Cinema */}
        <MovieRow
          title="Top Rated Cinema"
          subtitle="Highest rating masterpieces ranked by global audiences"
          icon={Award}
          movies={topRatedMovies}
          onMovieClick={(m) => onSelectMovie(m, false)}
          onPlayClick={(m) => onSelectMovie(m, true)}
          onViewAll={() => onNavigateTab('movies')}
        />

        {/* 7. Now Playing */}
        <MovieRow
          title="Now Playing"
          subtitle="Fresh theatrical and digital cinema drops"
          icon={PlayCircle}
          movies={nowPlayingMovies}
          onMovieClick={(m) => onSelectMovie(m, false)}
          onPlayClick={(m) => onSelectMovie(m, true)}
          onViewAll={() => onNavigateTab('movies')}
        />

        {/* 8. Genre Exploration Showcase */}
        <section className="py-6 border-t border-[#23252c]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#E50914]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Explore by Genre
              </h2>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full">
              {GENRE_LIST.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${
                    selectedGenre === genre
                      ? 'bg-[#E50914] text-white shadow-sm font-bold'
                      : 'bg-[#181818] text-slate-300 hover:bg-[#252525]'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
            {genreFilteredMovies.slice(0, 12).map((movie) => (
              <MovieCard
                key={`genre-${movie.id}`}
                movie={movie}
                onClick={(m) => onSelectMovie(m, false)}
                onPlayClick={(m) => onSelectMovie(m, true)}
              />
            ))}
          </div>
        </section>

        {/* 9. Key Features Cards (from reference ym-card) */}
        <section className="py-8 border-t border-[#23252c]">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-[11px] font-bold text-[#E50914] uppercase tracking-widest">
              Premium Entertainment Experience
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Key Features of U-Movie Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              A frictionless streaming architecture designed for movies and TV show enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="ym-card space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-[#E50914]/15 text-[#E50914] flex items-center justify-center font-bold text-lg">
                ○
              </div>
              <h3 className="text-base font-bold text-white">Ultra HD Video</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Crystal-clear 720p, 1080p, and 4K streams with adaptive bitrate matching your connection bandwidth.
              </p>
            </div>

            <div className="ym-card space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-[#E50914]/15 text-[#E50914] flex items-center justify-center font-bold text-lg">
                ⌕
              </div>
              <h3 className="text-base font-bold text-white">Smart Search</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The live search engine finds any movie, franchise, or actor in milliseconds with suggestions as you type.
              </p>
            </div>

            <div className="ym-card space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-[#E50914]/15 text-[#E50914] flex items-center justify-center font-bold text-lg">
                ☷
              </div>
              <h3 className="text-base font-bold text-white">Multi-Server Backup</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                10 independent streaming servers. If one stalls, switch to another server in a single click.
              </p>
            </div>

            <div className="ym-card space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-[#E50914]/15 text-[#E50914] flex items-center justify-center font-bold text-lg">
                ⚡
              </div>
              <h3 className="text-base font-bold text-white">No Downloads Needed</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Everything streams instantly in your browser — zero installation, zero downloads, and zero plugins.
              </p>
            </div>
          </div>
        </section>

        {/* 10. How to Watch in 6 Easy Steps (from reference ym-step) */}
        <section className="py-8 border-t border-[#23252c]">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              How to Watch on U-Movie Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              From landing page to play button in six easy steps.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {[
              { num: '1', title: 'Open Hub', desc: 'Visit on any browser or screen.' },
              { num: '2', title: 'Search Title', desc: 'Use the live search bar.' },
              { num: '3', title: 'Browse Genres', desc: 'Explore curated shelves.' },
              { num: '4', title: 'Pick a Title', desc: 'Open details, cast & info.' },
              { num: '5', title: 'Select Server', desc: 'Pick from 10 fast servers.' },
              { num: '6', title: 'Fullscreen', desc: 'Sit back and enjoy the show.' },
            ].map((step) => (
              <div key={step.num} className="ym-step flex flex-col justify-between">
                <div>
                  <div className="ym-step-num">{step.num}</div>
                  <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
                </div>
                <p className="text-xs text-slate-400 mt-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 11. Comparison Table (Free vs Paid Streaming Services) */}
        <section className="py-8 border-t border-[#23252c]">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              U-Movie Hub vs Paid Streaming Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              See how free streaming stacks up against monthly subscriptions.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#262626] bg-[#141414] shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#1c1c1c] text-white uppercase text-[11px] tracking-wider border-b border-[#262626]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Feature</th>
                  <th className="py-3.5 px-4 sm:px-6 text-[#E50914] font-bold">U-Movie Hub</th>
                  <th className="py-3.5 px-4 sm:px-6 text-slate-400">Paid Streaming Services</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626] text-slate-300">
                <tr>
                  <td className="py-3 px-4 sm:px-6 font-semibold text-white">Monthly Price</td>
                  <td className="py-3 px-4 sm:px-6 text-emerald-400 font-bold">$0 (100% Free Forever)</td>
                  <td className="py-3 px-4 sm:px-6 text-slate-400">$15+ / month</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 sm:px-6 font-semibold text-white">Account Required</td>
                  <td className="py-3 px-4 sm:px-6 text-emerald-400 font-bold">No Sign-Up Needed</td>
                  <td className="py-3 px-4 sm:px-6 text-slate-400">Yes (Email, Credit Card)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 sm:px-6 font-semibold text-white">HD & 4K Access</td>
                  <td className="py-3 px-4 sm:px-6 text-emerald-400 font-bold">Free for Everyone</td>
                  <td className="py-3 px-4 sm:px-6 text-slate-400">Expensive Premium Tier Only</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 sm:px-6 font-semibold text-white">Device Limits</td>
                  <td className="py-3 px-4 sm:px-6 text-emerald-400 font-bold">Unlimited Screens</td>
                  <td className="py-3 px-4 sm:px-6 text-slate-400">Strictly Restricted</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 sm:px-6 font-semibold text-white">Multi-Server Redundancy</td>
                  <td className="py-3 px-4 sm:px-6 text-emerald-400 font-bold">10 Server Gateways</td>
                  <td className="py-3 px-4 sm:px-6 text-slate-400">Single Centralized Server</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 12. Troubleshooting & Playback Tips */}
        <section className="py-8 border-t border-[#23252c]">
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#E50914]" />
              <h3 className="text-lg font-bold text-white">
                Troubleshooting & Playback Tips
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1c1c1c]">
                <span className="text-[#E50914] font-bold text-base">✓</span>
                <div>
                  <strong className="text-white">Buffering?</strong> Pause for 20-30 seconds to allow the player buffer to fill, or click "Next Server".
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1c1c1c]">
                <span className="text-[#E50914] font-bold text-base">✓</span>
                <div>
                  <strong className="text-white">Video won't load?</strong> Switch to Server 2, 3 or 4, or click "Open in Tab" for direct external viewing.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1c1c1c]">
                <span className="text-[#E50914] font-bold text-base">✓</span>
                <div>
                  <strong className="text-white">No sound?</strong> Unmute the player audio icon, then verify your system device volume.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1c1c1c]">
                <span className="text-[#E50914] font-bold text-base">✓</span>
                <div>
                  <strong className="text-white">Trailer Mode:</strong> You can switch anytime between Stream Player and Official HD Trailer right on top of the player.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 13. Interactive 15-Question FAQ Section */}
        <section className="py-8 border-t border-[#23252c]">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Everything you need to know about streaming on U-Movie Hub.
            </p>
          </div>

          <div className="space-y-3 max-w-4xl mx-auto text-xs sm:text-sm">
            {[
              { q: 'Is U-Movie Hub really free?', a: 'Yes. Every movie and TV show on U-Movie Hub is completely free to stream — no subscriptions, rentals, or hidden charges of any kind.' },
              { q: 'Do I need an account to watch?', a: 'No. There is no registration, email, or credit-card required — simply click any movie and press play.' },
              { q: 'What video quality can I stream in?', a: 'Most titles stream in 720p or 1080p Full HD, and blockbusters are available in crisp 4K UHD with adaptive bitrate.' },
              { q: 'Which devices can I use?', a: 'Any device with a modern web browser: phones, tablets, laptops, desktops, and smart TVs.' },
              { q: 'How often is new content added?', a: 'Daily. The catalogue is updated continuously with new cinema drops and fresh TV episodes.' },
              { q: 'How do the 10 streaming servers work?', a: 'Each title includes 10 server options (VidSrc, VidSrc 2, EmbedSU, AutoEmbed, VidLink, MoviesAPI, 2Embed, SmashyStream, MultiEmbed, VidSrc CC). If one server buffers, you can switch servers instantly with the "Next Server" button.' },
              { q: 'Can I download movies?', a: 'U-Movie Hub is built for instant streaming without software installations. Direct downloads depend on mirror availability.' },
              { q: 'Is there a watchlist feature?', a: 'Yes! You can bookmark any title to your watchlist by clicking the bookmark icon on any poster. It is saved in your local browser storage.' },
              { q: 'What should I do if a server gives an error?', a: 'Click the "Next Server" button or select Server 2, 3, or 4 from the server grid, or click "Open in Tab" to bypass iframe blocking.' },
              { q: 'Do videos have subtitles?', a: 'Yes, multi-language subtitle tracks can be toggled directly from the streaming player controls.' },
            ].map((faq, i) => (
              <details
                key={i}
                className="bg-[#141414] border border-[#262626] rounded-xl p-4 transition-colors group cursor-pointer"
              >
                <summary className="font-bold text-white list-none flex items-center justify-between outline-none">
                  <span>{faq.q}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-2.5 text-slate-300 leading-relaxed text-xs">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* 14. CTA Banner (from reference ym-ctabanner) */}
        <div className="ym-ctabanner py-14 px-6 sm:px-12 my-10 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">
            Join Millions of Movie Lovers
          </h2>
          <p className="text-white/90 text-xs sm:text-base max-w-xl mx-auto mb-6">
            Your next favorite movie is one click away. Dive into the full library — free forever, no sign-up needed.
          </p>
          <button
            onClick={() => {
              if (trendingMovies[0]) onSelectMovie(trendingMovies[0], true);
            }}
            className="px-8 py-3.5 rounded-full bg-white text-[#E50914] font-bold text-sm tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Start Watching Free
          </button>
        </div>

        {/* 15. Streaming Network Grid (from reference ym-network-grid) */}
        <section className="py-6 border-t border-[#23252c]">
          <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Explore the NetPrime Streaming Network
            </h3>
            <p className="text-xs text-slate-400">
              Trusted streaming nodes offering high-speed cinema indexing worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
            {[
              { name: 'NetPrime', desc: 'Flagship streaming gateway with extensive cinema libraries.' },
              { name: 'BFlix', desc: 'Stream latest blockbusters and trending series with zero registration.' },
              { name: 'GMovies', desc: 'Thousands of films across all genres with seamless navigation.' },
              { name: 'GoMovies', desc: 'Instant access to top-rated movies and multi-server redundancy.' },
              { name: 'LosMoviesz', desc: 'Daily updates with new releases and classic cinema in HD.' },
              { name: 'MoviesJoy', desc: 'Cinema-quality streaming from the comfort of your home.' },
              { name: 'PrimeWire', desc: 'Premium streaming experience with fast loading speeds.' },
              { name: 'SolarMovies', desc: 'Unlimited streaming with thousands of titles updated daily.' },
              { name: 'WatchSeries', desc: 'Specialized in complete TV series seasons for binge-watching.' },
              { name: 'VexMovies', desc: 'Curated selection of quality films with reliable playback.' },
              { name: 'MyFlixer', desc: 'Massive library of movies and TV shows, no subscription.' },
              { name: 'FMovies', desc: 'Your destination for trending series and high-definition cinema.' },
            ].map((node) => (
              <div key={node.name} className="p-3.5 rounded-xl bg-[#141414] border border-[#262626]">
                <h4 className="font-bold text-[#E50914] text-xs mb-1">{node.name}</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">{node.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
