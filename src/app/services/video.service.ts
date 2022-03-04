import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Nauha, INauha, IVideo } from '../Models/nauha-model';
import { environment } from '../../environments/environment'
import { LoggerService } from './logger.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  baseUrl: string = environment.apiUrl;
  video:IVideo[] = [];
  constructor(private _http: HttpClient, private logger:LoggerService, private authService: UserService) { }

  getVideoByContentType(type:number): Observable<IVideo[]> {
    const url= `${this.baseUrl}/api/Videos/type/${type}`; 

    return  this._http.get<IVideo[]>(url)
              .pipe(
                catchError(this.logger.handleError<IVideo[]>('getVideoByContentType',[]))
              );
  }

  saveVideo(video:IVideo): Observable<IVideo> {
    const url= `${this.baseUrl}/api/Videos`; 
    var tokenHeader = this.authService.getTokenHeader();
    return this._http.post<IVideo>(url,video,{headers: tokenHeader}).pipe(
      catchError(this.logger.handleError<IVideo>('saveVideo'))
    );

  }

  putVideo(video:IVideo): Observable<IVideo> {
    const url= `${this.baseUrl}/api/Videos/${video.id}`; 
    var tokenHeader = this.authService.getTokenHeader();
    return this._http.put<IVideo>(url,video,{headers: tokenHeader}).pipe(
      catchError(this.logger.handleError<IVideo>('putVideo'))
    );

  }

}
