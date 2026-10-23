import React, { useState } from 'react';
import { User, Users } from 'lucide-react';
import { CastMember } from '../types/movie';

interface CastListProps {
  cast: CastMember[];
}

export const CastList: React.FC<CastListProps> = ({ cast }) => {
  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <div className="py-6 border-t border-[#1b1e2c]">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-[#ff003c]" />
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          Top Cast & Characters
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {cast.map((actor, idx) => (
          <CastCard key={`${actor.name}-${idx}`} actor={actor} />
        ))}
      </div>
    </div>
  );
};

const CastCard: React.FC<{ actor: CastMember }> = ({ actor }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center gap-3 p-2 rounded-xl bg-[#13151f] border border-[#212435] hover:border-[#2e334a] transition-all">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 shrink-0 border border-white/10">
        {!imageError ? (
          <img
            src={actor.avatarUrl}
            alt={actor.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
            <User className="w-6 h-6" />
          </div>
        )}
      </div>
      <div className="min-w-0">
        <h4 className="text-xs font-semibold text-white truncate" title={actor.name}>
          {actor.name}
        </h4>
        <p className="text-[11px] text-slate-400 truncate mt-0.5" title={actor.character}>
          {actor.character}
        </p>
      </div>
    </div>
  );
};
