import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { MessageBoxComponent } from '../components/common/message-box/message-box.component';

@Injectable()
export class MessageBoxService {

  constructor( private dialog: MdDialog ) { }

  public open( title, message, type ): Observable<boolean> {

    let dialogRef: MdDialogRef<MessageBoxComponent>;

    dialogRef = this.dialog.open(MessageBoxComponent, {
      panelClass: 'my-dialog-container',
//      width: '500px',
//      height: '80%',
      disableClose: true,  // modal
   });
   dialogRef.componentInstance.type = type;
   dialogRef.componentInstance.title = title;
   dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
  
}
