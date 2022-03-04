import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { NotificationService } from 'src/app/utilities/notification.service';
import { IVideo, IContentType } from 'src/app/Models/nauha-model';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {
  videos:IVideo[] = [];
  video:IVideo = {};
  contentType:number = 1;
  contentTypes:IContentType[]= [
    {
    "id":0,
    "name":"Static"
    },
    {
      "id":1,
      "name":"Live"
    }
  ]
  filtercontentType:number =0;
  constructor(private mediaService: VideoService,private notifService: NotificationService) { }

  ngOnInit(): void {
    this.getVideos(0);
  }
  getVideos(type:number){
    this.mediaService.getVideoByContentType(type).subscribe(
      (resp) => { this.videos = resp }
    );
  }
  onSubmit(item){
    console.log("video " + this.video);
   
    if(this.video.id == undefined) {
      this.mediaService.saveVideo(this.video).subscribe(
        (resp) => { this.notifService.showSuccess("Saved","Success") },
        err => { this.notifService.showError("Unable to save","Error") }
      );
    }
    else{
      this.mediaService.putVideo(this.video).subscribe(
        (resp) => { this.notifService.showSuccess("Saved","Success") },
        err => { this.notifService.showError("Unable to update","Error") }
      );
    }
    
  }
  onChangeSelection(selected){
    this.video.contentType = parseInt(selected);
  }
  onClear(){
    this.video = {};
  }
  onEditClick(vid){
    this.video = vid;
  }
  searchByType(){
    this.getVideos(this.filtercontentType);
  }
}
