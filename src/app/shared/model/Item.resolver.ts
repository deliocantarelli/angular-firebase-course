import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Item } from './item';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ItemsService, ItemWithKey } from './items.service';
import { first } from 'rxjs/operators';

@Injectable()
export class ItemResolver implements Resolve<ItemWithKey> {
    constructor(private itemService: ItemsService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ItemWithKey> {
        const name = route.params['name'];

        return this.itemService.findItemAndKeyWithName(name).pipe(first());
    }
}
