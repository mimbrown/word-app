import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Segmental } from './models/segmental';
import { Suprasegmental } from './models/suprasegmental';

const groups = [
  ['ɑ','ɔ'],
  ['ɑ','ʌ'],
  ['ɑ','æ']
]

@Injectable()
export class WordParserService {
  chars: any;

  constructor(private http: Http) {
    // this.http.get('assets/consonants.json')
    //   .toPromise()
    //   .then(res => this.chars = res.json());
  }

  // parse (word) {
  //   let parsed = [];
  //   let i = 0, len = word.length;
  //   let curr, next;
  //   for (; i < len; i++) {
  //     curr = word[i];
  //     next = word[i+1];
  //     if (inventory.isTone(curr)) {
  //       i = this.collectTone(parsed, word, i);
  //       continue;
  //     }
  //     if (inventory.isSyllableBreak(curr)) {
  //       parsed.push(new Suprasegmental(curr));
  //       continue;
  //     }
  //     if (inventory.isStress(curr)) {
  //       parsed.push(new Suprasegmental(curr));
  //       continue;
  //     }
  //     if (inventory.isIntonation(curr)) {
  //       parsed.push(new Suprasegmental(curr));
  //       continue;
  //     }
  //     if (inventory.isPreDiacritic(curr)) {
  //       i = this.collectWord(parsed, word, i, true);
  //       continue;
  //     }
  //   }
  //   console.log(parsed);
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
    // return parsed;
  // }

  // collectTone (parsed: any[], word: 'string', i: number): number {
  //   let str = word[i];
  //   let next = word[++i];
  //   while (inventory.isTone(next)) {
  //     str += next;
  //     next = word[++i]
  //   }
  //   parsed.push(new Suprasegmental(str));
  //   return i-1;
  // }

  // collectWord (parsed: any[], word: 'string', i: number, isPre: boolean = false): number {
  //   let pre, X, next;
  //   if (isPre) {
  //     pre = word[i];
  //     next = word[++i];
  //     X = this.getChar(next);
  //     while (!X) {
  //       pre += next;
  //       next = this.getChar(word[++i]);
  //       X = this.getChar(next);
  //     }
  //   } else {

  //   }
  //   // let char: Char = X as Char;
  //   // console.log(char instanceof Char);
  //   // let str = word[i];
  //   // let next = word[++i];
  //   // while (inventory.isTone(next)) {
  //   //   str += next;
  //   //   next = word[++i]
  //   // }
  //   // parsed.push(new Suprasegmental(str));
  //   return i-1;
  // }

  // getChar (char: string): boolean {
  //   return this.chars[char];
  // }

  getPSS (char: string) {
    let set = new Set();
    groups.forEach(group => {
      if (group.includes(char)) {
        group.forEach(el => {
          if (el !== char) {
            set.add(el);
          }
        })
      }
    });
    return set;
  }
}
