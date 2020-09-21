import { UserCreateOutput } from "musicbuilders-usecase/src/action/user/create/UserCreateOutput";
import { BaseResponse } from "./base/BaseResponse";
import { ErrorDto } from "./error/ErrorDto";
import { RequestErrorDto } from "./error/RequestErrorDto";
import { UseCaseErrorDto } from "./error/UseCaseErrorDto";

/**
 * ユーザー登録画面ユーザー登録処理レスポンス
 */
export class UserRegisterCreateResponse extends BaseResponse {
  private _userId!: string | null;

  public static createNormalResponse(userId: string): UserRegisterCreateResponse {
    const response = new UserRegisterCreateResponse();
    response._userId = userId;
    response._requestErrorDtoList = new Array<RequestErrorDto>();
    response._useCaseErrorDto = null;
    return response;
  }

  public static initialize(o: UserRegisterCreateResponse, requestErrorDtoList: Array<RequestErrorDto>, useCaseErrorDto: UseCaseErrorDto | null) {
    o._userId = null;
    o._requestErrorDtoList = requestErrorDtoList;
    o._useCaseErrorDto = useCaseErrorDto;
  }

	public get userId(): string {
    if (!this._userId) throw new Error("");
		return this._userId;
	}
}