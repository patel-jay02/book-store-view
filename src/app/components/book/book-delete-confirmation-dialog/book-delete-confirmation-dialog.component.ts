import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book-delete-confirmation-dialog',
  templateUrl: './book-delete-confirmation-dialog.component.html',
  styleUrls: ['./book-delete-confirmation-dialog.component.css']
})
export class BookDeleteConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BookDeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
