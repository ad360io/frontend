import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvPlaceholderComponent } from './adv-placeholder.component';

describe('AdvPlaceholderComponent', () => {
  let component: AdvPlaceholderComponent;
  let fixture: ComponentFixture<AdvPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
