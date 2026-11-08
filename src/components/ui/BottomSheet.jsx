/**
 * PlayForest UI — BottomSheet
 * Panneau qui glisse depuis le bas (mobile)
 */
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './BottomSheet.css';

const BottomSheet = ({
  isOpen,
  onClose,
  title,
  children,
  snapPoints = ['30%', '60%', '90%'],
  className = '',
}) => {
  const sheetRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="pf-sheet-overlay" onClick={onClose} aria-hidden="true">
      <div
        ref={sheetRef}
        className={`pf-sheet ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="pf-sheet__handle" />
        <div className="pf-sheet__header">
          {title && <h3 className="pf-sheet__title">{title}</h3>}
          <button
            type="button"
            className="pf-sheet__close"
            aria-label="Fermer"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <div className="pf-sheet__body">{children}</div>
      </div>
    </div>
  );
};

export default BottomSheet;