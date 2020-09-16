import { injectable } from "inversify";
import { Team } from "musicbuilders-domain/src/team/Team";
import { TeamId } from "musicbuilders-domain/src/team/TeamId";
import { TeamRepository } from "musicbuilders-domain/src/team/TeamRepository";
import { UserId } from "musicbuilders-domain/src/user/UserId";
import { getRepository } from "typeorm";
import { v4 } from "uuid";
import { TeamsEntity } from "../db/entity/TeamsEntity";
import { UsersEntity } from "../db/entity/UsersEntity";

@injectable()
export class TeamDatasource implements TeamRepository {
  public async register(team: Team): Promise<number> {
    // TODO IDだけ入れる実装で大丈夫か
    const usersEntity: UsersEntity = new UsersEntity();
    usersEntity.userId = team.teamAdministrator;

    const teamsEntity: TeamsEntity = new TeamsEntity();
    teamsEntity.teamId = team.teamId;
    teamsEntity.teamName = team.teamName;
    teamsEntity.teamDescription = team.teamDescription;
    teamsEntity.teamAdministrator = usersEntity;
    teamsEntity.createdAt = team.createdAt;
    teamsEntity.updatedAt = team.updatedAt;

    const registeredTeamsEntity: TeamsEntity = await getRepository(TeamsEntity).save(teamsEntity);
    if (registeredTeamsEntity) {
      return 1;
    } else {
      return 0;
    }
  }

  update(team: Team): Promise<number> {
    throw new Error("Method not implemented.");
  }

  logicalDelete(teamId: TeamId): Promise<number> {
    throw new Error("Method not implemented.");
  }

  findByTeamId(teamId: TeamId): Promise<Team> {
    throw new Error("Method not implemented.");
  }

  listByUserId(userId: UserId): Promise<Team[]> {
    throw new Error("Method not implemented.");
  }

  public async generateTeamId(): Promise<TeamId> {
    const id: string = v4();
    // TODO uuidで生成したIDがDBに登録されていないかの判定実装
    return new TeamId(id);
  }
}