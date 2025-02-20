import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from "../services/leader.service";
import { flyInOut, expand } from "../animations/app.animations";
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: [],
  host: {'[@flyInOut]': 'true', 'style': 'display:block'},
  animations:[ flyInOut(), expand()]
})
export class AboutComponent implements OnInit {
leaders: Leader[];
  constructor(private leaderService: LeaderService) { }

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe(data => this.leaders = data);
  }

}
