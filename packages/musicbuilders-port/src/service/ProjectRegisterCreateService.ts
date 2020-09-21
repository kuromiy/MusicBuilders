import { validate, ValidationError } from "class-validator";
import { inject, injectable } from "inversify";
import { ProjectRegisterCreateRequest } from "../request/ProjectRegisterCreateRequest";
import { RequestErrorDto } from "../response/error/RequestErrorDto";
import { ProjectRegisterCreateResponse } from "../response/ProjectRegisterCreateResponse";
import { ProjectCreateInput } from "musicbuilders-usecase/src/action/project/create/ProjectCreateInput";
import { ProjectCreateUseCase } from "musicbuilders-usecase/src/action/project/create/ProjectCreateUseCase";
import { Result } from "musicbuilders-usecase/src/utils/Result";
import { ProjectCreateOutput } from "musicbuilders-usecase/src/action/project/create/ProjectCreateOutput";
import { UseCaseError } from "musicbuilders-usecase/src/error/UseCaseError";
import { UseCaseErrorDto } from "../response/error/UseCaseErrorDto";

@injectable()
export class ProjectRegisterCreateService {
  private _projectCreateUseCase: ProjectCreateUseCase;

  constructor(@inject("ProjectCreateUseCase") projectCreateUseCase: ProjectCreateUseCase) {
    this._projectCreateUseCase = projectCreateUseCase;
  }

  public async execute(request: ProjectRegisterCreateRequest): Promise<ProjectRegisterCreateResponse> {
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
      return ProjectRegisterCreateResponse.createRequestErrorResponse(errorDtoList);
    }
    const input: ProjectCreateInput = new ProjectCreateInput(request.projectName, request.projectDescription, request.userId, request.teamId);
    const result: Result<ProjectCreateOutput, UseCaseError> = await this._projectCreateUseCase.handle(input);
    if (result.isFailure()) {
      const useCaseErrorDto: UseCaseErrorDto = new UseCaseErrorDto(result.value.errorCode, result.value.errorName, result.value.errorMessage);
      return ProjectRegisterCreateResponse.createUseCaseErrorResponse(useCaseErrorDto);
    }
    return ProjectRegisterCreateResponse.createNormalResponse("test");
  }
}