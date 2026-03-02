import { useTranslation } from 'react-i18next';
import { StudyGrid } from '../StudyGrid';
import { SUBCATEGORY_INFO } from '../../../data';
import './SubcategoryGroup.css';

export const SubcategoryGroup = ({ subcategory, items }) => {
  const { t } = useTranslation();

  if (!items || items.length === 0) return null;

  const info = SUBCATEGORY_INFO[subcategory];

  return (
    <section className="subcategory-group">
      <div className="subcategory-group__header">
        <h3 className="subcategory-group__title">{t(info.nameKey)}</h3>
        <span className="subcategory-group__count">
          {items.length} {t('study.characters')}
        </span>
      </div>
      <StudyGrid items={items} />
    </section>
  );
};
