import { UserCreateOutput } from "musicbuilders-usecase/src/action/user/create/UserCreateOutput";
import { ErrorDto } from "./error/ErrorDto";

/**
 * ユーザー登録画面ユーザー登録処理レスポンス
 */
export class UserRegisterCreateResponse {
  private _userId: string | null;
  private _errorDtoList: Array<ErrorDto>;

  private constructor(userId: string | null, errorDtoList: Array<ErrorDto>) {
    this._userId = userId;
    this._errorDtoList = errorDtoList;
  }

  public static createNormalResponse(userId: string): UserRegisterCreateResponse {
    return new UserRegisterCreateResponse(userId, new Array<ErrorDto>());
  }

  public static createErrorResponse(errorDtoList: Array<ErrorDto>): UserRegisterCreateResponse {
    return new UserRegisterCreateResponse(null, errorDtoList);
  }

	public get userId(): string {
    if (!this._userId) throw new Error("");
		return this._userId;
  }

	public get errorDtoList(): Array<ErrorDto> {
    if (this._errorDtoList.length === 0) throw new Error("");
    return this._errorDtoList;
	}
  
  public hasError(): boolean {
    return this._errorDtoList.length > 0;
  }
}