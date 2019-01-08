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
  private newVote: VoteModel;
  private usersVote: VoteModel[];

  constructor(private roomService: RoomService, private route: ActivatedRoute, private userService: UserService) {
    this.newVote = new VoteModel;
    this.newVote.score = 0;
    this.usersVote = [];
  }

  ngOnInit() {
    this.getRoom();
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
   this.room.items.forEach(item => {
     if (item.votes) {
       this.usersVote.push(item.votes.filter(vote => vote.username === this.userService.user$.getValue().username)[0]);
       console.log(this.usersVote);

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
