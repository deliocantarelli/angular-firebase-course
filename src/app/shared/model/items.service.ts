import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from './item';
import { map, switchMap } from 'rxjs/operators';
import { PageService } from '../../services/page.service';
import { Query } from '@firebase/database-types';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private currentPage = 0;
  private firstItemKey = '';
  private lastItemKey = '';
  private numberOfItems = null;

  constructor(private af: AngularFireDatabase, private pageService: PageService) {
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
}
