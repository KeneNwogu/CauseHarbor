import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowDivComponent } from './how-div.component';

describe('HowDivComponent', () => {
  let component: HowDivComponent;
  let fixture: ComponentFixture<HowDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowDivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
