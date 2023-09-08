import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignMottoComponent } from './campaign-motto.component';

describe('CampaignMottoComponent', () => {
  let component: CampaignMottoComponent;
  let fixture: ComponentFixture<CampaignMottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignMottoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignMottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
