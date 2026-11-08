/**
 * PlayForest UI — Select
 * Un composant select custom avec icône, label, error
 */
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './Select.css';

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Sélectionner...',
  icon,
  error,
  disabled = false,
  required = false,
  className = '',
  id,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const optionsRef = useRef([]);
  const selectId = id || `pf-select-${name}`;

  const selectedOption = options.find((o) => o.value === value);
  const selectedLabel = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(!open);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlighted((h) => Math.min(h + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      setHighlighted((h) => Math.max(h - 1, 0));
    }
  };

  const handleSelect = (option) => {
    if (!option.disabled) {
      onChange?.({ target: { name, value: option.value } });
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`pf-select-group ${error ? 'pf-select-group--error' : ''}`}
    >
      {label && (
        <label htmlFor={selectId} className="pf-select-label">
          {label} {required && <span className="pf-select-required">*</span>}
        </label>
      )}
      <div
        ref={inputRef}
        id={selectId}
        className={`pf-select ${icon ? 'pf-select--with-icon' : ''} ${disabled ? 'pf-select--disabled' : ''} ${open ? 'pf-select--open' : ''} ${className}`}
        onClick={() => !disabled && setOpen(!open)}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        tabIndex={disabled ? -1 : 0}
      >
        {icon && <span className="pf-select-icon">{icon}</span>}
        <span className="pf-select-value">{selectedLabel}</span>
        <ChevronDown size={16} className="pf-select-chevron" />

        {open && (
          <ul className="pf-select-options" role="listbox" tabIndex={-1}>
            {options.map((option, i) => (
              <li
                key={option.value}
                ref={(el) => (optionsRef.current[i] = el)}
                className={`pf-select-option ${option.value === value ? 'pf-select-option--selected' : ''} ${option.disabled ? 'pf-select-option--disabled' : ''} ${i === highlighted ? 'pf-select-option--highlighted' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option);
                }}
                onMouseEnter={() => setHighlighted(i)}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <span className="pf-select-error">{error}</span>}
    </div>
  );
};

export default Select;