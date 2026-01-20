import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  constructor(private http: HttpClient) {}

  fetchResume(): Observable<any>{
    return this.http.get('/api/resume');
  }

  fetchSection(section: string): Observable<any>{
    return this.http.get(`/api/resume?section=${encodeURIComponent(section)}`);
  }

  sendContact(payload:any): Observable<any>{
    return this.http.post('/api/contact', payload);
  }
}
