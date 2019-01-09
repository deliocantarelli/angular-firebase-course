import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListContainerComponent } from './items-list-container.component';

describe('ItemsListContainerComponent', () => {
  let component: ItemsListContainerComponent;
  let fixture: ComponentFixture<ItemsListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
