import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ResumeService } from '../services/resume.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <mat-card class="card">
      <div class="cv-header">
        <img src="assets/praneeth.jpg" alt="Praneeth" width="120" height="120" style="border-radius:12px" onerror="this.onerror=null;this.src='assets/avatar.svg'"/>
        <div>
          <div class="name">Praneeth Rekapalli</div>
          <div class="muted">Student at <strong><a href="https://www.osu.edu/">The Ohio State University</a></strong></div>
          <p style="max-width:700px">Detail-oriented Electrical and Computer Engineering major currently attending Ohio State University, with more than a year of work experience. Aiming to leverage a proven knowledge of computer aided engineering, process development, and productivity improvement skills to successfully fill the role at your company.</p>
          <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
            <a class="resume-btn" href="assets/resume.pdf" download>Download CV</a>
            <a class="resume-link muted" href="mailto:praneeth.rekapalli@gmail.com">Email</a>
          </div>
        </div>
      </div>

      <div style="margin-top:18px;display:flex;gap:18px;flex-wrap:wrap">
        <div style="flex:1;min-width:300px">
          <h3 style="margin-top:0">Experience</h3>
          <div class="card card--inner">
            <h4>Application Assistant</h4>
            <p class="muted">August — October 2018</p>
            <ul>
              <li>Supported daily operations and assisted with application tasks.</li>
            </ul>
            <h4>IT Assistant</h4>
            <p class="muted">August 2019 — 2020</p>
            <ul>
              <li>Provided IT support and troubleshooting for campus systems.</li>
            </ul>
          </div>

          <h3>Skills</h3>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <mat-chip-list>
              <mat-chip>Angular</mat-chip>
              <mat-chip>TypeScript</mat-chip>
              <mat-chip>Embedded Systems</mat-chip>
              <mat-chip>C/C++</mat-chip>
              <mat-chip>Web Development</mat-chip>
            </mat-chip-list>
          </div>

          <div *ngIf="parsed" style="margin-top:12px">
            <h4>Parsed resume preview</h4>
            <p class="muted">Email: {{ parsed.contact?.email || '—' }}</p>
            <p class="muted">Phone: {{ parsed.contact?.phone || '—' }}</p>
            <div *ngIf="parsed.sections?.experience">
              <h5>Experience (detected)</h5>
              <pre style="white-space:pre-wrap">{{ parsed.sections.experience || parsed.sections['work_experience'] || parsed.sections['work experience'] }}</pre>
            </div>
            <div *ngIf="parsed.sections?.education">
              <h5>Education (detected)</h5>
              <pre style="white-space:pre-wrap">{{ parsed.sections.education }}</pre>
            </div>
            <div *ngIf="parsed.sections?.skills">
              <h5>Skills (detected)</h5>
              <pre style="white-space:pre-wrap">{{ parsed.sections.skills }}</pre>
            </div>
          </div>
        </div>

        <div style="width:320px;min-width:220px">
          <mat-card class="card contact-list">
            <h3>Contact</h3>
            <p class="muted">1681 Little Bear Loop, Lewis Center, OH</p>
            <p class="muted">614-330-0549</p>
            <p class="muted">praneeth.rekapalli@gmail.com</p>
            <div style="margin-top:12px;display:flex;gap:8px">
              <a href="#" class="muted"><mat-icon>link</mat-icon> GitHub</a>
              <a href="#" class="muted"><mat-icon>link</mat-icon> LinkedIn</a>
            </div>
          </mat-card>
        </div>
      </div>
    </mat-card>
  `,
  styles: [`.muted{color:var(--muted)}`]
})
export class HomeComponent implements OnInit {
  parsed: any = null;
  constructor(private resume: ResumeService){}

  ngOnInit(): void{
    this.resume.fetchResume().subscribe({next: v => { this.parsed = v; }, error: e => { console.error(e); }});
  }
}
