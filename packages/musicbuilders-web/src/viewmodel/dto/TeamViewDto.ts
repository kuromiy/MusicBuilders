export class TeamViewDto {
  private _teamId: string;
  private _teamName: string;
  private _teamDescription: string;
  private _createdAt: Date;
  private _updatedAt: Date;

	constructor(teamId: string, teamName: string, teamDescription: string, createdAt: Date, updatedAt: Date) {
		this._teamId = teamId;
		this._teamName = teamName;
		this._teamDescription = teamDescription;
		this._createdAt = createdAt;
		this._updatedAt = updatedAt;
	}

	public get teamId(): string {
		return this._teamId;
	}

	public get teamName(): string {
		return this._teamName;
	}

	public get teamDescription(): string {
		return this._teamDescription;
	}

	public get createdAt(): Date {
		return this._createdAt;
	}

	public get updatedAt(): Date {
		return this._updatedAt;
	}
}