import { UserId } from "../user/UserId";
import { TeamDescription } from "./TeamDescription";
import { TeamId } from "./TeamId";
import { TeamName } from "./TeamName";

export class Team {
  private _teamId: TeamId;
  private _teamName: TeamName;
  private _teamDescription: TeamDescription;
  private _teamAdministrator: UserId;
  private _teamMemberList: Array<UserId>;
  private _createdAt: Date;
  private _updatedAt: Date;

	private constructor(teamId: TeamId, teamName: TeamName, teamDescription: TeamDescription, teamAdministrator: UserId, teamMemberList: Array<UserId>, createdAt: Date, updatedAt: Date) {
		this._teamId = teamId;
		this._teamName = teamName;
    this._teamDescription = teamDescription;
    this._teamAdministrator = teamAdministrator;
		this._teamMemberList = teamMemberList;
		this._createdAt = createdAt;
		this._updatedAt = updatedAt;
  }

  public static create(teamId: TeamId, teamName: TeamName, teamDescription: TeamDescription, teamAdministrator: UserId): Team {
    const now = new Date();
    return new Team(teamId, teamName, teamDescription, teamAdministrator, new Array<UserId>(), now, now);
  }

  public static recreate(teamId: TeamId, teamName: TeamName, teamDescription: TeamDescription, teamAdministrator: UserId, teamMemberList: Array<UserId>, createdAt: Date, updatedAt: Date): Team {
    return new Team(teamId, teamName, teamDescription, teamAdministrator, teamMemberList, createdAt, updatedAt);
  }

  public get teamId(): string {
    return this._teamId.value;
  }

  public get teamName(): string {
    return this._teamName.value;
  }

  public get teamDescription(): string {
    return this._teamDescription.value;
  }

  public get teamAdministrator(): string {
    return this._teamAdministrator.value;
  }

  public get teamMemberList(): Array<string> {
    return this._teamMemberList.map(value => value.value);
  }

	public get createdAt(): Date {
		return this._createdAt;
	}

  public get updatedAt(): Date {
		return this._updatedAt;
	}
}