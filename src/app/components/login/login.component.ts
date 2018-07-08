import { Component, Inject, OnInit, OnDestroy, isDevMode, Directive, ElementRef, Renderer } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { LoginService } from '../../services/login.service';
import { DataService } from '../../services/data.service';
import { UserData } from '../../data/user-data';

@Component({
  selector: 'pie-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService/*, DataService*/]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private url = isDevMode() ? 'http://localhost/angular2/angular-cli/apps/restaurantApp/src/php/api.php' : 'php/api.php';
  private data: any;
  userData: UserData;
  user = '';
  password = '';


  constructor( @Inject(FormBuilder) fb: FormBuilder, private loginService: LoginService, private http: Http, private router: Router, private dataService: DataService ) {
    this.form = fb.group({
      name: fb.group({
        user: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(4)]],
      }),
    });
  }

  getTestData(): Promise<any> {
    const data = [ btoa(this.user), btoa(this.password) ];
    const postData = {
        'method': 'userLogin',
        'data': data
      };
    /*
    this.http.post(this.url, JSON.stringify(postData) )
          .catch(this.handleError)
          .subscribe( response => { this.data = response.json() },
              () => {},
              () => { console.log(this.data);
                      this.user = "";
                      this.password = "";
                      if ( this.data.errCode === 0 ) {
                        //alert( this.data.table[0].userType + " - " + this.data.table[0].user + " - " + this.data.table[0].firstName + " " + this.data.table[0].lastName );
                        this.router.navigate(['home']);
                      }
                      else
                        alert(this.data.errMsg);
                      return this.data;
                    }
            ),  (errorResponse: any) => {
                console.log('timeout error')
            };
    */

    return this.http
      .post(this.url, JSON.stringify(postData) )
      .toPromise()
      .then((response: Response) => { this.data = response.json().data; console.log(this.data); })
      .catch(this.handleError);
  }
    
  login() {
//    this.dataService.unset();
    this.loginService.login( btoa(this.user), btoa(this.password) );
//    let promise: Promise<any> = this.getTestData();
//    console.log(this.data);
/*
    console.log(this.data);
    if ( this.data.errCode === 0 )
      this.router.navigate(['home']);    
*/
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    console.log('ERROR');
    return Promise.reject(error.message || error);
  }

  ngOnInit() {
    this.dataService.unset();
  }

  ngOnDestroy() {
    this.user = this.password = '';
    console.log(this.dataService);
  }

}

/*
@Directive({
    selector: '[autofocus]'
})
export class Autofocus
{
    constructor(private el: ElementRef, private renderer: Renderer)
    {
    }

    ngOnInit()
    {
      debugger;
    }

    ngAfterViewInit()
    {
        this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);
    }
}
*/
