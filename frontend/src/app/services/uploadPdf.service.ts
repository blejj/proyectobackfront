import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadPdfService {
  private apiUrl = 'https://dbb1g3b8aa.execute-api.us-east-1.amazonaws.com/api/upload';

  constructor(private http: HttpClient) {}

  uploadPdf(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('pdf', file);

    return this.http.post(`${this.apiUrl}`, formData);
  }

  listFiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
