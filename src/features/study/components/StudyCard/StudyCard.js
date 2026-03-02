import { CATEGORIES } from '../../../data';
import './StudyCard.css';

export const StudyCard = ({ item }) => {
  const isKanaType = item.category === CATEGORIES.HIRAGANA || item.category === CATEGORIES.KATAKANA;

  if (isKanaType) {
    return (
      <div className="study-card study-card--kana">
        <span className="study-card__character">{item.character}</span>
        <span className="study-card__romanji">{item.romanji[0]}</span>
      </div>
    );
  }

  // Kanji or Verbs - show more info
  const furiganaText = Array.isArray(item.furigana)
    ? item.furigana.join(', ')
    : item.furigana;

  return (
    <div className="study-card study-card--detailed">
      <div className="study-card__top">
        <span className="study-card__character study-card__character--large">{item.character}</span>
        {furiganaText && (
          <span className="study-card__furigana">{furiganaText}</span>
        )}
      </div>
      <div className="study-card__info">
        <span className="study-card__romanji">{item.romanji.join(', ')}</span>
        {item.english && (
          <span className="study-card__meaning study-card__meaning--english">
            {item.english.join(', ')}
          </span>
        )}
        {item.spanish && (
          <span className="study-card__meaning study-card__meaning--spanish">
            {item.spanish.join(', ')}
          </span>
        )}
      </div>
    </div>
  );
};
