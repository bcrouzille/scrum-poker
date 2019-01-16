import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VoteModel} from '../models/vote';
import {RoomService} from '../room.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.sass']
})
export class VoteComponent implements OnInit {

  private isAdmin: boolean;
  @Input() itemId: number;
  @Input()
  set userVote(vote: VoteModel) {
    if (vote) {
    this.newVote = vote;
    }
  }
  @Output() voted = new EventEmitter();
  private newVote: VoteModel;
  get voteScore(): number[] { return [0, 1, 3, 5, 8, 13]; }

  constructor(private roomService: RoomService) {
    this.newVote = new VoteModel;
    this.newVote.score = 0;
  }

  addVote() {
    this.newVote.itemsId = this.itemId;
    this.roomService.addVote(this.newVote).subscribe(
      () => this.voted.emit()
    );
  }

  deleteVote() {
  this.roomService.deleteVote(this.newVote).subscribe(
  () => this.voted.emit()
);
  }

  editVote() {
    this.roomService.editVote(this.newVote).subscribe(
      () => this.voted.emit()
    );
  }



  ngOnInit() {
    this.isAdmin = this.roomService.currentUser.isAdmin;
  }

}
