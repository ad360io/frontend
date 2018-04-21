import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvDashboardWalletComponent } from './adv-dashboard-wallet.component';

describe('AdvDashboardWalletComponent', () => {
  let component: AdvDashboardWalletComponent;
  let fixture: ComponentFixture<AdvDashboardWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvDashboardWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvDashboardWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
