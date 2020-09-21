import { ProjectRegisterCreateResponse } from "musicbuilders-port/src/response/ProjectRegisterCreateResponse";
import { RequestErrorViewModel } from "../viewmodel/error/RequestErrorViewModel";
import { UseCaseErrorViewModel } from "../viewmodel/error/UseCaseErrorViewModel";
import { ProjectRegisterViewModel } from "../viewmodel/ProjectRegisterViewModel";

export class ProjectRegisterPresenter {
  public static present(response: ProjectRegisterCreateResponse): ProjectRegisterViewModel {
    const viewName: string = response.hasRequestError() || response.hasUseCaseError() ? "project/register" : "project/register";
    const vm2 = response.hasUseCaseError() ? new UseCaseErrorViewModel(response.useCaseErrorDto.errorCode, response.useCaseErrorDto.errorName, response.useCaseErrorDto.errorMessage) : null;
    const vm1 = response.requestErrorDtoList.map(value => {
      return new RequestErrorViewModel(value.errorProperty, value.errorMessage);
    });
    return new ProjectRegisterViewModel(viewName, response.teamId, vm1, vm2);
  }
}