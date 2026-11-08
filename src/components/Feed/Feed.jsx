/**
 * PlayForest — Composant Feed social
 * Affiche la liste des publications avec onglets de filtre
 */
import { useState, useMemo, useEffect } from 'react';
import { Filter, Sparkles, RefreshCw } from 'lucide-react';
import FeedCard from '../ui/FeedCard';
import Tabs from '../ui/Tabs';
import EmptyState from '../ui/EmptyState';
import Skeleton from '../ui/Skeleton';
import { FEED_POSTS, FEED_TABS, FEED_CATEGORIES } from '../../data/feed';
import './Feed.css';

export default function Feed({ limit = 20 }) {
  const [activeTab, setActiveTab] = useState('for-you');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulation réseau
    const timer = setTimeout(() => {
      try {
        const categories = FEED_CATEGORIES[activeTab];
        let filtered = FEED_POSTS;

        if (categories) {
          filtered = FEED_POSTS.filter((p) => categories.includes(p.type));
        }

        // Tri : posts les plus récents en premier (par défaut, l'ordre mock)
        filtered = filtered.slice(0, limit);

        setPosts(filtered);
      } catch (err) {
        setError(err.message || 'Erreur réseau');
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [activeTab, limit]);

  const handleReact = (postId, emoji) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              stats: { ...p.stats, reactions: (p.stats?.reactions || 0) + 1 },
            }
          : p
      )
    );
  };

  const handleSave = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  const handleRetry = () => {
    setActiveTab('for-you');
    window.location.reload();
  };

  return (
    <section className="pf-feed">
      <div className="pf-feed__header">
        <h2>Actualités</h2>
        <button className="pf-feed__filter" aria-label="Filtrer">
          <Filter size={16} />
        </button>
      </div>

      <Tabs tabs={FEED_TABS} activeTab={activeTab} onChange={setActiveTab} />

      <div className="pf-feed__list">
        {loading ? (
          // Skeletons pendant le chargement
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="pf-feed__skeleton-card">
              <div className="pf-feed__skeleton-head">
                <Skeleton type="circle" size="sm" />
                <div>
                  <Skeleton type="text" width="120px" height={16} />
                  <Skeleton type="text" width="80px" height={12} />
                </div>
              </div>
              <Skeleton type="text" width="100%" height={16} />
              <Skeleton type="text" width="90%" height={16} />
              <Skeleton type="text" width="70%" height={16} />
              <Skeleton type="card" width="100%" height={180} />
            </div>
          ))
        ) : error ? (
          <EmptyState
            title="Oops, quelque chose s'est mal passé"
            description={error}
            actionLabel="Réessayer"
            onAction={handleRetry}
          />
        ) : posts.length === 0 ? (
          <EmptyState
            title="Aucune publication pour le moment"
            description="Soit tu es à jour, soit ce fil est encore vide. Reviens plus tard !"
            actionLabel="Voir toutes les actualités"
            actionTo="/explore"
          />
        ) : (
          posts.map((post) => (
            <FeedCard
              key={post.id}
              post={post}
              onReact={handleReact}
              onSave={handleSave}
              compact
            />
          ))
        )}
      </div>
    </section>
  );
}

export const FeedCardComponent = FeedCard;