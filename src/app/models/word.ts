import { AbstractSegmental } from './abstract-segmental';
import { Segmental } from './segmental';
import { Suprasegmental } from './suprasegmental';
import { Tone } from './tone';
import { check } from '../data/check';
import { inventory } from '../data/inventory';

export class Word {
  segments: AbstractSegmental[];
  oldWord: string;
  breaks: number[] = [];

  constructor (word: string) {
    this.parse(word);
  }

  parse (word) {
    let { segments, oldWord } = this;
    if (segments) {
      segments.forEach(segment => segment instanceof Segmental && inventory.removeSegment(segment));
      if (oldWord) {
        if (word === oldWord) {
          delete this.oldWord;
        }
      } else {
        this.oldWord = this.readable;
      }
    }
    segments = this.segments = [];
    let i = 0, len = word.length;
    let curr;
    for (; i < len; i++) {
      curr = word[i];
      if (check.isTone(curr)) {
        i = this.collectTone(word, i);
        continue;
      }
      if (check.isSyllableBreak(curr)) {
        segments.push(inventory.syllableBreak);
        continue;
      }
      if (check.isStress(curr)) {
        segments.push(new Suprasegmental(curr));
        continue;
      }
      if (check.isIntonation(curr)) {
        segments.push(new Suprasegmental(curr));
        continue;
      }
      if (check.isPreDiacritic(curr)) {
        i = this.collectWord(word, i, true);
        continue;
      }
      if (check.isChar(curr)) {
        i = this.collectWord(word, i);
        continue;
      }
      inventory.badChars.set(curr, word);
    }
    // console.log(segments);
    // console.log(word);
    // console.log(this.readable);
    // return segments;
    // let curr, next, marks, whole, ambiguities;
    // let includeNext;
    // for (; i < len; i++) {
    //   includeNext = false;
    //   marks = [];
    //   ambiguities = [];
    //   whole = curr = word[i];
    //   while (inventory.check('preDiacritics', curr)) {
    //     marks.push(curr);
    //     ambiguities.push([curr, inventory.ambiguousPreDiacritics[curr]])
    //     whole += curr = word[++i];
    //   }
    //   ambiguities.push(curr);
    //   next = word[i+1];
    //   while (inventory.check('diacritics', next)) {
    //     whole += next;
    //     marks.push(next);
    //     if (next in inventory.ambiguousDiacritics) {
    //       ambiguities.push([next, inventory.ambiguousDiacritics[next]])
    //     } else {
    //       ambiguities.push(next);
    //     }
    //     if (next === '͡') {
    //       includeNext = true;
    //     }
    //     next = word[++i + 1];
    //   }
    //   if (includeNext) {
    //     whole += next;
    //     curr += next;
    //     ++i;
    //   }
    //   parsedWord.push({
    //     whole,
    //     ambiguities,
    //     char: curr,
    //     marks
    //   });
    // }
  }

  collectTone (word: 'string', i: number): number {
    let str = word[i];
    let next = word[++i];
    while (check.isTone(next)) {
      str += next;
      next = word[++i]
    }
    this.segments.push(inventory.getTone(str));
    return i-1;
  }

  collectWord (word: 'string', i: number, isPre: boolean = false): number {
    let char = '';
    let curr = word[i];
    let isAffricate;
    if (isPre) {
      while (check.isPreDiacritic(curr)) {
        char += curr;
        curr = word[++i];
      }
    }
    if (check.isChar(curr)) {
      char += curr;
      curr = word[++i];
    }
    while (check.isDiacritic(curr)) {
      char += curr;
      if (curr === '͡') {
        isAffricate = true;
      }
      curr = word[++i];
    }
    if (isAffricate) {
      if (check.isChar(curr)) {
        char += curr;
        curr = word[++i];
      }
      while (check.isDiacritic(curr)) {
        char += curr;
        curr = word[++i];
      }
    }
    this.segments.push(inventory.getSegment(char));
    return i - 1;
    // let diacritics, char, next;
    // if (isPre) {
    //   diacritics = word[i];
    //   next = word[++i];
    //   while (!check.isChar(next)) {
    //     diacritics += next;
    //     next = word[++i];
    //   }
    // }
    // char = word[i];
    // // char = new Segmental(char, check.getDefinition(char));
    // if (diacritics) {
    //   char.prepend(diacritics);
    // }
    // next = word[++i];
    // diacritics = '';
    // while (check.isDiacritic(next)) {
    //   diacritics += next;
    //   next = word[++i];
    // }
    // if (diacritics) {
    //   char.append(diacritics);
    // }
    // this.segments.push(char);
    // return i-1;
  }

  get readable() {
    let { segments, breaks } = this;
    let str = '', segmentIndex = 0;
    segments.forEach((segment, index) => {
      if (segment instanceof Segmental) {
        if (breaks.includes(segmentIndex)) {
          str += '.';
        }
        segmentIndex++;
      }
      str += segment.readable;
    });
    return str;
    // return this.segments.map(segment => segment.readable).join('');
  }

  get normalSegments(): Segmental[] {
    let normalSegments: Segmental[] = [];
    this.segments.forEach(segment => {
      if (segment instanceof Segmental) {
        normalSegments.push(segment);
      }
    });
    return normalSegments;
    // return this.segments.filter(segment => segment instanceof Segmental);
  }

  get syllableCVPatterns (): string[] {
    let { breaks, normalSegments } = this;
    let patterns = [];
    let pattern;
    let location;
    let i = 0, len1 = breaks.length;
    let j, len2;
    for (; i <= len1; i++) {
      location = {};
      j = breaks[i - 1];
      if (!j) {
        j = 0;
        location.initial = true;
      }
      len2 = breaks[i];
      if (!len2) {
        len2 = normalSegments.length;
        location.final = true;
      }
      if (!location.final && !location.initial) {
        location.medial = true;
      }
      pattern = '';
      for (; j < len2; j++) {
        pattern += normalSegments[j].type;
      }
      patterns.push({pattern, location});
    }
    return patterns;
  }

  syllabify (): void {
    let segments = this.normalSegments;
    let oldWord = !this.oldWord && this.readable;
    let seg1, seg2, seg3;
    let i = 1, len = segments.length;
    let breaks = [];
    for (; i < len - 1; i++) {
      if (this.checkSyllableBreak(segments[i-1], segments[i], segments[i+1])) {
        breaks.push(i);
      }
    }
    // if (breaks.length) console.log(this.readable, breaks);
    this.breaks = breaks;
    if (oldWord && this.readable !== oldWord) {
      this.oldWord = oldWord;
    }
  }

  checkSyllableBreak (seg1: Segmental, seg2: Segmental, seg3: Segmental) {
    // let disp = (...args) => args.map(arg => `${arg.readable} -> ${arg.sonority}`).join(', '); 
    // if (seg1.sonority >= seg2.sonority && seg2.sonority <= seg3.sonority) console.log(disp.apply(this, arguments));
    return seg1.sonority >= seg2.sonority && seg2.sonority < seg3.sonority;
  }

  getEnvironmentFor (segment: Segmental, prevEnv: any, nextEnv: any, otherEnv: any): string[] {
    let environment = [];
    let segments = this.normalSegments;
    let breaks = this.breaks;
    let syllableEnv;
    let prev, next;
    segments.forEach((seg, i) => {
      if (segment === seg) {
        syllableEnv = {};
        prev = segments[i-1];
        next = segments[i+1];
        if (prev) prev.fillEnvironment(prevEnv);
        else otherEnv.wordInitial = syllableEnv.syllableInitial = true;
        if (next) next.fillEnvironment(nextEnv);
        else otherEnv.wordFinal = syllableEnv.syllableFinal = true;
        if (prev && next) otherEnv.wordMedial = true;
        if (breaks.includes(i)) syllableEnv.syllableInitial = true;
        if (breaks.includes(i + 1)) syllableEnv.syllableFinal = true;
        if (!syllableEnv.syllableInitial && !syllableEnv.syllableFinal) syllableEnv.syllableMedial = true;
        Object.assign(otherEnv, syllableEnv);
        environment.push({
          prev: prev ? prev.readable : '#',
          next: next ? next.readable : '#'
        });
      }
    });
    return environment;
  }

  getCVPattern (options = {}) {
    let str = '';
    this.segments.forEach(segment => {
      if (segment instanceof Segmental) {
        str += segment.type;
      } else if (options['showTones'] && segment instanceof Tone) {
        str += segment.readable;
      } else if (options['showSyllableBreaks'] && segment === inventory.syllableBreak) {
        str += segment.readable;
      }
    });
    return str;
  }
  
  //   getPSS (char: string) {
  //     let set = new Set();
  //     groups.forEach(group => {
  //       if (group.includes(char)) {
  //         group.forEach(el => {
  //           if (el !== char) {
  //             set.add(el);
  //           }
  //         })
  //       }
  //     });
  //     return set;
  //   }
}
