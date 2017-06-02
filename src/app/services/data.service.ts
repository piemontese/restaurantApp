import { Injectable } from '@angular/core';

import { UserData } from "../data/user-data";

@Injectable()
export class DataService {
  public userData = new UserData( "", "", "", "", false, "");
  
  constructor() {}
  
  setUserData( userData: UserData ) {
    this.userData = userData;
  }
  
  getUserData(): UserData {
    return this.userData;
  }
  
  unset() {
    this.userData.unset();
  }

}
