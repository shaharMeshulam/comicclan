import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'book', loadChildren: () => import('./components/book/book.module').then(m => m.BookModule) },
  { path: '', loadChildren: () => import('./components/search/search.module').then(m => m.SearchModule) },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
