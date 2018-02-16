import { Ambiguity, AmbiguityGroup } from '../models/ambiguity';
import { Segmental } from '../models/segmental';

const overlap = (str1, str2) => {
    let k;
    for (k in str1) {
        if (str2.indexOf(str1[k]) !== -1) {
            return true;
        }
    }
    return false;
}

const map1 = {
    'i': 'ʲ',
    'j': 'ʲ',
    'w': 'ʷ',
    'u': 'ʷ'
}

const map2 = {
    'ʲ': 'j',
    'ʷ': 'w',
}

export const ambiguities: AmbiguityGroup[] = [
    new AmbiguityGroup([
        new Ambiguity(
            'any contoid + unstressed high vocoid or glide',
            (s1: Segmental, s2: Segmental) => s1.type === 'C' && !s2.cons && s2.high && s2.ATR,
            (s1: Segmental, s2: Segmental) => s1.readable + s2.pre + map1[s2.normalChars] + s2.post
        ),
        new Ambiguity(
            'labialized or palatalized consonant',
            (s: Segmental) => overlap(s.post, 'ʷʲ'),
            (s: Segmental) => true
        )
    ]),
    new AmbiguityGroup([
        new Ambiguity(
            'sequence of vocoids',
            (s1: Segmental, s2: Segmental) => s1.type === 'V' && s2.type === 'V',
            (s1: Segmental, s2: Segmental) => s1.readable + '͡' + s2.readable
        ),
        new Ambiguity(
            'vocoid glide (diphthong)',
            (s: Segmental) => overlap(s.post, 'ⁱʸᶤᶶᵚᵘᶦᶷᵉᶱᵒᵊᵋᶟᶺᵓᵄᵃᵅᶛ') || (s.affricate && s.type === 'V'),
            (s: Segmental) => s.affricate ? s.readable.replace(/͡/g, '') : true
        )
    ]),
    new AmbiguityGroup([
        new Ambiguity(
            'stop + homorganic fricative',
            (s1: Segmental, s2: Segmental) => s1.stop && s2.fricative && s1.homorganic(s2),
            (s1: Segmental, s2: Segmental) => {
                let str = s1.normalChars + '͡' + s2.normalChars;
                if (s2.pre) {
                    str = s2.pre + str;
                }
                if (s1.pre) {
                    str = s1.pre + str;
                }
                if (s1.post) {
                    str += s1.post;
                }
                if (s2.post) {
                    str += s2.post;
                }
                return str;
            }
        ),
        new Ambiguity(
            'homorganic affricate',
            (s: Segmental) => s.affricate,
            (s: Segmental) => s.readable.replace(/͡/g, '')
        )
    ])
]