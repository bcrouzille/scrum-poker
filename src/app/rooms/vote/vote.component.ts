import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VoteModel} from '../models/vote';
import {RoomService} from '../room.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.sass']
})
export class VoteComponent implements OnInit {

  @Input() itemId: number;
  @Input() voteId: number;
  @Output() voted = new EventEmitter();
  private newVote: VoteModel;
  private voteScore: number[] = [0, 1, 3, 5, 8, 13];

  constructor(private roomService: RoomService, private route: ActivatedRoute) {
    this.newVote = new VoteModel;
    this.newVote.score = 0;
  }

  addVote() {
    if (this.voteId && this.voteId !== 0) {
      this.newVote.id = this.voteId;
    }
    this.newVote.itemsId = this.itemId;
    this.roomService.addVote(this.newVote).subscribe(
      vote => this.voted.emit()
    );
  }

  editVote() {
    this.newVote.id = this.voteId;
    this.newVote.itemsId = this.itemId;
    this.roomService.editVote(this.newVote).subscribe(
      vote => this.voted.emit()
    );
  }

  ngOnInit() {
  }

}
