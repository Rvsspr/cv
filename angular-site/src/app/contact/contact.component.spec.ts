import { TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, FormsModule]
    }).compileComponents();
  });

  it('should create the contact component', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
