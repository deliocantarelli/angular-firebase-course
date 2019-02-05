import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../shared/model/item';
import { ItemsService } from '../shared/model/items.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  item: Observable<Item>;

  currentItemName: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe((params) => {
      const itemName = params.name;
      this.item = this.itemsService.findItemWithName(itemName);

      this.updateSubscription();
      return this.item;
    });

    // this.updateSubscription();
  }

  toPrevious() {
    this.itemsService.loadPreviousItem(this.currentItemName)
    .subscribe(this.navigateToItem.bind(this));
    // this.updateSubscription();
  }

  toNext() {
    this.itemsService.loadNextItem(this.currentItemName)
    .subscribe(this.navigateToItem.bind(this));
    // this.updateSubscription();
  }

  updateSubscription() {
    this.item.subscribe((item) => {
      this.currentItemName = item.name;
    });
  }

  navigateToItem(item) {
    const itemName = item.name;
    this.router.navigate(['items', itemName]);
  }

}
