import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'tabpanel',
  templateUrl: './tabpanel.component.html',
  styleUrls: ['./tabpanel.component.scss']
})
export class TabpanelComponent {
  tabs: Tab[] = [];

  selectTab(tab: Tab) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }

  addTab(tab: Tab) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}

@Component({
  selector: 'tab',
  // template: `
  //   <div [hidden]="!active">
  //     <ng-content></ng-content>
  //   </div>
  // `
  template: '<ng-content></ng-content>'
})
export class Tab {

  @Input() tabTitle: string;
  // @Input() height: string = '100%';
  active: boolean;
  @HostBinding('hidden') get inactive () {return !this.active}

  constructor(tabs: TabpanelComponent) {
    tabs.addTab(this);
  }
}