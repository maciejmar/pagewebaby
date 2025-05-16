import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketballShotsComponent } from './basketball-shots.component';

describe('BasketballShotsComponent', () => {
  let component: BasketballShotsComponent;
  let fixture: ComponentFixture<BasketballShotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketballShotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketballShotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
