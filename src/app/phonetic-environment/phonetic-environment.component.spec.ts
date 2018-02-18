import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneticEnvironmentComponent } from './phonetic-environment.component';

describe('PhoneticEnvironmentComponent', () => {
  let component: PhoneticEnvironmentComponent;
  let fixture: ComponentFixture<PhoneticEnvironmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneticEnvironmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneticEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
