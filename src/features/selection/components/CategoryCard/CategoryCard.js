import { useTranslation } from 'react-i18next';
import './CategoryCard.css';

export const CategoryCard = ({ category, info, isSelected, onToggle }) => {
  const { t } = useTranslation();

  return (
    <button
      className={`category-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onToggle(category)}
      type="button"
    >
      <span className="category-icon">{info.icon}</span>
      <span className="category-name">{t(info.nameKey)}</span>
      <span className="category-description">{t(info.descriptionKey)}</span>
      <span className="category-checkbox">
        {isSelected ? '✓' : ''}
      </span>
    </button>
  );
};
