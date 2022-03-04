import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from 'src/app/Models/login-model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/utilities/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel = { username: '', password: ''};

  constructor(private userService: UserService, private router: Router, private notifService: NotificationService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    
    this.userService.login(this.loginModel).subscribe(
      (resp:any) => {
        localStorage.setItem('token',resp.token);
        debugger;
        this.router.navigateByUrl('/admin/audio-list')
      },
      err=> {
        console.log(err);
        this.notifService.showError('Incorrect Username or password','Authentication Error');
      } 
    )

  }

}
