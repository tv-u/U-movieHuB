import React, { useState, useEffect } from 'react';
import { 
  Server, 
  RotateCw, 
  AlertTriangle, 
  Maximize2, 
  Sparkles, 
  Film, 
  Tv, 
  Check, 
  ChevronDown,
  MonitorPlay,
  Sun,
  Moon,
  Zap,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Movie } from '../types/movie';
import { STREAMING_SERVERS } from '../services/streamingServers';
import { openSandboxFreePlayer } from '../utils/playerHelper';

interface MoviePlayerProps {
  movie: Movie;
  selectedSeason?: number;
  selectedEpisode?: number;
}

export const MoviePlayer: React.FC<MoviePlayerProps> = ({
  movie,
  selectedSeason = 1,
  selectedEpisode = 1,
}) => {
  const [activeServerId, setActiveServerId] = useState<string>('vidsrc');
  const [playerMode, setPlayerMode] = useState<'stream' | 'trailer'>('stream');
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState<number>(0);
  const [isReporting, setIsReporting] = useState<boolean>(false);
  const [reportSent, setReportSent] = useState<boolean>(false);
  const [selectedIssue, setSelectedIssue] = useState<string>('Video playback buffering or stopped');
  const [autoPopActiveToast, setAutoPopActiveToast] = useState<string | null>(null);

  const activeServer = STREAMING_SERVERS.find(s => s.id === activeServerId) || STREAMING_SERVERS[0];
  const streamUrl = activeServer.getEmbedUrl(movie, selectedSeason, selectedEpisode);
  const trailerUrl = `https://www.youtube-nocookie.com/embed/${movie.trailerYoutubeId}?autoplay=1&rel=0`;

  /**
   * Automatic Clean Pop Window Trigger:
   * Whenever any server (S1 to S10) is selected or changed,
   * automatically activate and synchronize the standalone sandbox-free pop window!
   */
  const handleServerSelect = (serverId: string) => {
    setActiveServerId(serverId);
    const targetServer = STREAMING_SERVERS.find(s => s.id === serverId) || STREAMING_SERVERS[0];
    
    // Auto-launch/sync clean pop-up window in background/top window
    openSandboxFreePlayer(movie, serverId, selectedSeason, selectedEpisode);
    
    // Provide quick user visual confirmation
    setAutoPopActiveToast(`Clean Pop Window auto-synced to ${targetServer.name}`);
    setTimeout(() => {
      setAutoPopActiveToast(null);
    }, 2500);
  };

  const handleNextServer = () => {
    const currentIndex = STREAMING_SERVERS.findIndex(s => s.id === activeServerId);
    const nextIndex = (currentIndex + 1) % STREAMING_SERVERS.length;
    const nextServer = STREAMING_SERVERS[nextIndex];
    handleServerSelect(nextServer.id);
  };

  const handleReload = () => {
    setReloadKey(prev => prev + 1);
  };

  const handleManualLaunchPopWindow = () => {
    openSandboxFreePlayer(movie, activeServerId, selectedSeason, selectedEpisode);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSent(true);
    setTimeout(() => {
      setReportSent(false);
      setIsReporting(false);
    }, 2000);
  };

  return (
    <div className={`w-full transition-all duration-300 ${isCinemaMode ? 'fixed inset-0 z-50 bg-black/95 p-4 sm:p-8 overflow-y-auto' : 'relative my-6'}`}>
      <div className={`mx-auto ${isCinemaMode ? 'max-w-6xl' : 'max-w-5xl'}`}>
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 p-1 bg-[#141622] border border-[#232738] rounded-xl">
              <button
                onClick={() => setPlayerMode('stream')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  playerMode === 'stream'
                    ? 'bg-[#ff003c] text-white shadow-sm shadow-[#ff003c]/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MonitorPlay className="w-3.5 h-3.5" />
                <span>Stream Player</span>
              </button>

              <button
                onClick={() => setPlayerMode('trailer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  playerMode === 'trailer'
                    ? 'bg-[#ff003c] text-white shadow-sm shadow-[#ff003c]/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Official Trailer</span>
              </button>
            </div>

            {playerMode === 'stream' && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 font-medium">
                <Check className="w-3 h-3" />
                {activeServer.name} Connected
              </span>
            )}
          </div>

          {/* Quick Player Utility Actions */}
          <div className="flex items-center gap-1.5 text-xs">
            {/* Auto Clean Pop Window Status Button */}
            <button
              onClick={handleManualLaunchPopWindow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ff003c] hover:bg-[#c70812] text-white font-bold transition-all shadow-md shadow-[#ff003c]/30"
              title="Clean Pop Window is auto-activated on every server selection. Click anytime to bring window to focus."
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Clean Pop Window</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-0.5"></span>
            </button>

            <button
              onClick={handleNextServer}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#ff003c]/15 hover:bg-[#ff003c] text-[#ff003c] hover:text-white border border-[#ff003c]/30 font-semibold transition-all"
              title="Quickly switch to next streaming server mirror (auto-syncs to pop window)"
            >
              <span>Next Server</span>
              <span className="text-[10px] font-mono opacity-80">
                (S{STREAMING_SERVERS.findIndex(s => s.id === activeServerId) + 1}/10)
              </span>
            </button>

            <button
              onClick={() => window.open(streamUrl, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#141622] hover:bg-[#1f2233] border border-[#232738] text-slate-300 hover:text-white transition-colors"
              title="Open stream directly in raw browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#ff003c]" />
              <span className="hidden sm:inline">Direct Tab</span>
            </button>

            <button
              onClick={() => setIsCinemaMode(!isCinemaMode)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#141622] hover:bg-[#1f2233] border border-[#232738] text-slate-300 hover:text-white transition-colors"
              title="Toggle Cinema Mode"
            >
              {isCinemaMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isCinemaMode ? 'Exit' : 'Cinema'}</span>
            </button>

            <button
              onClick={handleReload}
              className="p-1.5 rounded-lg bg-[#141622] hover:bg-[#1f2233] border border-[#232738] text-slate-300 hover:text-white transition-colors"
              title="Reload Player Stream"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsReporting(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#141622] hover:bg-[#1f2233] border border-[#232738] text-slate-400 hover:text-amber-400 transition-colors"
              title="Report broken server link"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Report</span>
            </button>
          </div>
        </div>

        {/* Dynamic Auto-Pop Toast Message Banner */}
        {autoPopActiveToast && (
          <div className="mb-2 py-1.5 px-3 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{autoPopActiveToast} (Sandbox-Free Window Ready)</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 font-mono">AUTO ACTIVE</span>
          </div>
        )}

        {/* Video Player Frame Container (16:9 ratio) - No sandbox attribute */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-[#232738] shadow-2xl">
          {playerMode === 'stream' ? (
            <iframe
              key={`stream-${activeServerId}-${reloadKey}`}
              src={streamUrl}
              title={`Play ${movie.title} on ${activeServer.name}`}
              className="w-full h-full border-0"
              allowFullScreen={true}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; cross-origin-isolated"
              referrerPolicy="no-referrer"
            />
          ) : (
            <iframe
              key={`trailer-${movie.trailerYoutubeId}-${reloadKey}`}
              src={trailerUrl}
              title={`Official Trailer - ${movie.title}`}
              className="w-full h-full border-0"
              allowFullScreen={true}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {/* 10 Streaming Server Selector Options */}
        {playerMode === 'stream' && (
          <div className="mt-4 p-4 rounded-xl bg-[#11131c] border border-[#1f2230]">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[#ff003c]" />
                <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Select Streaming Server (1–10)
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                  Auto Clean Pop Window
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Kisi b server par click karein — clean pop window backend se automatic active ho jayegi!
              </span>
            </div>

            {/* 10 Server Grid Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {STREAMING_SERVERS.map((server) => {
                const isActive = activeServerId === server.id;
                return (
                  <button
                    key={server.id}
                    onClick={() => handleServerSelect(server.id)}
                    className={`flex items-center justify-between p-2 sm:p-2.5 rounded-lg border text-left transition-all ${
                      isActive
                        ? 'bg-[#ff003c] border-[#ff003c] text-white shadow-md shadow-[#ff003c]/20'
                        : 'bg-[#161824] hover:bg-[#1e2130] border-[#252838] text-slate-300'
                    }`}
                  >
                    <div className="truncate mr-1">
                      <div className="text-xs font-semibold truncate">
                        {server.name}
                      </div>
                      <div className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                        {server.speed}
                      </div>
                    </div>
                    {server.badge && (
                      <span className={`text-[9px] px-1 py-0.2 rounded font-mono shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#232738] text-slate-400'
                      }`}>
                        {server.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Report Issue Modal */}
        {isReporting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#13151f] border border-[#25293d] rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Report Player Issue</span>
                </div>
                <button
                  onClick={() => setIsReporting(false)}
                  className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-[#1e2233]"
                >
                  Cancel
                </button>
              </div>

              {reportSent ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-semibold text-sm">Report Submitted</h4>
                  <p className="text-xs text-slate-400">
                    Thank you! Our automated crawler has queued this server link for validation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <p className="text-xs text-slate-300">
                    Reporting server <strong className="text-white">{activeServer.name}</strong> for <strong className="text-white">{movie.title}</strong>:
                  </p>

                  <div className="space-y-2">
                    {[
                      'Video playback buffering or stopped',
                      'Server link says Video Not Found (404)',
                      'Audio is out of sync or distorted',
                      'Incorrect episode or movie playing',
                      'Popups or player refuses to load',
                    ].map((issue) => (
                      <label
                        key={issue}
                        className="flex items-center gap-2 p-2 rounded-lg bg-[#1a1c28] hover:bg-[#202434] cursor-pointer text-xs text-slate-300"
                      >
                        <input
                          type="radio"
                          name="issue"
                          checked={selectedIssue === issue}
                          onChange={() => setSelectedIssue(issue)}
                          className="text-[#ff003c] focus:ring-[#ff003c]"
                        />
                        <span>{issue}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#ff003c] hover:bg-[#e00035] text-white text-xs font-bold transition-all shadow-md shadow-[#ff003c]/20"
                    >
                      Submit Report
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
