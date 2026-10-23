import React from 'react';
import { Play, Shield, ExternalLink, Heart } from 'lucide-react';
import { LegalDocType } from './LegalModal';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenLegal: (type: LegalDocType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenLegal }) => {
  return (
    <footer className="mt-16 bg-[#07080b] border-t border-[#1b1e2c] pt-12 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#181a24]">
          {/* Col 1: Brand & Synopsis */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff003c] to-[#ff4b72] flex items-center justify-center shadow-md shadow-[#ff003c]/20">
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              </div>
              <span className="text-lg font-black tracking-wider text-white">
                U-MOVIE <span className="text-[#ff003c]">HUB</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your free entertainment indexing destination. Discover trending blockbusters, classic cinema, and TV series across 10+ global languages with seamless multi-server stream switching.
            </p>
            <div className="text-[11px] text-slate-500 pt-1">
              Optimized for high-speed playback across desktop, tablet, and mobile.
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('categories')}
                  className="text-[#ff003c] font-semibold hover:underline transition-colors flex items-center gap-1"
                >
                  <span>100 Categories Catalog</span>
                  <span className="text-[9px] px-1 rounded bg-[#ff003c]/20">NEW</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('discover')}
                  className="hover:text-white transition-colors"
                >
                  Discover Movies & Shows
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('movies')}
                  className="hover:text-white transition-colors"
                >
                  All Movies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('tv')}
                  className="hover:text-white transition-colors"
                >
                  TV Series
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('sitemap')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>HTML / XML Sitemaps</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('watchlist')}
                  className="hover:text-white transition-colors"
                >
                  My Watchlist
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#ff003c]" />
              <span>Legal & Policies</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenLegal('dmca')}
                  className="hover:text-[#ff003c] transition-colors"
                >
                  DMCA Takedown Notice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('disclaimer')}
                  className="hover:text-[#ff003c] transition-colors"
                >
                  Non-Hosting Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-[#ff003c] transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-[#ff003c] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: TMDB Attribution & Data Notice */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Attribution
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              This product uses the TMDB API but is not endorsed or certified by TMDB. Film metadata, posters, and imagery are provided courtesy of The Movie Database.
            </p>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#12141c] border border-[#212435] w-fit">
              <span className="text-[11px] font-extrabold text-teal-400 font-mono tracking-tighter">
                THE MOVIE DB
              </span>
              <span className="text-[10px] text-slate-500">API Partner</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 <strong className="text-slate-300">U-MOVIE HUB</strong>. All rights reserved.
          </div>
          <div className="text-[11px] text-slate-600 text-center sm:text-right">
            U-MOVIE HUB does not host any media files. All streams are embedded from 3rd-party servers.
          </div>
        </div>
      </div>
    </footer>
  );
};
