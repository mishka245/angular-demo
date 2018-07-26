import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAK3Jm-rXBEeIFprtjOXBrO-9MJ485v1CM',
      authDomain: 'angular-demo-m.firebaseapp.com',
    });

  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
