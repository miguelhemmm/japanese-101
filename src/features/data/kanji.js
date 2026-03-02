import { CATEGORIES, SUBCATEGORIES } from './constants';

const createKanji = (id, character, romanji, english, spanish = [], furigana = '') => ({
  id: `kj_${id}`,
  character,
  romanji: Array.isArray(romanji) ? romanji : [romanji],
  english: Array.isArray(english) ? english : [english],
  spanish: Array.isArray(spanish) ? spanish : [spanish],
  furigana, // Single hiragana reading string
  category: CATEGORIES.KANJI,
  subcategory: SUBCATEGORIES.BASIC
});

export const kanji = [
  // Numbers
  createKanji('one', '一', ['ichi', 'hito'], ['one', '1'], ['uno'], 'いち'),
  createKanji('two', '二', ['ni', 'futa'], ['two', '2'], ['dos'], 'に'),
  createKanji('three', '三', ['san', 'mi'], ['three', '3'], ['tres'], 'さん'),
  createKanji('four', '四', ['shi', 'yon'], ['four', '4'], ['cuatro'], 'よん'),
  createKanji('five', '五', ['go', 'itsu'], ['five', '5'], ['cinco'], 'ご'),
  createKanji('six', '六', ['roku', 'mu'], ['six', '6'], ['seis'], 'ろく'),
  createKanji('seven', '七', ['shichi', 'nana'], ['seven', '7'], ['siete'], 'なな'),
  createKanji('eight', '八', ['hachi', 'ya'], ['eight', '8'], ['ocho'], 'はち'),
  createKanji('nine', '九', ['ku', 'kyuu', 'kokono'], ['nine', '9'], ['nueve'], 'きゅう'),
  createKanji('ten', '十', ['juu', 'to'], ['ten', '10'], ['diez'], 'じゅう'),

  // Time/Calendar
  createKanji('day', '日', ['hi', 'nichi', 'ka'], ['day', 'sun'], ['día', 'sol'], 'ひ'),
  createKanji('month', '月', ['tsuki', 'getsu', 'gatsu'], ['month', 'moon'], ['mes', 'luna'], 'つき'),
  createKanji('year', '年', ['toshi', 'nen'], ['year'], ['año'], 'とし'),
  createKanji('time', '時', ['toki', 'ji'], ['time', 'hour'], ['tiempo', 'hora'], 'とき'),
  createKanji('now', '今', ['ima', 'kon'], ['now', 'present'], ['ahora'], 'いま'),

  // People
  createKanji('person', '人', ['hito', 'jin', 'nin'], ['person', 'people'], ['persona', 'gente'], 'ひと'),
  createKanji('woman', '女', ['onna', 'jo'], ['woman', 'female'], ['mujer'], 'おんな'),
  createKanji('man', '男', ['otoko', 'dan', 'nan'], ['man', 'male'], ['hombre'], 'おとこ'),
  createKanji('child', '子', ['ko', 'shi'], ['child', 'kid'], ['niño'], 'こ'),
  createKanji('mother', '母', ['haha', 'bo'], ['mother', 'mom'], ['madre', 'mamá'], 'はは'),
  createKanji('father', '父', ['chichi', 'fu'], ['father', 'dad'], ['padre', 'papá'], 'ちち'),

  // Nature
  createKanji('water', '水', ['mizu', 'sui'], ['water'], ['agua'], 'みず'),
  createKanji('fire', '火', ['hi', 'ka'], ['fire'], ['fuego'], 'ひ'),
  createKanji('tree', '木', ['ki', 'moku', 'boku'], ['tree', 'wood'], ['árbol', 'madera'], 'き'),
  createKanji('mountain', '山', ['yama', 'san'], ['mountain'], ['montaña'], 'やま'),
  createKanji('river', '川', ['kawa', 'sen'], ['river'], ['río'], 'かわ'),
  createKanji('rain', '雨', ['ame', 'u'], ['rain'], ['lluvia'], 'あめ'),
  createKanji('sky', '空', ['sora', 'kuu'], ['sky', 'empty'], ['cielo'], 'そら'),
  createKanji('flower', '花', ['hana', 'ka'], ['flower'], ['flor'], 'はな'),

  // Basic Concepts
  createKanji('big', '大', ['oo', 'dai', 'tai'], ['big', 'large'], ['grande'], 'おお'),
  createKanji('small', '小', ['chiisai', 'ko', 'shou'], ['small', 'little'], ['pequeño'], 'ちいさい'),
  createKanji('up', '上', ['ue', 'jou'], ['up', 'above'], ['arriba'], 'うえ'),
  createKanji('down', '下', ['shita', 'ka', 'ge'], ['down', 'below'], ['abajo'], 'した'),
  createKanji('middle', '中', ['naka', 'chuu'], ['middle', 'inside'], ['medio', 'dentro'], 'なか'),
  createKanji('new', '新', ['atarashii', 'shin'], ['new'], ['nuevo'], 'あたらしい'),
  createKanji('old', '古', ['furui', 'ko'], ['old'], ['viejo', 'antiguo'], 'ふるい'),
  createKanji('long', '長', ['nagai', 'chou'], ['long'], ['largo'], 'ながい'),
  createKanji('white', '白', ['shiro', 'haku', 'byaku'], ['white'], ['blanco'], 'しろ'),
  createKanji('black', '黒', ['kuro', 'koku'], ['black'], ['negro'], 'くろ'),
  createKanji('red', '赤', ['aka', 'seki'], ['red'], ['rojo'], 'あか'),
  createKanji('blue', '青', ['ao', 'sei'], ['blue', 'green'], ['azul'], 'あお'),

  // Actions/States
  createKanji('eat', '食', ['taberu', 'shoku'], ['eat', 'food'], ['comer', 'comida'], 'た'),
  createKanji('drink', '飲', ['nomu', 'in'], ['drink'], ['beber'], 'の'),
  createKanji('see', '見', ['miru', 'ken'], ['see', 'look'], ['ver'], 'み'),
  createKanji('hear', '聞', ['kiku', 'bun', 'mon'], ['hear', 'listen'], ['escuchar'], 'き'),
  createKanji('speak', '話', ['hanasu', 'wa'], ['speak', 'talk'], ['hablar'], 'はな'),
  createKanji('read', '読', ['yomu', 'doku'], ['read'], ['leer'], 'よ'),
  createKanji('write', '書', ['kaku', 'sho'], ['write'], ['escribir'], 'か'),
  createKanji('go', '行', ['iku', 'kou', 'gyou'], ['go'], ['ir'], 'い'),
  createKanji('come', '来', ['kuru', 'rai'], ['come'], ['venir'], 'く')
];
