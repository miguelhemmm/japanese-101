import { CATEGORIES, SUBCATEGORIES } from './constants';

const createKatakana = (id, character, romanji, subcategory = SUBCATEGORIES.BASIC) => ({
  id: `k_${id}`,
  character,
  romanji: Array.isArray(romanji) ? romanji : [romanji],
  english: [],
  category: CATEGORIES.KATAKANA,
  subcategory
});

// Basic Katakana (46 characters)
const basicKatakana = [
  // Vowels
  createKatakana('a', 'ア', 'a'),
  createKatakana('i', 'イ', 'i'),
  createKatakana('u', 'ウ', 'u'),
  createKatakana('e', 'エ', 'e'),
  createKatakana('o', 'オ', 'o'),

  // K-row
  createKatakana('ka', 'カ', 'ka'),
  createKatakana('ki', 'キ', 'ki'),
  createKatakana('ku', 'ク', 'ku'),
  createKatakana('ke', 'ケ', 'ke'),
  createKatakana('ko', 'コ', 'ko'),

  // S-row
  createKatakana('sa', 'サ', 'sa'),
  createKatakana('shi', 'シ', ['shi', 'si']),
  createKatakana('su', 'ス', 'su'),
  createKatakana('se', 'セ', 'se'),
  createKatakana('so', 'ソ', 'so'),

  // T-row
  createKatakana('ta', 'タ', 'ta'),
  createKatakana('chi', 'チ', ['chi', 'ti']),
  createKatakana('tsu', 'ツ', ['tsu', 'tu']),
  createKatakana('te', 'テ', 'te'),
  createKatakana('to', 'ト', 'to'),

  // N-row
  createKatakana('na', 'ナ', 'na'),
  createKatakana('ni', 'ニ', 'ni'),
  createKatakana('nu', 'ヌ', 'nu'),
  createKatakana('ne', 'ネ', 'ne'),
  createKatakana('no', 'ノ', 'no'),

  // H-row
  createKatakana('ha', 'ハ', 'ha'),
  createKatakana('hi', 'ヒ', 'hi'),
  createKatakana('fu', 'フ', ['fu', 'hu']),
  createKatakana('he', 'ヘ', 'he'),
  createKatakana('ho', 'ホ', 'ho'),

  // M-row
  createKatakana('ma', 'マ', 'ma'),
  createKatakana('mi', 'ミ', 'mi'),
  createKatakana('mu', 'ム', 'mu'),
  createKatakana('me', 'メ', 'me'),
  createKatakana('mo', 'モ', 'mo'),

  // Y-row
  createKatakana('ya', 'ヤ', 'ya'),
  createKatakana('yu', 'ユ', 'yu'),
  createKatakana('yo', 'ヨ', 'yo'),

  // R-row
  createKatakana('ra', 'ラ', 'ra'),
  createKatakana('ri', 'リ', 'ri'),
  createKatakana('ru', 'ル', 'ru'),
  createKatakana('re', 'レ', 're'),
  createKatakana('ro', 'ロ', 'ro'),

  // W-row
  createKatakana('wa', 'ワ', 'wa'),
  createKatakana('wo', 'ヲ', ['wo', 'o']),

  // N
  createKatakana('n', 'ン', 'n')
];

// Dakuten (voiced) - 20 characters
const dakutenKatakana = [
  // G-row
  createKatakana('ga', 'ガ', 'ga', SUBCATEGORIES.DAKUTEN),
  createKatakana('gi', 'ギ', 'gi', SUBCATEGORIES.DAKUTEN),
  createKatakana('gu', 'グ', 'gu', SUBCATEGORIES.DAKUTEN),
  createKatakana('ge', 'ゲ', 'ge', SUBCATEGORIES.DAKUTEN),
  createKatakana('go', 'ゴ', 'go', SUBCATEGORIES.DAKUTEN),

  // Z-row
  createKatakana('za', 'ザ', 'za', SUBCATEGORIES.DAKUTEN),
  createKatakana('ji', 'ジ', ['ji', 'zi'], SUBCATEGORIES.DAKUTEN),
  createKatakana('zu', 'ズ', 'zu', SUBCATEGORIES.DAKUTEN),
  createKatakana('ze', 'ゼ', 'ze', SUBCATEGORIES.DAKUTEN),
  createKatakana('zo', 'ゾ', 'zo', SUBCATEGORIES.DAKUTEN),

  // D-row
  createKatakana('da', 'ダ', 'da', SUBCATEGORIES.DAKUTEN),
  createKatakana('di', 'ヂ', ['ji', 'di', 'zi'], SUBCATEGORIES.DAKUTEN),
  createKatakana('du', 'ヅ', ['zu', 'du', 'dzu'], SUBCATEGORIES.DAKUTEN),
  createKatakana('de', 'デ', 'de', SUBCATEGORIES.DAKUTEN),
  createKatakana('do', 'ド', 'do', SUBCATEGORIES.DAKUTEN),

  // B-row
  createKatakana('ba', 'バ', 'ba', SUBCATEGORIES.DAKUTEN),
  createKatakana('bi', 'ビ', 'bi', SUBCATEGORIES.DAKUTEN),
  createKatakana('bu', 'ブ', 'bu', SUBCATEGORIES.DAKUTEN),
  createKatakana('be', 'ベ', 'be', SUBCATEGORIES.DAKUTEN),
  createKatakana('bo', 'ボ', 'bo', SUBCATEGORIES.DAKUTEN)
];

// Handakuten (p-sounds) - 5 characters
const handakutenKatakana = [
  createKatakana('pa', 'パ', 'pa', SUBCATEGORIES.HANDAKUTEN),
  createKatakana('pi', 'ピ', 'pi', SUBCATEGORIES.HANDAKUTEN),
  createKatakana('pu', 'プ', 'pu', SUBCATEGORIES.HANDAKUTEN),
  createKatakana('pe', 'ペ', 'pe', SUBCATEGORIES.HANDAKUTEN),
  createKatakana('po', 'ポ', 'po', SUBCATEGORIES.HANDAKUTEN)
];

// Combination characters (youon) - 36 characters
const combinationKatakana = [
  // K + y
  createKatakana('kya', 'キャ', 'kya', SUBCATEGORIES.COMBINATION),
  createKatakana('kyu', 'キュ', 'kyu', SUBCATEGORIES.COMBINATION),
  createKatakana('kyo', 'キョ', 'kyo', SUBCATEGORIES.COMBINATION),

  // S + y
  createKatakana('sha', 'シャ', ['sha', 'sya'], SUBCATEGORIES.COMBINATION),
  createKatakana('shu', 'シュ', ['shu', 'syu'], SUBCATEGORIES.COMBINATION),
  createKatakana('sho', 'ショ', ['sho', 'syo'], SUBCATEGORIES.COMBINATION),

  // C + y
  createKatakana('cha', 'チャ', ['cha', 'tya'], SUBCATEGORIES.COMBINATION),
  createKatakana('chu', 'チュ', ['chu', 'tyu'], SUBCATEGORIES.COMBINATION),
  createKatakana('cho', 'チョ', ['cho', 'tyo'], SUBCATEGORIES.COMBINATION),

  // N + y
  createKatakana('nya', 'ニャ', 'nya', SUBCATEGORIES.COMBINATION),
  createKatakana('nyu', 'ニュ', 'nyu', SUBCATEGORIES.COMBINATION),
  createKatakana('nyo', 'ニョ', 'nyo', SUBCATEGORIES.COMBINATION),

  // H + y
  createKatakana('hya', 'ヒャ', 'hya', SUBCATEGORIES.COMBINATION),
  createKatakana('hyu', 'ヒュ', 'hyu', SUBCATEGORIES.COMBINATION),
  createKatakana('hyo', 'ヒョ', 'hyo', SUBCATEGORIES.COMBINATION),

  // M + y
  createKatakana('mya', 'ミャ', 'mya', SUBCATEGORIES.COMBINATION),
  createKatakana('myu', 'ミュ', 'myu', SUBCATEGORIES.COMBINATION),
  createKatakana('myo', 'ミョ', 'myo', SUBCATEGORIES.COMBINATION),

  // R + y
  createKatakana('rya', 'リャ', 'rya', SUBCATEGORIES.COMBINATION),
  createKatakana('ryu', 'リュ', 'ryu', SUBCATEGORIES.COMBINATION),
  createKatakana('ryo', 'リョ', 'ryo', SUBCATEGORIES.COMBINATION),

  // G + y
  createKatakana('gya', 'ギャ', 'gya', SUBCATEGORIES.COMBINATION),
  createKatakana('gyu', 'ギュ', 'gyu', SUBCATEGORIES.COMBINATION),
  createKatakana('gyo', 'ギョ', 'gyo', SUBCATEGORIES.COMBINATION),

  // J + y
  createKatakana('ja', 'ジャ', ['ja', 'jya', 'zya'], SUBCATEGORIES.COMBINATION),
  createKatakana('ju', 'ジュ', ['ju', 'jyu', 'zyu'], SUBCATEGORIES.COMBINATION),
  createKatakana('jo', 'ジョ', ['jo', 'jyo', 'zyo'], SUBCATEGORIES.COMBINATION),

  // B + y
  createKatakana('bya', 'ビャ', 'bya', SUBCATEGORIES.COMBINATION),
  createKatakana('byu', 'ビュ', 'byu', SUBCATEGORIES.COMBINATION),
  createKatakana('byo', 'ビョ', 'byo', SUBCATEGORIES.COMBINATION),

  // P + y
  createKatakana('pya', 'ピャ', 'pya', SUBCATEGORIES.COMBINATION),
  createKatakana('pyu', 'ピュ', 'pyu', SUBCATEGORIES.COMBINATION),
  createKatakana('pyo', 'ピョ', 'pyo', SUBCATEGORIES.COMBINATION),

  // D + y (rare but included)
  createKatakana('dya', 'ヂャ', ['ja', 'dya'], SUBCATEGORIES.COMBINATION),
  createKatakana('dyu', 'ヂュ', ['ju', 'dyu'], SUBCATEGORIES.COMBINATION),
  createKatakana('dyo', 'ヂョ', ['jo', 'dyo'], SUBCATEGORIES.COMBINATION)
];

export const katakana = [
  ...basicKatakana,
  ...dakutenKatakana,
  ...handakutenKatakana,
  ...combinationKatakana
];
