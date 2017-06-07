import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  success = '';
  status = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password, (response: Response) => {
      console.log(response);
      this.status = '';
      this.success = 'User login successful';
    }, (error) => {
      this.status = error.message;
    });
  }

}
