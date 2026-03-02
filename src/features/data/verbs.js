import { CATEGORIES, SUBCATEGORIES } from './constants';

const createVerb = (id, character, romanji, english, spanish = [], furigana = []) => ({
  id: `v_${id}`,
  character,
  romanji: Array.isArray(romanji) ? romanji : [romanji],
  english: Array.isArray(english) ? english : [english],
  spanish: Array.isArray(spanish) ? spanish : [spanish],
  furigana, // Array of {kanji: string, reading: string}
  category: CATEGORIES.VERBS,
  subcategory: SUBCATEGORIES.BASIC
});

export const verbs = [
  // Essential verbs
  createVerb('taberu', '食べる', 'taberu', ['to eat', 'eat'], ['comer'], [{kanji: '食', reading: 'た'}]),
  createVerb('nomu', '飲む', 'nomu', ['to drink', 'drink'], ['beber', 'tomar'], [{kanji: '飲', reading: 'の'}]),
  createVerb('miru', '見る', 'miru', ['to see', 'to watch', 'see', 'watch'], ['ver', 'mirar'], [{kanji: '見', reading: 'み'}]),
  createVerb('kiku', '聞く', 'kiku', ['to hear', 'to listen', 'hear', 'listen'], ['escuchar', 'oír'], [{kanji: '聞', reading: 'き'}]),
  createVerb('hanasu', '話す', 'hanasu', ['to speak', 'to talk', 'speak', 'talk'], ['hablar'], [{kanji: '話', reading: 'はな'}]),
  createVerb('yomu', '読む', 'yomu', ['to read', 'read'], ['leer'], [{kanji: '読', reading: 'よ'}]),
  createVerb('kaku', '書く', 'kaku', ['to write', 'write'], ['escribir'], [{kanji: '書', reading: 'か'}]),

  // Movement verbs
  createVerb('iku', '行く', 'iku', ['to go', 'go'], ['ir'], [{kanji: '行', reading: 'い'}]),
  createVerb('kuru', '来る', 'kuru', ['to come', 'come'], ['venir'], [{kanji: '来', reading: 'く'}]),
  createVerb('kaeru', '帰る', 'kaeru', ['to return', 'to go home', 'return'], ['volver', 'regresar'], [{kanji: '帰', reading: 'かえ'}]),
  createVerb('aruku', '歩く', 'aruku', ['to walk', 'walk'], ['caminar'], [{kanji: '歩', reading: 'ある'}]),
  createVerb('hashiru', '走る', 'hashiru', ['to run', 'run'], ['correr'], [{kanji: '走', reading: 'はし'}]),
  createVerb('tobu', '飛ぶ', 'tobu', ['to fly', 'to jump', 'fly', 'jump'], ['volar', 'saltar'], [{kanji: '飛', reading: 'と'}]),
  createVerb('oyogu', '泳ぐ', 'oyogu', ['to swim', 'swim'], ['nadar'], [{kanji: '泳', reading: 'およ'}]),
  createVerb('noboru', '登る', 'noboru', ['to climb', 'climb'], ['escalar', 'subir'], [{kanji: '登', reading: 'のぼ'}]),

  // Daily activities
  createVerb('neru', '寝る', 'neru', ['to sleep', 'sleep'], ['dormir'], [{kanji: '寝', reading: 'ね'}]),
  createVerb('okiru', '起きる', 'okiru', ['to wake up', 'wake up'], ['despertar'], [{kanji: '起', reading: 'お'}]),
  createVerb('suwaru', '座る', 'suwaru', ['to sit', 'sit'], ['sentarse'], [{kanji: '座', reading: 'すわ'}]),
  createVerb('tatsu', '立つ', 'tatsu', ['to stand', 'stand'], ['pararse'], [{kanji: '立', reading: 'た'}]),
  createVerb('au', '会う', 'au', ['to meet', 'meet'], ['encontrar'], [{kanji: '会', reading: 'あ'}]),
  createVerb('matsu', '待つ', 'matsu', ['to wait', 'wait'], ['esperar'], [{kanji: '待', reading: 'ま'}]),
  createVerb('kau', '買う', 'kau', ['to buy', 'buy'], ['comprar'], [{kanji: '買', reading: 'か'}]),
  createVerb('uru', '売る', 'uru', ['to sell', 'sell'], ['vender'], [{kanji: '売', reading: 'う'}]),

  // Communication & Learning
  createVerb('oshieru', '教える', 'oshieru', ['to teach', 'teach'], ['enseñar'], [{kanji: '教', reading: 'おし'}]),
  createVerb('narau', '習う', 'narau', ['to learn', 'learn'], ['aprender'], [{kanji: '習', reading: 'なら'}]),
  createVerb('benkyousuru', '勉強する', ['benkyousuru', 'benkyou suru'], ['to study', 'study'], ['estudiar'], [{kanji: '勉強', reading: 'べんきょう'}]),
  createVerb('kangaeru', '考える', 'kangaeru', ['to think', 'think'], ['pensar'], [{kanji: '考', reading: 'かんが'}]),
  createVerb('shiru', '知る', 'shiru', ['to know', 'know'], ['saber', 'conocer'], [{kanji: '知', reading: 'し'}]),
  createVerb('wasueru', '忘れる', 'wasureru', ['to forget', 'forget'], ['olvidar'], [{kanji: '忘', reading: 'わす'}]),
  createVerb('oboeru', '覚える', 'oboeru', ['to remember', 'to memorize', 'remember'], ['recordar', 'memorizar'], [{kanji: '覚', reading: 'おぼ'}]),

  // Work & Activities
  createVerb('hataraku', '働く', 'hataraku', ['to work', 'work'], ['trabajar'], [{kanji: '働', reading: 'はたら'}]),
  createVerb('yasumu', '休む', 'yasumu', ['to rest', 'rest'], ['descansar'], [{kanji: '休', reading: 'やす'}]),
  createVerb('asobu', '遊ぶ', 'asobu', ['to play', 'play'], ['jugar'], [{kanji: '遊', reading: 'あそ'}]),
  createVerb('tsukuru', '作る', 'tsukuru', ['to make', 'to create', 'make'], ['hacer', 'crear'], [{kanji: '作', reading: 'つく'}]),
  createVerb('naosu', '直す', 'naosu', ['to fix', 'to repair', 'fix'], ['arreglar', 'reparar'], [{kanji: '直', reading: 'なお'}]),
  createVerb('akeru', '開ける', 'akeru', ['to open', 'open'], ['abrir'], [{kanji: '開', reading: 'あ'}]),
  createVerb('shimeru', '閉める', 'shimeru', ['to close', 'close'], ['cerrar'], [{kanji: '閉', reading: 'し'}]),

  // Emotions & States
  createVerb('warau', '笑う', 'warau', ['to laugh', 'to smile', 'laugh'], ['reír'], [{kanji: '笑', reading: 'わら'}]),
  createVerb('naku', '泣く', 'naku', ['to cry', 'cry'], ['llorar'], [{kanji: '泣', reading: 'な'}]),
  createVerb('okoru', '怒る', 'okoru', ['to get angry', 'angry'], ['enojarse'], [{kanji: '怒', reading: 'おこ'}]),
  createVerb('yorokobu', '喜ぶ', 'yorokobu', ['to be happy', 'rejoice'], ['alegrarse'], [{kanji: '喜', reading: 'よろこ'}]),

  // Suru verbs (common する compounds)
  createVerb('suru', 'する', 'suru', ['to do', 'do'], ['hacer'], []),
  createVerb('undousuru', '運動する', ['undousuru', 'undou suru'], ['to exercise', 'exercise'], ['hacer ejercicio', 'ejercitar'], [{kanji: '運動', reading: 'うんどう'}]),
  createVerb('ryourisuru', '料理する', ['ryourisuru', 'ryouri suru'], ['to cook', 'cook'], ['cocinar'], [{kanji: '料理', reading: 'りょうり'}]),
  createVerb('soujiusru', '掃除する', ['soujisuru', 'souji suru'], ['to clean', 'clean'], ['limpiar'], [{kanji: '掃除', reading: 'そうじ'}]),
  createVerb('sentakusuru', '洗濯する', ['sentakusuru', 'sentaku suru'], ['to do laundry', 'laundry'], ['lavar ropa'], [{kanji: '洗濯', reading: 'せんたく'}]),
  createVerb('kaimono', '買い物する', ['kaimonosuru', 'kaimono suru'], ['to shop', 'shopping'], ['ir de compras'], [{kanji: '買', reading: 'か'}, {kanji: '物', reading: 'もの'}]),
  createVerb('sanposuru', '散歩する', ['sanposuru', 'sanpo suru'], ['to take a walk', 'walk'], ['pasear', 'caminar'], [{kanji: '散歩', reading: 'さんぽ'}]),

  // Existence verbs
  createVerb('iru', 'いる', 'iru', ['to exist', 'to be', 'exist'], ['estar', 'existir'], []),
  createVerb('aru', 'ある', 'aru', ['to exist', 'to have', 'exist'], ['haber', 'existir'], [])
];
