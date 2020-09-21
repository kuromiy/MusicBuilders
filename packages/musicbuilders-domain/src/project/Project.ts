import { TeamId } from "../team/TeamId";
import { UserId } from "../user/UserId";
import { ProjectDescription } from "./ProjectDescription";
import { ProjectId } from "./ProjectId";
import { ProjectName } from "./ProjectName";

export class Project {
  private _projectId: ProjectId;
  private _projectName: ProjectName;
  private _projectDescription: ProjectDescription;
  private _projectAdministrator: UserId;
  private _teamId: TeamId;
  private _createdAt: Date;
  private _updatedAt: Date;

	private constructor(projectId: ProjectId, projectName: ProjectName, projectDescription: ProjectDescription, projectAdministrator: UserId, teamId: TeamId, createdAt: Date, updatedAt: Date) {
		this._projectId = projectId;
		this._projectName = projectName;
		this._projectDescription = projectDescription;
		this._projectAdministrator = projectAdministrator;
		this._teamId = teamId;
		this._createdAt = createdAt;
		this._updatedAt = updatedAt;
  }

  public static create(projectId: ProjectId, projectName: ProjectName, projectDescription: ProjectDescription, projectAdministrator: UserId, teamId: TeamId): Project {
    const now = new Date();
    return new Project(projectId, projectName, projectDescription, projectAdministrator, teamId, now, now);
  }

	public get projectId(): string {
		return this._projectId.value;
	}

  public get projectName(): string {
		return this._projectName.value;
	}

	public get projectDescription(): string {
		return this._projectDescription.value;
	}

	public get projectAdministrator(): string {
		return this._projectAdministrator.value;
	}

	public get teamId(): string {
		return this._teamId.value;
	}

	public get createdAt(): Date {
		return this._createdAt;
	}

	public get updatedAt(): Date {
		return this._updatedAt;
	}
}