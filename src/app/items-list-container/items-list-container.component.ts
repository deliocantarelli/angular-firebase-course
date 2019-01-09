import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../shared/model/item';
import { ItemsService } from '../shared/model/items.service';
import { SearchService } from '../services/search.service';
import { PageService } from '../services/page.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-list-container',
  templateUrl: './items-list-container.component.html',
  styleUrls: ['./items-list-container.component.css']
})
export class ItemsListContainerComponent implements OnInit, OnDestroy {

  private unfilteredAllItems: Item[];
  private allItems: Item[];
  private unfilteredItems: Item[];
  private items: Item[];
  private itemStartIndex = 0;

  private pageItemsSubscription: Subscription;
  private allItemsSubscription: Subscription;

  constructor(
    private itemComponent: ItemsService,
    private searchService: SearchService,
    private pageService: PageService,
    private router: Router
    ) { }

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

  navigateToItem(item: Item) {
    this.router.navigate(['items', item.name]);
  }

}
