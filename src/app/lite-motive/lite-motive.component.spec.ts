import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteMotiveComponent } from './lite-motive.component';

describe('LiteMotiveComponent', () => {
  let component: LiteMotiveComponent;
  let fixture: ComponentFixture<LiteMotiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiteMotiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiteMotiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
