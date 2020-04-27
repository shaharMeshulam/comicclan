import { NgModule } from '@angular/core';
import { BookComponent } from './book.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [
    BookComponent,
    RatingComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: BookComponent }])
  ]
})
export class BookModule {}
