import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  lat: number;
  lng: number;


  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      lat: this.lat,
      lng: this.lng,
    }
    //Required Fields
    if(!this.validateService.validateRegister(user)){
      console.log('please fill in the fields');
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      console.log('please fill in the proper email');
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data =>{
      if(data.success){
        console.log('you are now registered');
        this.router.navigate(['/login']);
      }else{
        console.log('something went wrong');
        this.router.navigate(['/register']);

      }
    });
  }





}
