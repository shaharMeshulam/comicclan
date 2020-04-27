import { Component, OnInit, Input, ViewChild, ElementRef, AfterContentInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  @Input() list: Book[];
  @Input() autoSizing = false;
  @ViewChild('bookList', { static: true }) bookList: ElementRef;
  maxItemsPerRow = 5;
  leftovers: any[];
  isInit: boolean;

  constructor(private booksService: BooksService, private router: Router) { }

  ngOnInit() {
    this.onResize();
  }

  onBookSelected(selectedBook: Book) {
    this.booksService.selectedBook.next(selectedBook);
    this.router.navigate(['/book']);
  }

  onResize() {
    // This function compute "leftOvers" - number of items to complete the flex last row;
    // In Addition - it allso compute maximum number of items per row by the width of the ul element -
    // This is for controling wich element is getting the .not-last-in-row class and allso to compute the "leftOvers".
    const elemWidth = this.bookList.nativeElement.offsetWidth;
    const childWidth = 265; // Width of first list item.
    this.maxItemsPerRow = Math.ceil(elemWidth / childWidth);

    if (!this.autoSizing) {
      if (this.maxItemsPerRow > 5) {
        this.maxItemsPerRow = 5;
      }
    }
    if ((this.maxItemsPerRow * childWidth) - 65 > elemWidth) {
      this.maxItemsPerRow -= 1;
    }
    const leftOver = this.list.length % this.maxItemsPerRow;
    const numOfLeftOvers = leftOver === 0 ? 0 : this.maxItemsPerRow - leftOver;
    this.leftovers = this.array(numOfLeftOvers);
  }

  private array(n: number): any[] {
    if (n === 0 || isNaN(n)) {
      return [];
    }
    return Array(n);
  }

}
