/**
 * PlayForest — Hook PWA install prompt
 * Gère l'événement beforeinstallprompt et le statut d'installation.
 */
import { useState, useEffect } from 'react';

export const useInstallPrompt = () => {
  const [installEvent, setInstallEvent] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Vérifie si déjà installé
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) setIsInstalled(true);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallEvent(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallEvent(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = () => {
    if (installEvent) {
      installEvent.prompt();
      installEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PlayForest installée avec succès');
        }
        setInstallEvent(null);
      });
    }
  };

  const isIOS = () => {
    if (typeof navigator === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  };

  return { installEvent, isInstalled, promptInstall, isIOS: isIOS() };
};