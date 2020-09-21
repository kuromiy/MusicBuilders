import { inject, injectable } from "inversify";
import { TeamRegisterCreateRequest } from "../request/TeamRegisterCreateRequest";
import { TeamRegisterCreateResponse } from "../response/TeamRegisterCreateResponse";
import { TeamCreateUseCase } from "musicbuilders-usecase/src/action/team/create/TeamCreateUseCase";
import { validate, ValidationError } from "class-validator";
import { RequestErrorDto } from "../response/error/RequestErrorDto";
import { TeamCreateInput } from "musicbuilders-usecase/src/action/team/create/TeamCreateInput";
import { Result } from "musicbuilders-usecase/src/utils/Result";
import { TeamCreateOutput } from "musicbuilders-usecase/src/action/team/create/TeamCreateOutput";
import { UseCaseError } from "musicbuilders-usecase/src/error/UseCaseError";
import { UseCaseErrorDto } from "../response/error/UseCaseErrorDto";
import { RequestValidator } from "../validator/RequestValidator";

@injectable()
export class TeamRegisterCreateService {
  private _teamCreateUseCase: TeamCreateUseCase;
  private _requestValidator: RequestValidator;

  constructor(
    @inject("TeamCreateUseCase") teamCreateUseCase: TeamCreateUseCase,
    @inject("RequestValidator") requestValidator: RequestValidator) {
      this._teamCreateUseCase = teamCreateUseCase;
      this._requestValidator = requestValidator;
  }

  public async execute(request: TeamRegisterCreateRequest): Promise<TeamRegisterCreateResponse> {
    const errorDtoList: Array<RequestErrorDto> = await this._requestValidator.validate(request);
    if (errorDtoList.length > 0) return TeamRegisterCreateResponse.createRequestErrorResponse(errorDtoList);

    const input: TeamCreateInput = new TeamCreateInput(request.teamName, request.teamDescription, request.userId);
    const result: Result<TeamCreateOutput, UseCaseError> = await this._teamCreateUseCase.handle(input);
    if (result.isFailure()) {
      const useCaseErrorDto: UseCaseErrorDto = new UseCaseErrorDto(result.value.errorCode, result.value.errorName, result.value.errorMessage);
      return TeamRegisterCreateResponse.createUseCaseErrorResponse(useCaseErrorDto);
    }
    return TeamRegisterCreateResponse.createNormalResponse(result.value.teamDto.teamId);
  }
}