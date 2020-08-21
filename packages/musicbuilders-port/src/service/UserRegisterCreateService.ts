import { UserRegisterCreateRequest } from "../request/UserRegisterCreateRequest";
import { UserRegisterCreateResponse } from "../response/UserRegisterCreateResponse";
import { UserCreateUseCase } from "musicbuilders-usecase/src/action/user/create/UserCreateUseCase";
import { UserCreateInput } from "musicbuilders-usecase/src/action/user/create/UserCreateInput";
import { UserCreateOutput } from "musicbuilders-usecase/src/action/user/create/UserCreateOutput";

/**
 * ユーザー登録画面ユーザー登録サービス
 */
export class UserRegisterCreateService {
  private _userCreateUseCase: UserCreateUseCase;

  constructor(userCreateUseCase: UserCreateUseCase) {
    this._userCreateUseCase = userCreateUseCase;
  }

  public async execute(request: UserRegisterCreateRequest): Promise<UserRegisterCreateResponse> {
    const input: UserCreateInput = new UserCreateInput(request.userName, request.userMail, request.userPassword);
    const output: UserCreateOutput = await this._userCreateUseCase.handle(input);
    return new UserRegisterCreateResponse(output.userDto.userId);
  }
}