import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) { }

  sendN(N): Observable<any> {
    const URI = `/api/getTopN_FrequentWords/${N}`;
    return this.http.get(URI);
  }
  getMaxWordCount(): Observable<any> {
    const URI = `/api/getMaxWordCount`;
    return this.http.get(URI);
  }
}
