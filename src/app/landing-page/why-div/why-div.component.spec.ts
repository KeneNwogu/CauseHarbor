import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyDivComponent } from './why-div.component';

describe('WhyDivComponent', () => {
  let component: WhyDivComponent;
  let fixture: ComponentFixture<WhyDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyDivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
