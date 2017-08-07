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
/*
  tables: Array<any> = [
    { number: 1, seats: 4, state: 'busy', hover: '', Seats: [1, 2] },
    { number: 2, seats: 4, state: 'free', hover: '', Seats: [] },
    { number: 3, seats: 4, state: 'free', hover: '', Seats: [] },
    { number: 4, seats: 4, state: 'reserved', hover: '', Seats: [] },
    { number: 5, seats: 6, state: 'free', hover: '', Seats: [] },
    { number: 6, seats: 6, state: 'busy', hover: '', Seats: [1, 2, 3] },
    { number: 7, seats: 2, state: 'free', hover: '', Seats: [] },
    { number: 8, seats: 2, state: 'free', hover: '', Seats: [] },
    { number: 9, seats: 2, state: 'free', hover: '', Seats: [] },
    { number: 10, seats: 2, state: 'free', hover: '', Seats: [] },
    { number: 11, seats: 2, state: 'free', hover: '', Seats: [] },
    { number: 12, seats: 2, state: 'free', hover: '', Seats: [] }
  ];
*/  
  tables: Array<any> = [
    { number: 1, seats: 4, state: 'busy', hover: '', enabled: false, Seats: [ { number: 1, busy: true },
                                                              { number: 2, busy: true },
                                                              { number: 3, busy: false },
                                                              { number: 4, busy: false }] },
    { number: 2, seats: 4, state: 'free', hover: '', enabled: false, Seats: [ { number: 1, busy: false },
                                                              { number: 2, busy: false },
                                                              { number: 3, busy: false },
                                                              { number: 4, busy: false }] },
    { number: 3, seats: 4, state: 'free', hover: '', enabled: false, Seats: [ { number: 1, busy: false },
                                                              { number: 2, busy: false },
                                                              { number: 3, busy: false },
                                                              { number: 4, busy: false }] },
    { number: 4, seats: 4, state: 'reserved', hover: '', enabled: false, Seats: [ { number: 1, busy: true },
                                                                  { number: 2, busy: true },
                                                                  { number: 3, busy: false },
                                                                  { number: 4, busy: false }] },
    { number: 5, seats: 6, state: 'free', hover: '', enabled: false, Seats: [ { number: 1, busy: false },
                                                              { number: 2, busy: false },
                                                              { number: 3, busy: false },
                                                              { number: 4, busy: false },
                                                              { number: 4, busy: false },
                                                              { number: 4, busy: false }] },
    { number: 6, seats: 6, state: 'busy', hover: '', enabled: false, Seats: [ { number: 1, busy: true },
                                                              { number: 2, busy: true },
                                                              { number: 3, busy: true },
                                                              { number: 4, busy: false },
                                                              { number: 5, busy: false },
                                                              { number: 6, busy: false }] },
    { number: 7, seats: 2, state: 'free', hover: '', enabled: false, Seats: [ { number: 1, busy: false },
                                                              { number: 2, busy: false }] },
    { number: 8, seats: 2, state: 'free', hover: '', enabled: false, Seats: [ { number: 1, busy: false },
                                                              { number: 2, busy: false }] },
    { number: 9, seats: 2, state: 'free', hover: '', enabled: false, Seats: [ { number: 1, busy: false },
                                                              { number: 2, busy: false }] },
    { number: 10, seats: 2, state: 'free', hover: '', enabled: false, Seats: [ { number: 1, busy: false },
                                                               { number: 2, busy: false },
                                                               { number: 3, busy: false },
                                                               { number: 4, busy: false }] },
    { number: 11, seats: 2, state: 'free', hover: '', enabled: false, Seats: [ { number: 1, busy: false },
                                                               { number: 2, busy: false }] },
    { number: 12, seats: 2, state: 'free', hover: '', enabled: false, Seats: [ { number: 1, busy: false },
                                                               { number: 2, busy: false }] }
  ];
  
  constructor( private router: Router, private homeService: HomeService, private dataService: DataService ) { 
  }

  cardClicked( id: number, idSeat: number ) { 
    console.log("Clicked table " + (id + 1));
    this.visible = false;
//    this.router.navigate(['/home/table-detail', {id, idSeat}]);
    this.router.navigate(['/home/table-detail', id]);
    this.homeService.set(this.tables[id]);
  }

  addSeat( i: number) {
    for( let j=0; j<this.tables[i].Seats.length; j++ ) {
      if( this.tables[i].state === 'reserved' ) {
        break;
      }
      else {
        if( this.tables[i].Seats[j].busy === false ) {
          this.tables[i].Seats[j].busy = true;
          break;
        }
      }
    }
    this.tables[i].state = 'busy';
    console.log(this.tables[i]);
  }

  removeSeat( i: number ) {
    for( let j=this.tables[i].Seats.length-1; j>=0; j-- ) {
      if( this.tables[i].Seats[j].busy === true ) {
        this.tables[i].Seats[j].busy = false;
        if( j === 0 ) this.tables[i].state = 'free';
        break;
      }
    }
    console.log(this.tables[i]);
  }

  enable( i: number ) {
    this.tables[i].enabled = !this.tables[i].enabled;
    console.log(this.tables[i].enabled);
  }
  
  ngOnInit() {
    this.userData = this.dataService.getUserData();
    console.log(this.dataService);
  }

}
