import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Location } from '../Models/location-model';
import { environment } from '../../environments/environment'
import { LoggerService } from './logger.service';
import { ILocationGroup } from '../Models/nauha-model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  baseUrl: string = environment.apiUrl;

  locations: Location[]; 

  constructor(private _http: HttpClient, private logger:LoggerService) { }

  getAll(): Observable<Location[]> {
    const url = `${this.baseUrl}/api/location`;
    return this._http.get<Location[]>(url)
           .pipe(
             catchError(this.logger.handleError<Location[]>('getAll',[]))
           );
  }

  getNauhaByLocation(locationId:number){
    const url = `${this.baseUrl}/api/location/GetNauhaByLocation/${locationId}`;
    return this._http.get<Location>(url)
            .pipe(
              catchError(this.logger.handleError<Location>('getNauhaByLocation'))
            );
  }



  // location group api
  getLocationGroupsAll():Observable<ILocationGroup[]> {
    const url = `${this.baseUrl}/api/locationgroup`;
    return this._http.get<ILocationGroup[]>(url)
        .pipe(
          catchError(this.logger.handleError<ILocationGroup[]>('getLocationGroupsAll'))
        );
  }
  getLocationGroupsById(id:Number):Observable<ILocationGroup> {
    const url = `${this.baseUrl}/api/locationgroup/${id}`;
    return this._http.get<ILocationGroup>(url)
        .pipe(
          catchError(this.logger.handleError<ILocationGroup>('getLocationGroupsById'))
        );
  }



  /////////////mapper////////////////////////
  

}
