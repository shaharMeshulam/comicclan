import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {
  book: Book;
  randoms: Book[];

  private subscription: Subscription;

  constructor(private booksService: BooksService, private router: Router) { }

  ngOnInit() {
    // Subscribe to selectedBook change.
    this.subscription = this.booksService.selectedBook.subscribe(book => {
      this.book = book;
      if (!this.randoms && this.book) {
        this.randoms = this.booksService.randomBooks;
      }
    });
  }

  onBack() {
    const selectedGrouping = this.booksService.getSelectedGrouping;
    this.router.navigate([`/${selectedGrouping}`]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
