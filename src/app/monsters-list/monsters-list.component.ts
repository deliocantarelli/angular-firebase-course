import { Component, OnInit } from '@angular/core';
import { MonsterService } from '../shared/model/monster.service';
import { Observable } from 'rxjs';
import { Monster } from '../shared/model/monster';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-monsters-list',
  templateUrl: './monsters-list.component.html',
  styleUrls: ['./monsters-list.component.css']
})
export class MonstersListComponent implements OnInit {

  monsters: Observable<Monster[]>;
  filteredMonsters: Monster[];

  constructor(private monsterService: MonsterService, private searchService: SearchService) { }

  ngOnInit() {
    this.monsters = this.monsterService.findAllMonsters();

    const compareFunction = (monster) => monster.name;

    this.monsters.subscribe((monsters) => {
      this.searchService.getSearchObservable().subscribe(() => {
        this.filteredMonsters = this.searchService.filterArray(monsters, compareFunction);
      });
    });
  }

}
