import {Component, OnInit} from '@angular/core';
import {RoomModel} from '../models/room';
import {RoomService} from '../room.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemModel} from '../models/item';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.sass']
})

export class EditRoomComponent implements OnInit {
  public room: RoomModel = new RoomModel();
  public currentItem: ItemModel = new ItemModel();
  public items: ItemModel[] = [];
  public success = '';

  constructor(private roomService: RoomService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getRoom();
  }

  getRoom() {
    const id = +this.route.snapshot.paramMap.get('idRoom');
    this.roomService.getRoom(id).subscribe(
      (room) => {
        console.log(room);
        this.room = this.roomService._room$.getValue();
        this.items = this.roomService._items$.getValue();
      }
    );
  }

  editItem(item: ItemModel) {
    this.currentItem = item;
  }

  clearCurrentItem() {
    this.currentItem = new ItemModel();
  }

  addItem() {
    if (this.currentItem && this.currentItem.name !== '' && this.currentItem.name !== undefined) {
      this.currentItem.id = '';
      console.log(this.currentItem.name);
      this.items.push(this.currentItem);
      this.clearCurrentItem();
    }
  }

  deleteItem(item: ItemModel) {
    if (item.id !== undefined) {
      this.roomService.deleteItem(item.id).subscribe();
    }
    this.items.splice(this.items.indexOf(item), 1);
  }

  /*getItems(idRoom) {
    this.roomService.getItems(idRoom).subscribe(
      (items) => {
        this.items = this.roomService._items$.getValue();
      }
    );
  }*/

  clearItems() {
    this.roomService.clearItems(this.room.id).subscribe(
      () => {
        this.items = [];
      }
    );
  }

  updateRoom() {
    this.success = '';
    this.clearCurrentItem();
    this.roomService.updateRoom(this.room).subscribe(
      (room) => {
        this.room = room;
        if (this.items) {
          const newItems: ItemModel[] = [];
          this.items.forEach(item => {
            if (item.id === '') {
              item.id = undefined;
              newItems.push(item);
            } else {
              this.roomService.updateItem(item);
            }
          });
          if (newItems.length !== 0) {
            this.roomService.addItems(newItems, room.id).subscribe();
          }
        }
       this.router.navigateByUrl('/dashboard');
      }
    );
  }


}
