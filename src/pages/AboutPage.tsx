import React, { useState } from 'react';
import { Play, Shield, Server, Key, Check, HelpCircle, Globe, Film, Layers } from 'lucide-react';
import { MovieService } from '../services/tmdb';
import { STREAMING_SERVERS } from '../services/streamingServers';

export const AboutPage: React.FC = () => {
  const [apiKeyInput, setApiKeyInput] = useState(MovieService.getApiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    MovieService.setApiKey(apiKeyInput);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Hero Intro */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff003c]/15 text-[#ff003c] text-xs font-bold border border-[#ff003c]/20">
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Next-Gen Cinema Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          About U-MOVIE HUB
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          U-MOVIE HUB is a high-performance web application designed to bring comprehensive cinematic exploration and multi-server playback indexing together in a dark, responsive interface.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#11131c] border border-[#1f2230] space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#ff003c]/15 text-[#ff003c] flex items-center justify-center font-bold">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">10 Resilient Servers</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automatic and manual switching between 10 independent streaming servers ensuring reliable playback without dead links.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#11131c] border border-[#1f2230] space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#ff003c]/15 text-[#ff003c] flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">10 Global Languages</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Filter movies instantly across English, Hindi, Mandarin, Spanish, Arabic, French, Bengali, Portuguese, Russian, and Indonesian.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#11131c] border border-[#1f2230] space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#ff003c]/15 text-[#ff003c] flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Zero-Log Privacy</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            No accounts required. All watchlists, favorites, and user reviews are stored exclusively in your local browser sandbox.
          </p>
        </div>
      </div>

      {/* 10 Server Architecture Info */}
      <div className="p-6 rounded-2xl bg-[#11131c] border border-[#1f2230] space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#ff003c]" />
          <h3 className="text-base font-bold text-white">
            10-Server Streaming Architecture
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          U-MOVIE HUB connects to the top community streaming gateways. When a stream on Server 1 is buffering or geo-blocked, you can seamlessly switch servers with a single click:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {STREAMING_SERVERS.map((server, i) => (
            <div
              key={server.id}
              className="p-2.5 rounded-xl bg-[#171924] border border-[#252838] flex flex-col justify-between"
            >
              <div className="text-xs font-bold text-white">{server.name}</div>
              <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                <span>{server.speed}</span>
                <span className="text-[#ff003c] font-mono">S{i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TMDB API Integration Settings */}
      <div className="p-6 rounded-2xl bg-[#11131c] border border-[#1f2230] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-[#E50914]" />
            <h3 className="text-base font-bold text-white">
              TMDB API Key Settings & Status
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>Active & Working</span>
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          U-MOVIE HUB has a built-in pre-configured TMDB API key that fetches real movie posters and metadata in real-time. You can also paste your own custom TMDB API v3 key below:
        </p>

        <form onSubmit={handleSaveApiKey} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder="Enter TMDB v3 API Key"
            className="flex-1 bg-[#171924] border border-[#252838] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#E50914] font-mono"
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#E50914] hover:bg-[#B2070F] text-white text-xs font-bold transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save TMDB Key</span>
            )}
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          <p className="text-emerald-400 text-[11px] flex items-center gap-1">
            ✓ TMDB live connection enabled. Real posters and infinite search active.
          </p>
          <button
            type="button"
            onClick={() => {
              MovieService.setApiKey('');
              setApiKeyInput(MovieService.getApiKey());
              setSavedSuccess(true);
              setTimeout(() => setSavedSuccess(false), 2000);
            }}
            className="text-[11px] text-slate-400 hover:text-white underline"
          >
            Reset to Default Working Key
          </button>
        </div>
      </div>

      {/* Cloudflare Pages Migration Blueprint Guide */}
      <div className="p-6 rounded-2xl bg-[#11131c] border border-[#1f2230] space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#ff003c]" />
          <h3 className="text-base font-bold text-white">
            Deployment: GitHub to Cloudflare Pages
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          This project is built using a modern <strong>React + Vite + TypeScript</strong> architecture, configured for instant deployment on GitHub & Cloudflare Pages:
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-400">
          <li>Push your repository code to your GitHub account.</li>
          <li>In your <strong>Cloudflare Dashboard</strong>, navigate to <em>Workers & Pages</em> → <em>Create Application</em> → <em>Pages</em>.</li>
          <li>Connect your GitHub repository.</li>
          <li>Set Framework Preset to <strong>Vite</strong>.</li>
          <li>Build command: <code className="bg-[#1e2233] px-1.5 py-0.5 rounded text-slate-200">npm run build</code></li>
          <li>Build output directory: <code className="bg-[#1e2233] px-1.5 py-0.5 rounded text-slate-200">dist</code></li>
        </ol>
      </div>
    </div>
  );
};
