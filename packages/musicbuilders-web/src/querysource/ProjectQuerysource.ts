import { injectable } from "inversify";
import { ProjectDto } from "musicbuilders-usecase/src/dto/project/ProjectDto";
import { ProjectQueryCondition } from "musicbuilders-usecase/src/query/project/ProjectQueryCondition";
import { ProjectQueryResult } from "musicbuilders-usecase/src/query/project/ProjectQueryResult";
import { ProjectQueryService } from "musicbuilders-usecase/src/query/project/ProjectQueryService";
import { getRepository } from "typeorm";
import { ProjectsEntity } from "../db/entity/ProjectsEntity";
import { TeamsEntity } from "../db/entity/TeamsEntity";

@injectable()
export class ProjectQuerysource implements ProjectQueryService {
  public async count(condition: ProjectQueryCondition): Promise<number> {
    const teamsEntity: TeamsEntity = new TeamsEntity();
    teamsEntity.teamId = condition.teamId;
    const result: number = await getRepository(ProjectsEntity).count({where: {team: teamsEntity}});
    return result;
  }

  public async search(condition: ProjectQueryCondition): Promise<ProjectQueryResult> {
    const teamsEntity = new TeamsEntity();
    teamsEntity.teamId = condition.teamId;
    const result = await getRepository(ProjectsEntity).find({relations: ["projectAdministrator", "team"], where: {team: teamsEntity}});
    const list = result.map(value => {
      return new ProjectDto(value.projectId, value.projectName, value.projectDescription, value.projectAdministrator.userId, value.team.teamId, value.createdAt, value.updatedAt);
    });
    return new ProjectQueryResult(list);
  }
}