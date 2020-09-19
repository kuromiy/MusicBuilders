import { HomeIndexResponse } from "musicbuilders-port/src/response/HomeIndexResponse";
import { TeamViewDto } from "../viewmodel/dto/TeamViewDto";
import { RequestErrorViewModel } from "../viewmodel/error/RequestErrorViewModel";
import { UseCaseErrorViewModel } from "../viewmodel/error/UseCaseErrorViewModel";
import { HomeViewModel } from "../viewmodel/HomeViewModel";

export class HomePresenter {
  public static present(response: HomeIndexResponse): HomeViewModel {
    const viewName = "index";
    const vm2 = response.hasUseCaseError() ? new UseCaseErrorViewModel(response.useCaseErrorDto.errorCode, response.useCaseErrorDto.errorName, response.useCaseErrorDto.errorMessage) : null;
    const vm1 = response.requestErrorDtoList.map(value => {
      return new RequestErrorViewModel(value.errorProperty, value.errorMessage);
    });
    const list = response.teamDtoList.map(value => {
      return new TeamViewDto(value.teamId, value.teamName, value.teamDescription, value.createdAt, value.updatedAt);
    });
    return new HomeViewModel(viewName, list, vm1, vm2);
  }
}