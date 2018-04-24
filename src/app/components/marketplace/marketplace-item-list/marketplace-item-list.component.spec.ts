import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceItemListComponent } from './marketplace-item-list.component';

describe('MarketplaceItemListComponent', () => {
  let component: MarketplaceItemListComponent;
  let fixture: ComponentFixture<MarketplaceItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
