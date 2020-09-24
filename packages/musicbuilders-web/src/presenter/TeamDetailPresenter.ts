import { TeamDetailViewModel } from "../viewmodel/TeamDetailViewModel";
import { TeamDetailIndexResponse } from "musicbuilders-port/src/response/TeamDetailIndexResponse";
import { RequestErrorViewModel } from "../viewmodel/error/RequestErrorViewModel";
import { UseCaseErrorViewModel } from "../viewmodel/error/UseCaseErrorViewModel";
import { TeamViewDto } from "../viewmodel/dto/TeamViewDto";
import { ProjectViewDto } from "../viewmodel/dto/ProjectViewDto";

export class TeamDetailPresenter {
  public static present(response: TeamDetailIndexResponse): TeamDetailViewModel {
    const viewName = response.hasRequestError() || response.hasUseCaseError() ? "team/detail" : "team/detail";
    const vm2 = response.hasUseCaseError() ? new UseCaseErrorViewModel(response.useCaseErrorDto.errorCode, response.useCaseErrorDto.errorName, response.useCaseErrorDto.errorMessage) : null;
    const vm1 = response.requestErrorDtoList.map(value => {
      return new RequestErrorViewModel(value.errorProperty, value.errorMessage);
    });
    const teamViewDto: TeamViewDto = new TeamViewDto(response.teamDto.teamId, response.teamDto.teamName, response.teamDto.teamDescription, response.teamDto.createdAt, response.teamDto.updatedAt);
    const projectViewDtoList: Array<ProjectViewDto> = response.projectDtoList.map(value => {
      return new ProjectViewDto(value.projectId, value.projectName, value.projectDescription, value.projectAdministrator, value.teamId, value.createdAt, value.updatedAt);
    }); 
    return new TeamDetailViewModel(viewName, teamViewDto, response.count, projectViewDtoList, vm1, vm2);
  }
}