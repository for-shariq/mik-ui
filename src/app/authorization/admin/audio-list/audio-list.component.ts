import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location-service.service';
import { Location } from '../../../Models/location-model'
import { UserService } from 'src/app/services/user.service';
import { NauhaService } from 'src/app/services/nauha-service.service';
import { Nauha, INauha } from 'src/app/Models/nauha-model';

import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr';
import { NotificationService } from 'src/app/utilities/notification.service';
@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.css']
})
export class AudioListComponent implements OnInit {
  locations: Location[];
  nauhas: Nauha[];
  locationId:number = 1;
  selectedIsApproved: number = 2;
  selectedNauha: Nauha;
  isAuthenticated:boolean = false;

  plyr: PlyrComponent;
  // or get it from plyrInit event
  player: Plyr

  constructor(private locationService:LocationService, private userService: UserService, 
    private nauhaService:NauhaService, private notifService:NotificationService) { }

  ngOnInit(): void {
    this.getDefaults();
  }
  getDefaults(): void{
    //this.locationService.getAll().subscribe(loc => this.locations = loc);
    this.locationService.getAll().subscribe(
      (resp) => {        
        this.locations = resp;
      }
    );
       
  }

  onSearchClick() {
    this.userService.isAuthenticated().subscribe(
      (val) => {
        this.isAuthenticated = val;
      },
      err => { this.isAuthenticated = false}
    );
    if(this.locationId != undefined && this.isAuthenticated){
      this.nauhaService.getNauhasByLocation(this.locationId,this.selectedIsApproved).subscribe(
        (resp) => {          
          this.nauhas = this.nauhaService.mapNauha(resp);
         }
      )
    }
  }

  onEditClick(_nauha: Nauha): void{
    this.selectedNauha = _nauha;
  }

  onUpdateClick(): void{
    console.log(this.selectedNauha);
    var audio:INauha={};
    audio.id = this.selectedNauha.id;
    audio.description = this.selectedNauha.description;
    audio.title = this.selectedNauha.title
    audio.approved = this.selectedNauha.approved;
    audio.lyricist = this.selectedNauha.lyricist;
    audio.orator = this.selectedNauha.orator;
    audio.year = new Date(this.selectedNauha.year,1,1)
    audio.locationDto = {"locationName":this.selectedNauha.locationName, "locationId" : Number(this.selectedNauha.locationId)};   
    this.nauhaService.putNauha(audio).subscribe(
      (resp) => {
        this.notifService.showSuccess('Record updated successfully','Success');
      },
      err => {
        this.notifService.showError('Unable to update','Error');
      }
    );
  }

  onApprove(audios:Nauha[]):void {
    var ids:number[] =[];
    audios.forEach(function(item){
      ids.push(item.id);
    });
    this.nauhaService.putApprovedNauhas(ids).subscribe(
      (resp) => {
        this.notifService.showSuccess('Approved','Success');
      },
      err => {
        this.notifService.showError('Unable to approve','Error')
      }
    );
  }

  onDelete(audios:Nauha[]):void {
    console.log(audios);
  }

  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
  }
  
  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }
  pause(): void {
    this.player.pause(); // or this.plyr.player.play()
  }
  
  stop(): void {
    this.player.stop(); // or this.plyr.player.stop()
  }

}
