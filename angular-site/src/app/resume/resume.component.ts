import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../services/resume.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2>Resume (parsed)</h2>
      <div *ngIf="parsed; else loading">
        <p class="muted">Email: {{ parsed.contact?.email || '—' }}</p>
        <p class="muted">Phone: {{ parsed.contact?.phone || '—' }}</p>

        <div *ngIf="parsed.experience_structured && parsed.experience_structured.length">
          <h3>Experience</h3>
          <div *ngFor="let item of parsed.experience_structured" class="card card--inner" style="margin-bottom:8px">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <strong>{{ item.title || '—' }}</strong>
                <div class="muted">{{ item.company || '—' }}</div>
              </div>
              <div class="muted">{{ item.start || '' }}{{ item.end ? ' — ' + item.end : '' }}</div>
            </div>
            <ul *ngIf="item.details && item.details.length">
              <li *ngFor="let d of item.details">{{ d }}</li>
            </ul>
          </div>
        </div>

        <div *ngFor="let key of sectionKeys()">
          <h3 style="text-transform:capitalize">{{ key }}</h3>
          <pre style="white-space:pre-wrap">{{ parsed.sections[key] }}</pre>
        </div>

        <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
          <button (click)="downloadJSON()" class="resume-btn">Download JSON</button>
          <button (click)="downloadText()" class="resume-btn">Download TXT</button>
          <button (click)="copyToClipboard()" class="resume-btn">Copy JSON</button>
          <button (click)="printResume()" class="resume-btn">Print / Save PDF</button>
        </div>
      </div>
      <ng-template #loading>
        <p class="muted">Loading parsed resume…</p>
      </ng-template>
    </div>
  `
})
export class ResumeComponent implements OnInit{
  parsed: any = null;
  constructor(private resume: ResumeService){}
  ngOnInit(): void{ this.resume.fetchResume().subscribe({next: v=> this.parsed = v, error: e=> console.error(e)}); }

  sectionKeys(){ return this.parsed ? Object.keys(this.parsed.sections || {}) : []; }

  downloadJSON(){
    const data = JSON.stringify(this.parsed, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'resume-parsed.json'; a.click(); URL.revokeObjectURL(url);
  }

  downloadText(){
    const data = this.parsed.rawText || '';
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'resume.txt'; a.click(); URL.revokeObjectURL(url);
  }

  copyToClipboard(){
    navigator.clipboard.writeText(JSON.stringify(this.parsed, null, 2)).then(()=>alert('Copied to clipboard'));
  }

  printResume(){
    // expand a printable view and call print
    window.print();
  }
}
