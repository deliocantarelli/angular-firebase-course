import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchString = '';
  private searchChangedObservable: Observable<string> = null;
  private onSearchCalledFunction = null;
  private onSearchChangedCallbacks = [];

  constructor() {
    this.searchChangedObservable = Observable.create((observable) => {
      observable.next(this.searchString);

      this.onSearchCalledFunction = () => {
        observable.next(this.searchString);
      };
    });

    this.searchChangedObservable.subscribe(this.callOnSearchChangedCallbacks.bind(this));
  }

  onSearch(substring: string): void {
    this.searchString = substring;

    if (this.onSearchCalledFunction) {
      this.onSearchCalledFunction();
    }
  }

  getCurrentSearchString (): string {
    return this.searchString;
  }

  getSearchObservable(): Observable<string> {
    return this.searchChangedObservable;
  }

  filterArray<T>(array: T[], propertyToCompareFunction: Function): Array<T> {
    return array.filter(element => {
      const stringToCompare = propertyToCompareFunction(element);

      return stringToCompare.includes(this.searchString);
    });
  }

  addSearchCallback(callback) {
    this.removeSearchCallback(callback);
    this.onSearchChangedCallbacks.push(callback);
  }

  removeSearchCallback(callback) {
    const callbackIndex = this.onSearchChangedCallbacks.findIndex(callback);

    if (callbackIndex >= 0) {
      this.onSearchChangedCallbacks.splice(callbackIndex, 1);
    }
  }

  callOnSearchChangedCallbacks() {
    for (const callback of this.onSearchChangedCallbacks) {
      callback(this.searchString);
    }
  }
}
