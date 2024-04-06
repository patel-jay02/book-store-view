import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { BookComponent } from './components/book/book.component';
import { UnauthGuard } from './guards/unauth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  // { path: 'book', component: BookComponent, canActivate: [AuthGuard] },
  {
    path: 'book',
    loadChildren: () => import('./components/book/book.module').then((m) => m.BookModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
