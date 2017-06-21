import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
   fullImagePath: string;
   hobbies: string[];

  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      this.user = profile.user;
      this.fullImagePath = '/assets/woman.jpg';
      this.hobbies = ['Cat Walker']

    },
      err =>{
        console.log(err);
        return false;
      },

  );
  }

  // addHobby(hobby: any){
  //       this.hobbies.push(hobby);
  //   }
    deleteHobby(i: any){
            this.hobbies.splice(i, 1);
        }
  addHobby(hobby: any){
    this.hobbies.push(hobby);
  }
  onHobbySubmit(){
    // let hobby: String;

  //  this.authService.update(this.hobbies[1]).subscribe(data =>{

    this.authService.update(this.hobbies[0]).subscribe(data =>{
      if(data.success){
        console.log('you are now registered');
        this.router.navigate(['/profile']);
      }else{
        console.log('Good job');
        this.router.navigate(['/profile']);

      }
     }
  );
  }

}
