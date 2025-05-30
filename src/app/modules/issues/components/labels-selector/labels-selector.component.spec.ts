import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsSelectorComponent } from './labels-selector.component';

describe('LabelsSelectorComponent', () => {
  let component: LabelsSelectorComponent;
  let fixture: ComponentFixture<LabelsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelsSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
