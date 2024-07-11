import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPrivacyEnComponent } from './policy-privacy-en.component';

describe('PolicyPrivacyEnComponent', () => {
  let component: PolicyPrivacyEnComponent;
  let fixture: ComponentFixture<PolicyPrivacyEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyPrivacyEnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPrivacyEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
