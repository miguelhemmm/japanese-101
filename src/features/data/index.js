import { hiragana } from './hiragana';
import { katakana } from './katakana';
import { kanji } from './kanji';
import { verbs } from './verbs';
import { CATEGORIES } from './constants';

export { CATEGORIES, SUBCATEGORIES, GAME_STATES, CATEGORY_INFO, SUBCATEGORY_INFO } from './constants';
export { hiragana } from './hiragana';
export { katakana } from './katakana';
export { kanji } from './kanji';
export { verbs } from './verbs';

export const getAllCharacters = () => [
  ...hiragana,
  ...katakana,
  ...kanji,
  ...verbs
];

export const getCharactersByCategory = (category) => {
  switch (category) {
    case CATEGORIES.HIRAGANA:
      return hiragana;
    case CATEGORIES.KATAKANA:
      return katakana;
    case CATEGORIES.KANJI:
      return kanji;
    case CATEGORIES.VERBS:
      return verbs;
    default:
      return [];
  }
};

export const getCharactersByCategories = (categories) => {
  return categories.flatMap(cat => getCharactersByCategory(cat));
};
