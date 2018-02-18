import { Component, OnInit, Input, QueryList, ViewChildren } from '@angular/core';

import { EnvironmentComponent } from '../environment/environment.component';
import { PhoneticEnvironmentComponent } from '../phonetic-environment/phonetic-environment.component';

@Component({
  selector: 'rule-builder',
  templateUrl: './rule-builder.component.html',
  styleUrls: ['./rule-builder.component.scss']
})
export class RuleBuilderComponent implements OnInit {
  @ViewChildren(PhoneticEnvironmentComponent) phoneticEnvironments: QueryList<PhoneticEnvironmentComponent>;
  _environments: Set<EnvironmentComponent>;
  _selectedEnvironment: EnvironmentComponent;
  ruleEnvironments: Set<EnvironmentComponent>;

  constructor() { }
  
  ngOnInit() {
  }

  get environments () {
    return this._environments;
  }
  @Input() set environments (environments: Set<EnvironmentComponent>) {
    this._environments = environments;
    this.ruleEnvironments = new Set(environments);
  };
  
  get selectedEnvironment () {
    return this._selectedEnvironment;
  }
  set selectedEnvironment (environment: EnvironmentComponent) {
    let oldEnvironment = this._selectedEnvironment;
    if (oldEnvironment) {
      this.ruleEnvironments.add(oldEnvironment);
    }
    this.ruleEnvironments.delete(environment);
    this._selectedEnvironment = environment;
  }

}
