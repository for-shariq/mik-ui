import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Nauha, INauha } from '../Models/nauha-model';
import { environment } from '../../environments/environment'
import { LoggerService } from './logger.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class NauhaService {
  baseUrl: string = environment.apiUrl;
  nauhas: Nauha[];
  constructor(private _http: HttpClient, private logger:LoggerService, private authService: UserService) { }
  
  saveNauha(formData){
    const url= `${this.baseUrl}/api/Nauhas`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this._http.post<Nauha>(url,formData,{headers:headers}).pipe(
           // tap((newNauha: Nauha) => this.log(`added hero w/ id=${newHero.id}`)),
            catchError(this.logger.handleError<Nauha>('saveNauha'))
          );
  }
  
  putNauha(nauha:INauha): Observable<INauha> {
    const url =  `${this.baseUrl}/api/nauhas/${nauha.id}`;
    var tokenHeader = this.authService.getTokenHeader();
    return this._http.put<INauha>(url,nauha,{headers: tokenHeader}).pipe(
      catchError(this.logger.handleError<INauha>('putNauha'))
    );
  }

  putApprovedNauhas(ids:number[]) {
    const url = `${this.baseUrl}/api/nauhas/approve`;
    var token = this.authService.getTokenHeader();
    return this._http.put<number[]>(url,ids,{headers: token}).pipe(
      catchError(this.logger.handleError<number[]>('putApproved'))
    );
  }

  getNauhas(): Observable<Nauha[]>{
   const url = `${this.baseUrl}/api/nauhas`;
   return  this._http.get<Nauha[]>(url)
              .pipe(
                catchError(this.logger.handleError<Nauha[]>('getAll - Nauhas',[]))
              );
  }
  getTopRankedNauhas(): Observable<Nauha[]>{
    const url = `${this.baseUrl}/api/nauhas/top-ranked`;
    return  this._http.get<Nauha[]>(url)
               .pipe(
                 catchError(this.logger.handleError<Nauha[]>('getAll top ranked- Nauhas',[]))
               );
   }
  getNauhasByLocation(locationId: number, approved:number): Observable<Nauha[]>{
    const url = `${this.baseUrl}/api/Nauhas/loc/${locationId}/${approved}`;
    var tokenHeader = this.authService.getTokenHeader()
    return this._http.get<Nauha[]>(url,{headers: tokenHeader})
                .pipe(
                  catchError(this.logger.handleError<Nauha[]>('get Admin List',[]))
                );
  }
  

  mapNauha(nauhas:any[]): Nauha[]{
    let _nha: Nauha;
    let result: Nauha[]=[];

    nauhas.forEach (function(item){
      
      _nha = new Nauha(
              '',item.lyricist,
                item.orator,
                item.title,
                item.urlPath,
                item.locationDto.locationId,
                item.locationDto.locationName,
                item.description,
                new Date(item.year).getFullYear(),
                null,item.approved,item.id                
              )
  
      result.push(_nha);

    });
    return result;
  }
}
