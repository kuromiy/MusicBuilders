export class ProjectRegisterCreateRequest {
  private _projectName: string;
  private _projectDescription: string;
  private _userId: string;
  private _teamId: string;

	constructor(projectName: string, projectDescription: string, userId: string, teamId: string) {
		this._projectName = projectName;
		this._projectDescription = projectDescription;
		this._userId = userId;
		this._teamId = teamId;
	}

	public get projectName(): string {
		return this._projectName;
	}

	public get projectDescription(): string {
		return this._projectDescription;
	}

	public get userId(): string {
		return this._userId;
	}

 	public get teamId(): string {
		return this._teamId;
	}
}