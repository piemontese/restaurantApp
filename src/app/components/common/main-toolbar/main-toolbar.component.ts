import { Component, OnInit } from '@angular/core';

import { DataService } from "../../../services/data.service";
import { UserData } from "../../../data/user-data";

@Component({
  selector: 'pie-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {
  constructor( private dataService: DataService ) { }

  getWelcome(): string {
    debugger;
    let welcome = "";
    if ( this.dataService.getUserData().getName() !== ""  )
      welcome = "Welcome " + this.dataService.getUserData().getFirstName() + " " + this.dataService.getUserData().getLastName() + " ";
    return welcome;
  }

  ngOnInit() {
  }

}
