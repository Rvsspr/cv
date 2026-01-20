import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ResumeService } from '../services/resume.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <mat-card class="card">
      <h1>Contact Details</h1>
      <p>1681 Little Bear Loop, Lewis Center, OH</p>
      <p>614-330-0549</p>
      <p>praneeth.rekapalli@gmail.com</p>
      <hr>

      <form (ngSubmit)="submit()" novalidate style="display:grid;gap:12px;max-width:560px">
        <mat-form-field appearance="fill">
          <mat-label>Your Name</mat-label>
          <input matInput name="yourName" [(ngModel)]="model.name">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Your Email</mat-label>
          <input matInput type="email" name="yourEmail" [(ngModel)]="model.email">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Your Message</mat-label>
          <textarea matInput name="yourMessage" rows="6" [(ngModel)]="model.message"></textarea>
        </mat-form-field>

        <div style="display:flex;gap:12px;align-items:center">
          <button mat-flat-button color="primary">Send</button>
          <small style="color:var(--muted)">Messages will be emailed or saved to `server/messages.log` when SMTP is not configured.</small>
        </div>
      </form>
    </mat-card>
  `,
  styles: [`mat-form-field{background:#071423;border-radius:8px}`]
})
export class ContactComponent {
  model = { name: '', email: '', message: '' };
  constructor(private resume: ResumeService){}

  submit(){
    this.resume.sendContact(this.model).subscribe({next: (r:any)=>{
      alert('Message sent. Thank you!');
      this.model = { name: '', email: '', message: '' };
    }, error: (e:any)=>{
      console.error(e);
      alert('Failed to send message; check server logs.');
    }});
  }
}
