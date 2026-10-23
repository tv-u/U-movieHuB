import React from 'react';
import { X, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

export type LegalDocType = 'dmca' | 'disclaimer' | 'terms' | 'privacy';

interface LegalModalProps {
  type: LegalDocType | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#0f1118] border border-[#232738] rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f2230] bg-[#141622]">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#ff003c]" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              {type === 'dmca' && 'DMCA Copyright & Takedown Policy'}
              {type === 'disclaimer' && 'Non-Hosting Disclaimer & Legal Notice'}
              {type === 'terms' && 'Terms of Service & Acceptable Use'}
              {type === 'privacy' && 'Privacy & Cookie Policy'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#202434]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {type === 'dmca' && (
            <>
              <p>
                <strong>U-MOVIE HUB</strong> respects the intellectual property rights of others and complies with the Digital Millennium Copyright Act (17 U.S.C. § 512).
              </p>
              <h4 className="text-sm font-bold text-white pt-2">Notice of Copyright Infringement</h4>
              <p>
                U-MOVIE HUB does not host, upload, store, or transmit any video files, media files, or copyright-protected content on its servers. The site operates strictly as an index and search directory that displays links and embeds readily accessible on the public Internet.
              </p>
              <p>
                If you are a copyright owner or an agent authorized to act on behalf of one, and you believe that content linked on our catalog infringes your copyright, please submit a written DMCA takedown notice containing:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>Identification of the copyrighted work claimed to have been infringed.</li>
                <li>The specific URL on U-MOVIE HUB where the indexed link appears.</li>
                <li>Your contact information including legal name, address, telephone number, and email.</li>
                <li>A statement made under penalty of perjury that the information provided is accurate.</li>
              </ul>
              <p className="pt-2 text-slate-400">
                Contact: <span className="text-[#ff003c]">dmca@u-movie-hub.stream</span>
              </p>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <p>
                <strong>Disclaimer of Liability:</strong> U-MOVIE HUB is an automated directory and indexing service. We do not host, broadcast, archive, or distribute media streams or video files. All video content embedded within player interfaces is hosted by unaffiliated third-party services.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">Third-Party Streaming Providers</h4>
              <p>
                Streaming links are pulled from public endpoints (e.g. VidSrc, AutoEmbed, EmbedSU). U-MOVIE HUB maintains no control over third-party servers, their content, their advertisements, or their operational status.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">Metadata Attribution</h4>
              <p>
                Movie posters, backdrops, synopses, release dates, and cast details are gathered using public API protocols including TMDb (The Movie Database). This product uses the TMDB API but is not endorsed or certified by TMDB.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                By accessing or browsing <strong>U-MOVIE HUB</strong>, you agree to be bound by these Terms of Service and all applicable international laws and regulations.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">Permitted Use</h4>
              <p>
                This catalog is intended for personal and informational use. Users may not abuse automated scrapers, denial-of-service vectors, or exploit third-party video players.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">Modification of Services</h4>
              <p>
                U-MOVIE HUB reserves the right to modify, restrict, or discontinue any feature, server configuration, or catalog entry at any time without prior notice.
              </p>
            </>
          )}

          {type === 'privacy' && (
            <>
              <p>
                <strong>Privacy Statement:</strong> U-MOVIE HUB prioritizes user privacy. We do not require account registration or collect personal identification data, payment details, or tracking telemetry.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">Local Storage</h4>
              <p>
                User preferences, watchlist items, language selections, and local user reviews are saved locally inside your browser’s LocalStorage and are not sent to any centralized tracking server.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1f2230] bg-[#141622] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#ff003c] hover:bg-[#e00035] text-white text-xs font-bold transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
