import { Word } from './word';
import { Segmental } from './segmental';
import { ambiguities } from '../data/ambiguities';

export class AmbiguousWord {
    word: Word;
    ambiguity: Ambiguity;
    switched: boolean = false;
    index: number;
    constructor (word: Word, ambiguity: Ambiguity, index: number) {
        this.word = word;
        this.ambiguity = ambiguity;
        this.index = index;
    }

    getFixed (): string {
        let { word, ambiguity, index } = this;
        let length = ambiguity.length;
        let segments = word.segments;
        let i = 0, len = segments.length;
        let segmentIndex = 0;
        let args = [];
        let segmentsToCollect;
        let segment;
        let pre = '', post = '';
        for (; i < len; i++) {
            segment = segments[i];
            if (segment instanceof Segmental) {
                if (segmentIndex === index) {
                    segmentsToCollect = length;
                }
                if (segmentsToCollect) {
                    args.push(segment);
                    --segmentsToCollect;
                } else if (segmentsToCollect === 0) {
                    post += segment.readable;
                } else {
                    pre += segment.readable;
                }
                ++segmentIndex;
            } else {
                if (segmentsToCollect === 0) {
                    post += segment.readable;
                } else {
                    pre += segment.readable;
                }
            }
        }
        return pre + ambiguity.fix.apply(ambiguity, args) + post;
        // let preSegments = segments.slice(0, index);
        // let mainSegments = segments.slice(index, index + length);
        // let postSegments = segments.slice(index + length);
        // let i = 0, len = mainSegments.length;
        // let args = [];
        // for (; i < len; i++) {
        //     args.push(mainSegments[i]);
        // }
        // return preSegments.join('') + ambiguity.fix.apply(ambiguity, args) + postSegments.join('');
    }
}

export class Ambiguity {
    name: string;
    check: Function;
    fix: Function;
    constructor (name: string, check: Function, fix: Function) {
        this.name = name;
        this.check = check;
        this.fix = fix;
    }

    get length () {return this.check.length}

    processWord (word: Word): AmbiguousWord[] {
        let length = this.length;
        let segments = word.normalSegments;
        let ambiguities = [];
        let i = 0, len = segments.length;
        let j, args;
        for (; i < len - length + 1; i++) {
            args = [];
            for (j = 0; j < length; j++) {
                args.push(segments[i + j]);
            }
            if (this.check.apply(this, args)) {
                ambiguities.push(new AmbiguousWord(word, this, i));
            }
        }
        return ambiguities.length ? ambiguities : null;
    }
}

export class AmbiguityGroup {
    ambiguities: Ambiguity[];
    ambiguousWords: AmbiguousWord[][];
    constructor (ambiguities: Ambiguity[]) {
        this.ambiguities = ambiguities;
        this.ambiguousWords = ambiguities.map(() => []);
    }

    checkWord (word: Word): void {
        this.ambiguities.forEach((ambiguity, i) => {
            let ambiguousWords = ambiguity.processWord(word);
            if (ambiguousWords) {
                this.ambiguousWords[i] = this.ambiguousWords[i].concat(ambiguousWords);
            }
        })
    }

    resolve (): void {
        this.ambiguousWords.forEach(ambiguousWordArray => ambiguousWordArray.forEach(ambiguousWord => {
            if (ambiguousWord.switched) {
                let word = ambiguousWord.word;
                word.parse(ambiguousWord.getFixed());
            }
        }))
    }

    get inconsistent () {
        let numAmbs = 0;
        this.ambiguousWords.forEach(wordList => wordList.length ? ++numAmbs : 0);
        return numAmbs > 1;
    }
}
