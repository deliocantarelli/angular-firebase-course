import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { Firebase } from '../environments/firebase.config';
import { PaginationModule } from 'ngx-bootstrap/pagination';


import { AppComponent } from './app.component';
import { CrudComponent } from './crud/crud.component';
import { HomeComponent } from './home/home.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { RouterModule } from '@angular/router';
import { routerConfig } from './router.config';
import { MonstersListComponent } from './monsters-list/monsters-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ItemsService } from './shared/model/items.service';
import { MonsterService } from './shared/model/monster.service';
import { MonsterDetailComponent } from './monster-detail/monster-detail.component';
import { PageComponent } from './page/page.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemsListContainerComponent } from './items-list-container/items-list-container.component';
import { SafeUrlPipe } from './shared/security/safe-url.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemResolver } from './shared/model/Item.resolver';


@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    HomeComponent,
    ItemsListComponent,
    MonstersListComponent,
    NavBarComponent,
    MonsterDetailComponent,
    PageComponent,
    ItemDetailComponent,
    ItemsListContainerComponent,
    SafeUrlPipe,
    NewItemComponent,
    ItemFormComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(Firebase.config),
    AngularFireDatabaseModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(routerConfig),
    PaginationModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [ItemsService, MonsterService, ItemResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
