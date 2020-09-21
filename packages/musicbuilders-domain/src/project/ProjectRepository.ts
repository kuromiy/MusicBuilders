import { TeamId } from "../team/TeamId";
import { Project } from "./Project";
import { ProjectId } from "./ProjectId";

export interface ProjectRepository {
  register(project: Project): Promise<number>;
  update(project: Project): Promise<number>;
  logicalDelete(projectId: ProjectId): Promise<number>;
  findByProjectId(projectId: ProjectId): Promise<Project | null>;
  listByTeamId(teamId: TeamId): Promise<Array<Project>>;
  generateProjectId(): Promise<ProjectId>;
}