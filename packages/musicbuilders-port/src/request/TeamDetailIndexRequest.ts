export class TeamDetailIndexRequest {
  private _teamId: string;
  private _offset: number;
  private _limit: number;

	constructor(teamId: string, offset: number, limit: number) {
		this._teamId = teamId;
		this._offset = offset;
		this._limit = limit;
	}

	public get teamId(): string {
		return this._teamId;
	}

	public get offset(): number {
		return this._offset;
	}

	public get limit(): number {
		return this._limit;
	}
}