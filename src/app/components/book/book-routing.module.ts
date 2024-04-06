import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { BookSaveComponent } from './book-save/book-save.component';
import { BookDetailsComponent } from './book-details/book-details.component';

const routes: Routes = [
  {
    path: '',
    component: BookComponent,
    canActivateChild: [AuthGuard]
  },
  {
    path: 'add/:_id',
    component: BookSaveComponent
  },
  {
    path: 'edit/:_id',
    component: BookSaveComponent
  },
  {
    path: 'details/:_id',
    component: BookDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
