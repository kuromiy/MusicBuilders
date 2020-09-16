import { TeamRegisterCreateResponse } from "musicbuilders-port/src/response/TeamRegisterCreateResponse";
import { RequestErrorViewModel } from "../viewmodel/error/RequestErrorViewModel";
import { UseCaseErrorViewModel } from "../viewmodel/error/UseCaseErrorViewModel";
import { TeamRegisterViewModel } from "../viewmodel/TeamRegisterViewModel";

export class TeamRegisterPresenter {
  public static present(response: TeamRegisterCreateResponse): TeamRegisterViewModel {
    const viewName: string = response.hasRequestError() || response.hasUseCaseError() ? "user/register" : "user/register";
    const vm2 = response.hasUseCaseError() ? new UseCaseErrorViewModel(response.useCaseErrorDto.errorCode, response.useCaseErrorDto.errorName, response.useCaseErrorDto.errorMessage) : null;
    const vm1 = response.requestErrorDtoList.map(value => {
      return new RequestErrorViewModel(value.errorProperty, value.errorMessage);
    });
    return new TeamRegisterViewModel(viewName, vm1, vm2);
  }
}