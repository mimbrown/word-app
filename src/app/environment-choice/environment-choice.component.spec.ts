import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentChoiceComponent } from './environment-choice.component';

describe('EnvironmentChoiceComponent', () => {
  let component: EnvironmentChoiceComponent;
  let fixture: ComponentFixture<EnvironmentChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
