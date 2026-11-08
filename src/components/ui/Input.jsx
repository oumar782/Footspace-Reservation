/**
 * PlayForest UI — Input
 * Supporte: label, placeholder, icône, error, suffixe, type
 */
import './Input.css';

const Input = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  error,
  suffix,
  disabled = false,
  required = false,
  className = '',
  id,
  autoComplete,
  ...rest
}) => {
  const inputId = id || `pf-input-${name}`;
  const classes = [
    'pf-input',
    `pf-input--${type === 'password' ? 'password' : type}`,
    icon ? 'pf-input--with-icon' : '',
    suffix ? 'pf-input--with-suffix' : '',
    error ? 'pf-input--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`pf-input-group ${error ? 'pf-input-group--error' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="pf-input-label">
          {label} {required && <span className="pf-input-required">*</span>}
        </label>
      )}
      <div className={classes}>
        {icon && <span className="pf-input-icon">{icon}</span>}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {suffix && <span className="pf-input-suffix">{suffix}</span>}
      </div>
      {error && (
        <span id={`${inputId}-error`} className="pf-input-error">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;