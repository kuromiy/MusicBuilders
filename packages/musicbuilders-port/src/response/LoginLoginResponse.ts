import { BaseResponse } from "./base/BaseResponse";
import { RequestErrorDto } from "./error/RequestErrorDto";
import { UseCaseErrorDto } from "./error/UseCaseErrorDto";

/**
 * ログイン画面ログイン処理レスポンス
 */
export class LoginLoginResponse extends BaseResponse {
  private _userId!: string | null;

  public static createNormalResponse(userId: string): LoginLoginResponse {
    const response = new LoginLoginResponse();
    response._userId = userId;
    response._requestErrorDtoList = new Array<RequestErrorDto>();
    response._useCaseErrorDto = null;
    return response;
  }

  public static initialize(o: LoginLoginResponse, requestErrorDtoList: Array<RequestErrorDto>, useCaseErrorDto: UseCaseErrorDto | null) {
    o._userId = null;
    o._requestErrorDtoList = requestErrorDtoList;
    o._useCaseErrorDto = useCaseErrorDto;
  }

	public get userId(): string {
    if (!this._userId) throw new Error("");
		return this._userId;
	}
}