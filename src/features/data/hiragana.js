import { CATEGORIES, SUBCATEGORIES } from './constants';

const createHiragana = (id, character, romanji, subcategory = SUBCATEGORIES.BASIC) => ({
  id: `h_${id}`,
  character,
  romanji: Array.isArray(romanji) ? romanji : [romanji],
  english: [],
  category: CATEGORIES.HIRAGANA,
  subcategory
});

// Basic Hiragana (46 characters)
const basicHiragana = [
  // Vowels
  createHiragana('a', 'あ', 'a'),
  createHiragana('i', 'い', 'i'),
  createHiragana('u', 'う', 'u'),
  createHiragana('e', 'え', 'e'),
  createHiragana('o', 'お', 'o'),

  // K-row
  createHiragana('ka', 'か', 'ka'),
  createHiragana('ki', 'き', 'ki'),
  createHiragana('ku', 'く', 'ku'),
  createHiragana('ke', 'け', 'ke'),
  createHiragana('ko', 'こ', 'ko'),

  // S-row
  createHiragana('sa', 'さ', 'sa'),
  createHiragana('shi', 'し', ['shi', 'si']),
  createHiragana('su', 'す', 'su'),
  createHiragana('se', 'せ', 'se'),
  createHiragana('so', 'そ', 'so'),

  // T-row
  createHiragana('ta', 'た', 'ta'),
  createHiragana('chi', 'ち', ['chi', 'ti']),
  createHiragana('tsu', 'つ', ['tsu', 'tu']),
  createHiragana('te', 'て', 'te'),
  createHiragana('to', 'と', 'to'),

  // N-row
  createHiragana('na', 'な', 'na'),
  createHiragana('ni', 'に', 'ni'),
  createHiragana('nu', 'ぬ', 'nu'),
  createHiragana('ne', 'ね', 'ne'),
  createHiragana('no', 'の', 'no'),

  // H-row
  createHiragana('ha', 'は', 'ha'),
  createHiragana('hi', 'ひ', 'hi'),
  createHiragana('fu', 'ふ', ['fu', 'hu']),
  createHiragana('he', 'へ', 'he'),
  createHiragana('ho', 'ほ', 'ho'),

  // M-row
  createHiragana('ma', 'ま', 'ma'),
  createHiragana('mi', 'み', 'mi'),
  createHiragana('mu', 'む', 'mu'),
  createHiragana('me', 'め', 'me'),
  createHiragana('mo', 'も', 'mo'),

  // Y-row
  createHiragana('ya', 'や', 'ya'),
  createHiragana('yu', 'ゆ', 'yu'),
  createHiragana('yo', 'よ', 'yo'),

  // R-row
  createHiragana('ra', 'ら', 'ra'),
  createHiragana('ri', 'り', 'ri'),
  createHiragana('ru', 'る', 'ru'),
  createHiragana('re', 'れ', 're'),
  createHiragana('ro', 'ろ', 'ro'),

  // W-row
  createHiragana('wa', 'わ', 'wa'),
  createHiragana('wo', 'を', ['wo', 'o']),

  // N
  createHiragana('n', 'ん', 'n')
];

// Dakuten (voiced) - 20 characters
const dakutenHiragana = [
  // G-row
  createHiragana('ga', 'が', 'ga', SUBCATEGORIES.DAKUTEN),
  createHiragana('gi', 'ぎ', 'gi', SUBCATEGORIES.DAKUTEN),
  createHiragana('gu', 'ぐ', 'gu', SUBCATEGORIES.DAKUTEN),
  createHiragana('ge', 'げ', 'ge', SUBCATEGORIES.DAKUTEN),
  createHiragana('go', 'ご', 'go', SUBCATEGORIES.DAKUTEN),

  // Z-row
  createHiragana('za', 'ざ', 'za', SUBCATEGORIES.DAKUTEN),
  createHiragana('ji', 'じ', ['ji', 'zi'], SUBCATEGORIES.DAKUTEN),
  createHiragana('zu', 'ず', 'zu', SUBCATEGORIES.DAKUTEN),
  createHiragana('ze', 'ぜ', 'ze', SUBCATEGORIES.DAKUTEN),
  createHiragana('zo', 'ぞ', 'zo', SUBCATEGORIES.DAKUTEN),

  // D-row
  createHiragana('da', 'だ', 'da', SUBCATEGORIES.DAKUTEN),
  createHiragana('di', 'ぢ', ['ji', 'di', 'zi'], SUBCATEGORIES.DAKUTEN),
  createHiragana('du', 'づ', ['zu', 'du', 'dzu'], SUBCATEGORIES.DAKUTEN),
  createHiragana('de', 'で', 'de', SUBCATEGORIES.DAKUTEN),
  createHiragana('do', 'ど', 'do', SUBCATEGORIES.DAKUTEN),

  // B-row
  createHiragana('ba', 'ば', 'ba', SUBCATEGORIES.DAKUTEN),
  createHiragana('bi', 'び', 'bi', SUBCATEGORIES.DAKUTEN),
  createHiragana('bu', 'ぶ', 'bu', SUBCATEGORIES.DAKUTEN),
  createHiragana('be', 'べ', 'be', SUBCATEGORIES.DAKUTEN),
  createHiragana('bo', 'ぼ', 'bo', SUBCATEGORIES.DAKUTEN)
];

// Handakuten (p-sounds) - 5 characters
const handakutenHiragana = [
  createHiragana('pa', 'ぱ', 'pa', SUBCATEGORIES.HANDAKUTEN),
  createHiragana('pi', 'ぴ', 'pi', SUBCATEGORIES.HANDAKUTEN),
  createHiragana('pu', 'ぷ', 'pu', SUBCATEGORIES.HANDAKUTEN),
  createHiragana('pe', 'ぺ', 'pe', SUBCATEGORIES.HANDAKUTEN),
  createHiragana('po', 'ぽ', 'po', SUBCATEGORIES.HANDAKUTEN)
];

// Combination characters (youon) - 36 characters
const combinationHiragana = [
  // K + y
  createHiragana('kya', 'きゃ', 'kya', SUBCATEGORIES.COMBINATION),
  createHiragana('kyu', 'きゅ', 'kyu', SUBCATEGORIES.COMBINATION),
  createHiragana('kyo', 'きょ', 'kyo', SUBCATEGORIES.COMBINATION),

  // S + y
  createHiragana('sha', 'しゃ', ['sha', 'sya'], SUBCATEGORIES.COMBINATION),
  createHiragana('shu', 'しゅ', ['shu', 'syu'], SUBCATEGORIES.COMBINATION),
  createHiragana('sho', 'しょ', ['sho', 'syo'], SUBCATEGORIES.COMBINATION),

  // C + y
  createHiragana('cha', 'ちゃ', ['cha', 'tya'], SUBCATEGORIES.COMBINATION),
  createHiragana('chu', 'ちゅ', ['chu', 'tyu'], SUBCATEGORIES.COMBINATION),
  createHiragana('cho', 'ちょ', ['cho', 'tyo'], SUBCATEGORIES.COMBINATION),

  // N + y
  createHiragana('nya', 'にゃ', 'nya', SUBCATEGORIES.COMBINATION),
  createHiragana('nyu', 'にゅ', 'nyu', SUBCATEGORIES.COMBINATION),
  createHiragana('nyo', 'にょ', 'nyo', SUBCATEGORIES.COMBINATION),

  // H + y
  createHiragana('hya', 'ひゃ', 'hya', SUBCATEGORIES.COMBINATION),
  createHiragana('hyu', 'ひゅ', 'hyu', SUBCATEGORIES.COMBINATION),
  createHiragana('hyo', 'ひょ', 'hyo', SUBCATEGORIES.COMBINATION),

  // M + y
  createHiragana('mya', 'みゃ', 'mya', SUBCATEGORIES.COMBINATION),
  createHiragana('myu', 'みゅ', 'myu', SUBCATEGORIES.COMBINATION),
  createHiragana('myo', 'みょ', 'myo', SUBCATEGORIES.COMBINATION),

  // R + y
  createHiragana('rya', 'りゃ', 'rya', SUBCATEGORIES.COMBINATION),
  createHiragana('ryu', 'りゅ', 'ryu', SUBCATEGORIES.COMBINATION),
  createHiragana('ryo', 'りょ', 'ryo', SUBCATEGORIES.COMBINATION),

  // G + y
  createHiragana('gya', 'ぎゃ', 'gya', SUBCATEGORIES.COMBINATION),
  createHiragana('gyu', 'ぎゅ', 'gyu', SUBCATEGORIES.COMBINATION),
  createHiragana('gyo', 'ぎょ', 'gyo', SUBCATEGORIES.COMBINATION),

  // J + y
  createHiragana('ja', 'じゃ', ['ja', 'jya', 'zya'], SUBCATEGORIES.COMBINATION),
  createHiragana('ju', 'じゅ', ['ju', 'jyu', 'zyu'], SUBCATEGORIES.COMBINATION),
  createHiragana('jo', 'じょ', ['jo', 'jyo', 'zyo'], SUBCATEGORIES.COMBINATION),

  // B + y
  createHiragana('bya', 'びゃ', 'bya', SUBCATEGORIES.COMBINATION),
  createHiragana('byu', 'びゅ', 'byu', SUBCATEGORIES.COMBINATION),
  createHiragana('byo', 'びょ', 'byo', SUBCATEGORIES.COMBINATION),

  // P + y
  createHiragana('pya', 'ぴゃ', 'pya', SUBCATEGORIES.COMBINATION),
  createHiragana('pyu', 'ぴゅ', 'pyu', SUBCATEGORIES.COMBINATION),
  createHiragana('pyo', 'ぴょ', 'pyo', SUBCATEGORIES.COMBINATION),

  // D + y (rare but included)
  createHiragana('dya', 'ぢゃ', ['ja', 'dya'], SUBCATEGORIES.COMBINATION),
  createHiragana('dyu', 'ぢゅ', ['ju', 'dyu'], SUBCATEGORIES.COMBINATION),
  createHiragana('dyo', 'ぢょ', ['jo', 'dyo'], SUBCATEGORIES.COMBINATION)
];

export const hiragana = [
  ...basicHiragana,
  ...dakutenHiragana,
  ...handakutenHiragana,
  ...combinationHiragana
];
