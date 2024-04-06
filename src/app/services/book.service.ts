import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { insertUpdateBookRequest } from '../common.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private BASE_URL = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/book/store/api/v1/books`);
  }

  getBook(_id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/book/store/api/v1/books/${_id}`);
  }

  insertBook(data: insertUpdateBookRequest): Observable<any> {
    return this.http.post(`${this.BASE_URL}/book/store/api/v1/books`, data);
  }

  updateBook(_id: string, data: insertUpdateBookRequest): Observable<any> {
    return this.http.put(`${this.BASE_URL}/book/store/api/v1/books/${_id}`, data);
  }

  deleteBook(_id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/book/store/api/v1/books/${_id}`);
  }

}
