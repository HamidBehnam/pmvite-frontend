import { WithAuthPipe } from './with-auth.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-with-auth-test',
  template: `
    <img [src]="'/src/assets/images/color-based/white/pm-logo.svg' | withAuth | async" alt="">
  `
})
class WithAuthTestComponent {}

describe('WithAuthPipe', () => {
  let component: WithAuthTestComponent;
  let fixture: ComponentFixture<WithAuthTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WithAuthTestComponent,
        WithAuthPipe
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithAuthTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
