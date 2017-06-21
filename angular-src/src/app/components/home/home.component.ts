import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // user:User = {id:1, name:'Parman'};
  fullImagePath: string;

  constructor() {

   }

  ngOnInit() {
    this.fullImagePath = '/assets/woman.jpg';
  }

}


class User{
  id:number;
  name:string;
}
// import {Component} from "@angular/core";
// import {IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven, IStarRatingIOnHoverRatingChangeEvent} from "angular-star-rating/src/star-rating-struct";
//
// @Component({
//     selector: 'my-events-component',
//     template: `
//
//             <star-rating-comp   [starType]="'svg'"
//                                 [hoverEnabled]="true"
//                                 (onClick)="onClick($event)"
//                                 (onRatingChange)="onRatingChange($event)"
//                                 (onHoverRatingChange)="onHoverRatingChange($event)">
//             </star-rating-comp>
//             <p>onHoverRatingChangeResult: {{onHoverRatingChangeResult | json}}</p>
//             <p>onClickResult: {{onClickResult | json}}</p>
//             <p>onRatingChangeResult: {{onRatingChangeResult | json}}</p>
//     `,
//       templateUrl: './home.component.html',
//       styleUrls: ['./home.component.css']
// })
// export class HomeComponent {
//
//     onClickResult:IStarRatingOnClickEvent;
//     onHoverRatingChangeResult:IStarRatingIOnHoverRatingChangeEvent;
//     onRatingChangeResult:IStarRatingOnRatingChangeEven;
//
//     onClick = ($event:IStarRatingOnClickEvent) => {
//         console.log('onClick $event: ', $event);
//         this.onClickResult = $event;
//     };
//
//     onRatingChange = ($event:IStarRatingOnRatingChangeEven) => {
//         console.log('onRatingUpdated $event: ', $event);
//         this.onRatingChangeResult = $event;
//     };
//
//     onHoverRatingChange = ($event:IStarRatingIOnHoverRatingChangeEvent) => {
//         console.log('onHoverRatingChange $event: ', $event);
//         this.onHoverRatingChangeResult = $event;
//     };
//
// }
