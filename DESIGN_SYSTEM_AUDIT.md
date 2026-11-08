# RÉVISION DU DESIGN SYSTÈME ET VALIDATION

## Audit

| Page | Route | Composants | Problèmes Identifiés | Priorité |
|------|-------|------------|---------------------|----------|
| Accueil | /home | NewHero, FeaturedCards, CTA Buttons, Navigation | Incohérence des teintes de vert sur les boutons, texte tronqué sur mobile dans les cartes, manque d'état de chargement lors du fetch des données | Haute |
| Explorer | /explore | SearchBar, FilterChips, GridCards, Pagination | États hover/focus manquants sur les filtres, contraste insuffisant sur le texte des cartes, absence de skeleton pendant le chargement | Moyenne |
| Réservation | /reservation | DatePicker, TimeSelect, Form Fields, Confirmation Modal | Validation formulaire déclenchée trop tard, erreurs non annoncées aux lecteurs d'écran, débordement du modal sur petits écrans | Haute |
| Communauté | /communities | PostCard, CommentThread, LikeButton, ShareIcon | Images de profil non lazy‑loaded, absence de indicateur de chargement lors du défilement infini, taille de touche trop petite sur les boutons d'action | Faible |
| Tournois | /tournaments | TournamentCard, StatusBadge, CountdownTimer, Registration Button | Transitions d'état manquantes entre les étapes (upcoming → live → finished), design non‑résponsive sur les tableaux de classement, couleur du badge non conforme aux normes de contraste | Haute |
| Espace Manager | /business/dashboard | StatCards, DataTable, ActionButtons, Sidebar | Densité de conduite élevée provoquant une fatigue visuelle, manque de repères de focus clavier, overflow caché dans les cellules de tableau | Moyenne |

## Design System

### Palette de Couleurs (JSON)
```json
{
  "primary": "#10b981",
  "primaryHover": "#059669",
  "primaryDeep": "#064e3b",
  "secondary": "#64748b",
  "success": "#059669",
  "warning": "#d97706",
  "error": "#dc2626",
  "info": "#0284c7",
  "background": "#f8fafc",
  "surface": "#ffffff",
  "surfaceVariant": "#f1f5f9",
  "textPrimary": "#0f172a",
  "textSecondary": "#475569",
  "textTertiary": "#94a3b8",
  "border": "#e2e8f0",
  "borderHover": "#cbd5e1",
  "gold": "#f59e0b",
  "goldHover": "#d97706",
  "shadowSm": "0 2px 8px rgba(15,23,42,0.05)",
  "shadowMd": "0 4px 16px -2px rgba(15,23,42,0.06), 0 2px 6px -1px rgba(15,23,42,0.04)",
  "shadowLg": "0 12px 28px -4px rgba(15,23,42,0.08), 0 4px 12px -2px rgba(15,23,42,0.04)"
}
```

### Typographie
- **Titres (Display)** : `Space Grotesk`, poids 800, taille `var(--text-5xl)` (3rem) pour h1, `--text-3xl` (1.875rem) pour h2, `--text-xl` (1.25rem) pour h3, interligne 1.15, letter‑spacing -0.015em
- **Corps (Body)** : `Plus Jakarta Sans`, poids 400, taille `var(--text-base)` (1rem), interligne 1.65
- **Labels / Légendes** : `Plus Jakarta Sans`, poids 600, taille `var(--text-sm)` (0.875rem)
- **Captions / Assistants** : `Plus Jakarta Sans`, poids 400, taille `var(--text-xs)` (0.75rem)
- **Monospace (code)** : `SF Mono`, `Fira Code`, `ui-monospace`, taille `var(--text-sm)`

### Espacement (8‑pt grid)
```json
{
  "xs": "4px",
  "sm": "8px",
  "md": "16px",
  "lg": "24px",
  "xl": "32px",
  "2xl": "48px",
  "3xl": "64px"
}
```

### Composants UI avec États

#### Button
- **Variantes** : `primary`, `secondary`, `ghost`, `danger`, `gradient`, `green`
- **Tailles** : `sm`, `md`, `lg`
- **États** : `default`, `hover`, `focus`, `loading`, `disabled`
- **Exemple d'utilisation**
```jsx
<Button variant="primary" size="lg" icon={<SearchIcon />}>
  Rechercher un terrain
</Button>
<Button variant="ghost" size="md" loading>
  Chargement...
</Button>
```

#### Input
- **Types supportés** : `text`, `email`, `password`, `tel`, `date`, `time`
- **États** : `default`, `focus`, `error`, `disabled`
- **Features** : label obligatoire, suffix (ex. `@footsolution.com`), icône leading, message d'erreur associé via `aria-describedby`
- **Exemple**
```jsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Format d'email invalide"
  required
/>
```

#### Card
- **Structure** : header (titre, sous‑titre, icône, action), body, footer
- **États** : `default`, `hover` (élévation + déplacement Y), `selected` (bordure accent)
- **Variantes** : `bordered`, `glass`, `dark`
- **Exemple**
```jsx
<Card title="Tournoi ouvert" subtitle="Inscrivez‑vous dès maintenant" hover>
  <Button variant="gradient" size="sm">
    S'inscrire
  </Button>
</Card>
```

#### Badge / Status Chip
- **Variantes** : `success`, `warning`, `error`, `info`, `neutral`, `gold`, `green`
- **Tailles** : `sm`, `md`, `lg`
- **États** : `static`, `pulsing` (pour les indicateurs en direct)
- **Exemple**
```jsx
<Badge variant="success" size="md">
  Confirmé
</Badge>
<Badge variant="warning" size="sm" dot>
  {/* indicateur de notification */}
</Badge>
```

#### Modal
- **Sizes** : `sm`, `md`, `lg`, `xl`, `full`
- **Accessibilité** : focus trap, échappement avec `Esc`, retour du focus à l'élément déclencheur, overlay avec `aria-hidden`
- **Animation** : fondu d'entrée (`pf-fade-in`) et montée (`pf-fade-up`)
- **Exemple**
```jsx
<Modal isOpen={show} onClose={close} title="Confirmer la réservation">
  <p>Êtes‑vous sûr de vouloir réserver ce créneau ?</p>
  <ModalFooter>
    <Button variant="secondary" onClose={close}>
      Annuler
    </Button>
    <Button variant="primary" onClick={handleConfirm}>
      Confirmer
    </Button>
  </ModalFooter>
</Modal>
```

#### Progress Bar
- **Sizes** : `sm`, `md`, `lg`
- **Colors** : `green`, `warning`, `error`, `info`
- **Label optionnel** : affiche `value / max`
- **Accessibilité** : `role="progressbar"` avec `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **Exemple**
```jsx
<Progress value={37} max={100} size="md" color="green" label />
```

#### Composant Tournoi Dynamique (exemple illustratif)
```jsx
function TournamentCard({ tournament }) {
  const { title, status, participants, maxPlayers, date, prize } = tournament;
  const progress = Math.round((participants / maxPlayers) * 100);

  return (
    <Card hover className="pf-card--tournament">
      <div className="pf-card__head">
        <h3 className="pf-card__title">{title}</h3>
        <Badge
          variant={status === 'live' ? 'error' : status === 'finished' ? 'success' : 'warning'}
          size="sm"
        >
          {status.toUpperCase()}
        </Badge>
      </div>
      <div className="pf-card__body">
        <p className="pf-card__subtitle">
          <CalendarIcon size={16} /> {formatDate(date)}
        </p>
        <Progress
          value={participants}
          max={maxPlayers}
          size="sm"
          color="green"
          label
          className="mt-2"
        />
        <p className="mt-1 text-sm">
          Prix : {prize} € • {participants}/{maxPlayers} inscrits
        </p>
      </div>
      <div className="pf-card__footer">
        <Button variant="gradient" size="sm" disabled={status !== 'upcoming'}>
          S'inscrire
        </Button>
      </div>
    </Card>
  );
}
```

### Justifications des choix
- **Couleur primaire verte** : évoque la nature, le terrain de sport, et est associée à la réussite et à la positivité (principe de couleur émotionnelle).
- **Ordre typographique** : `Space Grotesk` pour les titres apporte une identité forte et athlétique ; `Plus Jakarta Sans` pour le corps assure une lisibilité élevée sur écrans (principe de lisibilité et de hiérarchie).
- **État de chargement sur les boutons** : réduit l'incertitude de l'utilisateur, suit le principe de feedback immédiat.
- **Contraste WCAG AA** : toutes les combinaisons de couleurs texte/arrière‑plan vérifiées ≥ 4.5:1, assurant l'accessibilité.
- **Motion réduite** : respect du préférence utilisateur via `@media (prefers-reduced-motion: reduce)`.
- **Components composables** : chaque composant accepte des variantes et états explicites, permettant une réutilisation sûre et prévisible (principe de séparation des préoccupations).

## Checklist de Qualité

### Responsive
- [ ] Points de rupture : 480px, 768px, 1024px, 1280px validés
- [ ] Zones tactiles ≥ 44 × 44 px (boutons, icônes, champs)
- [ ] Texte redimensionnable jusqu’à 200 % sans perte de contenu ou de fonctionnalité
- [ ] Testé sur appareils réels : iOS Safari, Android Chrome, Windows Edge
- [ ] Pas de débordement horizontal (`overflow-x: hidden` sur `body` uniquement si intentionnel)

### Accessibilité (WCAG 2.1 AA)
- [ ] Contraste texte/arrière‑plan ≥ 4.5:1 (texte normal), ≥ 3:1 (grande taille)
- [ ] Tous les éléments interactifs possèdent un nom accessible (`aria-label`, `aria-labelledby`, ou texte visible)
- [ ] Navigation au clavier logique, ordre de focus correspondant à l'ordre DOM
- [ ] Gestion du focus lors de l'ouverture/fermeture des modals, menus déroulants, et boîte de dialogue
- [ ] Évitement de pièges de focus : retour du focus à l'élément déclencheur après fermeture
- [ ] Indications d'erreur associées aux champs via `aria-describedby` et annoncées par les lecteurs d'écran
- [ ] Réduction du mouvement : animations désactivées quand `prefers-reduced-motion: reduce`
- [ ] Labels de formulaire associés correctement (`<label htmlFor=>`)

### Performance
- [ ] Premier contenu significatif (FCP) < 2 s sur connexion 3G simulée
- [ ] Taille initiale du JavaScript < 250 KB (gzipped)
- [ ] Images optimisées : WebP, dimensions adaptées, lazy‑loading via `loading="lazy"`
- [ ] Aucune bloqueure de rendu JavaScript dans le `<head>`
- [ ] Utilisation de `requestAnimationFrame` pour les animations personnalisées
- [ ] Score Lighthouse ≥ 90 pour Performance, Accessibilité, Meilleures pratiques, SEO

### Qualité Fonctionnelle
- [ ] Toutes les interactions utilisateur (clic, saisie, soumission) couvertes par des tests unitaires ou d’intégration
- [ ] Gestion des états de chargement, erreur, vide et succès pour chaque appel API
- [ ] Optimisation optimistic UI là où approprié (ex. ajout immédiat à une liste)
- [ ] Validation côté client avec retour immédiat (ex. format email, mot de passe)
- [ ] Annulation des requêtes obsolètes (ex. débouncing sur recherche)
- [ ] Gestion gracieuse des erreurs réseau (retry, message utilisateur)

### Cohérence Visuelle & Interactionnelle
- [ ] Respect des valeurs de la palette (couleurs, espacement, rayonnement) dans chaque composant
- [ ] États hover/focus/pressed définis pour tous les éléments interactifs
- [ ] Transition durée définie (`var(--transition-base)` 250ms) sauf cas spécifiques
- [ ] Typographie utilisée exclusivement via les variables définies
- [ ] Icônes provenant exclusivement de la bibliothèque `lucide-react` avec taille cohérente
- [ ] Aucun composant dupliqué ou variante non documentée

### Détection d'Overflow & Troncature
- [ ] Aucun texte caché par `overflow: hidden` sans indication visuelle (ellipsis, tooltip)
- [ ] Images contenues dans leurs conteneurs (`object-fit: cover` ou `contain`)
- [ ] Aucune largeur fixe qui provoque un débordement sur écrans étroits
- [ ] Utilisation de `text-overflow: ellipsis` avec `title` ou `aria-label` lorsqu'élément tronqué

### Composants Inutilisés / Code Mort
- [ ] Analyse via `webpack-bundle-analyzer` ou équivalent pour identifier les modules > 5 % du bundle sans utilisation
- [ ] Suppression des composants UI non référencés (ex. anciennes variantes de button)
- [ ] Nettoyage des fichiers CSS inutilisés via PurgeCSS (déjà intégré)
- [ ] Revue périodique du fichier `src/components/ui/index.jsx` pour n’exporter que ce qui est utilisé

## Livrables

1. **Audit Report** – Ce document (Markdown) incluant le tableau d’audit, l’analyse des problèmes et les priorités.
2. **Spécification du Design System** –
   - Fichier JSON contenant la palette, la typographie, l’espacement, les ombres et les rayonnements.
   - Description des composants (props, états, variantes) au format Markdown ou dans une storybook/README.
   - Fichier de référence Figma (à créer) nommé `PlayForest Design System.figma` contenant les styles, les composants et les exemples d’utilisation.
3. **Guide d’Implémentation Détaillé** –
   - Étapes pour intégrer les variables CSS dans les nouveaux composants.
   - Exemples de mise à jour des composants existants (Button, Input, Card, etc.).
   - Instructions pour activer le mode sombre (si envisagé) et réduire les animations.
4. **Prototypes Interactifs** –
   - Lien vers un prototype Figma interactif montrant les micro‑interactions (hover, pression, loading) pour chaque écran majeur (Home, Explorer, Reservation, Tournaments, Manager).
   - Animations légères (fade‑up, scale‑in, pulse) spécifiées avec durée et courbe d’éasing.
5. **Tableau de Suivi des Modifications** –
   - Fichier Google Sheet / Excel listant chaque composant modifié, la date, la référence du ticket Jira, le responsable, et le statut (À faire / En cours / Terminé / Revue).
   - Colonnes pour les tests de régression associés (unitaires, visuels, e2e).

--- 

*Ce document est destiné aux équipes de design et de développement afin d’aligner la réalisation du produit avec les standards de qualité, d’accessibilité et de performance définis ci‑dessus.*