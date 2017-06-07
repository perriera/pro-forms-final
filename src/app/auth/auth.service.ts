import * as firebase from 'firebase';
import { Response } from '@angular/http';

export class AuthService {

  signupUser(email: string, password: string, resolve, reject) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( (response: Response) => resolve(response))
      .catch(
        error => reject(error)
      );
  }

  signinUser(email: string, password: string, resolve, reject) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( (response: Response) => resolve(response))
      .catch(
        error => reject(error)
      );
  }

}
