const normalizeValue = (value) => String(value ?? '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

export function getPersonalizationPreferences() {
  if (typeof window === 'undefined') {
    return { sports: [], city: '', quartier: '' };
  }

  try {
    const prefs = JSON.parse(localStorage.getItem('playforest_prefs') || '{}');
    const user = JSON.parse(localStorage.getItem('playforest_user') || '{}');
    const sportsValue = prefs.sports ?? user.preferredSports ?? user.preferred_sports ?? [];

    return {
      sports: (Array.isArray(sportsValue) ? sportsValue : [sportsValue])
        .map(normalizeValue)
        .filter(Boolean),
      city: String(prefs.location || prefs.city || prefs.ville || user.preferredCity || user.city || user.ville || '').trim(),
      quartier: String(prefs.quartier || prefs.neighborhood || user.preferredQuartier || user.quartier || user.neighborhood || '').trim(),
    };
  } catch {
    return { sports: [], city: '', quartier: '' };
  }
}

export function matchesPersonalization(item, preferences, { sport = true, city = true, quartier = false } = {}) {
  const sports = (preferences?.sports || []).map(normalizeValue).filter(Boolean);

  if (sport && sports.length > 0) {
    const itemSport = normalizeValue(
      item?.sport || item?.discipline || item?.terrainType || item?.typeTerrain || item?.typeterrain
    );
    if (!itemSport || !sports.includes(itemSport)) return false;
  }

  const preferredCity = normalizeValue(preferences?.city || preferences?.location);
  if (city && preferredCity) {
    const itemCity = normalizeValue(item?.city || item?.ville);
    const itemLocation = normalizeValue(item?.location || item?.adresse || item?.address);
    const cityMatches = itemCity === preferredCity || itemCity.startsWith(`${preferredCity} `) || itemLocation.includes(preferredCity);
    if (!cityMatches) return false;
  }

  const preferredQuartier = normalizeValue(preferences?.quartier || preferences?.neighborhood);
  if (quartier && preferredQuartier) {
    const itemQuartier = normalizeValue(item?.quartier || item?.neighborhood || item?.district);
    const itemLocation = normalizeValue(item?.location || item?.adresse || item?.address);
    const quartierMatches = (itemQuartier && (
      itemQuartier.includes(preferredQuartier) || preferredQuartier.includes(itemQuartier)
    )) || (itemLocation && itemLocation.includes(preferredQuartier));
    if (!quartierMatches) return false;
  }

  return true;
}

export function filterPersonalizedItems(items, preferences, options) {
  return (Array.isArray(items) ? items : []).filter((item) =>
    matchesPersonalization(item, preferences, options)
  );
}

export function normalizePersonalizationValue(value) {
  return normalizeValue(value);
}