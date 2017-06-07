import * as firebase from 'firebase';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  token: string;

  constructor(private router: Router) {
  }

  signupUser(email: string, password: string, resolve, reject) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response: Response) => resolve(response))
      .catch(
        error => reject(error)
      );
  }

  signinUser(email: string, password: string, resolve, reject) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response: Response) => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken()
          .then(
            (token: string) => {
              this.token = token;
            }
          );
        resolve(response);
      })
      .catch(
        error => reject(error)
      );
  }

  signoutUser() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

}
