import { ErrorDto } from "./error/ErrorDto";

/**
 * ログイン画面ログイン処理レスポンス
 */
export class LoginLoginResponse {
  private _userId: string | null;
  private _errorDtoList: Array<ErrorDto>;

	private constructor(userId: string | null, errorDtoList: Array<ErrorDto>) {
    this._userId = userId;
		this._errorDtoList = errorDtoList;
  }

  public static createNormalResponse(userId: string): LoginLoginResponse {
    return new LoginLoginResponse(userId, new Array<ErrorDto>());
  }

  public static createErrorResponse(errorDtoList: Array<ErrorDto>): LoginLoginResponse {
    return new LoginLoginResponse(null, errorDtoList);
  }

  public get userId(): string {
    if (!this._userId) throw new Error("");
    return this._userId;
  }

  public hasUserId(): boolean {
    return this._userId !== null;
  }

	public get errorDtoList(): Array<ErrorDto> {
    if (this._errorDtoList.length === 0) throw new Error("");
		return this._errorDtoList;
  }

  public hasError(): boolean {
    return this._errorDtoList.length > 0;
  }
}