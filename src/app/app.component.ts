import { Component } from '@angular/core';
import {initializeApp, database} from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {

    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyBrQxxFXEkQwawNf6k5TzI83-kK9uCVPtY',
      authDomain: 'angular-firebase-course-d3317.firebaseapp.com',
      databaseURL: 'https://angular-firebase-course-d3317.firebaseio.com',
      projectId: 'angular-firebase-course-d3317',
      storageBucket: 'angular-firebase-course-d3317.appspot.com',
      messagingSenderId: '815975254457'
    };
    initializeApp(config);

    const root = database().ref();
    root.on('value', (snapshot) => {
      console.log(snapshot.val());
    });
  }
}
