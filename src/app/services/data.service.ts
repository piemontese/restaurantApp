import { Injectable } from '@angular/core';

import { UserData } from "../data/user-data";

@Injectable()
export class DataService {
  public userData = new UserData( "", "", "", "");
  
  constructor() {}
  
  setUserData( userData: UserData ) {
    debugger;
    this.userData = userData;
  }
  
  getUserData(): UserData {
    debugger;
    return this.userData;
  }

}
