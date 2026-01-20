import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { ContactComponent } from './contact/contact.component';
import { ResumeComponent } from './resume/resume.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hobbies', component: HobbiesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'resume', component: ResumeComponent },
  { path: '**', redirectTo: '' }
];
