import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CATEGORIES, CATEGORY_INFO } from '../../../data';
import { CategoryCard } from '../CategoryCard';
import './CategorySelection.css';

export const CategorySelection = ({ onStartGame, onStudy }) => {
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleStart = () => {
    if (selectedCategories.length > 0) {
      onStartGame(selectedCategories);
    }
  };

  return (
    <div className="category-selection">
      <h1 className="selection-title">{t('app.title')}</h1>
      <p className="selection-subtitle">{t('app.subtitle')}</p>

      <div className="category-grid">
        {Object.values(CATEGORIES).map(category => (
          <CategoryCard
            key={category}
            category={category}
            info={CATEGORY_INFO[category]}
            isSelected={selectedCategories.includes(category)}
            onToggle={toggleCategory}
            onStudy={onStudy}
          />
        ))}
      </div>

      <button
        className="start-button"
        onClick={handleStart}
        disabled={selectedCategories.length === 0}
      >
        {t('buttons.startPractice')}
        {selectedCategories.length > 0 && (
          <span className="selected-count">
            ({selectedCategories.length} {t('selected')})
          </span>
        )}
      </button>
    </div>
  );
};
