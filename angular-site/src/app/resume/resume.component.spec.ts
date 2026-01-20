import { TestBed } from '@angular/core/testing';
import { ResumeComponent } from './resume.component';

describe('ResumeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeComponent]
    }).compileComponents();
  });

  it('should create the resume component', () => {
    const fixture = TestBed.createComponent(ResumeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
