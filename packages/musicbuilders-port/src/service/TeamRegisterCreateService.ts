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

@injectable()
export class TeamRegisterCreateService {
  private _teamCreateUseCase: TeamCreateUseCase;

  constructor(@inject("TeamCreateUseCase") teamCreateUseCase: TeamCreateUseCase) {
    this._teamCreateUseCase = teamCreateUseCase;
  }

  public async execute(request: TeamRegisterCreateRequest): Promise<TeamRegisterCreateResponse> {
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
      return TeamRegisterCreateResponse.createRequestErrorResponse(errorDtoList);
    }
    const input: TeamCreateInput = new TeamCreateInput(request.teamName, request.teamDescription, request.userId);
    const result: Result<TeamCreateOutput, UseCaseError> = await this._teamCreateUseCase.handle(input);
    if (result.isFailure()) {
      const useCaseErrorDto: UseCaseErrorDto = new UseCaseErrorDto(result.value.errorCode, result.value.errorName, result.value.errorMessage);
      return TeamRegisterCreateResponse.createUseCaseErrorResponse(useCaseErrorDto);
    }
    return TeamRegisterCreateResponse.createNormalResponse(result.value.teamDto.teamId);
  }
}