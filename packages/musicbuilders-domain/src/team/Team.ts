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
}