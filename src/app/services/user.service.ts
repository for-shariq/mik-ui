import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, pipe, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { LoginModel } from '../Models/login-model';
import { LoggerService } from './logger.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiUrl;
  isUserAuthenticated$ = new BehaviorSubject(false);

  constructor(private _http: HttpClient, private logger:LoggerService) { }

  isAuthenticated() : Observable<boolean> {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    let jwtHelper = new JwtHelperService();

     this.isUserAuthenticated$.next(!jwtHelper.isTokenExpired(token));
     return this.isUserAuthenticated$;
  }

  login(login:LoginModel)
  {
    const url= `${this.baseUrl}/api/account/login`
    return this._http.post<LoginModel>(url,login).pipe(
          catchError(this.logger.handleError<LoginModel>('login'))
     );
  }
  getTokenHeader():HttpHeaders
  {
    const token = localStorage.getItem('token');
    var tokenHeader = new HttpHeaders({'Authorization': `Bearer ${token}`});
    //var tokenHeader = new HttpHeaders();
    //tokenHeader.append('Authorization', `Bearer ${token}`);
    return tokenHeader;
  }





  
}
