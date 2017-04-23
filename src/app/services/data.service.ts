import { Injectable } from '@angular/core';

import { User } from "../data/user";

@Injectable()
export class DataService {
  public user: User;
  
  constructor() { }

}
