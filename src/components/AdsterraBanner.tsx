import React from 'react';
import { ExternalLink, Sparkles, Download, Play, Zap, ShieldCheck } from 'lucide-react';
import { ADSTERRA_CONFIG } from '../services/adsterra';

interface AdsterraBannerProps {
  variant?: 'leaderboard' | 'card' | 'native' | 'compact';
  customTitle?: string;
}

export const AdsterraBanner: React.FC<AdsterraBannerProps> = ({
  variant = 'leaderboard',
  customTitle
}) => {
  const smart1 = ADSTERRA_CONFIG.smartLinks[0];
  const smart2 = ADSTERRA_CONFIG.smartLinks[1];
  const smart3 = ADSTERRA_CONFIG.smartLinks[2];

  if (variant === 'compact') {
    return (
      <div className="w-full my-3 p-2.5 rounded-xl bg-gradient-to-r from-[#141724] via-[#1a1420] to-[#141724] border border-[#ff003c]/20 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#ff003c] text-white uppercase tracking-wider">
            Sponsored
          </span>
          <span className="text-slate-200 font-semibold truncate">
            {customTitle || '⚡ Stream in 4K UHD or Download Ultra Fast (No Ads Buffer)'}
          </span>
        </div>
        <a
          href={smart1.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#ff003c] hover:bg-[#e00035] text-white font-bold text-xs shadow-md transition-all shrink-0"
        >
          <span>Claim VIP Stream</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#161824] via-[#1f1a26] to-[#12141f] border border-[#ff003c]/30 p-5 shadow-2xl">
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
          <span className="font-mono uppercase tracking-widest text-[#ff003c] font-bold">
            ADSTERRA VERIFIED PARTNER
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <ShieldCheck className="w-3 h-3" /> High-Speed Cloud
          </span>
        </div>

        <h4 className="text-base font-black text-white tracking-tight mb-1.5">
          {customTitle || '🚀 Fast 4K Cloud Streaming & Direct File Download'}
        </h4>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Experience ultra high-speed bandwidth, zero buffer delays, and multi-threaded 1080p/2160p download mirrors.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a
            href={smart1.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#ff003c] hover:bg-[#c70812] text-white text-xs font-bold shadow-lg shadow-[#ff003c]/25 transition-all text-center"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Fast Download (Server 1)</span>
          </a>

          <a
            href={smart2.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c2030] hover:bg-[#252a40] border border-[#2e344e] text-white text-xs font-bold transition-all text-center"
          >
            <Play className="w-3.5 h-3.5 fill-white text-[#ff003c]" />
            <span>VIP Mirror (Server 2)</span>
          </a>
        </div>
      </div>
    );
  }

  // Default: Leaderboard Banner
  return (
    <div className="w-full my-6 rounded-2xl overflow-hidden bg-gradient-to-r from-[#12141d] via-[#1a1322] to-[#12141d] border border-[#2a2638] shadow-xl p-4 sm:p-5 relative group">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff003c] to-amber-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#ff003c]/30">
            <Zap className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#ff003c] text-white uppercase tracking-wider">
                Sponsored
              </span>
              <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Ultra HD 4K Server
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-extrabold text-white">
              {customTitle || 'Download or Stream in Full Ultra HD Without Wait Time'}
            </h4>
            <p className="text-xs text-slate-400 hidden sm:block">
              Dedicated high-speed cloud mirrors with unlimited bandwidth and multi-lingual audio tracks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <a
            href={smart1.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#ff003c] hover:bg-[#c70812] text-white font-bold text-xs shadow-lg shadow-[#ff003c]/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Link</span>
          </a>

          <a
            href={smart3.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1d2130] hover:bg-[#282e44] border border-[#2e3650] text-slate-200 hover:text-white font-semibold text-xs transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Mega Server</span>
          </a>
        </div>
      </div>
    </div>
  );
};
