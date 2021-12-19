import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCopierComponent } from './content-copier.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContentCopierComponent', () => {
  let component: ContentCopierComponent;
  let fixture: ComponentFixture<ContentCopierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentCopierComponent ],
      imports: [
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCopierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
