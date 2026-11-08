/**
 * PlayForest UI — Tabs
 * Navigation par onglets
 */
import './Tabs.css';

const Tabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  const classes = ['pf-tabs', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="pf-tabs__container" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.value}
            className={`pf-tab ${activeTab === tab.value ? 'pf-tab--active' : ''}`}
            onClick={() => onChange(tab.value)}
          >
            {tab.icon && <span className="pf-tab__icon">{tab.icon}</span>}
            <span className="pf-tab__label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;