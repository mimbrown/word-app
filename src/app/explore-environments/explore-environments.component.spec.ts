import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreEnvironmentsComponent } from './explore-environments.component';

describe('ExploreEnvironmentsComponent', () => {
  let component: ExploreEnvironmentsComponent;
  let fixture: ComponentFixture<ExploreEnvironmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreEnvironmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreEnvironmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
