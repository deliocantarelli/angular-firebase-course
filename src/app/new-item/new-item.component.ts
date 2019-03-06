import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../shared/model/items.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  private itemType: string;

  constructor(private route: ActivatedRoute, private itemService: ItemsService) { }

  ngOnInit() {
    this.itemType = this.route.snapshot.queryParams['type'];

    console.log(this.itemType);
  }

  save(form) {
    this.itemService.createNewItem(form.value);
  }

}
