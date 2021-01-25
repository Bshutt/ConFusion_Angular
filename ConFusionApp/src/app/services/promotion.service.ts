import { Injectable } from '@angular/core';
// Promotion is the template file with the Promotion Type. 
import { Promotion } from "../shared/promotion";
// PROMOTIONS is the Data. Normally the would come from a dataserver or REST API.
import { PROMOTIONS } from "../shared/promotions";
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "../services/process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})
// any dependencies that wants to import this module Will call PromotionService. 
export class PromotionService {
  static getFeaturedPromotion(): Promotion {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient, private httpErrorService: ProcessHTTPMsgService) { }
// methods this class provides. Call PromotionService.method 
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
    .pipe(catchError(this.httpErrorService.handleError));
  };

  getPromotion(pid: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + pid)
    .pipe(catchError(this.httpErrorService.handleError));
  };
 


  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(map(value => value[0]))
    .pipe(catchError(this.httpErrorService.handleError));
  };







};
