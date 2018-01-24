import { AbstractSegmental } from './abstract-segmental';
import { Segmental } from './segmental';
import { Suprasegmental } from './suprasegmental';
import { check } from '../data/inventory';

export class Word {
    segments: AbstractSegmental[];
    static charDefinitions;

    constructor (word: string) {
        this.parse(word);
    }

    parse (word) {
      let segments = this.segments = [];
      let i = 0, len = word.length;
      let curr, next;
      for (; i < len; i++) {
        curr = word[i];
        next = word[i+1];
        if (check.isTone(curr)) {
          i = this.collectTone(word, i);
          continue;
        }
        if (check.isSyllableBreak(curr)) {
          segments.push(new Suprasegmental(curr));
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
      }
      console.log(segments);
      console.log(word);
      console.log(this.readable);
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
      this.segments.push(new Suprasegmental(str));
      return i-1;
    }
  
    collectWord (word: 'string', i: number, isPre: boolean = false): number {
      let diacritics, char, next;
      if (isPre) {
        diacritics = word[i];
        next = word[++i];
        while (!check.isChar(next)) {
          diacritics += next;
          next = word[++i];
        }
      }
      char = word[i];
      char = new Segmental(char, check.getDefinition(char));
      if (diacritics) {
        char.prepend(diacritics);
      }
      next = word[++i];
      diacritics = '';
      while (check.isDiacritic(next)) {
        diacritics += next;
        next = word[++i];
      }
      if (diacritics) {
        char.append(diacritics);
      }
      this.segments.push(char);
      return i-1;
    }

    get readable() {
      return this.segments.map(segment => segment.readable).join('');
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