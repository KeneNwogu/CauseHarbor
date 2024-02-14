import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoSignupVerifyComponent } from './ngo-signup-verify.component';

describe('NgoSignupVerifyComponent', () => {
  let component: NgoSignupVerifyComponent;
  let fixture: ComponentFixture<NgoSignupVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoSignupVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgoSignupVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
