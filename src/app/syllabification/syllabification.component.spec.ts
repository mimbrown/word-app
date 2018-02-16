import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllabificationComponent } from './syllabification.component';

describe('SyllabificationComponent', () => {
  let component: SyllabificationComponent;
  let fixture: ComponentFixture<SyllabificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyllabificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyllabificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
