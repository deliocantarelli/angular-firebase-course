import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchString = '';
  private searchChangedObservable = null;
  private onSearchCalledFunction = null;

  constructor() {
    this.searchChangedObservable = Observable.create(async (observable) => {
      observable.next(this.searchString);

      this.onSearchCalledFunction = () => {
        observable.next(this.searchString);
      };
    });
  }

  onSearch(substring: string): void {
    this.searchString = substring;

    if (this.onSearchCalledFunction) {
      this.onSearchCalledFunction();
    }
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
}
