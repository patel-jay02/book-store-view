import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDeleteConfirmationDialogComponent } from './book-delete-confirmation-dialog.component';

describe('BookDeleteConfirmationDialogComponent', () => {
  let component: BookDeleteConfirmationDialogComponent;
  let fixture: ComponentFixture<BookDeleteConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDeleteConfirmationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDeleteConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
