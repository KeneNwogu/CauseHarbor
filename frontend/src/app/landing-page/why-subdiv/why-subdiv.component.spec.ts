import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhySubdivComponent } from './why-subdiv.component';

describe('WhySubdivComponent', () => {
  let component: WhySubdivComponent;
  let fixture: ComponentFixture<WhySubdivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhySubdivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhySubdivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
