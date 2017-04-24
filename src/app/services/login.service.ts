import { Injectable, isDevMode } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";  
import { Router } from "@angular/router";

import { DataService } from "./data.service";
import { UserData } from "../data/user-data";

@Injectable()
export class LoginService {
  private url = isDevMode() ? "http://localhost/angular2/angular-cli/apps/restaurantApp/src/php/api.php" : "php/api.php";
  private data: any;

  constructor( private http: Http, private router: Router, private dataService: DataService ) { }

  login( user: string, password: string ) { 
    console.log(user + " " + password);
    let data = [ user, password ];
    let postData = {
        'method': 'userLogin',
        'data': data
      };
    this.http.post(this.url, JSON.stringify(postData) )
      .catch(this.handleError)
          .subscribe( response => { this.data = response.json() },
              () => {},
              () => { console.log(this.data);
                      if ( this.data.errCode === 0 ) {
                        alert( this.data.table[0].userType + " - " + this.data.table[0].user + " - " + this.data.table[0].firstName + " " + this.data.table[0].lastName );
                        debugger;
                        let userData = new UserData( this.data.table[0].user, this.data.table[0].firstName, this.data.table[0].lastName, this.data.table[0].userType );
                        this.dataService.setUserData( userData );
                        this.router.navigate(['home']); 
                      }
                      else
                        alert(this.data.errMsg);
                      return this.data;
                    }
            ),  (errorResponse: any) => { 
                console.log('timeout error') 
            };
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    console.log('ERROR');
    alert(error.message || error);
    return Promise.reject(error.message || error);
  }
      
}

  