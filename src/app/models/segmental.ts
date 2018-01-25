import { AbstractSegmental } from './abstract-segmental';
import { check } from '../data/check';

export class Segmental extends AbstractSegmental {
    pre: string;
    mid: string;
    post: string;

    // features
    voice: boolean;
    SG: boolean;
    CG: boolean;
    son: boolean;
    cons: boolean;
    cont: boolean;
    nasal: boolean;
    labial: boolean;
    coronal: boolean;
    strident: boolean;
    ant: boolean;
    dist: boolean;
    lateral: boolean;
    dorsal: boolean;
    pharyngeal: boolean;
    del_rel: boolean;

    constructor (char) {
        super(char);
        // Object.assign(this, definition);
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
        
        // let diacritics, char, next;
        // if (isPre) {
        //     diacritics = word[i];
        //     next = word[++i];
        //     while (!check.isChar(next)) {
        //     diacritics += next;
        //     next = word[++i];
        //     }
        // }
        // char = word[i];
        // // char = new Segmental(char, check.getDefinition(char));
        // if (diacritics) {
        //     char.prepend(diacritics);
        // }
        // next = word[++i];
        // diacritics = '';
        // while (check.isDiacritic(next)) {
        //     diacritics += next;
        //     next = word[++i];
        // }
        // if (diacritics) {
        //     char.append(diacritics);
        // }
        // this.segments.push(char);
        // return i-1;
    }

    homorganic(seg: Segmental): boolean {
        return (this.labial && seg.labial)
            || (this.coronal && seg.coronal)
            || (this.dorsal && seg.dorsal)
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
