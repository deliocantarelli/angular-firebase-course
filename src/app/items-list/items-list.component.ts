import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../shared/model/item';
import { ItemsService } from '../shared/model/items.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  private items: Item[];

  constructor(private itemComponent: ItemsService, private searchService: SearchService) { }

  ngOnInit() {
    const compareFunction = (item) => item.name;

    this.itemComponent.loadFirstItemsPage('', 3).subscribe(items => {
      this.searchService.getSearchObservable().subscribe(() => {
        this.items = this.searchService.filterArray(items, compareFunction);
      });
    });
  }
}
