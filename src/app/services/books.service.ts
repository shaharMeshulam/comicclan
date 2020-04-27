import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../models/book.model';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  onFetchBooks = new Subject<boolean>();
  selectedBook = new BehaviorSubject<Book>(null);

  private books: Book[];
  private query = '';
  private selectedGrouping = 'year';

  constructor(private apiService: ApiService) { }

  fetchBooks(): Observable<Book[]> {
    return this.apiService.fetchBooks(this.query).pipe(
      tap(books => {
        this.books = books;
        this.onFetchBooks.next(true);
      })
    );
  }

  get getBooks(): Book[] {
    return this.books ? [...this.books] : null;
  }

  get getQuery(): string {
    return this.query;
  }

  set setQuery(q: string) {
    this.query = q;
  }

  get getSelectedGrouping(): string {
    return this.selectedGrouping;
  }

  set setSelectedGrouping(selectedGroup: string) {
    this.selectedGrouping = selectedGroup;
  }

  get randomBooks(): Book[] {
    const randoms = [];
    while (randoms.length < 5) {
      const randomBook = this.books[Math.floor(Math.random() * this.books.length)];
      if (!randoms.includes(randomBook)) {
        randoms.push(randomBook);
      }
    }

    return randoms;
  }
}
