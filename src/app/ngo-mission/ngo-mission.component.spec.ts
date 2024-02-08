import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoMissionComponent } from './ngo-mission.component';

describe('NgoMissionComponent', () => {
  let component: NgoMissionComponent;
  let fixture: ComponentFixture<NgoMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgoMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
