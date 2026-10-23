import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  RotateCw, 
  Server, 
  ExternalLink, 
  Star, 
  Moon, 
  Sun, 
  ChevronRight,
  Info,
  Zap,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { Movie } from '../types/movie';
import { STREAMING_SERVERS } from '../services/streamingServers';
import { openSandboxFreePlayer } from '../utils/playerHelper';

interface MoviePlayerModalProps {
  movie: Movie | null;
  onClose: () => void;
  onViewFullDetails?: (movie: Movie) => void;
}

export const MoviePlayerModal: React.FC<MoviePlayerModalProps> = ({
  movie,
  onClose,
  onViewFullDetails,
}) => {
  const [activeServerId, setActiveServerId] = useState<string>('vidsrc');
  const [playerMode, setPlayerMode] = useState<'stream' | 'trailer'>('stream');
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState<number>(0);
  const [showSandboxNotice, setShowSandboxNotice] = useState<boolean>(true);
  const [autoPopToast, setAutoPopToast] = useState<string | null>(null);

  // Automatically activate clean pop window as soon as movie player opens!
  useEffect(() => {
    if (movie) {
      openSandboxFreePlayer(movie, activeServerId);
      setAutoPopToast(`Clean Pop Window automatically activated for ${movie.title}`);
      const t = setTimeout(() => setAutoPopToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [movie?.id]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  const activeServer = STREAMING_SERVERS.find(s => s.id === activeServerId) || STREAMING_SERVERS[0];
  const streamUrl = activeServer.getEmbedUrl(movie);
  const trailerUrl = `https://www.youtube-nocookie.com/embed/${movie.trailerYoutubeId}?autoplay=1&rel=0`;

  /**
   * Automatic Clean Pop Window Trigger on Server Switch:
   * Selecting any server instantly activates/updates the clean standalone pop window!
   */
  const handleServerSelect = (serverId: string) => {
    setActiveServerId(serverId);
    const targetServer = STREAMING_SERVERS.find(s => s.id === serverId) || STREAMING_SERVERS[0];
    
    // Automatically open or sync clean pop window
    openSandboxFreePlayer(movie, serverId);
    
    setAutoPopToast(`Auto-switched clean pop window to ${targetServer.name}`);
    setTimeout(() => setAutoPopToast(null), 2500);
  };

  const handleNextServer = () => {
    const currentIndex = STREAMING_SERVERS.findIndex(s => s.id === activeServerId);
    const nextIndex = (currentIndex + 1) % STREAMING_SERVERS.length;
    const nextServer = STREAMING_SERVERS[nextIndex];
    handleServerSelect(nextServer.id);
  };

  const handleManualPopLaunch = () => {
    openSandboxFreePlayer(movie, activeServerId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/92 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`w-full bg-[#0d0e14] border border-[#232738] rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isCinemaMode ? 'max-w-7xl h-[95vh]' : 'max-w-5xl max-h-[94vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 border-b border-[#1f2230] bg-[#12141c]">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Direct Back / Close Arrow */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1a1c28] hover:bg-[#ff003c] text-white text-xs font-semibold transition-all mr-1"
              title="Back to Catalog (Esc)"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="w-7 h-7 rounded-lg bg-[#E50914] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#E50914]/30">
              <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white truncate max-w-xs sm:max-w-md">
                  {movie.title}
                </h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1e2233] text-slate-300 font-mono hidden sm:inline">
                  {movie.quality}
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Clean Pop Window Auto-Active
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span>{movie.year}</span>
                <span>·</span>
                <span className="text-amber-400 font-bold flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {movie.rating}
                </span>
                <span>·</span>
                <span className="text-[#E50914] font-semibold">{activeServer.name}</span>
              </div>
            </div>
          </div>

          {/* Action buttons on Pop Window header */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Clean Standalone Pop-out Window Status Button */}
            <button
              onClick={handleManualPopLaunch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E50914] hover:bg-[#c70812] text-white text-xs font-bold transition-all shadow-md shadow-[#E50914]/30"
              title="Clean Pop Window is auto-activated. Click to focus window."
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Clean Pop Window</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping ml-0.5"></span>
            </button>

            {/* Cinema Mode */}
            <button
              onClick={() => setIsCinemaMode(!isCinemaMode)}
              className="p-1.5 rounded-lg bg-[#1a1c28] hover:bg-[#252838] text-slate-300 hover:text-white transition-colors hidden sm:flex"
              title="Toggle Cinema Mode"
            >
              {isCinemaMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Full Details Page */}
            {onViewFullDetails && (
              <button
                onClick={() => {
                  onViewFullDetails(movie);
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-[#1a1c28] hover:bg-[#252838] text-slate-300 hover:text-white transition-colors"
                title="View Full Movie Details Page"
              >
                <Info className="w-4 h-4" />
              </button>
            )}

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#1a1c28] hover:bg-rose-900/40 text-slate-400 hover:text-white transition-colors ml-1"
              title="Back to Catalog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auto Pop Notification Bar */}
        {autoPopToast && (
          <div className="bg-emerald-950/80 border-b border-emerald-500/25 px-3 py-1.5 flex items-center justify-between text-[11px] text-emerald-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{autoPopToast}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">100% UNBLOCKED</span>
          </div>
        )}

        {/* Sandbox Bypass Notice Strip */}
        {showSandboxNotice && !autoPopToast && (
          <div className="bg-gradient-to-r from-emerald-950/80 via-[#131a24] to-emerald-950/80 border-b border-emerald-500/20 px-3 py-1.5 flex items-center justify-between text-[11px] text-emerald-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span><strong>Auto-Pop Feature Active:</strong> Har server select karte he clean popup window background me open/sync ho jata hai bina manually click kiye!</span>
            </div>
            <button 
              onClick={() => setShowSandboxNotice(false)}
              className="text-emerald-400 hover:text-white ml-2 text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* Video Player Frame Container (16:9 ratio) - STRICTLY NO SANDBOX */}
        <div className="relative aspect-video w-full bg-black shrink-0">
          {playerMode === 'stream' ? (
            <iframe
              key={`pop-stream-${activeServerId}-${reloadKey}-${movie.id}`}
              src={streamUrl}
              title={`Play ${movie.title} on ${activeServer.name}`}
              className="w-full h-full border-0"
              allowFullScreen={true}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; cross-origin-isolated"
              referrerPolicy="no-referrer"
            />
          ) : (
            <iframe
              key={`pop-trailer-${movie.trailerYoutubeId}-${reloadKey}`}
              src={trailerUrl}
              title={`Trailer - ${movie.title}`}
              className="w-full h-full border-0"
              allowFullScreen={true}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {/* Player Controls & 10 Servers Selector */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-[#0d0e14]">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5 p-1 bg-[#141622] border border-[#232738] rounded-xl">
              <button
                onClick={() => setPlayerMode('stream')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  playerMode === 'stream'
                    ? 'bg-[#E50914] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Stream Player
              </button>
              <button
                onClick={() => setPlayerMode('trailer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  playerMode === 'trailer'
                    ? 'bg-[#E50914] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Official Trailer
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Quick Switch Next Server Button */}
              <button
                onClick={handleNextServer}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1a1c28] hover:bg-[#252838] border border-[#2c3045] text-xs font-semibold text-white transition-all"
                title="Switch server and auto-update clean pop window"
              >
                <span>Next Server</span>
                <span className="text-[10px] text-[#E50914] font-mono font-bold">
                  (S{STREAMING_SERVERS.findIndex(s => s.id === activeServerId) + 1}/10)
                </span>
              </button>

              {/* Direct Tab Link */}
              <button
                onClick={() => window.open(streamUrl, '_blank', 'noopener,noreferrer')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1a1c28] hover:bg-[#252838] border border-[#2c3045] text-xs font-semibold text-slate-300 hover:text-white transition-all"
                title="Direct raw link in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Raw Stream</span>
              </button>

              {/* Reload Button */}
              <button
                onClick={() => setReloadKey(prev => prev + 1)}
                className="p-1.5 rounded-lg bg-[#1a1c28] hover:bg-[#252838] text-slate-300 hover:text-white transition-colors"
                title="Reload Stream"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 10 Streaming Servers Pills with Auto Clean Pop Window */}
          <div className="p-3 rounded-xl bg-[#12141c] border border-[#1f2230] space-y-2">
            <div className="flex items-center justify-between text-xs flex-wrap gap-2">
              <div className="flex items-center gap-1.5 font-bold text-white uppercase text-[11px] tracking-wider">
                <Server className="w-3.5 h-3.5 text-[#E50914]" />
                <span>10 Streaming Servers (Auto-Synced with Clean Pop Window)</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold">
                ✓ Server select hote hi clean pop window me chal jata hai
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {STREAMING_SERVERS.map((server, i) => {
                const isActive = activeServerId === server.id;
                return (
                  <button
                    key={server.id}
                    onClick={() => handleServerSelect(server.id)}
                    className={`flex items-center justify-between p-2 rounded-lg border text-left text-xs transition-all ${
                      isActive
                        ? 'bg-[#E50914] border-[#E50914] text-white shadow-sm font-bold'
                        : 'bg-[#181a26] hover:bg-[#202334] border-[#252838] text-slate-300'
                    }`}
                  >
                    <span className="truncate">{server.name}</span>
                    <span className={`text-[9px] font-mono px-1 rounded ${isActive ? 'bg-white/20' : 'text-slate-400'}`}>
                      S{i + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Movie Overview & Info */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-400">
            <p className="line-clamp-2 leading-relaxed max-w-2xl">
              {movie.overview}
            </p>
            <button
              onClick={handleManualPopLaunch}
              className="text-[#E50914] hover:underline font-semibold flex items-center gap-1 shrink-0"
            >
              <span>Pop Window Player me chalayein</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
