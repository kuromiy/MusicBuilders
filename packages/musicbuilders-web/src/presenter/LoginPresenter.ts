import { LoginLoginResponse } from "musicbuilders-port/src/response/LoginLoginResponse";
import { RequestErrorViewModel } from "../viewmodel/error/RequestErrorViewModel";
import { UseCaseErrorViewModel } from "../viewmodel/error/UseCaseErrorViewModel";
import { LoginViewModel } from "../viewmodel/LoginViewModel";

export class LoginPresenter {
  public static present(response: LoginLoginResponse): LoginViewModel {
    const vm2 = response.hasUseCaseError() ? new UseCaseErrorViewModel(response.useCaseErrorDto.errorCode, response.useCaseErrorDto.errorName, response.useCaseErrorDto.errorMessage) : null;
    const vm1 = response.requestErrorDtoList.map(value => {
      return new RequestErrorViewModel(value.errorProperty, value.errorMessage);
    });
    return new LoginViewModel("login", vm1, vm2);
  }
}