import { Component, OnInit, OnDestroy, ViewChild, ElementRef, DefaultIterableDiffer } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book, BooksGroup } from 'src/app/models/book.model';
import { Subscription } from 'rxjs';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  books: BooksGroup[];
  groupBy = 'year';
  query = '';

  private fetchSubscription: Subscription;
  private inputSubscription: Subscription;
  private paramSubscription: Subscription;

  constructor(private booksService: BooksService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.query = this.booksService.getQuery;

    // Subscribe to any books fetch
    this.fetchSubscription = this.booksService.onFetchBooks.subscribe(() => {
      this.books = this.makeGroups();
    });

    // Subscribe to route params change
    this.paramSubscription = this.route.params.subscribe(params => {
      this.groupBy = params.groupBy;
      this.booksService.setSelectedGrouping = this.groupBy;
      this.books = this.makeGroups();
    });

    // Debounce search input
    this.inputSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      debounceTime(600),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.booksService.fetchBooks().subscribe();
    });
  }

  onInput(e: Event) {
    this.booksService.setQuery = (e.target as HTMLInputElement).value;
  }

  private makeGroups(): BooksGroup[] {
    const books = this.booksService.getBooks;
    const groupBy = this.groupBy;
    if (groupBy !== 'random') {
      // If group is not random.
      const map = {}; // Dictionary map.
      return books.reduce((booksGroup: BooksGroup[], book) => {
        const groupName: string = book[groupBy].toString();
        const group: BooksGroup = map[groupName];
        if (group) {
          // If group exist on dictionary -> push the current book to te existing group.
          group.books.push(book);
        } else {
          // If group does not exist -> create the new group with one book item,
          // Push group to returned array & save the group in dictionary.
          const bookGroup = new BooksGroup(groupName, [book]);
          booksGroup.push(bookGroup);
          map[groupName] = bookGroup;
        }
        return booksGroup;
      }, []);
    } else {
      // If group is random.
      const booksGroup = [new BooksGroup(groupBy, this.shuffle(books))];
      return booksGroup;
    }
  }

  private shuffle(array: Book[]): Book[] {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  ngOnDestroy() {
    this.fetchSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
    this.inputSubscription.unsubscribe();
  }

}
