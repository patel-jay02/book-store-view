import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { BookDeleteConfirmationDialogComponent } from './book-delete-confirmation-dialog/book-delete-confirmation-dialog.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: any[] = [];

  constructor(
    public dialog: MatDialog,
    private  bookService: BookService,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
   this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe(data => {
      if (data.result) {
        this.books = data.result;
      }
    });
  }

  editBook(_id: any) {
    this.router.navigate([`book/edit/${_id}`]);
  }

  deleteBook(_id: any) {
    this.bookService.deleteBook(_id).subscribe(data => {
      if (data.result) {
        this.notificationService.success('Book Deleted Successfully');
        this.getBooks();
      }
    });
  }

  deleteBookConfirm(_id: any) {
    const dialogRef = this.dialog.open(BookDeleteConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this book?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBook(_id);
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
