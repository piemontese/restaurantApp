import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'pie-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent implements OnInit {
  private id;
  private idSeat;
  table: any;
  private sub: any;
  private cssClass = '';

  constructor( private route: ActivatedRoute, private homeService: HomeService ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
       this.idSeat = +params['idSeat']; // (+) converts string 'id' to a number
    });
    this.table = this.homeService.get();
    const body = document.getElementsByTagName('body')[0];
    switch ( this.table.state ) {
      case 'free':
        this.cssClass = 'table-free';
        break;
      case 'busy':
        this.cssClass = 'table-busy';
        break;
      case 'reserved':
        this.cssClass = 'table-reserved';
        break;
    }
    body.classList.add(this.cssClass);
  }

  private ngOnDestroy() {
    this.sub.unsubscribe();
    let body = document.getElementsByTagName('body')[0]        
    body.classList.remove(this.cssClass);
  }
}
