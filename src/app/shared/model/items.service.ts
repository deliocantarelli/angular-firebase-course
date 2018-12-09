import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from './item';
import { map, switchMap } from 'rxjs/operators';
import { PageService } from '../../services/page.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private lastItemKey = '';
  private numberOfItems = null;

  constructor(private af: AngularFireDatabase, private pageService: PageService) {
    this.af.list('items', ).valueChanges().subscribe((items) => {
      this.numberOfItems = items.length;

      this.pageService.setNumberOfItems(this.numberOfItems);
    });
  }

  findAllItems(): Observable<Item[]> {
    return this.af.list('items', ).valueChanges().pipe(map(Item.fromJSONList));
  }

  loadItemsPage(): Observable<Item[]> {
    return this.pageService.getPageChangedObservable().pipe(switchMap(([pageSize, currentPage]) => {
      const itemsObservable = this.af.list('items', ref => ref.orderByChild('name')
      .limitToFirst(pageSize).startAt(this.lastItemKey))
    .snapshotChanges();

      this.saveLastItemIndex(itemsObservable);

      return itemsObservable;
    }))
    .pipe(map((items) => {
      items = items.map(item => item.payload.val());

      return Item.fromJSONList(items);
    }));
  }

  saveLastItemIndex(itemsObservable) {
    itemsObservable.subscribe((items) => {
      const lastItem = items[items.length - 1];

      this.lastItemKey = lastItem.key;
    });
  }
}
