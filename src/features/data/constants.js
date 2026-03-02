export const CATEGORIES = {
  HIRAGANA: 'hiragana',
  KATAKANA: 'katakana',
  KANJI: 'kanji',
  VERBS: 'verbs'
};

export const SUBCATEGORIES = {
  BASIC: 'basic',
  DAKUTEN: 'dakuten',
  HANDAKUTEN: 'handakuten',
  COMBINATION: 'combination'
};

export const GAME_STATES = {
  SELECTING: 'selecting',
  PLAYING: 'playing',
  FEEDBACK: 'feedback',
  COMPLETED: 'completed'
};

export const CATEGORY_INFO = {
  [CATEGORIES.HIRAGANA]: {
    nameKey: 'categories.hiragana.name',
    descriptionKey: 'categories.hiragana.description',
    icon: 'あ'
  },
  [CATEGORIES.KATAKANA]: {
    nameKey: 'categories.katakana.name',
    descriptionKey: 'categories.katakana.description',
    icon: 'ア'
  },
  [CATEGORIES.KANJI]: {
    nameKey: 'categories.kanji.name',
    descriptionKey: 'categories.kanji.description',
    icon: '漢'
  },
  [CATEGORIES.VERBS]: {
    nameKey: 'categories.verbs.name',
    descriptionKey: 'categories.verbs.description',
    icon: '動'
  }
};
