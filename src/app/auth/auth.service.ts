import * as firebase from 'firebase';

export class AuthService {

  signupUser(email: string, password: string, errorHandler) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => errorHandler(error)
      );
  }

}
