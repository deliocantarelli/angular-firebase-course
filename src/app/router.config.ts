import {Route} from '@angular/router';
import { MonstersListComponent } from './monsters-list/monsters-list.component';
import { MonsterDetailComponent } from './monster-detail/monster-detail.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemsListContainerComponent } from './items-list-container/items-list-container.component';
import { NewItemComponent } from './new-item/new-item.component';

export const routerConfig: Route[] = [
    { path: 'home', component: ItemsListContainerComponent},
    { path: 'monsters',
    children: [
        {
            path: ':name',
            component: MonsterDetailComponent
        }, {
            path: '',
            component: MonstersListComponent
        },
        ],
    },
    {path: 'items', children: [
        {
            path: 'new',
            component: NewItemComponent
        },
        {
            path: '',
            component: ItemsListContainerComponent
        }
    ]},
    { path: 'items/:name', component: ItemDetailComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', redirectTo: 'home'}
];
