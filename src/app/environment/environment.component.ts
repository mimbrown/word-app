import { Component, OnInit, Input } from '@angular/core';

import { Segmental } from '../models/segmental';
import { inventory } from '../data/inventory';
import { environment } from '../../environments/environment';

@Component({
  selector: 'environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent implements OnInit {
  @Input() segment: Segmental;
  environments: any[];
  previousEnvironment: any;
  nextEnvironment: any;
  wordEnvironment: any;
  constructor() { }

  ngOnInit() {
    this.generateEnvironment();
  }

  generateEnvironment (): void {
    let segment = this.segment;
    let environments = new Set();
    let prevEnv = {empty: true};
    let nextEnv = {empty: true};
    let otherEnv = {};
    inventory.words.forEach(word => {
      word.getEnvironmentFor(segment, prevEnv, nextEnv, otherEnv).forEach(env => environments.add(`${env.prev} ${env.next}`));
      // environments = environments.concat(word.getEnvironmentFor(segment));
    });
    // this.environments = environments;
    // let arrayEnv = [];
    // environments.forEach(env => {
    //   let arr = env.split(' ');
    //   arrayEnv.push({
    //     prev: arr[0],
    //     next: arr[1]
    //   });
    // });
    // this.environments = arrayEnv;
    // console.log(prevEnv);
    // console.log(nextEnv);
    // console.log(otherEnv);
    this.environments = Array.from(environments).sort().map(env => {
      let arr = env.split(' ');
      return {
        prev: arr[0],
        next: arr[1]
      };
    });
    this.previousEnvironment = prevEnv;
    this.nextEnvironment = nextEnv;
    this.wordEnvironment = otherEnv;
  }

  getYN (env: string): string {
    let wordEnvironment = this.wordEnvironment;
    return wordEnvironment && wordEnvironment[env] ? 'fa fa-check' : 'fa fa-times';
  }

}
