import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingForAiResponseComponent } from './waiting-for-ai-response.component';

describe('WaitingForAiResponseComponent', () => {
  let component: WaitingForAiResponseComponent;
  let fixture: ComponentFixture<WaitingForAiResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaitingForAiResponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaitingForAiResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
