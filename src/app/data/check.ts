import { chars } from './chars';

// ambiguousDiacritics: {
//   'ʰ': 'h',
//   'ʷ': 'w',
//   'ʲ': 'j',
//   'ˠ': 'ɣ'
// },
// suprasegmentals: ['ː','ˑ','|','‖','‿'],
const vowels = ['i','y','ɨ','ʉ','ɯ','u','ɪ','ʏ','ʊ','e','ø','ɘ','ɵ','ɤ','o','ə','ɛ','œ','ɜ','ɞ','ʌ','ɔ','æ','ɐ','a','ɶ','ɑ','ɒ'];
const vowelsSuperscript = ['ⁱ','ʸ','ᶤ','ᶶ','ᵚ','ᵘ','ᶦ','','ᶷ','ᵉ','','','ᶱ','','ᵒ','ᵊ','ᵋ','','ᶟ','','ᶺ','ᵓ','','ᵄ','ᵃ','','ᵅ','ᶛ'];
const consonants = ['p','b','t','d','ʈ','ɖ','c','ɟ','k','ɡ','q','ɢ','ʔ','m','ɱ','n','ɳ','ɲ','ŋ','ɴ','ʙ','r','ʀ','ɾ','ɽ','ɸ','β','f','v','θ','ð','s','z','ʃ','ʒ','ʂ','ʐ','ç','ʝ','x','ɣ','χ','ʁ','ħ','ʕ','h','ɦ','ɬ','ɮ','ʋ','ɹ','ɻ','j','ɰ','l','ɭ','ʎ','ʟ','ɓ','ɗ','ʄ','ɠ','ʛ','ʍ','w','ɥ','ɕ','ʑ','ɧ','ɺ','ʡ','ʜ','ʢ'];
const clicks = ['ʘ','ǀ','ǃ','ǂ','ǁ'];
const diacritics = ['ʰ','ʷ','ʲ','ˠ','ˤ','ˡ','̃','̃','ʽ','ʼ','̚','̩','̯','̰','̥','̬','̤','̪','̺','̻','̼','͡','̟','̠','̝','̞','̘','̙','̹','̜', 'ː','ˑ'];
const featureChangingDiacritics = {
    'ʰ': 'SG',
    'ʼ': 'CG',
    '̯': 'dist'
};
const length = ['ː','ˑ'];
const stress = ['ˈ','ˌ'];
const intonation = ['↗','↘','',''];
const tones = ['̋','́','̄','̀','̏','̂','̌','˩','˨','˧','˦','˥','⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹'];
const preDiacritics = ['ᵐ','ᶬ','ᶮ','ᶯ','ⁿ','ᵑ','ˀ'];
const ambiguousPreDiacritics = {
    'ⁿ': 'n',
    'ᵐ': 'm',
    'ᵑ': 'ŋ'
};
const groups: string[] = [
    'pbɸβfv',
    'ɸβw',
    'θðtd',
    'tʈdɖ',
    'θðsz',
    'szʃʒ',
    'ʃʒçʝj',
    'ckqɟgɢçʝxɣχʁ',
    'kqʔ',
    'çʝxɣχʁh',
    'xɣw',
    'mɱnɲŋɴ',
    'wm',
    'lrɾ',
    'rɾʀ',
    'iɪyɨɯ',
    'yɨɯuʊ',
    'iɪyeɛø',
    'ɯuʊɤoɔ',
    'eɛøəʌɤ',
    'øəʌɤoɔ',
    'æɑ',
    'ʌɑ',
    'ɔɑ'
]

export const check = {
    isPreDiacritic: char => preDiacritics.includes(char),
    isLength: char => length.includes(char),
    isTone: char => tones.includes(char),
    isStress: char => stress.includes(char),
    isIntonation: char => intonation.includes(char),
    isSyllableBreak: char => char === '.',
    isChar: char => char in chars,
    isDiacritic: char => diacritics.includes(char),
    getDefinition: char => chars[char],
    isPhoneticallySimilar: (c1, c2) => {
        let i = 0, len = groups.length;
        let group;
        for (; i < len; i++) {
            group = groups[i];
            if (group.includes(c1) && group.includes(c2)) {
                return true;
            }
        }
        return false;
    }
};

