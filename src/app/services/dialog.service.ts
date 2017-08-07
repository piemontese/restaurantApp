import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ConfirmDialogComponent } from '../components/common/confirm-dialog/confirm-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  public confirm(title: string, message: string): Observable<boolean> {
      let dialogRef: MdDialogRef<ConfirmDialogComponent>;

      dialogRef = this.dialog.open(ConfirmDialogComponent, {
        height: '240px',
        width: '400px',
      });
      dialogRef.componentInstance.title = title;
      dialogRef.componentInstance.message = message;

      return dialogRef.afterClosed();
    }

}
