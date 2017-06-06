import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {

    firebase.initializeApp({
      apiKey: 'AIzaSyB_R9Tj5hXMTnhOVQwZJ7xnBzcMzMIVZIg',
      authDomain: 'ng-recipe-book-2ab4d.firebaseapp.com'
    });
  }

}
