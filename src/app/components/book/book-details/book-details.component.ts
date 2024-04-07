import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/services/notification.service';
import { BookDeleteConfirmationDialogComponent } from '../book-delete-confirmation-dialog/book-delete-confirmation-dialog.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  _id: any;
  book: any;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['_id'] != '0') {
        this._id = params['_id'];
        this.getBookDetails(params['_id']);
      }
    });
  }

  getBookDetails(_id: any) {
    this.bookService.getBook(_id).subscribe(data => {
      this.book = data.result;
      this.book.bookName = data.result.name,
        this.book.totalReader = data.result.total_reader,
        this.book.bookType = data.result.book_type
    });
  }

  back() {
    this.router.navigate(['']);
  }

  editBook() {
    this.router.navigate([`book/edit/${this._id}`]);
  }

  deleteBook(_id: any) {
    this.bookService.deleteBook(_id).subscribe(data => {
      if (data.result) {
        this.notificationService.success('Book Deleted Successfully');
        this.back();
      }
    });
  }

  deleteBookConfirm() {
    const dialogRef = this.dialog.open(BookDeleteConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this book?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBook(this._id);
      }
    });
  }
}
