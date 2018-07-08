import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'pie-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
  public title = '';
  public message = '';
  public type = 'info';

  constructor( public messageBox: MdDialogRef<MessageBoxComponent> ) { }

  ngOnInit() {
  }

}
