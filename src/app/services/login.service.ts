import { Injectable, isDevMode } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { DataService } from './data.service';
import { MessageBoxService } from './message-box.service';
import { UserData } from '../data/user-data';

@Injectable()
export class LoginService {
  private url = isDevMode() ? 'http://localhost/angular2/angular-cli/apps/restaurantApp/src/php/api.php' : 'php/api.php';
  private data: any;

  constructor( private http: Http, private router: Router,
               private dataService: DataService,
               private messageBoxService: MessageBoxService ) {}

  login( user: string, password: string ) {
    console.log(user + ' ' + password);
    const data = [ user, password ];
    const postData = {
        'method': 'userLogin',
        'language': 'en',
        'data': data
      };
/*
    this.http.post(this.url, JSON.stringify(postData) )
      .subscribe( response => { this.data = response.json() },
          () => {},
          () => { console.log(this.data);
              if ( this.data.errCode === 0 && this.data.table.length > 0 ) {
                //alert( this.data.table[0].userType + " - " + this.data.table[0].userTypeDescription + " - " + this.data.table[0].user + " - " + this.data.table[0].firstName + " " + this.data.table[0].lastName );
                let userData = new UserData( this.data.table[0].user, this.data.table[0].firstName, this.data.table[0].lastName, this.data.table[0].userType, this.data.table[0].isLogged, this.data.table[0].userTypeDescription );
                this.dataService.setUserData( userData );
                switch ( this.data.table[0].userType ) {
                    case "GLOBAL_ADMIN":
                    case "LOCAL_ADMIN":
                      this.router.navigate(['admin']); 
                      break;
                    case "WAITER":
                      this.router.navigate(['home']); 
                      break;
                    default:
//                      this.router.navigate(['home']); 
                      break;
                }; 
              }
              else {
                alert(this.data.errMsg);
              }
              return this.data;
            }
      ),  (err) => { 
        console.log(err) 
    };
  */

    this.http.post(this.url, JSON.stringify(postData))
             .toPromise()
             .then(response => {
                this.data = response.json();
                console.log(this.data);
                if ( this.data.errCode === 0 && this.data.table.length > 0 ) {
                  // alert( this.data.table[0].userType + " - " + this.data.table[0].userTypeDescription + " - " + this.data.table[0].user + " - " + this.data.table[0].firstName + " " + this.data.table[0].lastName );
                  const userData = new UserData( this.data.table[0].user, this.data.table[0].firstName, this.data.table[0].lastName, this.data.table[0].userType, this.data.table[0].isLogged, this.data.table[0].userTypeDescription );
                  this.dataService.setUserData( userData );
                  switch ( this.data.table[0].userType ) {
                      case 'GLOBAL_ADMIN':
                      case 'LOCAL_ADMIN':
                        this.router.navigate(['admin']);
                        break;
                      case 'WAITER':
                        this.router.navigate(['home']);
                        break;
                      default:
  //                      this.router.navigate(['home']);
                        break;
                  };
                } else {
//                  alert(this.data.errMsg);
                  this.messageBoxService.open( 'Login', this.data.errMsg, 'info' );
                }
                return this.data;
             })
             .catch(this.handleError);

  }

  private handleError(err: any): Promise<any> {
    console.error('An error occurred', err);
    console.log('ERROR');
    alert(err.message || err);
//    this.messageBoxService.open( "Login", "Errore login", "error");
    return Promise.reject(err.message || err);
  }

}

