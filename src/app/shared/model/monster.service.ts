import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { map, switchMap, concat, merge } from 'rxjs/operators';
import { Monster } from './monster';
import { Item } from './item';
import { registerDatabase, DataSnapshot } from '@firebase/database';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  constructor(private af: AngularFireDatabase) { }

  findAllMonsters(): Observable<Monster[]> {
    return this.af.list('monsters').valueChanges().pipe(map(Monster.fromJSONList));
  }

  getDropList(monsterName: string): Observable<Item[]> {
    const monster$ = this.af.list('monsters',
    ref => ref.orderByChild('name').equalTo(monsterName))
    .snapshotChanges();

    console.log(monsterName);

    return monster$.pipe(switchMap((monsters: any) => {
      if (!monsters || monsters.length === 0) {
        return null;
      }
      return this.af.list(`drop/${monsters[0].key}`).snapshotChanges();
    }))
    .pipe(switchMap((drops: any) => {
      console.log(drops);
      let previous = null;
      for (const drop of drops) {
        const observableTemp = this.af.object(`items/${drop.key}`).valueChanges();
        if (!previous) {
          previous = observableTemp;
        } else {
          previous = previous.pipe(merge(observableTemp));
        }
      }
      return previous;
    }))
    .pipe(map(Item.fromJSONList));


  }
}
