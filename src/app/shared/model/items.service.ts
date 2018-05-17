import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private af: AngularFireDatabase) { }

  findAllItems(): Observable<Item[]> {
    return this.af.list('items').valueChanges() as Observable<Item[]>;
  }
}
