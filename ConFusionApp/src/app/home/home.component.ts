import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from "../shared/dish";
import { DishService} from "../services/dish.service";
import { PromotionService } from "../services/promotion.service";
import { Promotion } from "../shared/promotion";
import { LeaderService } from "../services/leader.service";
import { Leader } from "../shared/leader";
import { flyInOut, expand } from "../animations/app.animations";
     
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
  host: {'[@flyInOut]': 'true', 'style': 'display:block'},
  animations:[ flyInOut(), expand()]
})
export class HomeComponent implements OnInit {
dish: Dish;
promotion: Promotion;
leader: Leader;
  // creates an instance of DishService and PromotionService
  constructor(private dishService: DishService, private promotionService: PromotionService, private leaderService: LeaderService, @Inject('baseURL') public baseURL) {

  }

  ngOnInit() {
    // sets values of dish and promotion during the OnInit hook of the HomeComponet lifecycle. 

    this.dishService.getFeaturedDish().subscribe(data => this.dish = data);

    this.promotionService.getFeaturedPromotion().subscribe(data => this.promotion = data);

    this.leaderService.getFeaturedLeader().subscribe(data => this.leader = data);
  };

}
