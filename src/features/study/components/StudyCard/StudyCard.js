import { CATEGORIES } from '../../../data';
import './StudyCard.css';

const renderCharacterWithFurigana = (item) => {
  // For verbs with array furigana (kanji + reading pairs)
  if (Array.isArray(item.furigana)) {
    const character = item.character;
    let result = [];
    let charIndex = 0;

    item.furigana.forEach((f, idx) => {
      // Add any hiragana before this kanji
      const kanjiPos = character.indexOf(f.kanji, charIndex);
      if (kanjiPos > charIndex) {
        result.push(
          <span key={`hira-${idx}`} className="study-card__plain-char">
            {character.slice(charIndex, kanjiPos)}
          </span>
        );
      }
      // Add the kanji with furigana
      result.push(
        <span key={`ruby-${idx}`} className="study-card__ruby">
          <span className="study-card__furigana">{f.reading}</span>
          <span className="study-card__kanji">{f.kanji}</span>
        </span>
      );
      charIndex = kanjiPos + f.kanji.length;
    });

    // Add any remaining hiragana after the last kanji
    if (charIndex < character.length) {
      result.push(
        <span key="hira-end" className="study-card__plain-char">
          {character.slice(charIndex)}
        </span>
      );
    }

    return result;
  }

  // For kanji with simple string furigana
  return (
    <span className="study-card__ruby">
      <span className="study-card__furigana">{item.furigana}</span>
      <span className="study-card__kanji">{item.character}</span>
    </span>
  );
};

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
  return (
    <div className="study-card study-card--detailed">
      <div className="study-card__top">
        <span className="study-card__character study-card__character--large">
          {renderCharacterWithFurigana(item)}
        </span>
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
