import { Team } from "musicbuilders-domain/src/team/Team";
import { TeamDto } from "../dto/team/TeamDto";

export class TeamConverter {
  public static convert(team: Team): TeamDto {
    return new TeamDto(team.teamId, team.teamName, team.teamDescription, team.teamAdministrator, team.teamMemberList, team.createdAt, team.updatedAt);
  }
}