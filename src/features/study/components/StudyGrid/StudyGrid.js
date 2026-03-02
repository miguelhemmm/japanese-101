import { StudyCard } from '../StudyCard';
import { CATEGORIES } from '../../../data';
import './StudyGrid.css';

export const StudyGrid = ({ items }) => {
  if (!items || items.length === 0) return null;

  const isKanaType = items[0].category === CATEGORIES.HIRAGANA ||
                     items[0].category === CATEGORIES.KATAKANA;

  return (
    <div className={`study-grid ${isKanaType ? 'study-grid--compact' : 'study-grid--detailed'}`}>
      {items.map(item => (
        <StudyCard key={item.id} item={item} />
      ))}
    </div>
  );
};
