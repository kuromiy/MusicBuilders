import { injectable, inject } from "inversify";
import { LoginLoginRequest } from "../request/LoginLoginRequest";
import { LoginLoginResponse } from "../response/LoginLoginResponse";
import { validate, ValidationError } from "class-validator";
import { ErrorDto } from "../response/error/ErrorDto";
import { UserGetUseCase } from "musicbuilders-usecase/src/action/user/get/UserGetUseCase";
import { UserGetInput } from "musicbuilders-usecase/src/action/user/get/UserGetInput";
import { UserGetOuptut } from "musicbuilders-usecase/src/action/user/get/UserGetOutput";

/**
 * ログイン画面ログインサービス
 */
@injectable()
export class LoginLoginService {
  private _userGetUseCase: UserGetUseCase;

  constructor(@inject("UserGetUseCase") userGetUseCase: UserGetUseCase) {
    this._userGetUseCase = userGetUseCase;
  }

  public async execute(request: LoginLoginRequest): Promise<LoginLoginResponse> {
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
      return LoginLoginResponse.createErrorResponse(errorDtoList);
    }
    const input: UserGetInput = new UserGetInput(request.userMail);
    const output: UserGetOuptut = await this._userGetUseCase.handle(input);
    if (output.userDto.userPassword === request.userPassword) {
      return LoginLoginResponse.createNormalResponse(output.userDto.userId);
    } else {
      // TODO リファクタ
      return LoginLoginResponse.createErrorResponse(Array.from([new ErrorDto("", "")]));
    }
  }
}