import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetchBooks(q: string): Observable<Book[]> {
    let params = new HttpParams();
    params = params.append('q', q);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ComicClanVettIO2019');
    return this.http.get<Book[]>('https://comicclan.vett.io/comics', { headers, params });
  }
}
