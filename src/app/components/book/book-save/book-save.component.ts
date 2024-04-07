import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-book-save',
  templateUrl: './book-save.component.html',
  styleUrls: ['./book-save.component.css']
})
export class BookSaveComponent implements OnInit {

  _id: any;
  submitted = false;
  bookForm: FormGroup;
  book: any

  constructor(
    public formBuilder: FormBuilder,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.bookForm = formBuilder.group({
      bookName: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      totalReader: ['', [Validators.required]],
      bookType: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      published: ['', [Validators.required]]
    });
  }

  get controls() { return this.bookForm.controls; }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['_id'] != '0') {
        this._id = params['_id'];
        this.getBookDetails(this._id);
      }
    });
  }

  getBookDetails(_id: any) {
    this.bookService.getBook(_id).subscribe(data => {
      this.book = data.result;
      this.book.bookName = data.result.name,
      this.book.totalReader = data.result.total_reader,
      this.book.bookType = data.result.book_type,
      this.bookForm.patchValue(this.book);
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.bookForm.invalid) {
      return;
    }
    const formData = this.bookForm.value;

    if (this._id && this._id.length > 0) {    
      this.bookService.updateBook(this._id, formData).subscribe(res => {
        this.notificationService.success('Updated Successfully');
        this.back();
      })
    } else {
      this.bookService.insertBook(formData).subscribe(res => {
        this.notificationService.success('Inserted Successfully');
        this.back();
      });
    }
  }

  back() {
    this.router.navigate(['']);
  }

  oneStepBack() {
    this.router.navigate([`book/details/${this._id}`]);
  }

}
