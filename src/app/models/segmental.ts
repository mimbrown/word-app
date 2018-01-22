import { AbstractSegmental } from './abstract-segmental';

export class Segmental extends AbstractSegmental {
    pre: string;
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

    constructor (char, definition) {
        super(char);
        Object.assign(this, definition);
    }

    homorganic(seg: Segmental): boolean {
        return (this.labial && seg.labial)
            || (this.coronal && seg.coronal)
            || (this.dorsal && seg.dorsal)
    }

    prepend(str: string): void {
        this.pre = str;
    }

    append(str: string): void {
        this.post = str;
    }

    get readable() {
        let { char, pre, post } = this;
        if (pre) {
            char = pre + char;
        }
        if (post) {
            char += post;
        }
        return char;
    }
}
