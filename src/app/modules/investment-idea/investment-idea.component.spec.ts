import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentIdeaComponent } from './investment-idea.component';

describe('InvestmentIdeaComponent', () => {
  let component: InvestmentIdeaComponent;
  let fixture: ComponentFixture<InvestmentIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentIdeaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
