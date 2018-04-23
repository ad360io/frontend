import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvMarketplaceSideFilterComponent } from './adv-marketplace-side-filter.component';

describe('AdvMarketplaceSideFilterComponent', () => {
  let component: AdvMarketplaceSideFilterComponent;
  let fixture: ComponentFixture<AdvMarketplaceSideFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvMarketplaceSideFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvMarketplaceSideFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
