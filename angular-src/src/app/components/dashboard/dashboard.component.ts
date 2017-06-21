import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import {IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven, IStarRatingIOnHoverRatingChangeEvent} from "angular-star-rating/src/star-rating-struct";




@Component({
  selector: 'app-dashboard',
  // selector: 'my-events-component',
   template: `

           <star-rating-comp   [starType]="'svg'"
                               [hoverEnabled]="true"
                               (onClick)="onClick($event)"
                               (onRatingChange)="onRatingChange($event)"
                               (onHoverRatingChange)="onHoverRatingChange($event)">
           </star-rating-comp>
           <p>onHoverRatingChangeResult: {{onHoverRatingChangeResult | json}}</p>
           <p>onClickResult: {{onClickResult | json}}</p>
           <p>onRatingChangeResult: {{onRatingChangeResult | json}}</p>
   `,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Object;
  lat: number;
  lng: number;
  list: string[] = ['Cat lover', 'happy man'];
  rating: number;
  // lng: number = this.user.lng;
  title: string = 'Active Workers';
  // lat: number = 51.678418;
  // lng: number = 7.809007;
  // lat1: number = 41.0178718;
  // lng1: number = -91.9694967;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getLatLng().subscribe(dashboard =>{
      this.user = dashboard.user;
      this.lat = dashboard.user.lat;
      this.lng = dashboard.user.lng;
      this.rating = dashboard.user.rating;
      console.log(dashboard.user.rating);
      console.log(dashboard.user);
    },
      err =>{
        console.log(err);
        return false;
      }
  );

  }
  onClickResult:IStarRatingOnClickEvent;
onHoverRatingChangeResult:IStarRatingIOnHoverRatingChangeEvent;
onRatingChangeResult:IStarRatingOnRatingChangeEven;

onClick = ($event:IStarRatingOnClickEvent) => {
    console.log('onClick $event: ', $event);
    this.onClickResult = $event;
};

onRatingChange = ($event:IStarRatingOnRatingChangeEven) => {
    console.log('onRatingUpdated $event: ', $event);
    this.onRatingChangeResult = $event;
};

onHoverRatingChange = ($event:IStarRatingIOnHoverRatingChangeEvent) => {
    console.log('onHoverRatingChange $event: ', $event);
    this.onHoverRatingChangeResult = $event;
};
onSelect(product){
  alert("You have selected " + product);
}
}
