import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../shared/model/item';
import { ItemsService, ItemWithKey } from '../shared/model/items.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  private item: Item;
  private itemWithKey: ItemWithKey;

  constructor(private route: ActivatedRoute, private itemService: ItemsService) {
    route.data.subscribe((data) => {
      this.itemWithKey = data.item;
      this.item = this.itemWithKey.item;
    });
  }

  ngOnInit() {
  }

  save(item) {
    this.itemService.editItem(this.itemWithKey.key, item);
  }

}
