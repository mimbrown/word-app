import { Component, OnInit } from '@angular/core';

import { inventory } from '../data/inventory';
import { Segmental } from '../models/segmental';

@Component({
  selector: 'syllable-distribution',
  templateUrl: './syllable-distribution.component.html',
  styleUrls: ['./syllable-distribution.component.scss']
})
export class SyllableDistributionComponent implements OnInit {
  syllableTemplates: string[];
  headerRow: string;
  bodyRows: string;

  constructor() { }

  ngOnInit() {
  }

  showSyllableDistribution (): void {
    let syllableTemplates = Array.from(inventory.getSyllableTemplates()).map(arr => arr[0]).sort((p1, p2) => {
      if (p1.length < p2.length) return -1;
      else if (p1.length > p2.length) return 1;
      else return p1 < p2 ? -1 : p1 > p2 ? 1 : 0;
    });
    let headerRow = [];
    let templates = {};
    syllableTemplates.forEach(template => {
      let templateArray = template.split('');
      headerRow.push('<th></th>');
      headerRow.push.apply(headerRow, templateArray.map(char => `<th>${char}</th>`));
    });
    this.headerRow = headerRow.join('');
    let str = ''
    inventory.getConsonants().forEach(segment => str += this.createRow(segment.segment, syllableTemplates));
    inventory.getVowels().forEach(segment => str += this.createRow(segment.segment, syllableTemplates));
    this.bodyRows = str;
  }

  createRow (segment: Segmental, templates: string[]) {
    return `<tr><td class="segment">${segment.readable}</td>${templates.map(template => this.createTemplate(segment, template)).join('<td class="mid"></td>')}</tr>`;
  }

  createTemplate (segment: Segmental, template: string) {
    let words = inventory.words;
    let cells = [];
    let exists;
    for (let i = 0, len = template.length; i < len; i++) {
      exists = false;
      if (segment.type === template[i]) {
        words.forEach(word => {
          if (word.existsIn(segment, template, i)) {
            exists = true;
          }
        });
        cells.push(`<td><span class="fa fa-${exists ? 'check' : 'times'}"></span></td>`);
      } else {
        cells.push('<td></td>');
      }
    }
    return cells.join('');
  }

}
