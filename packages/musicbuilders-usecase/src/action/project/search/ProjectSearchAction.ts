import { inject, injectable } from "inversify";
import { Project } from "musicbuilders-domain/src/project/Project";
import { UseCaseError } from "../../../error/UseCaseError";
import { ProjectQueryCondition } from "../../../query/project/ProjectQueryCondition";
import { ProjectQueryResult } from "../../../query/project/ProjectQueryResult";
import { ProjectQueryService } from "../../../query/project/ProjectQueryService";
import { Result } from "../../../utils/Result";
import { Success } from "../../../utils/Success";
import { ProjectSearchInput } from "./ProjectSearchInput";
import { ProjectSearchOutput } from "./ProjectSearchOutput";
import { ProjectSearchUseCase } from "./ProjectSearchUseCase";

@injectable()
export class ProjectSearchAction implements ProjectSearchUseCase {
  private _projectQueryService: ProjectQueryService;

	constructor(@inject("ProjectQueryService") projectQueryService: ProjectQueryService) {
		this._projectQueryService = projectQueryService;
	}

  public async handle(input: ProjectSearchInput): Promise<Result<ProjectSearchOutput, UseCaseError>> {
    const condition: ProjectQueryCondition = new ProjectQueryCondition(input.teamId, input.offset, input.limit);

    // 1. 件数取得
    const count: number = await this._projectQueryService.count(condition);
    if (count === 0) return new Success(new ProjectSearchOutput(count));

    // 2. 検索結果取得
    const result: ProjectQueryResult = await this._projectQueryService.search(condition);

    const output: ProjectSearchOutput = new ProjectSearchOutput(count, result.projectDto);
    return new Success(output);
  }
}