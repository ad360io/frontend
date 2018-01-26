import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubPlaceholderComponent } from './pub-placeholder.component';

describe('PubPlaceholderComponent', () => {
  let component: PubPlaceholderComponent;
  let fixture: ComponentFixture<PubPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
