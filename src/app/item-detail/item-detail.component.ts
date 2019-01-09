import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../shared/model/item';
import { ItemsService } from '../shared/model/items.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  item: Observable<Item>;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    const itemName = this.route.snapshot.params['name'];

    this.item = this.itemsService.findItemWithName(itemName);

    this.item.subscribe(console.log);
  }

}
