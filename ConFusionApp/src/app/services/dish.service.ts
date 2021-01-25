import { Injectable } from '@angular/core';
//Dish is the template file for Dish type.
import { Dish } from "../shared/dish";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ProcessHTTPMsgService } from "../services/process-httpmsg.service";


@Injectable({
  providedIn: 'root'
})

// any object that wishes to use this service will import 'DishService' from this file
export class DishService {
  static getFeaturedDish(): Dish {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient, private httpErrorService: ProcessHTTPMsgService) { }
// Methods for injecting data into dependencies.
 
  getDishes(): Observable<Dish[]> {
    // DISHES is the data. Normally this would come from a dataserver or REST API.
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.httpErrorService.handleError));
  }
 
  getDish(id: string): Observable<Dish> {
    //dish is function parameter. id is method parameter.
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.httpErrorService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
   
    
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
    .pipe(map(value => value[0])).pipe(catchError(this.httpErrorService.handleError)); 
  }

  getDishIds(): Observable<Number[] | any>{
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(map(dishes => dishes.map(dish => dish.id))).pipe(catchError(error => error));
    
  }
  putDish(dish: Dish): Observable<Dish>{
    const httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/json'})
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
    .pipe(catchError(this.httpErrorService.handleError))
  } 
}
