import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-teaser',
  templateUrl: './book-teaser.component.html',
  styleUrls: ['./book-teaser.component.scss']
})
export class BookTeaserComponent implements OnInit {
  @Input() book: Book;

  constructor() { }

  ngOnInit() {
  }

}
