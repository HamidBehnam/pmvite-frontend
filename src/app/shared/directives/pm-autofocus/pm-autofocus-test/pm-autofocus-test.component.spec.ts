import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmAutofocusTestComponent } from './pm-autofocus-test.component';

describe('PmAutofocusTestComponent', () => {
  let component: PmAutofocusTestComponent;
  let fixture: ComponentFixture<PmAutofocusTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmAutofocusTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmAutofocusTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
