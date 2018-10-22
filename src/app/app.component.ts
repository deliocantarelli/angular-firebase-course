import { Component } from '@angular/core';
import {initializeApp, database} from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private db: AngularFireDatabase) {

    // db.list<Object>('items').valueChanges().subscribe(console.log);
    // db.object('items').valueChanges().subscribe(console.log);
    // db.object('monsters').valueChanges().subscribe(console.log);
  }
}
