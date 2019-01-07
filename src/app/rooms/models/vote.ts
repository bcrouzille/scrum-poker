export class VoteModel {
  score: number;
  id: number;
  itemsId: number;

  public toString(): string {
    return this.score.toString();
  }
}
