import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: any[] = [];
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(
    public dialog: MatDialog,
    private bookService: BookService
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

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.books.length / this.pageSize);
    return new Array(pageCount).fill(0).map((_, index) => index + 1);
  }

  getPaginatedBooks(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.books.slice(startIndex, startIndex + this.pageSize);
  }
}
