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
    // TODO class-validatorを直接呼び出すのではなくて、ラップしたクラスを呼び出すように修正
    // TODO JavaのOptional型のorElseメソッドのように、エラー時のみ実行される流れにしたい。
    const errors: Array<ValidationError> = await validate(request);
    if (errors.length > 0) {
      // TODO リファクタ
      const errorDtoList: Array<RequestErrorDto> = new Array<RequestErrorDto>();
      for (const e of errors) {
        if (e.constraints) {
          for (const ccc of Object.keys(e.constraints)) {
            const dto: RequestErrorDto = new RequestErrorDto(e.property, e.constraints[ccc]);
            errorDtoList.push(dto);
          }
        }
      }
      return UserRegisterCreateResponse.createRequestErrorResponse(errorDtoList);
    }
    const input: UserCreateInput = new UserCreateInput(request.userName, request.userMail, request.userPassword);
    const result: Result<UserCreateOutput, UseCaseError> = await this._userCreateUseCase.handle(input);
    if (result.isFailure()) {
      const useCaseErrorDto: UseCaseErrorDto = new UseCaseErrorDto(result.value.errorCode, result.value.errorName, result.value.errorMessage);
      return UserRegisterCreateResponse.createUseCaseErrorResponse(useCaseErrorDto);
    }
    return UserRegisterCreateResponse.createNormalResponse(result.value.userDto.userId);
  }
}