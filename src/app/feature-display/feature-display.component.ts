import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'feature-display',
  templateUrl: './feature-display.component.html',
  styleUrls: ['./feature-display.component.scss']
})
export class FeatureDisplayComponent implements OnInit {
  @Input() features: any;
  constructor() { }

  ngOnInit() {
  }

  getYN (bool: boolean): string {
    return bool ? 'fa fa-check' : 'fa fa-times';
  }

  inFeatures (feature: string): boolean {
    let features = this.features;
    return features && feature in features;
  }

  getFeature (feature: string): string {
    let sign = this.features[feature] ? '+' : '-';
    return `[${sign} ${feature}]`
  }

}
