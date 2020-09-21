import { RequestErrorDto } from "./error/RequestErrorDto";
import { UseCaseErrorDto } from "./error/UseCaseErrorDto";

export class ProjectRegisterCreateResponse {
  private _teamId: string | null;
  private _requestErrorDtoList: Array<RequestErrorDto>;
  private _useCaseErrorDto: UseCaseErrorDto | null;

	private constructor(teamId: string | null, requestErrorDtoList: Array<RequestErrorDto>, useCaseErrorDto: UseCaseErrorDto | null) {
		this._teamId = teamId;
		this._requestErrorDtoList = requestErrorDtoList;
		this._useCaseErrorDto = useCaseErrorDto;
  }
  
  public static createNormalResponse(teamId: string): ProjectRegisterCreateResponse {
    return new ProjectRegisterCreateResponse(teamId, new Array<RequestErrorDto>(), null);
  }

  public static createRequestErrorResponse(requestErrorDtoList: Array<RequestErrorDto>): ProjectRegisterCreateResponse {
    return new ProjectRegisterCreateResponse(null, requestErrorDtoList, null);
  }

  public static createUseCaseErrorResponse(useCaseErrorDto: UseCaseErrorDto): ProjectRegisterCreateResponse {
    return new ProjectRegisterCreateResponse(null, new Array<RequestErrorDto>(), useCaseErrorDto);
  }

	public get teamId(): string {
    if (!this._teamId) throw new Error("");
		return this._teamId;
	}

	public get requestErrorDtoList(): Array<RequestErrorDto> {
		return this._requestErrorDtoList;
	}

	public get useCaseErrorDto(): UseCaseErrorDto {
    if (!this._useCaseErrorDto) throw new Error("");
		return this._useCaseErrorDto;
  }
  
  public hasRequestError(): boolean {
    return this._requestErrorDtoList.length !== 0;
  }

  public hasUseCaseError(): boolean {
    return this._useCaseErrorDto !== null;
  }
}