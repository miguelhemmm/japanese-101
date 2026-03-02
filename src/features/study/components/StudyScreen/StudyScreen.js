import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StudyGrid } from '../StudyGrid';
import { SubcategoryGroup } from '../SubcategoryGroup';
import { CATEGORIES, CATEGORY_INFO, SUBCATEGORIES, getCharactersByCategory } from '../../../data';
import './StudyScreen.css';

export const StudyScreen = ({ category, onBack }) => {
  const { t } = useTranslation();

  const items = useMemo(() => getCharactersByCategory(category), [category]);

  const isKanaType = category === CATEGORIES.HIRAGANA || category === CATEGORIES.KATAKANA;

  const groupedItems = useMemo(() => {
    if (!isKanaType) return null;

    return {
      [SUBCATEGORIES.BASIC]: items.filter(i => i.subcategory === SUBCATEGORIES.BASIC),
      [SUBCATEGORIES.DAKUTEN]: items.filter(i => i.subcategory === SUBCATEGORIES.DAKUTEN),
      [SUBCATEGORIES.HANDAKUTEN]: items.filter(i => i.subcategory === SUBCATEGORIES.HANDAKUTEN),
      [SUBCATEGORIES.COMBINATION]: items.filter(i => i.subcategory === SUBCATEGORIES.COMBINATION)
    };
  }, [items, isKanaType]);

  const categoryInfo = CATEGORY_INFO[category];

  return (
    <div className="study-screen">
      <header className="study-screen__header">
        <button className="study-screen__back-button" onClick={onBack} type="button">
          &larr; {t('buttons.backToCategories')}
        </button>
        <div className="study-screen__title-row">
          <span className="study-screen__icon">{categoryInfo.icon}</span>
          <h1 className="study-screen__title">{t(categoryInfo.nameKey)}</h1>
          <span className="study-screen__count">
            {items.length} {t('study.characters')}
          </span>
        </div>
      </header>

      <div className="study-screen__content">
        {isKanaType ? (
          Object.entries(groupedItems).map(([subcategory, subItems]) => (
            <SubcategoryGroup
              key={subcategory}
              subcategory={subcategory}
              items={subItems}
            />
          ))
        ) : (
          <StudyGrid items={items} />
        )}
      </div>
    </div>
  );
};
