import { Component, OnInit } from '@angular/core';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr';
import { Nauha } from '../Models/nauha-model';
import { NauhaService } from '../services/nauha-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  plyr: PlyrComponent;
  player: Plyr;
  nauhas:Nauha[];
 
  constructor(private nauhaService: NauhaService) { }

  ngOnInit(): void {
    this.getDetaults();
  }

  getDetaults(): void {
    this.nauhaService.getTopRankedNauhas().subscribe(
      (resp) => { this.nauhas = this.nauhaService.mapNauha(resp);  }
      
    );
    
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
