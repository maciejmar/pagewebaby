import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketballPwaComponent } from './basketball-pwa.component';

describe('BasketballPwaComponent', () => {
  let component: BasketballPwaComponent;
  let fixture: ComponentFixture<BasketballPwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketballPwaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketballPwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
