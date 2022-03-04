import { Component, OnInit,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NauhaService } from '../services/nauha-service.service'
import { LocationService } from '../services/location-service.service'
import { Nauha } from '../Models/nauha-model'
import { Location } from '../Models/location-model'
import { LoggerService } from '../services/logger.service';
import { NotificationService } from '../utilities/notification.service';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css'],

})
export class UploadFilesComponent implements OnInit {
  @Input() nauha: Nauha;
  readonly STATUS_INITIAL = 0;
  readonly STATUS_SAVING = 1;
  readonly STATUS_SUCCESS = 2;
  readonly STATUS_FAILED = 3;
  readonly STATUS_INVALID = 4;
  currentStatus: number;
  uploadFieldName = '';

  //nauha : Nauha;
  _fileBinary: File;
  locations: Location[];
  pname: number;
  editMode: boolean = false;

  constructor(private nauhaService: NauhaService, private locationService: LocationService,
              private notifService: NotificationService, private route: ActivatedRoute
              ) { 
    this.reset();
  }
  ngOnInit(): void {
    
    var n = this.nauha;
    this.getDefaults();
    // this.route.queryParams.subscribe(params => {
    //   this.pname = params['id'];
    // });
  //   console.log( 'edit ' + this.route.snapshot.paramMap.get('id'));
  }

  getDefaults(): void{
    //this.locationService.getAll().subscribe(loc => this.locations = loc);
    this.locationService.getAll().subscribe(
      (resp) => {
        console.log(resp);
        this.locations = resp;
      }
    );

   
    this.nauha = new Nauha('','','','','');
    
  }

  filesChange(fileName: string, fileList: FileList) {
    //handle file change
    const formData = new FormData();
    if(!fileList.length){
      this.currentStatus == this.STATUS_INVALID;
      this.notifService.showError('Invalid file upload','Error');
      return;
    }
    this._fileBinary = fileList[0];
    if(this._fileBinary.type !== 'audio/mpeg')
    {
      this.notifService.showError('Invalid file. Please upload mp3 file','Error');
      console.log('file type=>' + this._fileBinary.type);
      return;
    }
    this.uploadFieldName = this._fileBinary.name;
    this.currentStatus = this.STATUS_SAVING;

  }

 
  onSubmit(form: NgForm){
    if(this.currentStatus == this.STATUS_INVALID || this.currentStatus == this.STATUS_INITIAL) return;
    this.currentStatus = this.STATUS_SAVING;
    console.log('-------------------------')
    const formData = new FormData();
    formData.append("Title",this.nauha.title);
    formData.append("Description",this.nauha.description);
    formData.append('LocationDTO.LocationID',this.nauha.locationId.toString());
    formData.append('Lyricist',this.nauha.lyricist);
    formData.append('Orator',this.nauha.orator);
    formData.append('Year',('1/1/' + new Date(this.nauha.year,1).getFullYear()).toString());
    formData.append('fileBinaries',this._fileBinary,this._fileBinary.name);
   
    this.nauhaService.saveNauha(formData).subscribe(
    (resp) => {
      console.log('after post' + resp);
      this.currentStatus = this.STATUS_SUCCESS;
      this.notifService.showSuccess('Record saved successfully','Success');
    }, err => {
      this.currentStatus = this.STATUS_FAILED;
      this.notifService.showError('Unable to save the nauha','Failed');
    }
    );
   
  }

  reset(){
    this.currentStatus = this.STATUS_INITIAL;
    
    
  }

}
