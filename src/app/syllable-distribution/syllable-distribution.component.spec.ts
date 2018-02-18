import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllableDistributionComponent } from './syllable-distribution.component';

describe('SyllableDistributionComponent', () => {
  let component: SyllableDistributionComponent;
  let fixture: ComponentFixture<SyllableDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyllableDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyllableDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
