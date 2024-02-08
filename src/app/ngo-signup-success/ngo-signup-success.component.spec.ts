import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoSignupSuccessComponent } from './ngo-signup-success.component';

describe('NgoSignupSuccessComponent', () => {
  let component: NgoSignupSuccessComponent;
  let fixture: ComponentFixture<NgoSignupSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoSignupSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgoSignupSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
