import { injectable, inject } from "inversify";
import { LoginLoginRequest } from "../request/LoginLoginRequest";
import { LoginLoginResponse } from "../response/LoginLoginResponse";
import { validate, ValidationError } from "class-validator";
import { Result } from "musicbuilders-usecase/src/utils/Result";
import { UseCaseError } from "musicbuilders-usecase/src/error/UseCaseError";
import { UseCaseErrorDto } from "../response/error/UseCaseErrorDto";
import { RequestErrorDto } from "../response/error/RequestErrorDto";
import { UserGetByUserMailUseCase } from "musicbuilders-usecase/src/action/user/getbyusermail/UserGetByUserMailUseCase";
import { UserGetByUserMailInput } from "musicbuilders-usecase/src/action/user/getbyusermail/UserGetByUserMailInput";
import { UserGetByUserMailOutput } from "musicbuilders-usecase/src/action/user/getbyusermail/UserGetByUserMailOutput";
import { RequestValidator } from "../validator/RequestValidator";

/**
 * ログイン画面ログインサービス
 */
@injectable()
export class LoginLoginService {
  private _userGetByUserMailUseCase: UserGetByUserMailUseCase;
  private _requestValidator: RequestValidator;

  constructor(
    @inject("UserGetByUserMailUseCase") userGetByUserMailUseCase: UserGetByUserMailUseCase,
    @inject("RequestValidator") requestValidator: RequestValidator) {
      this._userGetByUserMailUseCase = userGetByUserMailUseCase;
      this._requestValidator = requestValidator;
  }

  public async execute(request: LoginLoginRequest): Promise<LoginLoginResponse> {
    const errorDtoList: Array<RequestErrorDto> = await this._requestValidator.validate(request);
    if (errorDtoList.length > 0) return LoginLoginResponse.createRequestErrorResponse(errorDtoList);

    const input: UserGetByUserMailInput = new UserGetByUserMailInput(request.userMail);
    const result: Result<UserGetByUserMailOutput, UseCaseError> = await this._userGetByUserMailUseCase.handle(input);
    if (result.isFailure()) {
      const useCaseErrorDto: UseCaseErrorDto = new UseCaseErrorDto(result.value.errorCode, result.value.errorName, result.value.errorMessage);
      return LoginLoginResponse.createUseCaseErrorResponse(useCaseErrorDto);
    }

    if (request.userPassword !== result.value.userDto.userPassword) {
      const useCaseErrorDto: UseCaseErrorDto = new UseCaseErrorDto("OTHER", "AAAS", "メールアドレスが存在しないまたは、パスワードが間違えています。");
      return LoginLoginResponse.createUseCaseErrorResponse(useCaseErrorDto);
    }

    return LoginLoginResponse.createNormalResponse(result.value.userDto.userId);
  }
}