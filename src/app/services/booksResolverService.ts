import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BooksService } from './books.service';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksResolverService implements Resolve<Book[]> {
  constructor(private booksService: BooksService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const books = this.booksService.getBooks;
    if (!books) {
      return this.booksService.fetchBooks();
    } else {
      return books;
    }
  }
}
