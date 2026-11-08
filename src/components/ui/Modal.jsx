import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showClose = true,
  closeOnOverlay = true,
  className = '',
}) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      if (modalRef.current) modalRef.current.focus();
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="pf-modal-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={`pf-modal pf-modal--${size} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Dialogue"}
        tabIndex={-1}
      >
        {title && (
          <div className="pf-modal__header">
            <h2 className="pf-modal__title">{title}</h2>
            {showClose && (
              <button
                className="pf-modal__close"
                onClick={onClose}
                aria-label="Fermer"
                type="button"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        <div className="pf-modal__body">{children}</div>
      </div>
    </div>
  );
}

export function ModalFooter({ children, className = '' }) {
  return (
    <div className={`pf-modal__footer ${className}`}>
      {children}
    </div>
  );
}
