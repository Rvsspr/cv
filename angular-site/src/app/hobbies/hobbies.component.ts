import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-hobbies',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="card">
      <h2>Hobbies</h2>
      <ol>
        <li>Playing video games</li>
        <li>Watching movies</li>
      </ol>
    </mat-card>
  `,
  styles: [`ol{margin:8px 0 0 18px}`]
})
export class HobbiesComponent {}
