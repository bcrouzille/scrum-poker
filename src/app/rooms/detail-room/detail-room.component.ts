import {Component, OnInit} from '@angular/core';
import {RoomService} from '../room.service';
import {ActivatedRoute} from '@angular/router';
import {RoomModel} from '../models/room';
import {ItemModel} from '../models/item';
import {VoteModel} from '../models/vote';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-detail-room',
  templateUrl: './detail-room.component.html',
  styleUrls: ['./detail-room.component.sass']
})

export class DetailRoomComponent implements OnInit {
  public items: ItemModel[] = [];
  private room: RoomModel;
  private votesScore: number[] = [0, 1, 3, 5, 8, 13];
  private newVote: VoteModel;
  private usersVote: VoteModel[];

  constructor(private roomService: RoomService, private route: ActivatedRoute, private userService: UserService) {
    this.newVote = new VoteModel;
    this.newVote.score = 0;
    this.usersVote = [];
  }

  ngOnInit() {
    this.getUserVotes();
    this.getRoom();
  }

  getRoom() {
    const id = +this.route.snapshot.paramMap.get('idRoom');
    this.roomService.getRoom(id).subscribe(
      (room) => {
        this.room = this.roomService._room$.getValue();
        this.items = this.roomService._items$.getValue();
        if (this.items.length > 0) {
          this.items.forEach(item => {
            this.roomService.getVotes(item.id).subscribe(vtes => item.votes = vtes
            );
          });
        }
      }
    );
  }

  displayVotes(votes) {
    return votes.map(value => value.score).join(', ');
  }

  voteAverage(votes) {
    let avg = 0;
    votes.forEach(v => avg += v.score);
    return (avg / votes.length).toPrecision(2);
  }

  getUserVotes() {
    this.userService.getUserVote().subscribe(
      votes => {
        this.usersVote = votes;
      }
    );
  }

  getUserVote(itemId: number): number {
    for (let i = 0; i < this.usersVote.length; i++) {
      if (this.usersVote[i].itemsId === itemId) {
        return this.usersVote[i].id;
      }
    }
  }

  votedCallBack(){
    this.getUserVotes();
    this.getRoom();
  }

  alreadyVoted(itemId: number): boolean {
    if (this.usersVote.length > 0) {
      for (let i = 0; i < this.usersVote.length; i++) {
         if (this.usersVote[i].itemsId === itemId) {
           return true;
            }
        }
    }
    return false;
  }

}
