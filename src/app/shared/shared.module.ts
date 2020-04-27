import { NgModule } from '@angular/core';
import { BookListModule } from './book-list/book-list.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    BookListModule
  ],
  exports: [
    CommonModule,
    BookListModule
  ]
})
export class SharedModule {}
