import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisStatusReportComponent } from './mis-status-report.component';

describe('MisStatusReportComponent', () => {
  let component: MisStatusReportComponent;
  let fixture: ComponentFixture<MisStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisStatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
