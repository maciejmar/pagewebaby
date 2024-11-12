import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyEquationsComponent } from './privacy-policy-equations.component';

describe('PrivacyPolicyEquationsComponent', () => {
  let component: PrivacyPolicyEquationsComponent;
  let fixture: ComponentFixture<PrivacyPolicyEquationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyEquationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicyEquationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
