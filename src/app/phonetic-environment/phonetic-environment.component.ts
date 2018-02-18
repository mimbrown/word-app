import { Component, OnInit, Input, QueryList, ViewChildren } from '@angular/core';

import { EnvironmentComponent } from '../environment/environment.component';
import { EnvironmentChoiceComponent } from '../environment-choice/environment-choice.component';

@Component({
  selector: 'phonetic-environment',
  templateUrl: './phonetic-environment.component.html',
  styleUrls: ['./phonetic-environment.component.scss']
})
export class PhoneticEnvironmentComponent implements OnInit {
  @Input() environment: EnvironmentComponent;
  @ViewChildren(EnvironmentChoiceComponent) environmentChoices: QueryList<EnvironmentChoiceComponent>;

  constructor() { }

  ngOnInit() {
  }

}
