import { Component, OnInit } from '@angular/core';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr';
import { Nauha, IVideo } from 'src/app/Models/nauha-model';
import { VideoService } from 'src/app/services/video.service';
import { NotificationService } from 'src/app/utilities/notification.service';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  // plyr: PlyrComponent;
  // player: Plyr;
  // videoSources: Plyr.Source[] = [
  //   {
  //     src: 'assets/home_videoaudio.mp4',
  //     type: 'video/mp4',
  //   }
    
  // ];
 
  // tracks: Nauha[] = [
  //   {
  //     "title" : "Thar Dhit Dewaras",
  //     "locationName" : "Doonipora",
  //     "description": "Nouha Donipora | Thar Dhit Dewaras | Muneer Murtaza | Aga Syed Danish Rizvi",
  //     "name":"",
  //     "orator": "Muneer Murtaza",
  //     "url": "https://www.youtube.com/watch?v=qhBGR2P_jt0",
  //     "lyricist": "Unknown"
  //   }
  // ];

  videos:IVideo[] = [];
  contentType:number = 0;
  constructor(private videoService: VideoService,private notifService:NotificationService,private route:ActivatedRoute,private sanitizer:DomSanitizer) {
    this.route.params.subscribe(routeParams => {
      this.contentType = routeParams.id; 
      this.getVideos();    
    });

   }

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(){
    if(this.contentType == undefined) this.contentType = 0;
    this.videoService.getVideoByContentType(this.contentType).subscribe(
      (resp) =>  { this.videos = resp }
    );
  }
  sanitizeUrl(embedUrl)
  {
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  

  // played(event: Plyr.PlyrEvent) {
  //   console.log('played', event);
  // }
  // play(): void {
  //   this.player.play(); // or this.plyr.player.play()
  // }

  // pause(): void {
  //   this.player.pause(); // or this.plyr.player.play()
  // }

  // stop(): void {
  //   this.player.stop(); // or this.plyr.player.stop()
  // }


}
