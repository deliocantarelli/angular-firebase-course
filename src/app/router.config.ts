import {Route} from '@angular/router';
import { MonstersListComponent } from './monsters-list/monsters-list.component';
import { MonsterDetailComponent } from './monster-detail/monster-detail.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemsListContainerComponent } from './items-list-container/items-list-container.component';

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
    { path: 'items/:itemName', component: ItemDetailComponent},
    { path: 'items', component: ItemsListContainerComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', redirectTo: 'home'}
];
