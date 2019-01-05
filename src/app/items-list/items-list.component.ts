import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Item } from '../shared/model/item';
import { ItemsService } from '../shared/model/items.service';
import { SearchService } from '../services/search.service';
import { PageService } from '../services/page.service';
import { Subscription } from 'rxjs';

const PAGE_SIZE = 3;

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, OnDestroy {

  private unfilteredAllItems: Item[];
  private allItems: Item[];
  private unfilteredItems: Item[];
  private items: Item[];
  private itemStartIndex = 0;

  private pageItemsSubscription: Subscription;
  private allItemsSubscription: Subscription;

  constructor(private itemComponent: ItemsService, private searchService: SearchService, private pageService: PageService) { }

  ngOnInit() {
    const compareFunction = (item) => item.name;

    this.setNumberOfItems();

    this.pageItemsSubscription = this.itemComponent.loadItemsPage().subscribe(items => {
      this.unfilteredItems = items;

      this.items = this.searchService.filterArray(this.unfilteredItems, compareFunction);
    });

    this.searchService.addSearchCallback(this.onSearchChanged.bind(this));
  }
  ngOnDestroy() {
    this.searchService.removeSearchCallback(this.onSearchChanged.bind(this));
    this.pageItemsSubscription.unsubscribe();
    this.allItemsSubscription.unsubscribe();
  }

  setNumberOfItems() {
    const compareFunction = (item) => item.name;

    this.allItemsSubscription = this.itemComponent.findAllItems().subscribe((items) => {
      this.unfilteredAllItems = items;
      this.allItems = this.searchService.filterArray(this.unfilteredAllItems, compareFunction);

      this.pageService.setNumberOfItems(this.unfilteredAllItems.length);
    });

  }

  onSearchChanged() {
    const compareFunction = (item) => item.name;

    if (this.unfilteredItems != null) {
      this.items = this.searchService.filterArray(this.unfilteredItems, compareFunction);
    }
    if (this.unfilteredAllItems != null) {
      this.allItems = this.searchService.filterArray(this.unfilteredAllItems, compareFunction);
    }

  }
}
