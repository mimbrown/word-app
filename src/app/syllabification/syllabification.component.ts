import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { inventory } from '../data/inventory';

@Component({
  selector: 'syllabification',
  templateUrl: './syllabification.component.html',
  styleUrls: ['./syllabification.component.scss']
})
export class SyllabificationComponent implements OnInit {
  syllableTemplates: any[];
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  syllabify (): void {
    inventory.words.forEach(word => word.syllabify());
    this.refresh.emit();
    this.syllableTemplates = Array.from(inventory.getSyllableTemplates()).sort((a, b) => {
      let p1 = a[0], p2 = b[0];
      if (p1.length < p2.length) return -1;
      else if (p1.length > p2.length) return 1;
      else return p1 < p2 ? -1 : p1 > p2 ? 1 : 0;
    });
  }

}
