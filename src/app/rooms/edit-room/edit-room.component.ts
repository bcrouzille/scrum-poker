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
      this.currentItem.id = 0;
      this.room.items.push(this.currentItem);
      this.clearCurrentItem();
    }
  }

  deleteItem(item: ItemModel) {
    if (item.id !== undefined) {
      this.roomService.deleteItem(item.id).subscribe();
    }
    this.room.items.splice(this.room.items.indexOf(item), 1);
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
        this.room.items = [];
      }
    );
  }

  updateRoom() {
    this.success = '';
    this.clearCurrentItem();
    this.roomService.updateRoom(this.room).subscribe(
      (room) => {
        if (this.room.items) {
          const newItems: ItemModel[] = [];
          this.room.items.forEach(item => {
            if (item.id === 0) {
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
