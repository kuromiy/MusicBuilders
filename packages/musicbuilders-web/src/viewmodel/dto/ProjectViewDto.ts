export class ProjectViewDto {
  private _projectId: string;
  private _projectName: string;
  private _projectDescription: string;
  private _projectAdministrator: string;
  private _teamId: string;
  private _createdAt: Date;
  private _updatedAt: Date;

	constructor(projectId: string, projectName: string, projectDescription: string, projectAdministrator: string, teamId: string, createdAt: Date, updatedAt: Date) {
		this._projectId = projectId;
		this._projectName = projectName;
		this._projectDescription = projectDescription;
		this._projectAdministrator = projectAdministrator;
		this._teamId = teamId;
		this._createdAt = createdAt;
		this._updatedAt = updatedAt;
	}

	public get projectId(): string {
		return this._projectId;
	}

	public get projectName(): string {
		return this._projectName;
	}

	public get projectDescription(): string {
		return this._projectDescription;
	}

	public get projectAdministrator(): string {
		return this._projectAdministrator;
	}

	public get teamId(): string {
		return this._teamId;
	}

	public get createdAt(): Date {
		return this._createdAt;
	}

	public get updatedAt(): Date {
		return this._updatedAt;
	}
}