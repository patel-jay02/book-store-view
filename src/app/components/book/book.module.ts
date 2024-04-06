import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BookSaveComponent } from './book-save/book-save.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookDeleteConfirmationDialogComponent } from './book-delete-confirmation-dialog/book-delete-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    BookComponent,
    BookSaveComponent,
    BookDetailsComponent,
    BookDeleteConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class BookModule { }
