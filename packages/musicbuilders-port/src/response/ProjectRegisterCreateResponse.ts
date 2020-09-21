import { BaseResponse } from "./base/BaseResponse";
import { RequestErrorDto } from "./error/RequestErrorDto";
import { UseCaseErrorDto } from "./error/UseCaseErrorDto";

export class ProjectRegisterCreateResponse extends BaseResponse {
  private _teamId!: string | null;
  
  public static createNormalResponse(teamId: string): ProjectRegisterCreateResponse {
    const response = new ProjectRegisterCreateResponse();
    response._teamId = teamId;
    response._requestErrorDtoList = new Array<RequestErrorDto>();
    response._useCaseErrorDto = null;
    return response;
  }

  public static initialize(o: ProjectRegisterCreateResponse, requestErrorDtoList: Array<RequestErrorDto>, useCaseErrorDto: UseCaseErrorDto | null) {
    o._teamId = null;
    o._requestErrorDtoList = requestErrorDtoList;
    o._useCaseErrorDto = useCaseErrorDto;
  }

	public get teamId(): string {
    if (!this._teamId) throw new Error("");
		return this._teamId;
	}
}