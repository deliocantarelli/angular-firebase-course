import { Injectable } from '@angular/core';
import { Reference } from '@firebase/database';
import { Query } from '@firebase/database-types';
import { Observable, merge, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const DEFAULT_PAGE_SIZE = 3;

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private pageSize = DEFAULT_PAGE_SIZE;
  private currentPage = 0;
  private numberOfItems = 0;

  private pageSizeObservable = null;
  private currentPageObservable = null;
  private numberOfItemsObservable = null;

  private pageSizeChangedFunction = null;
  private currentPageChangedFunction = null;
  private numberOfItemsChangedFunction = null;

  constructor() {
    this.getPageSizeObservable();
    this.getCurrentPageObservable();
    this.getNumberOfItemsObservable();
  }

  getPageChangedObservable() {
    return combineLatest(
      this.getPageSizeObservable(),
      this.getCurrentPageObservable()
    );
  }

  setPageSize(pageSize) {
    this.pageSize = pageSize;

    if (this.pageSizeChangedFunction) {
      this.pageSizeChangedFunction();
    }
  }
  setCurrentPage(currentPage) {
    this.currentPage = currentPage;

    console.log(`current page = ${this.currentPage}`);

    if (this.currentPageChangedFunction) {
      this.currentPageChangedFunction();
    }
  }
  setNumberOfItems(numberOfItems) {
    this.numberOfItems = numberOfItems;

    console.log(`number of items = ${this.numberOfItems}`);

    if (this.numberOfItemsChangedFunction) {
      this.numberOfItemsChangedFunction();
    }
  }

  getPageQuery(referenceOrQuery: Query | Reference, lastElementKey: string) {
    let startIndex = this.pageSize * this.currentPage;
    startIndex = Math.min(this.numberOfItems, startIndex);

    console.log(startIndex);

    return referenceOrQuery.limitToFirst(this.pageSize).startAt(lastElementKey);
  }

  getPageSizeObservable() {
    if (!this.pageSizeObservable) {
      this.pageSizeObservable = Observable.create((observable) => {
        observable.next(this.pageSize);

        this.pageSizeChangedFunction = () => {
          observable.next(this.pageSize);
        };
      });
    }

    return this.pageSizeObservable;
  }
  getCurrentPageObservable() {
    if (!this.currentPageObservable) {
      this.currentPageObservable = Observable.create((observable) => {
        observable.next(this.currentPage);

        this.currentPageChangedFunction = () => {
          observable.next(this.currentPage);
        };
      });
    }

    return this.currentPageObservable;
  }
  getNumberOfItemsObservable() {
    if (!this.numberOfItemsObservable) {
      this.numberOfItemsObservable = Observable.create((observable) => {
        observable.next(this.numberOfItems);

        this.numberOfItemsChangedFunction = () => {
          observable.next(this.numberOfItems);
        };
      });
    }

    return this.numberOfItemsObservable;
  }
}
