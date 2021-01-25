import { Injectable } from '@angular/core';
import { Feedback } from "../shared/feedback";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ProcessHTTPMsgService } from "../services/process-httpmsg.service";
import { Body } from '@angular/http/src/body';

@Injectable({
  providedIn: 'root'
})


export class FeedbackService {

  constructor( private http: HttpClient, private httpErrorService: ProcessHTTPMsgService) { }
  postFeedBack(feedback: Feedback): Observable<Feedback>{
    const httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/json'})
    };
    return this.http.post<Feedback>(baseURL + 'feedback/' , feedback , httpOptions)
    .pipe(catchError(this.httpErrorService.handleError))
  } 
}

 