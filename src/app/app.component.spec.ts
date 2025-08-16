


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default title "pagewebaby"', () => {
    expect(component.title).toBe('pagewebaby');
  });

  it('should accept input isToDisplay', () => {
    component.isToDisplay = true;
    fixture.detectChanges();
    expect(component.isToDisplay).toBeTrue();
  });

  it('should accept input introEnded', () => {
    component.introEnded = true;
    fixture.detectChanges();
    expect(component.introEnded).toBeTrue();
  });

  it('should update CSS variables on mousemove', () => {
    // dodajemy spotlight-layer do DOM
    const spotlight = document.createElement('div');
    spotlight.classList.add('spotlight-layer');
    document.body.appendChild(spotlight);

    // wywołujemy ngOnInit (żeby dodał listenera)
    component.ngOnInit();

    // tworzymy fake event
    const event = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 200,
    });
    document.dispatchEvent(event);

    // sprawdzamy czy CSS variable zostało ustawione
    expect(spotlight.style.getPropertyValue('--x')).toBe('100px');
    expect(spotlight.style.getPropertyValue('--y')).toBe('200px');

    // cleanup
    document.body.removeChild(spotlight);
  });
});
