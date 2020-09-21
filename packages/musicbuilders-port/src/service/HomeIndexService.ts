import { validate, ValidationError } from "class-validator";
import { inject, injectable } from "inversify";
import { HomeIndexRequest } from "../request/HomeIndexRequest";
import { RequestErrorDto } from "../response/error/RequestErrorDto";
import { HomeIndexResponse } from "../response/HomeIndexResponse";
import { TeamListInput } from "musicbuilders-usecase/src/action/team/list/TeamListInput";
import { TeamListUseCase } from "musicbuilders-usecase/src/action/team/list/TeamListUseCase";
import { TeamListOutput } from "musicbuilders-usecase/src/action/team/list/TeamListOutput";
import { UseCaseError } from "musicbuilders-usecase/src/error/UseCaseError";
import { Result } from "musicbuilders-usecase/src/utils/Result";
import { UseCaseErrorDto } from "../response/error/UseCaseErrorDto";
import { TeamDto } from "../response/dto/TeamDto";
import { RequestValidator } from "../validator/RequestValidator";

@injectable()
export class HomeIndexService {
  private _teamListUseCase: TeamListUseCase;
  private _requestValidator: RequestValidator;

	constructor(
    @inject("TeamListUseCase") teamListUseCase: TeamListUseCase,
    @inject("RequestValidator") requestValidator: RequestValidator) {
      this._teamListUseCase = teamListUseCase;
      this._requestValidator = requestValidator;
	}

  public async execute(request: HomeIndexRequest): Promise<HomeIndexResponse> {
    const errorDtoList: Array<RequestErrorDto> = await this._requestValidator.validate(request);
    if (errorDtoList.length > 0) return HomeIndexResponse.createRequestErrorResponse(errorDtoList);

    const input: TeamListInput = new TeamListInput(request.userId);
    const result: Result<TeamListOutput, UseCaseError> = await this._teamListUseCase.handle(input);
    if (result.isFailure()) {
      const useCaseErrorDto: UseCaseErrorDto = new UseCaseErrorDto(result.value.errorCode, result.value.errorName, result.value.errorMessage);
      return HomeIndexResponse.createUseCaseErrorResponse(useCaseErrorDto);
    }
    const list = result.value.teamDtoList.map(value => {
      return new TeamDto(value.teamId, value.teamName, value.teamDescription, value.teamAdministrator, value.teamMemberList, value.createdAt, value.updatedAt);
    });
    return HomeIndexResponse.createNormalResponse(list);
  }
}