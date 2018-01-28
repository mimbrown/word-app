import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { WordParserService } from '../word-parser.service';

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  @Input() parsed;
  @Output() choice = new EventEmitter<string>();
  private pss;
  options: string[];
  private selectedOption: string;
  constructor(private word: WordParserService) { }

  ngOnInit() {
    // this.pss = this.word.getPSS(this.parsed.char).values();
    let options = [''];
    this.parsed.ambiguities.forEach(ambiguity => options = this.addNext(options, ambiguity));
    this.options = options;
    this.parsed.selection = this.selectedOption = options[0];
  }

  addNext(optionsArray, next) {
    if (next instanceof Array) {
      let newOptions = [];
      optionsArray.forEach(option => {
        next.forEach(item => {
          newOptions.push(option + item);
        });
      });
      return newOptions;
    } else {
      return optionsArray.map(option => option + next);
    }
  }

  choose(option: string): void {
    this.choice.emit(this.parsed.selection = this.selectedOption = option);
  }

}
