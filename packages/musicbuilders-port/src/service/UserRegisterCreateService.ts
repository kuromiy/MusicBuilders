import { UserRegisterCreateRequest } from "../request/UserRegisterCreateRequest";
import { UserRegisterCreateResponse } from "../response/UserRegisterCreateResponse";
import { UserCreateUseCase } from "musicbuilders-usecase/src/action/user/create/UserCreateUseCase";
import { UserCreateInput } from "musicbuilders-usecase/src/action/user/create/UserCreateInput";
import { UserCreateOutput } from "musicbuilders-usecase/src/action/user/create/UserCreateOutput";
import { inject, injectable } from "inversify";
import { validate, ValidationError } from "class-validator";
import { ErrorDto } from "../response/error/ErrorDto";

/**
 * ユーザー登録画面ユーザー登録サービス
 */
@injectable()
export class UserRegisterCreateService {
  private _userCreateUseCase: UserCreateUseCase;

  constructor(@inject("UserCreateUseCase") userCreateUseCase: UserCreateUseCase) {
    this._userCreateUseCase = userCreateUseCase;
  }

  public async execute(request: UserRegisterCreateRequest): Promise<UserRegisterCreateResponse> {
    const errors: Array<ValidationError> = await validate(request);
    if (errors.length > 0) {
      // TODO リファクタ
      const errorDtoList: Array<ErrorDto> = new Array<ErrorDto>();
      for (const e of errors) {
        if (e.constraints) {
          for (const ccc of Object.keys(e.constraints)) {
            const dto: ErrorDto = new ErrorDto(e.property, e.constraints[ccc]);
            errorDtoList.push(dto);
          }
        }
      }
      return UserRegisterCreateResponse.createErrorResponse(errorDtoList);
    }
    const input: UserCreateInput = new UserCreateInput(request.userName, request.userMail, request.userPassword);
    const output: UserCreateOutput = await this._userCreateUseCase.handle(input);
    // TODO ユースケース層の復帰可能エラーを例外ではなく正常で処理する。
    return UserRegisterCreateResponse.createNormalResponse(output.userDto.userId);
  }
}