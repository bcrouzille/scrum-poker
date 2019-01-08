export class VoteModel {
  score: number;
  id: number;
  itemsId: number;
  username: string;

  public toString(): string {
    return this.score.toString();
  }
}
