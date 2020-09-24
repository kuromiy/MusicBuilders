export class TeamGetInput {
  private _teamId: string;

	constructor(teamId: string) {
		this._teamId = teamId;
	}

	public get teamId(): string {
		return this._teamId;
	}
}