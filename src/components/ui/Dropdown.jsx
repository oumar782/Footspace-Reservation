/**
 * PlayForest UI — Dropdown
 * Menu déroulant accessible
 */
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './Dropdown.css';

const Dropdown = ({
  trigger,
  items = [],
  placement = 'bottom-right',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const classes = [
    'pf-dropdown',
    `pf-dropdown--${placement}`,
    isOpen ? 'pf-dropdown--open' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={containerRef} className={classes}>
      <button
        type="button"
        className="pf-dropdown__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {typeof trigger === 'string' ? <span>{trigger}</span> : trigger}
        <ChevronDown size={14} className="pf-dropdown__chevron" />
      </button>
      <div className="pf-dropdown__menu" role="menu">
        {items.map((item) => (
          <button
            key={item.key || item.label}
            type="button"
            className={`pf-dropdown__item ${item.danger ? 'pf-dropdown__item--danger' : ''} ${item.disabled ? 'pf-dropdown__item--disabled' : ''}`}
            onClick={() => {
              if (!item.disabled && item.onClick) item.onClick();
              setIsOpen(false);
            }}
            disabled={item.disabled}
            role="menuitem"
          >
            {item.icon && <span className="pf-dropdown__icon">{item.icon}</span>}
            <span>{item.label}</span>
            {item.shortcut && <kbd className="pf-dropdown__kbd">{item.shortcut}</kbd>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;