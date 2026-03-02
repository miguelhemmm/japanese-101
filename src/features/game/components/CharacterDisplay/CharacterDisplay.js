import './CharacterDisplay.css';

// Renders a verb with furigana above kanji characters
const renderVerbWithFurigana = (character, furigana) => {
  if (!furigana || furigana.length === 0) {
    return character;
  }

  let result = [];
  let remaining = character;
  let keyIndex = 0;

  for (const { kanji, reading } of furigana) {
    const kanjiIndex = remaining.indexOf(kanji);
    if (kanjiIndex === -1) continue;

    // Add any text before the kanji
    if (kanjiIndex > 0) {
      result.push(<span key={`text-${keyIndex}`}>{remaining.slice(0, kanjiIndex)}</span>);
    }

    // Add the kanji with ruby annotation
    result.push(
      <ruby key={`ruby-${keyIndex}`}>
        {kanji}
        <rt>{reading}</rt>
      </ruby>
    );

    remaining = remaining.slice(kanjiIndex + kanji.length);
    keyIndex++;
  }

  // Add any remaining text after the last kanji
  if (remaining) {
    result.push(<span key={`text-end`}>{remaining}</span>);
  }

  return result;
};

// Renders a kanji with furigana above it
const renderKanjiWithFurigana = (character, furigana) => {
  if (!furigana) {
    return character;
  }

  return (
    <ruby>
      {character}
      <rt>{furigana}</rt>
    </ruby>
  );
};

export const CharacterDisplay = ({ character, category, furigana, categoryType }) => {
  const renderCharacter = () => {
    // For verbs, furigana is an array of {kanji, reading} objects
    if (categoryType === 'verbs' && Array.isArray(furigana)) {
      return renderVerbWithFurigana(character, furigana);
    }
    // For kanji, furigana is a single string
    if (categoryType === 'kanji' && typeof furigana === 'string') {
      return renderKanjiWithFurigana(character, furigana);
    }
    // For hiragana/katakana or no furigana, just show the character
    return character;
  };

  return (
    <div className="character-display">
      <span className="character-category">{category}</span>
      <span className="character-text">{renderCharacter()}</span>
    </div>
  );
};
