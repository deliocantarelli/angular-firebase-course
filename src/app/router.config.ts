import {Route} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonstersListComponent } from './monsters-list/monsters-list.component';
import { ItemsListComponent } from './items-list/items-list.component';

export const routerConfig: Route[] = [
    { path: 'home', component: HomeComponent},
    { path: 'monsters', component: MonstersListComponent},
    // { path: 'items', component: ItemsListComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', redirectTo: 'home'}
];
