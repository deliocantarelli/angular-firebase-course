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
    // this.db.list('monsters').push({name: 'centaur', strength: 10, hp: 200});
  }
  listRemove() {
    // this.db.list('items').snapshotChanges().subscribe(result => {
    //   console.log(result[9].payload.val());
    //   const toRemove = result[9].payload.ref;
    //   this.db.list('items').remove(toRemove);
    // });
  }
  listUpdate() {
    // this.db.list('items').snapshotChanges().subscribe(result => {
    //   const toRemove = result[9].payload.ref;
    //   this.db.list('items').update(toRemove, {value: 100});
    // });
  }
  objUpdate() {
    this.db.object('monsters/-LCdGc1dYc2t6gTDCcLC').update({
      strength: 35
    });
  }
  objSet() {
    this.db.object('monsters/-LCdGc1dYc2t6gTDCcLC').update({
      strength: 35
    });
  }
  objRemove() {
    this.db.object('monsters/-LCdGc1dYc2t6gTDCcLC').remove();
  }
}
