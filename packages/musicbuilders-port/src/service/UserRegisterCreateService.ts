import { UserRegisterCreateRequest } from "../request/UserRegisterCreateRequest";
import { UserRegisterCreateResponse } from "../response/UserRegisterCreateResponse";
import { UserCreateUseCase } from "musicbuilders-usecase/src/action/user/create/UserCreateUseCase";
import { UserCreateInput } from "musicbuilders-usecase/src/action/user/create/UserCreateInput";
import { UserCreateOutput } from "musicbuilders-usecase/src/action/user/create/UserCreateOutput";
import { inject, injectable } from "inversify";
import { validate, ValidationError } from "class-validator";
import { ErrorDto } from "../response/error/ErrorDto";
import { Result } from "musicbuilders-usecase/src/utils/Result";
import { UseCaseError } from "musicbuilders-usecase/src/error/UseCaseError";
import { UseCaseErrorDto } from "../response/error/UseCaseErrorDto";
import { RequestErrorDto } from "../response/error/RequestErrorDto";
import { RequestValidator } from "../validator/RequestValidator";

/**
 * ユーザー登録画面ユーザー登録サービス
 */
@injectable()
export class UserRegisterCreateService {
  private _userCreateUseCase: UserCreateUseCase;
  private _requestValidator: RequestValidator;

  constructor(
    @inject("UserCreateUseCase") userCreateUseCase: UserCreateUseCase,
    @inject("RequestValidator") requestValidator: RequestValidator) {
      this._userCreateUseCase = userCreateUseCase;
      this._requestValidator = requestValidator;
  }

  public async execute(request: UserRegisterCreateRequest): Promise<UserRegisterCreateResponse> {
    const errorDtoList: Array<RequestErrorDto> = await this._requestValidator.validate(request);
    if (errorDtoList.length > 0) return UserRegisterCreateResponse.createRequestErrorResponse(errorDtoList);

    const input: UserCreateInput = new UserCreateInput(request.userName, request.userMail, request.userPassword);
    const result: Result<UserCreateOutput, UseCaseError> = await this._userCreateUseCase.handle(input);
    if (result.isFailure()) {
      const useCaseErrorDto: UseCaseErrorDto = new UseCaseErrorDto(result.value.errorCode, result.value.errorName, result.value.errorMessage);
      return UserRegisterCreateResponse.createUseCaseErrorResponse(useCaseErrorDto);
    }
    return UserRegisterCreateResponse.createNormalResponse(result.value.userDto.userId);
  }
}