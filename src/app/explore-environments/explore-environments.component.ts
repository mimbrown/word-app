import { Component, OnInit, Input } from '@angular/core';

import { EnvironmentComponent } from '../environment/environment.component';

import { Word } from '../models/word';
import { Segmental } from '../models/segmental';

import { inventory } from '../data/inventory';
import { environment } from '../../../word-app-darwin-x64/word-app.app/Contents/Resources/app/src/environments/environment';

@Component({
  selector: 'explore-environments',
  templateUrl: './explore-environments.component.html',
  styleUrls: ['./explore-environments.component.scss']
})
export class ExploreEnvironmentsComponent implements OnInit {
  // @Input() vowels: Segmental[];
  // @Input() consonants: Segmental[];
  @Input() environments: Segmental[];
  selected: Set<EnvironmentComponent> = new Set();
  buildingRule: boolean = false;
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

}
