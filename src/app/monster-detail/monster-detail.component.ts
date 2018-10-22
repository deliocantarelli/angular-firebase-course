import { Component, OnInit } from '@angular/core';
import { MonsterService } from '../shared/model/monster.service';
import { Observable } from 'rxjs';
import { Monster } from '../shared/model/monster';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: ['./monster-detail.component.css']
})
export class MonsterDetailComponent implements OnInit {

  lessons$: Observable<Monster[]>;

  constructor(
    private route: ActivatedRoute,
    private monsterService: MonsterService) { }

  ngOnInit() {
    const monsterUrl = this.route.snapshot.params['name'];

    this.monsterService.getDropList(monsterUrl)
    .subscribe(console.log);
  }

}
