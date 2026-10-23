import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, ThumbsUp, User } from 'lucide-react';
import { ReviewItem } from '../types/movie';

interface ReviewsSectionProps {
  movieId: string | number;
  movieTitle: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ movieId, movieTitle }) => {
  const storageKey = `u_movie_reviews_${movieId}`;
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    // Default initial community reviews
    return [
      {
        id: 'rev-1',
        userName: 'CinemaFanatic99',
        rating: 9,
        date: '3 days ago',
        comment: `Incredible pacing and visual effects. ${movieTitle} lived up to all expectations! Stream quality on Server 1 VidSrc was flawless.`,
      },
      {
        id: 'rev-2',
        userName: 'Aarav Kumar',
        rating: 8,
        date: '1 week ago',
        comment: 'Brilliant sound design and gripping narrative. Worth watching multiple times.',
      },
    ];
  });

  const [authorName, setAuthorName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(8);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews', e);
    }
  }, [reviews, storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const item: ReviewItem = {
      id: `rev-${Date.now()}`,
      userName: authorName.trim() || 'Anonymous Movie Buff',
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
    };

    setReviews([item, ...reviews]);
    setNewComment('');
  };

  return (
    <div className="py-6 border-t border-[#1b1e2c]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#ff003c]" />
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            User Reviews & Ratings
          </h3>
        </div>
        <span className="text-xs text-slate-400">
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </span>
      </div>

      {/* Review Submission Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 rounded-xl bg-[#13151f] border border-[#212435] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your name or nickname (optional)"
            className="flex-1 min-w-[200px] bg-[#1a1c28] border border-[#282d40] rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-400 outline-none focus:border-[#ff003c]"
          />

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300">Your Rating:</span>
            <div className="flex items-center gap-1">
              {[6, 7, 8, 9, 10].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  className={`text-xs px-2 py-1 rounded transition-colors font-bold ${
                    newRating === star
                      ? 'bg-[#ff003c] text-white'
                      : 'bg-[#1a1c28] text-slate-400 hover:text-white'
                  }`}
                >
                  ★ {star}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={`Share your review of ${movieTitle}...`}
            rows={3}
            className="w-full bg-[#1a1c28] border border-[#282d40] rounded-lg p-3 text-xs text-white placeholder-slate-400 outline-none focus:border-[#ff003c] resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ff003c] hover:bg-[#e00035] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-md shadow-[#ff003c]/20"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Review</span>
          </button>
        </div>
      </form>

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-3.5 rounded-xl bg-[#13151f] border border-[#212435] flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#1f2233] text-slate-300 flex items-center justify-center font-bold text-xs border border-white/10">
                  {rev.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="text-xs font-semibold text-white">{rev.userName}</span>
                  <span className="text-[11px] text-slate-500 ml-2">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{rev.rating}/10</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pl-9">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
