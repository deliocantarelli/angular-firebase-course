import {Route} from '@angular/router';
import { MonstersListComponent } from './monsters-list/monsters-list.component';
import { MonsterDetailComponent } from './monster-detail/monster-detail.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemsListContainerComponent } from './items-list-container/items-list-container.component';
import { NewItemComponent } from './new-item/new-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemResolver } from './shared/model/Item.resolver';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

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
    { path: 'items/:name',
        children: [
            {
                path: 'edit',
                component: EditItemComponent,
                resolve: {
                    item: ItemResolver
                }
            },
            {
                path: '',
                component: ItemDetailComponent,
            }
        ]
    },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', redirectTo: 'home'}
];
