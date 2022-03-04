import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LocationService } from '../services/location-service.service';
import { Location } from '../Models/location-model'
import { ILocationGroup } from '../Models/nauha-model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  locations:ILocationGroup[] = [];
  isAuthenticated: boolean;
  
  constructor(private userService:UserService,private locationService: LocationService) { }

  ngOnInit(): void {
    //this.isAuthenticated = this.userService.isAuthenticated();
    this.userService.isAuthenticated().subscribe(
      (val) => {
        this.isAuthenticated = val;
      },
      err => { this.isAuthenticated = false}
    );
    this.getLocations();
  }

  getLocations():void{
    this.locationService.getLocationGroupsAll().subscribe(
      (resp) => {        
        this.locations = resp;
      }
    );
  }

  onLogout(): void {
    localStorage.removeItem('token');    
  }

}
