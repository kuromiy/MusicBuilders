import { TeamDto } from "./dto/TeamDto";
import { RequestErrorDto } from "./error/RequestErrorDto";
import { UseCaseErrorDto } from "./error/UseCaseErrorDto";

export class HomeIndexResponse {
  private _teamDtoList: Array<TeamDto>;
  private _requestErrorDtoList: Array<RequestErrorDto>;
  private _useCaseErrorDto: UseCaseErrorDto | null;

	private constructor(teamDtoList: Array<TeamDto>, requestErrorDtoList: Array<RequestErrorDto>, useCaseErrorDto: UseCaseErrorDto | null) {
		this._teamDtoList = teamDtoList;
		this._requestErrorDtoList = requestErrorDtoList;
		this._useCaseErrorDto = useCaseErrorDto;
  }
  
  public static createNormalResponse(teamDtoList: Array<TeamDto>): HomeIndexResponse {
    return new HomeIndexResponse(teamDtoList, new Array<RequestErrorDto>(), null);
  }

  public static createRequestErrorResponse(requestErrorDtoList: Array<RequestErrorDto>): HomeIndexResponse {
    return new HomeIndexResponse(new Array<TeamDto>(), requestErrorDtoList, null);
  }

  public static createUseCaseErrorResponse(useCaseErrorDto: UseCaseErrorDto): HomeIndexResponse {
    return new HomeIndexResponse(new Array<TeamDto>(), new Array<RequestErrorDto>(), useCaseErrorDto);
  }

	public get teamDtoList(): Array<TeamDto> {
		return this._teamDtoList;
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