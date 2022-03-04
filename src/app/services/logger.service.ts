import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NotificationService } from '../utilities/notification.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private notificationService: NotificationService) { }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead
      if(operation == 'get Admin List' && error.status == '404')
      {
        this.notificationService.showError('No audio found in the location/area','Not Found')
      }
      else{
        this.notificationService.showError(error.message,`${error.status} - ${error.name}`);
      }
        
      // TODO: better job of transforming error for user consumption
     // this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
