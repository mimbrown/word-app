import { Component, OnInit, Input } from '@angular/core';

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

  writeRule(): void {
    
  }

}
