import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { map, switchMap, concat, merge, mergeMap, combineAll, mergeAll } from 'rxjs/operators';
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


    return combineLatest(
      monster$.pipe(switchMap((monsters: any) => {
        if (!monsters || monsters.length === 0) {
          return null;
        }
        return this.af.list(`drop/${monsters[0].key}`).snapshotChanges();
      }))
      .pipe(switchMap((drops: any) => {
        const result = drops.map(drop => {
          return this.af.object(`items/${drop.key}`).valueChanges();
        });
        return combineLatest(result);
      }))
      .pipe(map((items: any) => {
        return Item.fromJSONList(items);
      }))
    );


  }
}
