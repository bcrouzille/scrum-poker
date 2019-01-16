import {Component, OnInit} from '@angular/core';
import {RoomService} from '../room.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomModel} from '../models/room';
import {ItemModel} from '../models/item';
import {VoteModel} from '../models/vote';
import {UserService} from '../../user/user.service';
import {UserModel} from '../../user/models/user';

@Component({
  selector: 'app-detail-room',
  templateUrl: './detail-room.component.html',
  styleUrls: ['./detail-room.component.sass']
})

export class DetailRoomComponent implements OnInit {
  public items: ItemModel[] = [];
  private room: RoomModel;
  private newVote: VoteModel;
  private usersVote: VoteModel[];
  private user: UserModel;

  constructor(private roomService: RoomService, private route: ActivatedRoute, private userService: UserService, private router: Router) {
    this.newVote = new VoteModel;
    this.newVote.score = 0;
    this.usersVote = [];
  }

  ngOnInit() {
    this.getRoom();
    this.user = this.userService.user$.getValue();
  }

  getRoom() {
    const id = +this.route.snapshot.paramMap.get('idRoom');
    this.roomService.getRoomWithVotes(id).subscribe(
      () => {
        this.room = this.roomService._room$.getValue();
        this.getUserVotes();
            }
    );
  }

  displayVote(value) {
    return value.score + ' ' + (value.username ? '(' + value.username + ')' : '');
  }

  voteAverage(votes) {
    let avg = 0;
    votes.forEach(v => avg += v.score);
    return (avg / votes.length).toPrecision(2);
  }

  getUserVotes() {
    if (this.room && this.room.items) {
      this.usersVote = [];
   this.room.items.forEach(item => {
     if (item.votes) {
       this.usersVote.push(item.votes.filter(vote => vote.username === this.userService.user$.getValue().username)[0]);
     }
   });
    }
  }

  getUserVote(itemId: number): VoteModel {
    for (let i = 0; i < this.usersVote.length; i++) {
      if (this.usersVote[i].itemsId === itemId) {
        return this.usersVote[i];
      }
    }
  }

  votedCallBack() {
    console.log('pouet voted');
    this.getRoom();
  }

  alreadyVoted(itemId: number): boolean {
    if (this.usersVote.length > 0) {
      for (let i = 0; i < this.usersVote.length; i++) {
         if (this.usersVote[i] && this.usersVote[i].itemsId === itemId) {
           return true;
            }
        }
    }
    return false;
  }

  closeVotes(itemId, closed: boolean) {
this.roomService.closeVotes(itemId, closed).subscribe(
  () => {
    this.getRoom();
  }
);
  }

  resetVotes(itemId) {
      this.roomService.resetVotes(itemId).subscribe(
        () => {
          this.closeVotes(itemId, false);
        });
    }


}
