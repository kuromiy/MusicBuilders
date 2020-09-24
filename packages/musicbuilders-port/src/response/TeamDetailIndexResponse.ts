import { BaseResponse } from "./base/BaseResponse";
import { ProjectDto } from "./dto/ProjectDto";
import { TeamDto } from "./dto/TeamDto";
import { RequestErrorDto } from "./error/RequestErrorDto";
import { UseCaseErrorDto } from "./error/UseCaseErrorDto";

export class TeamDetailIndexResponse extends BaseResponse {
  private _teamDto!: TeamDto;
  private _count!: number;
  private _projectDtoList!: Array<ProjectDto>;

  public static createNormalResponse(teamDto: TeamDto, count: number, projectDtoList: Array<ProjectDto>): TeamDetailIndexResponse {
    const response = new TeamDetailIndexResponse();
    response._teamDto = teamDto;
    response._count = count;
    response._projectDtoList = projectDtoList;
    response._requestErrorDtoList = new Array<RequestErrorDto>();
    response._useCaseErrorDto = null;
    return response;
  }

  public static initialize(o: TeamDetailIndexResponse, requestErrorDtoList: Array<RequestErrorDto>, useCaseErrorDto: UseCaseErrorDto | null) {
    o._requestErrorDtoList = requestErrorDtoList;
    o._useCaseErrorDto = useCaseErrorDto;
  }

	public get teamDto(): TeamDto {
		return this._teamDto;
	}

	public get count(): number {
		return this._count;
	}

 	public get projectDtoList(): Array<ProjectDto> {
		return this._projectDtoList;
	}
}