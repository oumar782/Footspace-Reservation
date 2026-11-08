const COMMUNITIES_API_URL = import.meta.env.VITE_COMMUNITIES_API_URL || '/api/communities';
const PUSH_SUBSCRIPTIONS_URL = COMMUNITIES_API_URL.replace(
  /\/communities\/?$/,
  '/notifications/push/subscriptions'
);

function decodeApplicationServerKey(encodedKey) {
  const paddedKey = encodedKey.padEnd(Math.ceil(encodedKey.length / 4) * 4, '=');
  const base64Key = paddedKey.replace(/-/g, '+').replace(/_/g, '/');
  const rawKey = window.atob(base64Key);
  return Uint8Array.from(rawKey, (character) => character.charCodeAt(0));
}

export async function enablePushNotifications() {
  if (!window.isSecureContext) {
    throw new Error('Les notifications nécessitent une connexion HTTPS.');
  }

  if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    throw new Error('Les notifications Push ne sont pas prises en charge par ce navigateur.');
  }

  const applicationServerKey = import.meta.env.VITE_WEB_PUSH_PUBLIC_KEY;
  if (!applicationServerKey) {
    throw new Error('La clé publique Push du serveur doit être configurée.');
  }

  const token = localStorage.getItem('playforest_token') || localStorage.getItem('token');
  if (!token) {
    throw new Error('Connecte-toi pour activer les notifications.');
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Autorise les notifications dans les réglages de ton navigateur.');
  }

  const registration = await navigator.serviceWorker.getRegistration() || await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: decodeApplicationServerKey(applicationServerKey),
    });
  }

  const response = await fetch(PUSH_SUBSCRIPTIONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ subscription: subscription.toJSON() }),
  });

  let responseData = null;
  try {
    responseData = await response.json();
  } catch {
    // Some APIs return an empty response body after saving a subscription.
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Le serveur doit encore ajouter la route d’enregistrement Push.');
    }
    throw new Error(responseData?.message || `Impossible d’enregistrer l’appareil (HTTP ${response.status}).`);
  }

  localStorage.setItem('pf_push_enabled', 'true');
  return subscription;
}
