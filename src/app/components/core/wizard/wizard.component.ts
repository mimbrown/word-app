import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  tabs: WizardTab[] = [];
  prevTab: WizardTab;
  activeTab: WizardTab;
  nextTab: WizardTab;

  constructor() { }

  ngOnInit() {
  }

  selectTab(tab: WizardTab) {
    let tabs = this.tabs;
    let index = tabs.indexOf(tab);
    tabs.forEach(tab => tab.active = false);
    tab.active = true;
    this.prevTab = tabs[index - 1];
    this.activeTab = tab;
    this.nextTab = tabs[index + 1];
  }

  addTab(tab: WizardTab) {
    let length = this.tabs.length;
    if (length === 0) {
      tab.active = true;
      this.activeTab = tab;
    } else if (length === 1) {
      this.nextTab = tab;
    }
    this.tabs.push(tab);
  }
}

@Component({
  selector: 'wizard-tab',
  template: '<ng-content></ng-content>'
})
export class WizardTab {

  @Input() tabTitle: string;
  active: boolean;
  @HostBinding('hidden') get inactive () {return !this.active}

  constructor(tabs: WizardComponent) {
    tabs.addTab(this);
  }
}