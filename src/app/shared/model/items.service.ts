import { Injectable, Inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from './item';
import { map, switchMap } from 'rxjs/operators';
import { PageService } from '../../services/page.service';
import { Query } from '@firebase/database-types';
import { database } from 'firebase';

export class ItemWithKey {
  key: string;
  item: Item;
}


@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private currentPage = 0;
  private firstItemKey = '';
  private lastItemKey = '';
  private numberOfItems = null;

  ref: database.Database;

  constructor(private af: AngularFireDatabase, private pageService: PageService) {
    this.ref = database();
  }

  getNumberOfTotalItems(): Observable<number> {
    return this.af.list('items', ).valueChanges().pipe(switchMap((items) => {
      return Observable.create((observer) => {
        observer.next(items.length);
        observer.complete();
      });
    }));
  }

  findAllItems(): Observable<Item[]> {
    return this.af.list('items', ).valueChanges().pipe(map(Item.fromJSONList));
  }

  loadItemsPage(): Observable<Item[]> {
    let cachedCurrentPage = null;

    return this.pageService.getPageChangedObservable().pipe(switchMap(([pageSize, nextPage]) => {
      const itemsFirebaseList = this.af.list('items', ref => {
        let itemsQuery: Query = ref.orderByChild('name');
        itemsQuery = this.getQueryFromNextPage(itemsQuery, nextPage, pageSize);

        return itemsQuery;
      });

      const itemsObservable = itemsFirebaseList.snapshotChanges();

      cachedCurrentPage = nextPage;

      return itemsObservable;
    }))
    .pipe(map((items) => {
      const itemsValues = items.map(item => item.payload.val()) as any[];

      this.trimItemList(itemsValues, cachedCurrentPage);

      this.saveItemIndexes(itemsValues);
      this.saveCurrentPage(cachedCurrentPage);

      return Item.fromJSONList(itemsValues);
    }));
  }

  saveItemIndexes(items) {
      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      this.firstItemKey = firstItem.name;
      this.lastItemKey = lastItem.name;
  }

  saveCurrentPage(nextPage: number) {
    this.currentPage = nextPage;
  }

  getQueryFromNextPage(itemsQuery: Query, nextPage: number, pageSize: number): Query {
    const listLimit = pageSize + 1;
    if (this.currentPage > nextPage) {
      return itemsQuery.endAt(this.firstItemKey).limitToLast(listLimit);
    } else {
      return itemsQuery.startAt(this.lastItemKey).limitToFirst(listLimit);
    }
  }

  trimItemList(items: any[], nextPage: number): void {
    if (this.currentPage < nextPage) {
      items.splice(0, 1);
    } else {
      items.splice(items.length - 1, 1);
    }
  }

  findItemWithName(itemName): Observable<Item> {
    return this.af.list('items',
    ref => ref.orderByChild('name').equalTo(itemName))
    .valueChanges().pipe(map(
      (item: Item[]) => {
        return Item.fromJSON(item[0]);
      }));
  }

  loadNextItem(itemName): Observable<Item> {
    return this.af.list('items', (ref) => {
      return ref.startAt(itemName).orderByChild('name').limitToFirst(2);
    }).valueChanges()
    .pipe(map((items: Array<any>) => {
      let index = 1;
      if (items.length === 1) {
        index = 0;
      }
      return Item.fromJSON(items[index]);
    }));
  }

  loadPreviousItem(itemName): Observable<Item> {
    return this.af.list('items', (ref) => {
      return ref.endAt(itemName).orderByChild('name').limitToLast(2);
    }).valueChanges()
    .pipe(map((items: Array<any>) => {
      return Item.fromJSON(items[0]);
    }));
  }

  createNewItem(item: any): Observable<any> {
    const promise = this.ref.ref('items').push(item)
    .then((doc) => {
      console.log(doc);
      return doc;
    });

    return from(promise);
  }


  findItemAndKeyWithName(itemName): Observable<ItemWithKey> {
    return this.af.list('items',
    ref => ref.orderByChild('name').equalTo(itemName))
    .snapshotChanges().pipe(map(
      (items) => {
        const itemsValues = items.map(item => item.payload.val()) as any[];
        const key: string = items[0].key;
        const itemObject: Item = Item.fromJSON(itemsValues[0]);

        return {
          key,
          item: itemObject
        } as ItemWithKey;
      }));
  }

  editItem(key: string, item: Item): Observable<any> {
    const promise = this.ref.ref(`items/${key}`).set(item)
    .then((doc) => {
      console.log(doc);
      return doc;
    });

    return from(promise);
  }
}
