import { UserRegisterCreateResponse } from "musicbuilders-port/src/response/UserRegisterCreateResponse";
import { RequestErrorViewModel } from "../viewmodel/error/RequestErrorViewModel";
import { UseCaseErrorViewModel } from "../viewmodel/error/UseCaseErrorViewModel";
import { UserRegisterViewModel } from "../viewmodel/UserRegisterViewModel";

export class UserRegisterPresenter {
  public static present(response: UserRegisterCreateResponse): UserRegisterViewModel {
    const viewName: string = response.hasRequestError() || response.hasUseCaseError() ? "user/register" : "login";
    const vm2 = response.hasUseCaseError() ? new UseCaseErrorViewModel(response.useCaseErrorDto.errorCode, response.useCaseErrorDto.errorName, response.useCaseErrorDto.errorMessage) : null;
    const vm1 = response.requestErrorDtoList.map(value => {
      return new RequestErrorViewModel(value.errorProperty, value.errorMessage);
    });
    return new UserRegisterViewModel(viewName, vm1, vm2);
  }
}