import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from './item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private af: AngularFireDatabase) { }

  findAllItems(): Observable<Item[]> {
    return this.af.list('items', ).valueChanges().pipe(map(Item.fromJSONList));
  }

  loadFirstItemsPage(itemName: string, pageSize: number): Observable<Item[]> {
    return this.af.list('items', ref => ref.orderByChild('name').limitToFirst(pageSize)).valueChanges().pipe(map(Item.fromJSONList));
  }
}
