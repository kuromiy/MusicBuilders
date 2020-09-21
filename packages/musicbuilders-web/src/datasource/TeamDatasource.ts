import { injectable } from "inversify";
import { Team } from "musicbuilders-domain/src/team/Team";
import { TeamDescription } from "musicbuilders-domain/src/team/TeamDescription";
import { TeamId } from "musicbuilders-domain/src/team/TeamId";
import { TeamName } from "musicbuilders-domain/src/team/TeamName";
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

  public async findByTeamId(teamId: TeamId): Promise<Team | null> {
    const teamEntity: TeamsEntity | undefined = await getRepository(TeamsEntity).findOne({relations: ["teamAdministrator"], where: {teamId: teamId.value}});
    if (teamEntity) {
      const teamId: TeamId = new TeamId(teamEntity.teamId);
      const teamName: TeamName = new TeamName(teamEntity.teamName);
      const teamDescription: TeamDescription = new TeamDescription(teamEntity.teamDescription);
      const teamAdministrator: UserId = new UserId(teamEntity.teamAdministrator.userId);
      const teamMemberList: Array<UserId> = new Array<UserId>();
      const createdAt: Date = teamEntity.createdAt;
      const updatedAt: Date = teamEntity.updatedAt;
      return Team.recreate(teamId, teamName, teamDescription, teamAdministrator, teamMemberList, createdAt, updatedAt);
    } else {
      return null;
    }
  }

  public async listByUserId(userId: UserId): Promise<Array<Team>> {
    const teamsEntityList: Array<TeamsEntity> = await getRepository(TeamsEntity).find({relations: ["teamAdministrator"], where: {teamAdministrator: userId.value}});
    const teamList: Array<Team> = teamsEntityList.map(value => {
      const teamId: TeamId = new TeamId(value.teamId);
      const teamName: TeamName = new TeamName(value.teamName);
      const teamDescription: TeamDescription = new TeamDescription(value.teamDescription);
      const teamAdministrator: UserId = new UserId(value.teamAdministrator.userId);
      // TODO 修正
      const teamMemberList: Array<UserId> = new Array<UserId>();
      const createdAt: Date = value.createdAt;
      const updatedAt: Date = value.updatedAt;
      return Team.recreate(teamId, teamName, teamDescription, teamAdministrator, teamMemberList, createdAt, updatedAt);
    });
    return teamList;
  }

  public async generateTeamId(): Promise<TeamId> {
    const id: string = v4();
    // TODO uuidで生成したIDがDBに登録されていないかの判定実装
    return new TeamId(id);
  }
}