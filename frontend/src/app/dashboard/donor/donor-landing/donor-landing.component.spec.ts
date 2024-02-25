import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorLandingComponent } from './donor-landing.component';

describe('DonorLandingComponent', () => {
  let component: DonorLandingComponent;
  let fixture: ComponentFixture<DonorLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
