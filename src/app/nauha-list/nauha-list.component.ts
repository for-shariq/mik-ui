import { Component, OnInit,ViewChild } from '@angular/core';
import { NauhaService } from '../services/nauha-service.service';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr';
import { Nauha, ILocationGroup, ILocation } from '../Models/nauha-model';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../services/location-service.service';
import { element } from 'protractor';



@Component({
  selector: 'app-nauha-list',
  templateUrl: './nauha-list.component.html',
  styleUrls: ['./nauha-list.component.css']
})
export class NauhaListComponent implements OnInit {
    // get the component instance to have access to plyr instance
    // @ViewChild(PlyrComponent)
  nauhas:Nauha[];
  locationGroups: ILocationGroup = { "locations": [] };
  
  activatedRouteLocationGroupId = -1;
  activedRouteLocationId:number;
  selectedChildLocation:string = '';
  plyr: PlyrComponent;
  // or get it from plyrInit event
  player: Plyr

  constructor(private nauhaService: NauhaService, private route:ActivatedRoute, private locationService: LocationService) {

   }

  ngOnInit(): void {
   // this.activatedRouteLocationGroupId = this.route.snapshot.params.id;
   this.route.params.subscribe(routeParams => {
    this.activatedRouteLocationGroupId = routeParams.id;
    this.activedRouteLocationId = routeParams.nid;
    this.getDetaults();
    this.getLocationGroupsById();
    this.nauhas = [];
   // console.log('--->nid ' +routeParams.nid);
	});
  
    //console.log('---> ' +id);
    
  }
  getDetaults(): void {
    
    if(this.activedRouteLocationId != undefined)
    {
      this.nauhaService.getNauhasByLocation(this.activedRouteLocationId,1).subscribe(
        (resp) => { this.nauhas = this.nauhaService.mapNauha(resp);  }
        
      );
    } 
    // else { // all  nauhas
    //   this.nauhaService.getNauhas().subscribe(
    //         (resp) => { this.nauhas = this.nauhaService.mapNauha(resp);  }
            
    //       );
    // }    
  }
  
  getLocationGroupsById() {
    
    this.locationService.getLocationGroupsById(this.activatedRouteLocationGroupId).subscribe(
      (resp) => { 
        this.locationGroups.id = resp.id;
        this.locationGroups.name = resp.name;
        this.locationGroups.locations = [];
        if(resp.locations != undefined && resp.locations.length > 0)
        {
            this.locationGroups.locations = resp.locations;
        }
      
      }
    );
  }

  onClickLocationName(grp:ILocation){
    this.selectedChildLocation = grp.locationName;
    this.nauhaService.getNauhasByLocation(grp.locationId,1).subscribe(
      (resp) => { this.nauhas = this.nauhaService.mapNauha(resp);  }
      
    );
  }
  mapNauha(nauhas:any[]): Nauha[]{
    let _nha: Nauha;
    let result: Nauha[]=[];
debugger;
    nauhas.forEach (function(item){
      _nha = new Nauha(
              '',item.lyricist,
                item.orator,
                item.title,
                item.urlPath,
                item.locationDto.locationID,
                item.locationDto.locationName,
                item.description,
                new Date(item.year).getFullYear()
              )
  
      result.push(_nha);

    });
    return result;
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
