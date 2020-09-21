import { injectable } from "inversify";
import { Project } from "musicbuilders-domain/src/project/Project";
import { ProjectId } from "musicbuilders-domain/src/project/ProjectId";
import { ProjectRepository } from "musicbuilders-domain/src/project/ProjectRepository";
import { TeamId } from "musicbuilders-domain/src/team/TeamId";
import { getRepository } from "typeorm";
import { v4 } from "uuid";
import { ProjectsEntity } from "../db/entity/ProjectsEntity";
import { TeamsEntity } from "../db/entity/TeamsEntity";
import { UsersEntity } from "../db/entity/UsersEntity";

@injectable()
export class ProjectDatasource implements ProjectRepository {
  public async register(project: Project): Promise<number> {
    const usersEntity: UsersEntity = new UsersEntity();
    usersEntity.userId = project.projectAdministrator;

    const teamsEntity: TeamsEntity = new TeamsEntity();
    teamsEntity.teamId = project.teamId;

    const projectsEntity: ProjectsEntity = new ProjectsEntity();
    projectsEntity.projectId = project.projectId;
    projectsEntity.projectName = project.projectName;
    projectsEntity.projectDescription = project.projectDescription;
    projectsEntity.projectAdministrator = usersEntity;
    projectsEntity.team = teamsEntity;
    projectsEntity.createdAt = project.createdAt;
    projectsEntity.updatedAt = project.updatedAt;

    const registeredProjectsEntity: ProjectsEntity = await getRepository(ProjectsEntity).save(projectsEntity);
    if (registeredProjectsEntity) {
      return 1;
    } else {
      return 0;
    }
  }

  update(project: Project): Promise<number> {
    throw new Error("Method not implemented.");
  }
  logicalDelete(projectId: ProjectId): Promise<number> {
    throw new Error("Method not implemented.");
  }
  findByProjectId(projectId: ProjectId): Promise<Project | null> {
    throw new Error("Method not implemented.");
  }
  listByTeamId(teamId: TeamId): Promise<Project[]> {
    throw new Error("Method not implemented.");
  }
  
  public async generateProjectId(): Promise<ProjectId> {
    const id: string = v4();
    // TODO uuidで生成したIDがDBに登録されていないかの判定実装
    return new ProjectId(id);
  }
}