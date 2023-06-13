const IDOLS = [
  {
    image: 'haruka',
    name: '春香',
  },
  {
    image: 'chihaya',
    name: '千早',
  },
  {
    image: 'miki',
    name: '美希',
  },
  {
    image: 'yukiho',
    name: '雪歩',
  },
  {
    image: 'yayoi',
    name: 'やよい',
  },
  {
    image: 'makoto',
    name: '真',
  },
  {
    image: 'iori',
    name: '伊織',
  },
  {
    image: 'takane',
    name: '貴音',
  },
  {
    image: 'ritsuko',
    name: '律子',
  },
  {
    image: 'azusa',
    name: 'あずさ',
  },
  {
    image: 'ami',
    name: '亜美',
  },
  {
    image: 'mami',
    name: '真美',
  },
  {
    image: 'hibiki',
    name: '響',
  },
  {
    image: 'mirai',
    name: '未来',
  },
  {
    image: 'shizuka',
    name: '静香',
  },
  {
    image: 'tsubasa',
    name: '翼',
  },
  {
    image: 'kotoha',
    name: '琴葉',
  },
  {
    image: 'elena',
    name: 'エレナ',
  },
  {
    image: 'minako',
    name: '美奈子',
  },
  {
    image: 'megumi',
    name: '恵美',
  },
  {
    image: 'matsuri',
    name: 'まつり',
  },
  {
    image: 'serika',
    name: '星梨花',
  },
  {
    image: 'akane',
    name: '茜',
  },
  {
    image: 'anna',
    name: '杏奈',
  },
  {
    image: 'roco',
    name: 'ロコ',
  },
  {
    image: 'yuriko',
    name: '百合子',
  },
  {
    image: 'sayoko',
    name: '紗代子',
  },
  {
    image: 'arisa',
    name: '亜利沙',
  },
  {
    image: 'umi',
    name: '海美',
  },
  {
    image: 'iku',
    name: '育',
  },
  {
    image: 'tomoka',
    name: '朋花',
  },
  {
    image: 'emily',
    name: 'エミリー',
  },
  {
    image: 'shiho',
    name: '志保',
  },
  {
    image: 'ayumu',
    name: '歩',
  },
  {
    image: 'hinata',
    name: 'ひなた',
  },
  {
    image: 'kana',
    name: '可奈',
  },
  {
    image: 'nao',
    name: '奈緒',
  },
  {
    image: 'chizuru',

    name: '千鶴',
  },
  {
    image: 'konomi',
    name: 'このみ',
  },
  {
    image: 'tamaki',
    name: '環',
  },
  {
    image: 'fuka',
    name: '風花',
  },
  {
    image: 'miya',
    name: '美也',
  },
  {
    image: 'noriko',
    name: 'のり子',
  },
  {
    image: 'mizuki',
    name: '瑞希',
  },
  {
    image: 'karen',
    name: '可憐',
  },
  {
    image: 'rio',
    name: '莉緒',
  },
  {
    image: 'subaru',
    name: '昴',
  },
  {
    image: 'reika',
    name: '麗花',
  },
  {
    image: 'momoko',
    name: '桃子',
  },
  {
    image: 'julia',
    name: 'ジュリア',
  },
  {
    image: 'tsumugi',
    name: '紬',
  },
  {
    image: 'kaori',
    name: '歌織',
  },
  {
    image: 'kotori',
    name: '小鳥',
  },
  {
    image: 'misaki',
    name: '美咲',
  },
  {
    image: 'producer',
    name: 'プロデューサー',
  },
  {
    image: 'takagi',
    name: '社長',
  },
  {
    image: 'sora',
    name: 'そら',
  },
  {
    image: 'sika',
    name: '詩花',
  },
  {
    image: 'leon',
    name: '玲音',
  },
  {
    image: 'kuroi',
    name: '黒井社長',
  },
];

const baseURL =
  'https://raw.githubusercontent.com/tankarup/ML-4koma-viewer/main/icons/';

export const IDOLS_DATA = IDOLS.map((idol) => ({
  ...idol,
  image: `${baseURL}${idol.image}.jpg`,
}));
