import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  totalItems = null;
  itemsPerPage = null;
  currentPage = 0;

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.totalItems = this.pageService.getNumberOfItemsObservable();
    this.itemsPerPage = this.pageService.getPageSizeObservable();
  }

  pageChanged(event: any): void {
    const currentPage = event.page - 1;

    this.pageService.setCurrentPage(currentPage);
  }
}
