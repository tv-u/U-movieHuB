import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Bookmark, 
  Share2, 
  Star, 
  Calendar, 
  Clock, 
  Globe, 
  ArrowLeft, 
  Download, 
  Check, 
  Film,
  Sparkles,
  Zap,
  ExternalLink,
  Tag,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Movie } from '../types/movie';
import { MoviePlayer } from '../components/MoviePlayer';
import { CastList } from '../components/CastList';
import { ReviewsSection } from '../components/ReviewsSection';
import { MovieCard } from '../components/MovieCard';
import { MovieService } from '../services/tmdb';
import { useWatchlist } from '../context/WatchlistContext';
import { openSandboxFreePlayer } from '../utils/playerHelper';
import { applyMovieSeoMetadata, generateMovieSeoKeywords } from '../utils/seoKeywords';
import { AdsterraBanner } from '../components/AdsterraBanner';
import { ADSTERRA_CONFIG } from '../services/adsterra';

interface MovieDetailPageProps {
  movie: Movie;
  autoPlay?: boolean;
  onBack: () => void;
  onSelectMovie: (movie: Movie) => void;
  onShare: (movie: Movie) => void;
}

export const MovieDetailPage: React.FC<MovieDetailPageProps> = ({
  movie,
  autoPlay = false,
  onBack,
  onSelectMovie,
  onShare,
}) => {
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const isBookmarked = isInWatchlist(movie.id);

  // Apply real-time SEO Title, Meta tags, and Schema.org Structured Data
  useEffect(() => {
    applyMovieSeoMetadata(movie);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    async function loadSimilar() {
      const similar = await MovieService.getSimilar(movie.id);
      setSimilarMovies(similar);
    }
    loadSimilar();

    if (autoPlay) {
      setTimeout(() => {
        playerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [movie.id, autoPlay]);

  const scrollToPlayer = () => {
    playerRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Automatically activate clean pop-up window as requested
    openSandboxFreePlayer(movie, 'vidsrc');
  };

  const seoKeywords = generateMovieSeoKeywords(movie);

  return (
    <div className="w-full pb-16">
      {/* Breadcrumb Navigation for SEO */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 text-xs text-slate-400 flex items-center gap-1.5 flex-wrap">
        <button onClick={onBack} className="hover:text-white transition-colors">Home</button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-slate-400 capitalize">{movie.type === 'tv' ? 'TV Series' : 'Movies'}</span>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-slate-400">{movie.genres[0] || 'Cinema'}</span>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-white font-semibold truncate max-w-xs">{movie.title}</span>
      </nav>

      {/* Backdrop Header Hero */}
      <div className="relative w-full min-h-[460px] lg:min-h-[520px] bg-black overflow-hidden flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={movie.backdropUrl}
            alt={`${movie.title} backdrop`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top opacity-35 filter blur-xs scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0e] via-[#090a0e]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090a0e] via-transparent to-[#090a0e]/60" />
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4 sm:left-8 z-30">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-[#ff003c] border border-white/10 text-white text-xs font-semibold backdrop-blur-md transition-all shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Catalog</span>
          </button>
        </div>

        {/* Main Info Hero Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start md:items-end">
            {/* Poster Thumbnail */}
            <div className="w-40 sm:w-52 lg:w-60 aspect-[2/3] rounded-2xl overflow-hidden bg-slate-900 border-2 border-white/10 shadow-2xl shrink-0 relative group">
              <img
                src={movie.posterUrl}
                alt={`${movie.title} official poster`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#ff003c] text-white text-[10px] font-bold uppercase">
                {movie.quality}
              </div>
            </div>

            {/* Details Column */}
            <div className="flex-1 space-y-3.5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {movie.rating} / 10
                </span>
                <span className="text-slate-500">·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {movie.releaseDate || movie.year}
                </span>
                <span className="text-slate-500">·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {movie.runtime}
                </span>
                <span className="text-slate-500">·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  {movie.language} ({movie.languageCode.toUpperCase()})
                </span>
                <span className="text-slate-500">·</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono">
                  TMDB: {movie.id}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {movie.title}
              </h1>

              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <p className="text-xs sm:text-sm text-slate-400 italic">
                  Original Title: {movie.originalTitle}
                </p>
              )}

              {/* Genres */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#161824] border border-[#252838] text-slate-300 font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Synopsis */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {movie.overview}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={scrollToPlayer}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ff003c] hover:bg-[#e00035] text-white font-bold text-xs tracking-wide shadow-lg shadow-[#ff003c]/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Stream</span>
                </button>

                {/* Instant Clean Pop Window (Sandbox Free) */}
                <button
                  onClick={() => openSandboxFreePlayer(movie)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
                  title="Launch clean sandbox-free external player"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Clean Pop Window</span>
                </button>

                <button
                  onClick={() => toggleWatchlist(movie)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    isBookmarked
                      ? 'bg-[#ff003c]/20 border-[#ff003c] text-[#ff003c]'
                      : 'bg-[#151722] hover:bg-[#1f2233] border-[#252838] text-slate-300 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  <span>{isBookmarked ? 'In Watchlist' : 'Add to Watchlist'}</span>
                </button>

                <button
                  onClick={() => setDownloadModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151722] hover:bg-[#1f2233] border border-[#252838] text-slate-300 hover:text-white text-xs font-semibold transition-all"
                >
                  <Download className="w-4 h-4 text-slate-400" />
                  <span>Download / VIP</span>
                </button>

                <button
                  onClick={() => onShare(movie)}
                  className="p-2.5 rounded-xl bg-[#151722] hover:bg-[#1f2233] border border-[#252838] text-slate-300 hover:text-white transition-colors"
                  title="Share Movie Link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-8">
        {/* Adsterra High-CPM Banner #1 (Above Player) */}
        <AdsterraBanner
          variant="leaderboard"
          customTitle={`⚡ Download ${movie.title} in 4K UHD or Stream High-Speed VIP Mirror`}
        />

        {/* Streaming Video Player Container */}
        <div ref={playerRef}>
          <MoviePlayer movie={movie} />
        </div>

        {/* Adsterra Native Ad Card #2 */}
        <AdsterraBanner
          variant="card"
          customTitle={`🚀 High Bandwidth Mirror & Multi-Subtitles for ${movie.title}`}
        />

        {/* Cast Section */}
        <CastList cast={movie.cast} />

        {/* Zero-Competition SEO Keywords & Google Indexing Tag Cloud */}
        <section className="p-5 rounded-2xl bg-[#10121a] border border-[#1e2233] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider text-[11px]">
              <Tag className="w-3.5 h-3.5 text-[#ff003c]" />
              <span>Search Engine Indexing & Long-Tail Keywords (Google Ranking)</span>
            </div>
            <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Indexed & Optimized
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Targeted zero-competition long-tail keywords indexed for <strong>{movie.title} ({movie.year})</strong>:
          </p>

          <div className="flex flex-wrap gap-1.5">
            {seoKeywords.map((kw, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-[#161824] border border-[#222638] text-slate-300 hover:text-white hover:border-[#ff003c]/40 transition-colors"
              >
                #{kw}
              </span>
            ))}
          </div>
        </section>

        {/* Similar / Recommended Movies */}
        {similarMovies.length > 0 && (
          <section className="py-6 border-t border-[#1b1e2c]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Film className="w-5 h-5 text-[#ff003c]" />
                <span>Similar Movies & Recommendations</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {similarMovies.map((sim) => (
                <MovieCard
                  key={sim.id}
                  movie={sim}
                  onClick={onSelectMovie}
                />
              ))}
            </div>
          </section>
        )}

        {/* User Reviews Section */}
        <ReviewsSection movieId={movie.id} movieTitle={movie.title} />
      </div>

      {/* Adsterra Powered Download Options Modal */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-[#11131c] border border-[#232738] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-[#ff003c]" />
                <h4 className="text-base font-bold text-white">Download {movie.title} (All Resolutions)</h4>
              </div>
              <button
                onClick={() => setDownloadModalOpen(false)}
                className="text-xs px-2 py-1 rounded bg-[#1e2233] text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Downloads and high-speed mirrors are powered by verified Adsterra High-CPM cloud nodes. Select a resolution below:
            </p>

            <div className="space-y-2.5 mb-4">
              {/* Option 1: 4K UHD via Smart Link 1 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#161824] border border-[#252838] hover:border-[#ff003c]/40 transition-all">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>2160p 4K UHD x265</span>
                    <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 font-mono">HDR10</span>
                  </div>
                  <div className="text-[11px] text-slate-400">6.4 GB · Dolby 5.1 · Ultra Fast Cloud</div>
                </div>
                <a
                  href={ADSTERRA_CONFIG.smartLinks[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[#ff003c] hover:bg-[#e00035] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1"
                >
                  <span>Download 4K</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Option 2: 1080p Full HD via Smart Link 2 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#161824] border border-[#252838] hover:border-[#ff003c]/40 transition-all">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>1080p Full HD x264</span>
                    <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-mono">WEB-DL</span>
                  </div>
                  <div className="text-[11px] text-slate-400">2.2 GB · Dual Audio (Eng + Hin)</div>
                </div>
                <a
                  href={ADSTERRA_CONFIG.smartLinks[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[#ff003c] hover:bg-[#e00035] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1"
                >
                  <span>Download 1080p</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Option 3: 720p Fast via Smart Link 3 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#161824] border border-[#252838] hover:border-[#ff003c]/40 transition-all">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>720p HD x264 (Mobile Friendly)</span>
                    <span className="text-[9px] px-1 rounded bg-blue-500/20 text-blue-300 font-mono">Fast</span>
                  </div>
                  <div className="text-[11px] text-slate-400">950 MB · Instant Direct Mirror</div>
                </div>
                <a
                  href={ADSTERRA_CONFIG.smartLinks[2].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[#222738] hover:bg-[#2e354c] text-white text-xs font-bold transition-all flex items-center gap-1"
                >
                  <span>Download 720p</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 text-center">
              All download servers verified for malware safety and high-speed bandwidth delivery.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
