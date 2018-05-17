import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../shared/model/item';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  @Input()
  items: Item[];

  constructor() { }

  ngOnInit() {
  }

}
