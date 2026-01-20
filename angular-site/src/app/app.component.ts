import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatCardModule],
  template: `
    <div class="app-shell">
      <mat-toolbar class="card toolbar">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-weight:600">Praneeth — CV</span>
        </div>
        <div class="nav">
          <a mat-button routerLink="/">Home</a>
          <a mat-button routerLink="/hobbies">Hobbies</a>
          <a mat-button routerLink="/contact">Contact</a>
          <a mat-button routerLink="/resume">Resume</a>
          <mat-slide-toggle (change)="toggleTheme($event.checked)">Dark</mat-slide-toggle>
        </div>
      </mat-toolbar>

      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  @HostBinding('class') hostClass = '';

  toggleTheme(isDark: boolean) {
    const body = document.body;
    if (isDark) {
      body.style.background = 'linear-gradient(180deg,#01040a 0%, #071029 100%)';
    } else {
      body.style.background = 'linear-gradient(180deg,#071029 0%, #0f1724 100%)';
    }
  }
}
