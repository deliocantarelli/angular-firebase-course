import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  private itemsObservable: Observable<Object>;
  private monsterObservable: Observable<Object>;

  constructor(private db: AngularFireDatabase) {
    this.itemsObservable = db.list('items').valueChanges();
    this.monsterObservable = db.object('monsters').valueChanges();
  }

  ngOnInit() {
  }
  listPush() {
    // this.db.list('items').push({name: 'horse hoof', type: 'collectable', value: 45});
  }
  listRemove() {}
  listUpdate() {}
  objUpdate() {}
  objSet() {
    this.db.list('items').push({name: 'centaur', strength: 10, hp: 200});
  }
}
