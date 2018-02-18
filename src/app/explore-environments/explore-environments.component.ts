import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EnvironmentComponent } from '../environment/environment.component';
import { RuleBuilderComponent } from '../rule-builder/rule-builder.component';

import { Word } from '../models/word';
import { Segmental } from '../models/segmental';

import { inventory } from '../data/inventory';

class ChangedWord {
  word: Word;
  oldVersion: string;
  newVersion: string;
  accepted: boolean = true;

  constructor (word: Word, newVersion: string) {
    this.word = word;
    this.oldVersion = word.readable;
    this.newVersion = newVersion;
  }
}

@Component({
  selector: 'explore-environments',
  templateUrl: './explore-environments.component.html',
  styleUrls: ['./explore-environments.component.scss']
})
export class ExploreEnvironmentsComponent implements OnInit {
  // @Input() vowels: Segmental[];
  // @Input() consonants: Segmental[];
  @Input() environments: Segmental[];
  @Output() refresh: EventEmitter<any> = new EventEmitter();

  selected: Set<EnvironmentComponent> = new Set();
  buildingRule: boolean = false;

  generatedRule: boolean = false;
  ruleCreated: boolean = false;

  changedWords: ChangedWord[];

  constructor() { }

  ngOnInit() {
    
  }

  remove (comp: EnvironmentComponent): void {
    let environments = this.environments;
    this.selected.delete(comp);
    environments.splice(environments.indexOf(comp.segment), 1);
  }

  addPSS (segment: Segmental) {
    let environments = this.environments;
    inventory.segments.forEach((instances, seg) => {
      if (segment.isPSS(seg) && !environments.includes(seg)) {
        environments.push(seg);
      }
    });
  }

  toggleSelected (comp: EnvironmentComponent): void {
    let selected = this.selected;
    if (selected.has(comp)) {
      selected.delete(comp);
    } else {
      selected.add(comp);
    }
  }

  writeRule (): void {
    // let wordEnvironment;
    // this.selected.forEach(comp => {
    //   if (wordEnvironment) {
    //     console.log(this.checkAgainst(wordEnvironment, comp.wordEnvironment));
    //   } else {
    //     wordEnvironment = comp.wordEnvironment;
    //   }
    // });
    this.buildingRule = true;
  }

  generateRule (comp: RuleBuilderComponent): void {
    this.generatedRule = true;
  }

  createRule (comp: RuleBuilderComponent): void {
    let changedWords: ChangedWord[] = [];
    let str;
    inventory.words.forEach(word => {
      str = comp.process(word);
      if (str) {
        changedWords.push(new ChangedWord(word, str));
      }
    });
    this.changedWords = changedWords;
    this.ruleCreated = true;
  }

  checkAgainst (env: any, otherEnv: any) {
    let contrast = [];
    for (let k in env) {
      if (k in otherEnv && env[k] !== otherEnv[k]) {
        contrast.push(k);
      }
    }
    return contrast;
  }

  closeRuleBuilder (): void {
    this.buildingRule = false;
  }

  finishRule (): void {
    this.changedWords.forEach(changedWord => {
      if (changedWord.accepted) {
        changedWord.word.parse(changedWord.newVersion);
      }
    });
    delete this.changedWords;
    this.closeRuleBuilder();
    this.refresh.emit();
  }

}
