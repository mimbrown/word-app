import { Component, OnInit, Input, QueryList, ViewChildren } from '@angular/core';

import { EnvironmentComponent } from '../environment/environment.component';
import { PhoneticEnvironmentComponent } from '../phonetic-environment/phonetic-environment.component';
import { EnvironmentChoiceComponent } from '../environment-choice/environment-choice.component';

import { Word } from '../models/word';
import { Segmental } from '../models/segmental';

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

  process (word: Word): string {
    let { segments, normalSegments, breaks } = word;
    let { selectedEnvironment, phoneticEnvironments } = this;
    let indexes = [];
    normalSegments.forEach((segment, index) => {
      phoneticEnvironments.forEach(phoneticEnvironment => {
        if (phoneticEnvironment.environment.segment === segment) {
          let { first, last } = phoneticEnvironment.environmentChoices;
          let prevSegment = normalSegments[index - 1];
          let nextSegment = normalSegments[index + 1];
          if (
            this.isMatch(prevSegment, first, breaks.includes(index) || !prevSegment, !prevSegment) &&
            this.isMatch(nextSegment, last, breaks.includes(index + 1) || !nextSegment, !nextSegment)
          ) {
            indexes.push(index);
          }
        }
      });
    });
    if (indexes.length) {
      let str = '', segmentIndex = 0;
      segments.forEach((segment, index) => {
        if (segment instanceof Segmental) {
          if (breaks.includes(segmentIndex)) {
            str += '.';
          }
          if (indexes.includes(segmentIndex)) {
            segment = selectedEnvironment.segment;
          }
          segmentIndex++;
        }
        str += segment.readable;
      });
      return str;
    }
    return null;
  }

  isMatch (segment: Segmental, environmentChoice: EnvironmentChoiceComponent, isSyllableBoundary: boolean, isWordBoundary: boolean) {
    let parseRegEx = /([+-]) (\w*)/g
    let { selectedTopLevel, selectedFeatures } = environmentChoice;
    let { display } = selectedTopLevel;
    if (display === '<None>') {
      return true;
    } else if (display === '#' && isWordBoundary) {
      return true;
    } else if (display === '.' && isSyllableBoundary) {
      return true;
    } else {
      if (segment.type !== display) {
        return false;
      }
      let matchesFeatures = true;
      selectedFeatures.forEach(feature => {
        let [full, flag, name] = parseRegEx.exec(feature);
        if (segment[name] !== (flag === '-' ? false : true)) {
          matchesFeatures = false;
        }
      });
      return matchesFeatures;
    }
  }

}
