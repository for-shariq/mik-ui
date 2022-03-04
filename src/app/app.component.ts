import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  title = 'muharram-in-kashmir';

  msbapAudioUrl = 'http://www.muharraminkashmir.com/nauha/mp3/misc/NEAZ%20TOORS%20PEITH%20SAR%20MOULLA.mp3';   
    




videoSources: Plyr.Source[] = [
  {
    src: 'https://www.youtube.com/watch?v=-WfSXllwJfc',
    provider: 'youtube'
  }
];
audioSources = [
  {
    src: 'assets/NEAZ TOORS.mp3',
    type: 'audio/mp3',
  }
];



 
}
