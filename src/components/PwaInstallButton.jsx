/**
 * PlayForest — Bouton d'installation PWA
 * Affiche un CTA discret au bon moment.
 */
import { Download, Smartphone } from 'lucide-react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';
import './PwaInstallButton.css';

export default function PwaInstallButton() {
  const { installEvent, isInstalled } = useInstallPrompt();

  if (isInstalled || !installEvent) return null;

  const isIOS = typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    return (
      <div className="pf-install pf-install--ios">
        <Smartphone size={16} />
        <span>Ajouter à l'écran d'accueil : Safari → Partager → « Ajouter à l'écran d'accueil »</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="pf-install"
      onClick={() => {
        if (installEvent) {
          installEvent.prompt();
          installEvent.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('PlayForest installée');
            }
          });
        }
      }}
      aria-label="Installer PlayForest"
    >
      <Download size={16} />
      Installer PlayForest
    </button>
  );
}