import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from '../../services/home.service';

import { DataService } from "../../services/data.service";
import { UserData } from "../../data/user-data";

@Component({
  selector: 'pie-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService/*, DataService*/]
})
export class HomeComponent implements OnInit {
  @Input() visible: boolean = true;
  userData: UserData;
  prices: Array<any>;
  tables: Array<any> = [
    { number: 1, seats: 4, state: 'busy' },
    { number: 2, seats: 4, state: 'free' },
    { number: 3, seats: 4, state: 'free' },
    { number: 4, seats: 4, state: 'reserved' },
    { number: 5, seats: 6, state: 'free' },
    { number: 6, seats: 6, state: 'busy' },
    { number: 7, seats: 2, state: 'free' },
    { number: 8, seats: 2, state: 'free' },
    { number: 9, seats: 2, state: 'free' },
    { number: 10, seats: 2, state: 'free' },
    { number: 11, seats: 2, state: 'free' },
    { number: 12, seats: 2, state: 'free' }
  ];
  
  constructor( private router: Router, private homeService: HomeService, private dataService: DataService ) { 
  }

  cardClicked( id: number ) { 
    console.log("Clicked table " + (id + 1));
    this.visible = false;
    this.router.navigate(['/home/table-detail', id]);
    this.homeService.set(this.tables[id]);
  }

  ngOnInit() {
    debugger;
    this.userData = this.dataService.getUserData();
    console.log(this.dataService);
  }

}
