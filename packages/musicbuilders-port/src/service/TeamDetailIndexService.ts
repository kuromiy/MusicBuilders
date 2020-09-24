import { TeamGetUseCase } from "musicbuilders-usecase/src/action/team/get/TeamGetUseCase";
import { ProjectSearchUseCase } from "musicbuilders-usecase/src/action/project/search/ProjectSearchUseCase";
import { inject, injectable } from "inversify";
import { TeamDetailIndexRequest } from "../request/TeamDetailIndexRequest";
import { TeamDetailIndexResponse } from "../response/TeamDetailIndexResponse";
import { RequestValidator } from "../validator/RequestValidator";
import { RequestErrorDto } from "../response/error/RequestErrorDto";
import { TeamGetInput } from "musicbuilders-usecase/src/action/team/get/TeamGetInput";
import { Result } from "musicbuilders-usecase/src/utils/Result";
import { TeamGetOutput } from "musicbuilders-usecase/src/action/team/get/TeamGetOutput";
import { UseCaseError } from "musicbuilders-usecase/src/error/UseCaseError";
import { ProjectSearchInput } from "musicbuilders-usecase/src/action/project/search/ProjectSearchInput";
import { ProjectSearchOutput } from "musicbuilders-usecase/src/action/project/search/ProjectSearchOutput";
import { UseCaseErrorDto } from "../response/error/UseCaseErrorDto";
import { TeamDto } from "../response/dto/TeamDto";
import { ProjectDto } from "../response/dto/ProjectDto";

@injectable()
export class TeamDetailIndexService {
  private _teamGetUseCase: TeamGetUseCase;
  private _projectSearchUseCase: ProjectSearchUseCase;
  private _requestValidator: RequestValidator;

	constructor(
    @inject("TeamGetUseCase") teamGetUseCase: TeamGetUseCase,
    @inject("ProjectSearchUseCase") projectSearchUseCase: ProjectSearchUseCase,
    @inject("RequestValidator") requestValidator: RequestValidator) {
      this._teamGetUseCase = teamGetUseCase;
      this._projectSearchUseCase = projectSearchUseCase;
      this._requestValidator = requestValidator;
	}

  public async execute(request: TeamDetailIndexRequest): Promise<TeamDetailIndexResponse> {
    const errorDtoList: Array<RequestErrorDto> = await this._requestValidator.validate(request);
    if (errorDtoList.length > 0) return TeamDetailIndexResponse.createRequestErrorResponse(errorDtoList);

    // 1. チーム詳細取得
    const teamGetInput: TeamGetInput = new TeamGetInput(request.teamId);
    const teamGetResult: Result<TeamGetOutput, UseCaseError> = await this._teamGetUseCase.handle(teamGetInput);
    if (teamGetResult.isFailure()) {
      const useCaseErrorDto: UseCaseErrorDto = new UseCaseErrorDto(teamGetResult.value.errorCode, teamGetResult.value.errorName, teamGetResult.value.errorMessage);
      return TeamDetailIndexResponse.createUseCaseErrorResponse(useCaseErrorDto);
    }

    // 2. 関連プロジェクト一覧取得
    const projectSearchInput: ProjectSearchInput = new ProjectSearchInput(request.teamId, request.offset, request.offset);
    const projectSearchResult: Result<ProjectSearchOutput, UseCaseError> = await this._projectSearchUseCase.handle(projectSearchInput);
    if (projectSearchResult.isFailure()) {
      const useCaseErrorDto: UseCaseErrorDto = new UseCaseErrorDto(projectSearchResult.value.errorCode, projectSearchResult.value.errorName, projectSearchResult.value.errorMessage);
      return TeamDetailIndexResponse.createUseCaseErrorResponse(useCaseErrorDto);
    }

    const teamDto = new TeamDto(
      teamGetResult.value.teamDto.teamId,
      teamGetResult.value.teamDto.teamName,
      teamGetResult.value.teamDto.teamDescription,
      teamGetResult.value.teamDto.teamAdministrator,
      teamGetResult.value.teamDto.teamMemberList,
      teamGetResult.value.teamDto.createdAt,
      teamGetResult.value.teamDto.updatedAt);
    const projectDtoList = projectSearchResult.value.projectDto.map(value => {
      return new ProjectDto(value.projectId, value.projectName, value.projectDescription, value.projectAdministrator, value.teamId, value.createdAt, value.updatedAt);
    });
    return TeamDetailIndexResponse.createNormalResponse(teamDto, projectSearchResult.value.count, projectDtoList);
  }
}