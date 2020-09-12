import { UserId } from "../user/UserId";
import { Team } from "./Team";
import { TeamId } from "./TeamId";

export interface TeamRepository {
  register(team: Team): Promise<number>;
  update(team: Team): Promise<number>;
  logicalDelete(teamId: TeamId): Promise<number>;
  findByTeamId(teamId: TeamId): Promise<Team>;
  listByUserId(userId: UserId): Promise<Array<Team>>;
  generateTeamId(): Promise<TeamId>;
}