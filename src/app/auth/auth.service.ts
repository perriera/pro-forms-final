import * as firebase from 'firebase';
import { Response } from '@angular/http';

export class AuthService {

  token: string;

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
