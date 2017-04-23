import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
  private table: any;
  
  constructor() { }
  
  set( table: any ) { 
    this.table = table;
  }

  get() { 
    return this.table;
  }

}
