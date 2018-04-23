import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceSideFilterComponent } from './marketplace-side-filter.component';

describe('MarketplaceSideFilterComponent', () => {
  let component: MarketplaceSideFilterComponent;
  let fixture: ComponentFixture<MarketplaceSideFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceSideFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceSideFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
