import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Calendar, Trophy, Users, Star, ArrowRight,
  Mail, Phone, Facebook, Instagram, Twitter, Linkedin,
  Send, Check, Award, Target, Heart, Zap, Sun,
  Wind, Droplets, Car, ShowerHead, Wifi, Coffee,
  Camera, Speaker, ChevronDown, X, Clock, Shield,
  Sparkles, ThumbsUp, TrendingUp, Crown, Volume2,
  Dumbbell, ParkingCircle, Bath, Tv, UtensilsCrossed,
  Volleyball, Bike, Activity, CircleDot, Grid,
  Ruler, Timer, Footprints, Landmark, Building2,
  Trees, Waves, Flame, Snowflake, Music, Gamepad2,
  Ticket, Sparkle, Gem, Medal, BadgeCheck, 
  CircleCheck, CircleUser, Gauge, Weight, 
  HeartPulse, FlameKindling, Radio, Headphones,
  BikeIcon, DumbbellIcon, FootprintsIcon,
  Circle, Square, LayoutDashboard, BarChart3,
  PieChart, LineChart, Settings2, ClipboardList,
  Monitor, Cpu, HardDrive, Server, Cloud,
  Database, Network, Signal, Gauge as GaugeIcon,
  Timer as TimerIcon, Settings, Plus, Minus,
  XCircle, CheckCircle, Info, AlertCircle,
  Wrench, HardHat, Construction, Building,
  Thermometer, Droplets as DropletsIcon,
  Lightbulb, AlertTriangle, CheckCircle2,
  RefreshCw, Activity as ActivityIcon,
  Wifi as WifiIcon, Radio as RadioIcon,
  Monitor as MonitorIcon, Cpu as CpuIcon
} from 'lucide-react';
import './terrain.css';

// ─── SPORTS CATEGORIES ──────────────────────────────────────────
const SPORTS = [
  { id: 'football', label: 'Football', icon: Trophy, color: '#2e7d32' },
  { id: 'tennis', label: 'Tennis', icon: Circle, color: '#f9a825' },
  { id: 'padel', label: 'Padel', icon: Target, color: '#e65100' },
  { id: 'basketball', label: 'Basketball', icon: Activity, color: '#c62828' },
  { id: 'volleyball', label: 'Volleyball', icon: Volleyball, color: '#1565c0' },
  { id: 'handball', label: 'Handball', icon: Users, color: '#00838f' },
  { id: 'badminton', label: 'Badminton', icon: Zap, color: '#4e342e' },
  { id: 'squash', label: 'Squash', icon: Square, color: '#4a148c' },
];

// ─── TERRAINS DATA ─────────────────────────────────────────────
const TERRAINS = [
  // ===== FOOTBALL =====
  {
    id: 1,
    sport: 'football',
    titre: "Stade Municipal Elite",
    surface: "105 × 68 m",
    ville: "Casablanca",
    quartier: "Ain Sebaa",
    tarif: "180", devise: "dh/h",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0594c86?w=800&h=600&fit=crop",
    imageDetail: "https://images.unsplash.com/photo-1522778119026-d647f0594c86?w=1200&h=800&fit=crop",
    type: "11 vs 11",
    note: 4.9, avis: 128,
    badge: "PREMIUM", badgeClass: "badge-premium",
    description: "Un stade d'exception aux normes internationales, équipé des dernières technologies pour offrir une expérience de jeu inégalée.",
    horaires: "8h00 - 23h00",
    dureeMatch: "90 min",
    niveauRequis: "Tous niveaux",
    caracteristiques: [
      { icon: Sun, text: "Pelouse naturelle" },
      { icon: Zap, text: "Éclairage LED" },
      { icon: ShowerHead, text: "Vestiaires premium" },
      { icon: Users, text: "Tribune 500 places" },
    ],
    equipements: ["Éclairage professionnel", "Vestiaires avec douches", "Parking sécurisé", "Infirmerie", "Buffet", "Wifi gratuit"],
    avisRecents: [
      { nom: "Karim B.", note: 5, commentaire: "Terrain exceptionnel, pelouse impeccable!", date: "2024-01-15" },
      { nom: "Mehdi L.", note: 4.8, commentaire: "Très bonne organisation, je recommande", date: "2024-01-10" }
    ]
  },
  {
    id: 2,
    sport: 'football',
    titre: "Complex Sportif Modern",
    surface: "100 × 65 m",
    ville: "Casablanca",
    quartier: "Belvedère",
    tarif: "150", devise: "dh/h",
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=600&fit=crop",
    imageDetail: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200&h=800&fit=crop",
    type: "11 vs 11",
    note: 4.8, avis: 96,
    badge: "POPULAIRE", badgeClass: "badge-populaire",
    description: "Complexe moderne avec du gazon synthétique dernière génération. Idéal pour les matchs intensifs toute l'année.",
    horaires: "7h00 - 22h00",
    dureeMatch: "90 min",
    niveauRequis: "Intermédiaire à avancé",
    caracteristiques: [
      { icon: Wind, text: "Gazon synthétique" },
      { icon: Droplets, text: "Arrosage automatique" },
      { icon: Car, text: "Parking sécurisé" },
      { icon: Trophy, text: "Équipements pro" },
    ],
    equipements: ["Gazon dernière génération", "Éclairage haute intensité", "Vestiaires modernes", "Parking surveillé", "Terrasse panoramique", "Club house"],
    avisRecents: [
      { nom: "Sofia R.", note: 4.7, commentaire: "Super terrain, très bon entretien", date: "2024-01-14" }
    ]
  },
  {
    id: 3,
    sport: 'football',
    titre: "Arena Sport Center",
    surface: "95 × 60 m",
    ville: "Casablanca",
    quartier: "Maârif",
    tarif: "200", devise: "dh/h",
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800&h=600&fit=crop",
    imageDetail: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=1200&h=800&fit=crop",
    type: "11 vs 11",
    note: 4.95, avis: 215,
    badge: "VIP", badgeClass: "badge-vip",
    description: "L'expérience ultime du football avec une pelouse hybride certifiée FIFA Pro.",
    horaires: "24h/24",
    dureeMatch: "90 min",
    niveauRequis: "Tous niveaux",
    caracteristiques: [
      { icon: Award, text: "Pelouse hybride FIFA Pro" },
      { icon: Camera, text: "Vidéo-surveillance" },
      { icon: Coffee, text: "Espace VIP" },
      { icon: Speaker, text: "Sonorisation immersive" },
    ],
    equipements: ["Pelouse certifiée FIFA", "Éclairage 4K", "Vestiaires luxe", "Salon VIP", "Spa & massage", "Restaurant gastronomique"],
    avisRecents: [
      { nom: "Yassine M.", note: 5, commentaire: "Un terrain de rêve! Service VIP au top", date: "2024-01-16" },
      { nom: "Leila K.", note: 4.9, commentaire: "Magnifique expérience, à refaire", date: "2024-01-12" }
    ]
  },
  {
    id: 4,
    sport: 'football',
    titre: "Terrain Atlas Pro",
    surface: "70 × 50 m",
    ville: "Casablanca",
    quartier: "Ain Sebaa",
    tarif: "130", devise: "dh/h",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=600&fit=crop",
    imageDetail: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&h=800&fit=crop",
    type: "7 vs 7",
    note: 4.7, avis: 74,
    badge: "POPULAIRE", badgeClass: "badge-populaire",
    description: "Terrain idéal pour les matchs à 7, parfait pour les sessions entre amis ou les tournois amateurs.",
    horaires: "8h00 - 22h00",
    dureeMatch: "60 min",
    niveauRequis: "Débutant à intermédiaire",
    caracteristiques: [
      { icon: Wind, text: "Gazon synthétique" },
      { icon: ShowerHead, text: "Vestiaires" },
      { icon: Car, text: "Parking" },
      { icon: Wifi, text: "Wifi gratuit" },
    ],
    equipements: ["Gazon synthétique", "Vestiaires", "Parking", "Wifi", "Éclairage LED", "Équipement inclus"],
    avisRecents: []
  },
  // ... (autres terrains)
];

// ─── INFRASTRUCTURE MANAGEMENT DATA ────────────────────────────
const infrastructureMetrics = [
  { label: "Terrains Actifs", value: "8/8", status: "green", icon: CheckCircle2 },
  { label: "Taux d'Occupation", value: "87%", status: "green", icon: TrendingUp },
  { label: "Maintenance", value: "2 interventions", status: "warning", icon: AlertTriangle },
  { label: "Température Moyenne", value: "22°C", status: "green", icon: Thermometer },
  { label: "Qualité de l'Air", value: "Excellent", status: "green", icon: CheckCircle },
  { label: "Éclairage", value: "Optimal", status: "green", icon: Lightbulb }
];

const infrastructureFeatures = [
  { icon: LayoutDashboard, title: "Dashboard Centralisé", desc: "Visualisez en temps réel l'état de toutes vos infrastructures sportives depuis un seul écran." },
  { icon: BarChart3, title: "Analyses Prédictives", desc: "Anticipez les besoins de maintenance grâce à l'analyse des données historiques et des tendances." },
  { icon: AlertCircle, title: "Alertes Intelligentes", desc: "Recevez des notifications en temps réel sur l'état de vos équipements et installations." },
  { icon: Settings2, title: "Gestion des Maintenances", desc: "Planifiez, suivez et optimisez vos interventions de maintenance préventive et corrective." },
  { icon: Wrench, title: "Suivi des Équipements", desc: "Gérez l'inventaire de vos équipements sportifs avec suivi du cycle de vie." },
  { icon: ClipboardList, title: "Rapports Personnalisés", desc: "Générez des rapports détaillés sur l'utilisation, la performance et l'état de vos installations." }
];

const VILLES = ["Toutes les villes", "Casablanca", "Rabat", "Marrakech"];

const QUARTIERS_BY_VILLE = {
  Casablanca: ["Tous les quartiers", "Ain Sebaa", "Belvedère", "Maârif"],
  Rabat: ["Tous les quartiers", "Agdal", "Hassan"],
  Marrakech: ["Tous les quartiers", "Palmeraie", "Guéliz"],
};

const stats = [
  { number: "15+", label: "Terrains", icon: MapPin },
  { number: "12k+", label: "Joueurs", icon: Users },
  { number: "800+", label: "Matchs/mois", icon: Trophy },
  { number: "4.8★", label: "Note moyenne", icon: Star },
];

// ─── COMPONENT ────────────────────────────────────────────────────
export default function Terrains() {
  const [selectedVille, setSelectedVille] = useState("Toutes les villes");
  const [selectedQuartier, setSelectedQuartier] = useState("Tous les quartiers");
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedTerrain, setSelectedTerrain] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quartiers = selectedVille !== "Toutes les villes"
    ? QUARTIERS_BY_VILLE[selectedVille] || []
    : [];

  const filtered = useMemo(() => {
    return TERRAINS.filter(t => {
      if (selectedVille !== "Toutes les villes" && t.ville !== selectedVille) return false;
      if (selectedQuartier !== "Tous les quartiers" && t.quartier !== selectedQuartier) return false;
      if (selectedSport && t.sport !== selectedSport) return false;
      return true;
    });
  }, [selectedVille, selectedQuartier, selectedSport]);

  const handleVilleChange = (ville) => {
    setSelectedVille(ville);
    setSelectedQuartier("Tous les quartiers");
  };

  const handleOpenModal = (terrain) => {
    setSelectedTerrain(terrain);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const getSportIcon = (sportId) => {
    const sport = SPORTS.find(s => s.id === sportId);
    return sport ? sport.icon : Trophy;
  };

  const getSportColor = (sportId) => {
    const sport = SPORTS.find(s => s.id === sportId);
    return sport ? sport.color : '#2e7d32';
  };

  const getSportLabel = (sportId) => {
    const sport = SPORTS.find(s => s.id === sportId);
    return sport ? sport.label : 'Sport';
  };

  // ─── RENDER ────────────────────────────────────────────────────
  return (
    <div className="t-page">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="t-hero">
        <div className="t-hero-background">
          <div className="t-hero-overlay" />
          <div className="t-hero-pattern" />
        </div>
        <div className="t-hero-container">
          <div className="t-hero-content">
            <div className="t-hero-badge">
              <span className="t-hero-badge-dot" />
              <span className="t-hero-badge-text">Gestion d'Infrastructure Sportive</span>
            </div>
            <h1 className="t-hero-title">
              <span className="t-hero-title-line">Terrains de Sport</span>
              <span className="t-hero-title-line t-hero-title-gold">Premium & Intelligent</span>
            </h1>
            <p className="t-hero-subtitle">
              Gérez vos installations sportives avec notre plateforme intelligente. 
              Analyse en temps réel, maintenance prédictive et optimisation des ressources.
            </p>
            <div className="t-hero-actions">
              <a href="#terrain-list" className="t-btn-primary">
                <Calendar size={20} />
                <span>Explorer les Terrains</span>
                <ArrowRight size={20} className="t-btn-arrow" />
              </a>
              <a href="#infrastructure" className="t-btn-secondary">
                <LayoutDashboard size={20} />
                <span>Dashboard Infrastructure</span>
              </a>
            </div>
            <div className="t-hero-stats">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="t-hero-stat">
                    <div className="t-hero-stat-icon"><Icon size={24} /></div>
                    <div className="t-hero-stat-number">{s.number}</div>
                    <div className="t-hero-stat-label">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="t-hero-scroll">
          <span>Découvrir</span>
          <ArrowRight size={18} style={{ transform: 'rotate(90deg)' }} />
        </div>
      </section>

      {/* ── INFRASTRUCTURE MANAGEMENT SECTION ────────────────────── */}
      <section id="infrastructure" className="t-infrastructure">
        <div className="t-container">
          <div className="t-section-header">
            <span className="t-section-subtitle">Gestion d'Infrastructure</span>
            <h2 className="t-section-title">
              <span className="t-gradient-text">Dashboard</span> Intelligent
            </h2>
            <p className="t-section-desc">
              Une solution complète pour la gestion, l'analyse et l'optimisation de vos installations sportives
            </p>
          </div>

          <div className="t-infrastructure-grid">
            {/* Métriques */}
            <div className="t-infra-metrics">
              <div className="t-infra-metrics-header">
                <div className="t-infra-metrics-title">
                  <BarChart3 size={20} />
                  <h3>État des Installations</h3>
                </div>
                <span className="t-infra-status">
                  <span className="t-status-dot" />
                  Système Opérationnel
                </span>
              </div>
              <div className="t-infra-metrics-grid">
                {infrastructureMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <div key={index} className="t-infra-metric">
                      <div className={`t-metric-icon t-metric-icon--${metric.status}`}>
                        <Icon size={16} />
                      </div>
                      <div className="t-metric-info">
                        <span className="t-metric-label">{metric.label}</span>
                        <span className="t-metric-value">{metric.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart */}
            <div className="t-infra-chart">
              <div className="t-chart-header">
                <Signal size={18} />
                <span>Performance des Terrains</span>
              </div>
              <div className="t-chart-bars">
                <div className="t-chart-bar" style={{ height: '95%' }}><span>T1</span></div>
                <div className="t-chart-bar" style={{ height: '85%' }}><span>T2</span></div>
                <div className="t-chart-bar" style={{ height: '70%' }}><span>T3</span></div>
                <div className="t-chart-bar" style={{ height: '90%' }}><span>T4</span></div>
                <div className="t-chart-bar" style={{ height: '60%' }}><span>T5</span></div>
                <div className="t-chart-bar" style={{ height: '80%' }}><span>T6</span></div>
                <div className="t-chart-bar" style={{ height: '75%' }}><span>T7</span></div>
                <div className="t-chart-bar" style={{ height: '92%' }}><span>T8</span></div>
              </div>
              <div className="t-chart-labels">
                <span>Taux d'occupation moyen: 81%</span>
                <span><CheckCircle2 size={14} /> 6 terrains actifs</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="t-infra-features">
            {infrastructureFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="t-infra-feature">
                  <div className="t-infra-feature-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SPORTS FILTER ────────────────────────────────────────── */}
      <section className="t-sports-filter">
        <div className="t-container">
          <div className="t-sports-filter-container">
            <button 
              className={`t-sport-filter ${!selectedSport ? 'active' : ''}`}
              onClick={() => setSelectedSport(null)}
            >
              <Grid size={18} />
              <span>Tous les sports</span>
            </button>
            {SPORTS.map(sport => {
              const Icon = sport.icon;
              return (
                <button
                  key={sport.id}
                  className={`t-sport-filter ${selectedSport === sport.id ? 'active' : ''}`}
                  style={{ '--sport-color': sport.color }}
                  onClick={() => setSelectedSport(selectedSport === sport.id ? null : sport.id)}
                >
                  <Icon size={18} />
                  <span>{sport.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TERRAINS LIST ─────────────────────────────────────────── */}
      <section id="terrain-list" className="t-terrains">
        <div className="t-container">
          <div className="t-section-header">
            <span className="t-section-subtitle">Nos Terrains</span>
            <h2 className="t-section-title">
              Des <span className="t-gradient-gold">Installations</span> d'Exception
            </h2>
            <p className="t-section-desc">
              {selectedSport 
                ? `Découvrez nos terrains de ${getSportLabel(selectedSport)}` 
                : 'Des infrastructures professionnelles pour tous les sports'
              }
            </p>
          </div>

          {/* ── FILTER BAR ───────────────────────────────────────── */}
          <div className="t-filter-bar">
            <div className="t-filter-selects">
              <div className="t-filter-group">
                <label className="t-filter-label">
                  <MapPin size={13} /> Ville
                </label>
                <div className="t-filter-wrapper">
                  <select
                    className="t-filter-select"
                    value={selectedVille}
                    onChange={e => handleVilleChange(e.target.value)}
                  >
                    {VILLES.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  <ChevronDown size={15} className="t-filter-arrow" />
                </div>
              </div>

              <div className={`t-filter-group ${selectedVille === "Toutes les villes" ? 'disabled' : ''}`}>
                <label className="t-filter-label">
                  <MapPin size={13} /> Quartier
                </label>
                <div className="t-filter-wrapper">
                  <select
                    className="t-filter-select"
                    value={selectedQuartier}
                    onChange={e => setSelectedQuartier(e.target.value)}
                    disabled={selectedVille === "Toutes les villes"}
                  >
                    {(selectedVille !== "Toutes les villes"
                      ? quartiers
                      : ["Tous les quartiers"]
                    ).map(q => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                  <ChevronDown size={15} className="t-filter-arrow" />
                </div>
              </div>

              <div className="t-filter-results">
                <span className="t-filter-results-number">{filtered.length}</span>
                <span className="t-filter-results-text">
                  terrain{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* ── CARDS GRID ───────────────────────────────────────── */}
          {filtered.length === 0 ? (
            <div className="t-empty">
              <div className="t-empty-icon"><MapPin size={40} /></div>
              <h3>Aucun terrain disponible</h3>
              <p>Aucun terrain ne correspond à votre sélection. Essayez un autre sport, quartier ou ville.</p>
              <button className="t-empty-reset" onClick={() => {
                handleVilleChange("Toutes les villes");
                setSelectedSport(null);
              }}>
                Voir tous les terrains
              </button>
            </div>
          ) : (
            <div className="t-terrains-grid">
              {filtered.map(terrain => {
                const SportIcon = getSportIcon(terrain.sport);
                return (
                  <div key={terrain.id} className="t-terrain-card">
                    <div className="t-terrain-image">
                      <img src={terrain.image} alt={terrain.titre} loading="lazy" />
                      <div className="t-terrain-overlay" />
                      <div className={`t-terrain-badge ${terrain.badgeClass}`}>{terrain.badge}</div>
                      <div className="t-terrain-sport" style={{ backgroundColor: getSportColor(terrain.sport) }}>
                        <SportIcon size={14} />
                        <span>{getSportLabel(terrain.sport)}</span>
                      </div>
                      <div className="t-terrain-rating">
                        <Star size={13} fill="currentColor" />
                        <span>{terrain.note}</span>
                        <span className="t-rating-count">({terrain.avis})</span>
                      </div>
                      <div className="t-terrain-location">
                        <MapPin size={11} />
                        {terrain.quartier}, {terrain.ville}
                      </div>
                    </div>

                    <div className="t-terrain-content">
                      <h3 className="t-terrain-title">{terrain.titre}</h3>

                      <div className="t-terrain-meta">
                        <span className="t-terrain-type">{terrain.type}</span>
                        <span className="t-terrain-surface">{terrain.surface}</span>
                      </div>

                      <div className="t-terrain-features">
                        {terrain.caracteristiques.slice(0, 3).map((c, i) => {
                          const Icon = c.icon;
                          return (
                            <span key={i} className="t-terrain-feature">
                              <Icon size={14} /> {c.text}
                            </span>
                          );
                        })}
                      </div>

                      <div className="t-terrain-equipments">
                        <h4>Équipements inclus :</h4>
                        <div className="t-equipments-grid">
                          {terrain.equipements.slice(0, 4).map((e, i) => (
                            <span key={i} className="t-equipment-item">
                              <Check size={11} /> {e}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="t-terrain-footer">
                        <div className="t-terrain-price">
                          <span className="t-price-number">{terrain.tarif}</span>
                          <span className="t-price-unit"> {terrain.devise}</span>
                        </div>
                        <div className="t-terrain-actions">
                          <Link to="/reservation" className="t-btn-primary-small">
                            <Calendar size={14} /> Réserver
                          </Link>
                          <button onClick={() => handleOpenModal(terrain)} className="t-btn-secondary-small">
                            Détails
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── MODAL DETAILS ────────────────────────────────────────── */}
      {isModalOpen && selectedTerrain && (
        <div className="t-modal-overlay" onClick={handleCloseModal}>
          <div className="t-modal" onClick={(e) => e.stopPropagation()}>
            <button className="t-modal-close" onClick={handleCloseModal}>
              <X size={24} />
            </button>
            
            <div className="t-modal-header">
              <div className="t-modal-image">
                <img src={selectedTerrain.imageDetail || selectedTerrain.image} alt={selectedTerrain.titre} />
                <div className={`t-modal-badge ${selectedTerrain.badgeClass}`}>{selectedTerrain.badge}</div>
                <div className="t-modal-sport" style={{ backgroundColor: getSportColor(selectedTerrain.sport) }}>
                  {React.createElement(getSportIcon(selectedTerrain.sport), { size: 14 })}
                  <span>{getSportLabel(selectedTerrain.sport)}</span>
                </div>
              </div>
              <div className="t-modal-header-content">
                <h2>{selectedTerrain.titre}</h2>
                <div className="t-modal-location">
                  <MapPin size={16} />
                  <span>{selectedTerrain.quartier}, {selectedTerrain.ville}</span>
                </div>
                <div className="t-modal-rating">
                  <Star size={16} fill="currentColor" />
                  <span>{selectedTerrain.note}</span>
                  <span className="t-modal-rating-count">({selectedTerrain.avis} avis)</span>
                </div>
              </div>
            </div>

            <div className="t-modal-body">
              <div className="t-modal-section">
                <h3><Sparkles size={18} /> Description</h3>
                <p>{selectedTerrain.description}</p>
              </div>

              <div className="t-modal-info-grid">
                <div className="t-modal-info">
                  <Clock size={20} />
                  <div>
                    <strong>Horaires</strong>
                    <span>{selectedTerrain.horaires}</span>
                  </div>
                </div>
                <div className="t-modal-info">
                  <Trophy size={20} />
                  <div>
                    <strong>Durée match</strong>
                    <span>{selectedTerrain.dureeMatch}</span>
                  </div>
                </div>
                <div className="t-modal-info">
                  <Users size={20} />
                  <div>
                    <strong>Niveau requis</strong>
                    <span>{selectedTerrain.niveauRequis}</span>
                  </div>
                </div>
                <div className="t-modal-info">
                  <Calendar size={20} />
                  <div>
                    <strong>Réservation</strong>
                    <span>En ligne 24/7</span>
                  </div>
                </div>
              </div>

              <div className="t-modal-section">
                <h3><Award size={18} /> Caractéristiques</h3>
                <div className="t-modal-features">
                  {selectedTerrain.caracteristiques.map((c, i) => {
                    const Icon = c.icon;
                    return (
                      <div key={i} className="t-modal-feature">
                        <Icon size={16} />
                        <span>{c.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="t-modal-section">
                <h3><Shield size={18} /> Équipements inclus</h3>
                <div className="t-modal-equipments">
                  {selectedTerrain.equipements.map((e, i) => (
                    <div key={i} className="t-modal-equipment">
                      <Check size={14} />
                      <span>{e}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTerrain.avisRecents && selectedTerrain.avisRecents.length > 0 && (
                <div className="t-modal-section">
                  <h3><ThumbsUp size={18} /> Avis récents</h3>
                  <div className="t-modal-reviews">
                    {selectedTerrain.avisRecents.map((review, i) => (
                      <div key={i} className="t-modal-review">
                        <div className="t-review-header">
                          <strong>{review.nom}</strong>
                          <div className="t-review-rating">
                            <Star size={12} fill="currentColor" />
                            <span>{review.note}</span>
                          </div>
                        </div>
                        <p>"{review.commentaire}"</p>
                        <span className="t-review-date">{review.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="t-modal-footer">
                <div className="t-modal-price">
                  <span className="t-modal-price-number">{selectedTerrain.tarif}</span>
                  <span className="t-modal-price-unit"> {selectedTerrain.devise}</span>
                </div>
                <Link to="/reservation" className="t-modal-btn" onClick={handleCloseModal}>
                  <Calendar size={18} /> Réserver maintenant
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}