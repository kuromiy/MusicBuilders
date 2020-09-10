import { RequestErrorDto } from "./error/RequestErrorDto";
import { UseCaseErrorDto } from "./error/UseCaseErrorDto";

/**
 * ログイン画面ログイン処理レスポンス
 */
export class LoginLoginResponse {
  private _userId: string | null;
  private _requestErrorDtoList: Array<RequestErrorDto>;
  private _useCaseErrorDto: UseCaseErrorDto | null;

	private constructor(userId: string | null, requestErrorDtoList: Array<RequestErrorDto>, useCaseErrorDto: UseCaseErrorDto | null) {
		this._userId = userId;
		this._requestErrorDtoList = requestErrorDtoList;
		this._useCaseErrorDto = useCaseErrorDto;
  }
  
  public static createNormalResponse(userId: string): LoginLoginResponse {
    return new LoginLoginResponse(userId, new Array<RequestErrorDto>(), null);
  }

  public static createRequestErrorResponse(requestErrorDtoList: Array<RequestErrorDto>): LoginLoginResponse {
    return new LoginLoginResponse(null, requestErrorDtoList, null);
  }

  public static createUseCaseErrorResponse(useCaseErrorDto: UseCaseErrorDto): LoginLoginResponse {
    return new LoginLoginResponse(null, new Array<RequestErrorDto>(), useCaseErrorDto);
  }

	public get userId(): string {
    if (!this._userId) throw new Error("");
		return this._userId;
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