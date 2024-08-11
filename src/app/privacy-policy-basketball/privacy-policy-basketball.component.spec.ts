import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyBasketballComponent } from './privacy-policy-basketball.component';

describe('PrivacyPolicyBasketballComponent', () => {
  let component: PrivacyPolicyBasketballComponent;
  let fixture: ComponentFixture<PrivacyPolicyBasketballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyBasketballComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicyBasketballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
