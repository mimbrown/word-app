import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { inventory } from '../data/inventory';
import { ambiguities } from '../data/ambiguities';
import { Ambiguity, AmbiguityGroup, AmbiguousWord } from '../models/ambiguity';

@Component({
  selector: 'clean-data',
  templateUrl: './clean-data.component.html',
  styleUrls: ['./clean-data.component.scss']
})
export class CleanDataComponent implements OnInit {
  wordPatterns: any[];
  ambiguities: AmbiguityGroup[];
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    ambiguities.forEach(ambiguityGroup => inventory.words.forEach(word => ambiguityGroup.checkWord(word)));
    this.ambiguities = ambiguities.sort(ambiguityGroup => ambiguityGroup.inconsistent ? -1 : 1);
  }

  showCVPattern () {
    let words = [];
    inventory.words.forEach(word => {
      words.push({
        word: word.readable,
        cvPattern: word.getCVPattern()
      })
    });
    this.wordPatterns = words;
  }

  resolve (ambiguityGroup: AmbiguityGroup): void {
    let ambiguities = this.ambiguities;
    ambiguityGroup.resolve();
    ambiguities.splice(ambiguities.indexOf(ambiguityGroup), 1);
    this.refresh.emit();
  }

  // showAmbiguities () {
  //   ambiguities.forEach((ambiguityGroup) => inventory.words.forEach(word => ambiguityGroup.checkWord(word)));
  //   console.log(ambiguities[1]);
  //   // console.log(ambiguities[1].ambiguousWords[1].map(w => w.word.readable).join('\n'));
  //   // console.log(ambiguities[0].ambiguousWords[0].map(w => w.word.readable).join('\n'));
  // }

}

@Component({
  selector: 'ambiguity',
  templateUrl: './ambiguity.component.html',
  styleUrls: ['./ambiguity.component.scss']
})
export class AmbiguityComponent {
  @Input() ambiguityGroup: AmbiguityGroup;
  @Output() resolved: EventEmitter<AmbiguityGroup> = new EventEmitter();
  shown: boolean = false;

  constructor () { }

  get allWords () {
    let words = [];
    this.ambiguityGroup.ambiguousWords.forEach(wordGroup => words = words.concat(wordGroup));
    return words;
  }

  rotate (ambiguousWord: AmbiguousWord): void {
    ambiguousWord.switched = !ambiguousWord.switched;
  }

  toggle (): void {
    this.shown = !this.shown;
  }

  header (): string[] {
    let arr = [];
    this.ambiguityGroup.ambiguities.map(ambiguity => ambiguity.name).forEach((str, i) => {
      if (i !== 0) {
        arr.push('VS.');
      }
      arr.push(str);
    });
    return arr;
  }

  resolveButtons (): Ambiguity[] {
    let arr = [];
    this.ambiguityGroup.ambiguities.forEach((ambiguity, i) => {
      if (i !== 0) {
        arr.push(null);
      }
      arr.push(ambiguity);
    });
    return arr;
  }

  resolveAll (ambiguity: Ambiguity): void {
    let ambiguityGroup = this.ambiguityGroup;
    ambiguityGroup.ambiguities.forEach((amb, index) => {
      let isDesired = amb === ambiguity;
      ambiguityGroup.ambiguousWords[index].forEach(ambiguousWord => ambiguousWord.switched = !isDesired);
    });
  }

  row (ambiguousWord: AmbiguousWord): string[] {
    let arr = [];
    let { ambiguity, word, switched } = ambiguousWord;
    let str;
    this.ambiguityGroup.ambiguities.forEach((amb, i) => {
      if (i !== 0) {
        arr.push('<span class="fa fa-arrows-h"></span>');
      }
      if (amb === ambiguity) {
        str = word.readable;
        if (switched) {
          str = this.wrap(str);
        }
      } else {
        str = ambiguousWord.getFixed();
        if (!switched) {
          str = this.wrap(str);
        }
      }
      arr.push(str);
    });
    return arr;
  }

  wrap (str: string): string {
    return `<span class="subdued">${str}</span>`;
  }
}