import { Injectable } from '@angular/core';
import { Leader } from "../shared/leader";

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from "../shared/baseurl";
import { HttpClient } from "@angular/common/http";
import { ProcessHTTPMsgService } from "../services/process-httpmsg.service";


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private httpErrorService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'Leadership')
    .pipe(catchError(this.httpErrorService.handleError));
  }

  

  getLeader(id: string): Observable<Leader> {
   
    return this.http.get<Leader>(baseURL + 'Leadership' + id)
    .pipe(catchError(this.httpErrorService.handleError));
  }

 
  getFeaturedLeader(): Observable<Leader> {
    
    return this.http.get<Leader>(baseURL + 'Leadership?featured=true').pipe(map(value => value[0]))
    .pipe(catchError(this.httpErrorService.handleError));
} 

};