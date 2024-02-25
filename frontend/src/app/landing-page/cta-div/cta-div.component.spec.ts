import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaDivComponent } from './cta-div.component';

describe('CtaDivComponent', () => {
  let component: CtaDivComponent;
  let fixture: ComponentFixture<CtaDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtaDivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtaDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
