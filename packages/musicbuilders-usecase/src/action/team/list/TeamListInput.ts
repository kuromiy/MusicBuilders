export class TeamListInput {
  private _userId: string;

	constructor(userId: string) {
		this._userId = userId;
	}

	public get userId(): string {
		return this._userId;
	}
}