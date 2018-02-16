import { Component, OnInit, Input } from '@angular/core';

import { EnvironmentComponent } from '../environment/environment.component';

@Component({
  selector: 'rule-builder',
  templateUrl: './rule-builder.component.html',
  styleUrls: ['./rule-builder.component.scss']
})
export class RuleBuilderComponent implements OnInit {
  @Input() environments: Set<EnvironmentComponent>;

  constructor() { }

  ngOnInit() {
  }

}
