/**
 * PlayForest UI — FeedCard
 * Carte de publication pour le fil d'actualités.
 * Types : article | experience | conseil | temoignage | interview | debat | video | photo | annonce | actualite
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Clock } from 'lucide-react';
import Avatar from './Avatar';
import Badge from './Badge';
import './FeedCard.css';

const TYPE_ICON = {
  article: { label: 'Article', color: 'blue' },
  experience: { label: 'Expérience', color: 'green' },
  conseil: { label: 'Conseil', color: 'amber' },
  temoignage: { label: 'Témoignage', color: 'purple' },
  interview: { label: 'Interview', color: 'rose' },
  debat: { label: 'Débat', color: 'orange' },
  video: { label: 'Vidéo', color: 'red' },
  photo: { label: 'Photo', color: 'teal' },
  annonce: { label: 'Annonce', color: 'gold' },
  actualite: { label: 'Actualité', color: 'navy' },
};

const REACTION_EMOJIS = ['👍', '❤️', '🔥', '💪', '🎉'];

const FeedCard = ({ post, onReact, onSave, compact = false }) => {
  const typeInfo = TYPE_ICON[post.type] || TYPE_ICON.article;
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);

  const handleReaction = (emoji) => {
    setSelectedReaction(emoji);
    setShowReactions(false);
    onReact?.(post.id, emoji);
  };

  const isReacted = selectedReaction;
  const displayBody = compact && post.content && post.content.length > 200
    ? post.content.slice(0, 200) + '…'
    : post.content;
  const hasMore = compact && post.content && post.content.length > 200;

  return (
    <article className={`pf-feed-card ${compact ? 'pf-feed-card--compact' : ''}`}>
      <header className="pf-feed-card__header">
        <Link to={`/u/${post.author.username}`} className="pf-feed-card__avatar-link">
          <Avatar src={post.author.avatar} name={post.author.name} size="md" />
        </Link>
        <div className="pf-feed-card__meta">
          <Link to={`/u/${post.author.username}`} className="pf-feed-card__author">
            {post.author.name}
          </Link>
          <div className="pf-feed-card__sub">
            <Badge variant={typeInfo.color} size="sm">{typeInfo.label}</Badge>
            <span className="pf-feed-card__dot" />
            <Clock size={12} />
            <time>{post.time}</time>
          </div>
        </div>
        <button className="pf-feed-card__menu" aria-label="Plus d'options">
          <MoreHorizontal size={18} />
        </button>
      </header>

      {post.title && (
        <h2 className="pf-feed-card__title">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h2>
      )}

      {displayBody && <p className="pf-feed-card__content">{displayBody}</p>}
      {hasMore && <button className="pf-feed-card__readmore">Lire la suite</button>}

      {post.media && (
        <div className="pf-feed-card__media">
          {post.media.type === 'image' ? (
            <img src={post.media.url} alt={post.media.alt || post.title || ''} loading="lazy" className="pf-feed-card__img" />
          ) : (
            <video src={post.media.url} poster={post.media.poster} controls className="pf-feed-card__video" preload="none" />
          )}
        </div>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="pf-feed-card__tags">
          {post.tags.map((tag) => (
            <Link key={tag} to={`/tags/${tag}`} className="pf-feed-card__tag">#{tag}</Link>
          ))}
        </div>
      )}

      <footer className="pf-feed-card__actions">
        <div className="pf-feed-card__react-wrap"
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}>
          {showReactions && (
            <div className="pf-feed-reactions" role="tooltip">
              {REACTION_EMOJIS.map((emoji) => (
                <button key={emoji} className="pf-feed-reaction" onClick={() => handleReaction(emoji)} aria-label={`Réagir ${emoji}`}>
                  {emoji}
                </button>
              ))}
            </div>
          )}
          <button
            className={`pf-feed-card__react-btn ${isReacted ? 'pf-feed-card__react-btn--active' : ''}`}
            onClick={() => handleReaction(selectedReaction || '❤️')}
            aria-label="Réagir"
          >
            {isReacted ? (
              <><span className="pf-feed-reaction-selected">{selectedReaction}</span><span className="pf-feed-count">{post.stats?.reactions || 0}</span></>
            ) : (
              <><Heart size={18} /><span className="pf-feed-count">{post.stats?.reactions || 0}</span></>
            )}
          </button>
        </div>

        <button className="pf-feed-card__action" aria-label="Commenter">
          <MessageCircle size={18} />
          <span>{post.stats?.comments || 0}</span>
        </button>
        <button className="pf-feed-card__action" aria-label="Partager">
          <Share2 size={18} />
          <span>{post.stats?.shares || 0}</span>
        </button>
        <button
          className={`pf-feed-card__action pf-feed-card__save ${post.isSaved ? 'pf-feed-card__save--active' : ''}`}
          onClick={() => onSave?.(post.id)}
          aria-label="Sauvegarder"
        >
          <Bookmark size={18} fill={post.isSaved ? 'currentColor' : 'none'} />
        </button>
      </footer>
    </article>
  );
};

export default FeedCard;