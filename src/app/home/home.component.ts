import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../shared/model/items.service';
import { Item } from '../shared/model/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private items: Item[];
  constructor(private itemComponent: ItemsService) { }

  ngOnInit() {
    this.itemComponent.findAllItems().subscribe(items => {
      this.items = items;
    });
  }

}
