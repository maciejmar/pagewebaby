import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuralBgComponent } from './neural-bg.component';

describe('NeuralBgComponent', () => {
  let component: NeuralBgComponent;
  let fixture: ComponentFixture<NeuralBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeuralBgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeuralBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
