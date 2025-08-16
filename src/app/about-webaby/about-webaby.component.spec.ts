import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutWebabyComponent } from './about-webaby.component';

describe('AboutWebabyComponent', () => {
  let component: AboutWebabyComponent;
  let fixture: ComponentFixture<AboutWebabyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutWebabyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutWebabyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
