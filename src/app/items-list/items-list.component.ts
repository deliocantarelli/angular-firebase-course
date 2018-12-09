import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../shared/model/item';
import { ItemsService } from '../shared/model/items.service';
import { SearchService } from '../services/search.service';

const PAGE_SIZE = 3;

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  private items: Item[];
  private itemStartIndex = 0;

  constructor(private itemComponent: ItemsService, private searchService: SearchService) { }

  ngOnInit() {
    const compareFunction = (item) => item.name;

    this.itemComponent.loadItemsPage().subscribe(items => {
      this.searchService.getSearchObservable().subscribe(() => {
        this.items = this.searchService.filterArray(items, compareFunction);
      });
    });
  }
}
