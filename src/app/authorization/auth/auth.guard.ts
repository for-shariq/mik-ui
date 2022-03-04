import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean = false;

  /**
   *
   */
  constructor(private route: Router,private authService: UserService) {
    
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.authService.isAuthenticated().subscribe(
        (val) => {
          this.isAuthenticated = val;
        },
        err => { this.isAuthenticated = false}
      );   

      if(this.isAuthenticated)
        return true;
      else
      {
        this.route.navigate(['/']);
      }
        
      
  }
  
}
