export class TeamRegisterCreateRequest {
  private _teamName: string;
  private _teamDescription: string;
  private _userId: string;

	constructor(teamName: string, teamDescription: string, userId: string) {
		this._teamName = teamName;
		this._teamDescription = teamDescription;
		this._userId = userId;
	}

	public get teamName(): string {
		return this._teamName;
	}

	public get teamDescription(): string {
		return this._teamDescription;
	}

	public get userId(): string {
		return this._userId;
	}
}