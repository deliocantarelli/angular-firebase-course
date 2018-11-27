import { Component, OnInit } from '@angular/core';
import { MonsterService } from '../shared/model/monster.service';
import { Observable } from 'rxjs';
import { Monster } from '../shared/model/monster';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../shared/model/item';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: ['./monster-detail.component.css']
})
export class MonsterDetailComponent implements OnInit {

  monster: Monster;
  dropList: Observable<Item[]>;

  constructor(
    private route: ActivatedRoute,
    private monsterService: MonsterService) { }

  ngOnInit() {
    const monsterUrl = this.route.snapshot.params['name'];

    this.monsterService.getMonster(monsterUrl)
    .subscribe((monster) => {
      this.monster = monster;
    });
    this.dropList = this.monsterService.getDropList(monsterUrl);

    this.dropList.subscribe(console.log);
  }

}
