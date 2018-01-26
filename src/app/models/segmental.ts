import { AbstractSegmental } from './abstract-segmental';
import { check } from '../data/check';

export class Segmental extends AbstractSegmental {
    pre: string;
    mid: string;
    post: string;

    // features
    type: string;
    voice: boolean;
    SG: boolean;
    CG: boolean;
    son: boolean;
    cons: boolean;
    cont: boolean;
    nasal: boolean;
    labial: boolean;
    round: boolean;
    coronal: boolean;
    lateral: boolean;
    ant: boolean;
    strident: boolean;
    dist: boolean;
    dorsal: boolean;
    high: boolean;
    low: boolean;
    back: boolean;
    tongue_root: boolean;
    ATR: boolean;
    RTR: boolean;

    constructor (char) {
        super(char);
        this.parse(char);
    }

    parse (char: string): void {
        let pre = '',
            mid,
            post = '',
            first, second, isAffricate;
        let i = 0;
        let curr = char[i];
        while (curr && check.isPreDiacritic(curr)) {
            pre += curr;
            curr = char[++i];
        }
        if (check.isChar(curr)) {
            first = check.getDefinition(curr);
            curr = char[++i];
        }
        while (curr && check.isDiacritic(curr)) {
            post += curr;
            if (curr === '͡') {
                isAffricate = true;
            }
            curr = char[++i];
        }
        if (isAffricate) {
            mid = post;
            post = '';
            if (check.isChar(curr)) {
                second = check.getDefinition(curr);
                curr = char[++i];
            }
            while (curr && check.isDiacritic(curr)) {
                post += curr;
                curr = char[++i];
            }
        }
        this.pre = pre;
        this.mid = mid;
        this.post = post;
        Object.assign(this, first, second);
    }

    homorganic(seg: Segmental): boolean {
        return (this.labial && seg.labial)
            || (this.coronal && seg.coronal)
            || (this.dorsal && seg.dorsal)
    }

    fillEnvironment (environment: any): void {
        if (environment.empty) {
            delete environment.empty;
            if (this.voice !== undefined) environment.voice = this.voice;
            if (this.SG !== undefined) environment.SG = this.SG;
            if (this.CG !== undefined) environment.CG = this.CG;
            if (this.son !== undefined) environment.son = this.son;
            if (this.cons !== undefined) environment.cons = this.cons;
            if (this.cont !== undefined) environment.cont = this.cont;
            if (this.nasal !== undefined) environment.nasal = this.nasal;
            if (this.labial !== undefined) environment.labial = this.labial;
            if (this.round !== undefined) environment.round = this.round;
            if (this.coronal !== undefined) environment.coronal = this.coronal;
            if (this.lateral !== undefined) environment.lateral = this.lateral;
            if (this.ant !== undefined) environment.ant = this.ant;
            if (this.strident !== undefined) environment.strident = this.strident;
            if (this.dist !== undefined) environment.dist = this.dist;
            if (this.dorsal !== undefined) environment.dorsal = this.dorsal;
            if (this.high !== undefined) environment.high = this.high;
            if (this.low !== undefined) environment.low = this.low;
            if (this.back !== undefined) environment.back = this.back;
            if (this.tongue_root !== undefined) environment.tongue_root = this.tongue_root;
            if (this.ATR !== undefined) environment.ATR = this.ATR;
            if (this.RTR !== undefined) environment.RTR = this.RTR;
        } else {
            this.check('voice', environment);
            this.check('SG', environment);
            this.check('CG', environment);
            this.check('son', environment);
            this.check('cons', environment);
            this.check('cont', environment);
            this.check('nasal', environment);
            this.check('round', environment);
            this.check('lateral', environment);
            this.check('ant', environment);
            this.check('strident', environment);
            this.check('dist', environment);
            this.check('high', environment);
            this.check('low', environment);
            this.check('back', environment);
            this.check('tongue_root', environment);
            this.check('ATR', environment);
            this.check('RTR', environment);
            if (this.labial) environment.labial = true;
            if (this.coronal) environment.coronal = true;
            if (this.dorsal) environment.dorsal = true;
        }
    }

    check (field: string, environment: any): void {
        if (!(this[field] === environment[field])) delete environment[field];
    }

    // get readable() {
    //     let { char, pre, post } = this;
    //     if (pre) {
    //         char = pre + char;
    //     }
    //     if (post) {
    //         char += post;
    //     }
    //     return char;
    // }
}
