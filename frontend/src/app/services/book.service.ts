import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BookService {

    //TODO
    //importar controller

  private apiUrl = 'https://dbb1g3b8aa.execute-api.us-east-1.amazonaws.com/api/books';

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<any[]>(`${this.apiUrl}/`);;
  }

  getBooksById() {
    return this.http.get<any[]>(`${this.apiUrl}/{id}`);;
  }

  searchBooks(query: string) {
  return this.http.get<any[]>(`${this.apiUrl}?q=${query}`);
  }


}
