import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/model/item';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  onSearch(subString: string): void {
    this.searchService.onSearch(subString);
  }
}
