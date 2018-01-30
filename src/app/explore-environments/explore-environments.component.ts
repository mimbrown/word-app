import { Component, OnInit, Input } from '@angular/core';

import { EnvironmentComponent } from '../environment/environment.component';

import { Word } from '../models/word';
import { Segmental } from '../models/segmental';

import { inventory } from '../data/inventory';

@Component({
  selector: 'explore-environments',
  templateUrl: './explore-environments.component.html',
  styleUrls: ['./explore-environments.component.scss']
})
export class ExploreEnvironmentsComponent implements OnInit {
  @Input() vowels: Segmental[];
  @Input() consonants: Segmental[];
  environments: Segmental[] = [];
  selected: Set<EnvironmentComponent> = new Set<EnvironmentComponent>();
  constructor() { }

  ngOnInit() {
    // this.consonants = inventory.getConsonants();
    // this.vowels = inventory.getVowels();
  }

  viewEnvironment (segment: Segmental): void {
    let environments = this.environments;
    if (!environments.includes(segment)) {
      environments.push(segment);
    }
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
    let wordEnvironment;
    this.selected.forEach(comp => {
      if (wordEnvironment) {
        console.log(this.checkAgainst(wordEnvironment, comp.wordEnvironment));
      } else {
        wordEnvironment = comp.wordEnvironment;
      }
    });
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

}
