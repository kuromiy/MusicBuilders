import { BaseResponse } from "./base/BaseResponse";
import { TeamDto } from "./dto/TeamDto";
import { RequestErrorDto } from "./error/RequestErrorDto";
import { UseCaseErrorDto } from "./error/UseCaseErrorDto";

export class HomeIndexResponse extends BaseResponse {
  private _teamDtoList!: Array<TeamDto>;
  
  public static createNormalResponse(teamDtoList: Array<TeamDto>): HomeIndexResponse {
    const response = new HomeIndexResponse();
    response._teamDtoList = teamDtoList;
    response._requestErrorDtoList = new Array<RequestErrorDto>();
    response._useCaseErrorDto = null;
    return response;
  }

  public static initialize(o: HomeIndexResponse, requestErrorDtoList: Array<RequestErrorDto>, useCaseErrorDto: UseCaseErrorDto | null) {
    o._teamDtoList = new Array<TeamDto>();
    o._requestErrorDtoList = requestErrorDtoList;
    o._useCaseErrorDto = useCaseErrorDto;
  }

	public get teamDtoList(): Array<TeamDto> {
		return this._teamDtoList;
	}
}