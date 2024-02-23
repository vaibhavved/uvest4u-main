import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorTypeComponent } from './investor-type.component';

describe('InvestorTypeComponent', () => {
  let component: InvestorTypeComponent;
  let fixture: ComponentFixture<InvestorTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestorTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
