import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoSignupComponent } from './ngo-signup.component';

describe('NgoSignupComponent', () => {
  let component: NgoSignupComponent;
  let fixture: ComponentFixture<NgoSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgoSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
