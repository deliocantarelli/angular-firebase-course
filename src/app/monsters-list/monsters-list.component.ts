import { Component, OnInit } from '@angular/core';
import { MonsterService } from '../shared/model/monster.service';
import { Observable } from 'rxjs';
import { Monster } from '../shared/model/monster';

@Component({
  selector: 'app-monsters-list',
  templateUrl: './monsters-list.component.html',
  styleUrls: ['./monsters-list.component.css']
})
export class MonstersListComponent implements OnInit {

  monsters: Observable<Monster[]>;
  constructor(private monsterService: MonsterService) { }

  ngOnInit() {
    this.monsters = this.monsterService.findAllMonsters();
  }

}
