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
  private table: any;
  private sub: any;
  
  constructor( private route: ActivatedRoute, private homeService: HomeService ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.table = this.homeService.get();
  }

  private ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
