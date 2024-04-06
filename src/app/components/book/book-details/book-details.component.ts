import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: any;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['_id'] != '0') {
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
}
