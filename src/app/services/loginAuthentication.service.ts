import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class LoginAuthenticationService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
      //console.log("the username is:"+username+"and the password is:"+password)
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8000/login/',JSON.stringify({ username: username, password: password }),options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    // return true to indicate successful login
                    return true;
                }
                 else {
                    // return false to indicate failed login
                    //console.log(response)
                    return false;
                }
            });


    }

    checkLoggedIn(): boolean {
      if (localStorage.getItem('currentUser')) {
          // logged in so return true
          return true;
      }
      else
      return false;
    }
    getToken() :string {
      if(localStorage.getItem('currentUser'))
        return localStorage.getItem('currentUser');
    }
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
