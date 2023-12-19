import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDilogCustomersComponent } from './confirm-dilog-customers.component';

describe('ConfirmDilogCustomersComponent', () => {
  let component: ConfirmDilogCustomersComponent;
  let fixture: ComponentFixture<ConfirmDilogCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDilogCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDilogCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
