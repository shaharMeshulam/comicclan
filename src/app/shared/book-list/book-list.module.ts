import { NgModule } from '@angular/core';
import { BookListComponent } from './book-list.component';
import { BookTeaserComponent } from './book-teaser/book-teaser.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BookListComponent,
    BookTeaserComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BookListComponent,
    BookTeaserComponent
  ]
})
export class BookListModule {}
