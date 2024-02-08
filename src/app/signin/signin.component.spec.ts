import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorSigninComponent } from './signin.component';

describe('DonorSigninComponent', () => {
  let component: DonorSigninComponent;
  let fixture: ComponentFixture<DonorSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorSigninComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
