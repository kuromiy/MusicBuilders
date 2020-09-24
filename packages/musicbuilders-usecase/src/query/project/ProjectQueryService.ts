import { ProjectQueryCondition } from "./ProjectQueryCondition";
import { ProjectQueryResult } from "./ProjectQueryResult";

export interface ProjectQueryService {
  count(condition: ProjectQueryCondition): Promise<number>;
  search(condition: ProjectQueryCondition): Promise<ProjectQueryResult>;
}