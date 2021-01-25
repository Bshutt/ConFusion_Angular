import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import {DishService} from '../services/dish.service';
import { flyInOut, expand } from "../animations/app.animations";



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {'[@flyInOut]': 'true', 'style': 'display:block'},
  animations:[ flyInOut(), expand()]
})



export class MenuComponent implements OnInit {

// dishes is the class object(used in html file for the *ngFor directive).
// Dish is the the type value. data is provided by the dishService provider.
  dishes: Dish[];
  errMsg: string;


  constructor(private dishService: DishService, @Inject('baseURL') public baseURL) { }


  // uses the getDishes() method in the service provider to set the value of dishes above.
  ngOnInit(): void {
    this.dishService.getDishes()
    .subscribe(data => this.dishes = data, err => this.errMsg = <any>err);
  }
     
}
