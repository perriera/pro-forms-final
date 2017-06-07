import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.css' ]
})
export class SignupComponent implements OnInit {

  success = '';
  status = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password, (response: Response) => {
      console.log(response);
      this.status = '';
      this.success = 'User registration successful';
    }, (error) => {
      this.status = error.message;
    });
  }

}
