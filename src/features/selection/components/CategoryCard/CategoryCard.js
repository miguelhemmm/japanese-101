import { useTranslation } from 'react-i18next';
import './CategoryCard.css';

export const CategoryCard = ({ category, info, isSelected, onToggle, onStudy }) => {
  const { t } = useTranslation();

  const handleStudyClick = (e) => {
    e.stopPropagation();
    onStudy(category);
  };

  return (
    <div className={`category-card ${isSelected ? 'selected' : ''}`}>
      <button
        className="category-card__select"
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
      <button
        className="category-card__study-button"
        onClick={handleStudyClick}
        type="button"
      >
        {t('buttons.study')}
      </button>
    </div>
  );
};
