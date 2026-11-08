/**
 * PlayForest UI — Toast
 * Notifications non bloquantes
 */
import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import './Toast.css';

const ICON_MAP = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const Toast = ({ toast, onDismiss }) => {
  const Icon = toast?.type ? ICON_MAP[toast.type] : Info;
  const iconColor = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  }[toast?.type || 'info'];

  useEffect(() => {
    if (toast?.duration !== false) {
      const timer = setTimeout(() => onDismiss(toast.id), toast?.duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, onDismiss]);

  return (
    <div className={`pf-toast pf-toast--${toast?.type || 'info'}`}>
      <span className="pf-toast__icon" style={{ color: iconColor }}>
        <Icon size={18} />
      </span>
      <div className="pf-toast__content">
        {toast?.title && <strong className="pf-toast__title">{toast.title}</strong>}
        <p className="pf-toast__message">{toast?.message}</p>
      </div>
      <button
        className="pf-toast__close"
        onClick={() => onDismiss(toast.id)}
        aria-label="Fermer"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;