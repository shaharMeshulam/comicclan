import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SortByPipe } from 'src/app/pipes/sort-by.pipe';
import { BooksResolverService } from 'src/app/services/booksResolverService';


@NgModule({
  declarations: [
    SearchComponent,
    SortByPipe
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: '/year', pathMatch: 'full' },
      { path: ':groupBy', component: SearchComponent, resolve: [BooksResolverService] }
    ])
  ]
})
export class SearchModule {}
