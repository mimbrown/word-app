import { Component, OnInit, Input } from '@angular/core';

const allFeatures = ['voice','SG','CG','son','cons','cont','nasal','round','lateral','ant','strident','dist','high','low','back','ATR','RTR']

interface TopLevel {
  display: string;
  hasFeatures?: boolean;
}

@Component({
  selector: 'environment-choice',
  templateUrl: './environment-choice.component.html',
  styleUrls: ['./environment-choice.component.scss']
})
export class EnvironmentChoiceComponent implements OnInit {
  @Input() environment: any;
  @Input() wordBoundary: boolean;
  @Input() syllableBoundary: boolean;

  topLevel: TopLevel[];
  selectedTopLevel: TopLevel;
  features: string[];
  selectedFeatures: Set<string> = new Set();

  constructor() { }

  ngOnInit() {
    let environment = this.environment;
    let topLevel: TopLevel[] = [{display: '<None>'}];
    let features = [];

    if (this.wordBoundary) {
      topLevel.push({display: '#'})
    }
    if (this.syllableBoundary) {
      topLevel.push({display: '.'})
    }
    if (environment.C) {
      topLevel.push({display: 'C', hasFeatures: true})
    }
    if (environment.V) {
      topLevel.push({display: 'V', hasFeatures: true})
    }
    this.selectTopLevel(topLevel[0]);
    this.topLevel = topLevel;
    allFeatures.forEach(feature => {
      if (feature in environment) {
        features.push(feature);
      }
    });
    this.features = features;
  }

  selectTopLevel (topLevel: TopLevel): void {
    this.selectedTopLevel = topLevel;
  }

  selectFeature (feature: string): void {
    let selectedFeatures = this.selectedFeatures;
    if (selectedFeatures.has(feature)) {
      selectedFeatures.delete(feature);
    } else {
      selectedFeatures.add(feature);
    }
  }

  // inFeatures (feature: string): boolean {
  //   let environment = this.environment;
  //   return environment && feature in environment;
  // }

  getFeature (feature: string): string {
    let sign = this.environment[feature] ? '+' : '-';
    return `[${sign} ${feature}]`;
  }

}
