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
import { RequestValidator } from "../validator/RequestValidator";

@injectable()
export class ProjectRegisterCreateService {
  private _projectCreateUseCase: ProjectCreateUseCase;
  private _requestValidator: RequestValidator;

  constructor(
    @inject("ProjectCreateUseCase") projectCreateUseCase: ProjectCreateUseCase,
    @inject("RequestValidator") requestValidator: RequestValidator) {
      this._projectCreateUseCase = projectCreateUseCase;
      this._requestValidator = requestValidator;
  }

  public async execute(request: ProjectRegisterCreateRequest): Promise<ProjectRegisterCreateResponse> {
    const errorDtoList: Array<RequestErrorDto> = await this._requestValidator.validate(request);
    if (errorDtoList.length > 0) return ProjectRegisterCreateResponse.createRequestErrorResponse(errorDtoList);

    const input: ProjectCreateInput = new ProjectCreateInput(request.projectName, request.projectDescription, request.userId, request.teamId);
    const result: Result<ProjectCreateOutput, UseCaseError> = await this._projectCreateUseCase.handle(input);
    if (result.isFailure()) {
      const useCaseErrorDto: UseCaseErrorDto = new UseCaseErrorDto(result.value.errorCode, result.value.errorName, result.value.errorMessage);
      return ProjectRegisterCreateResponse.createUseCaseErrorResponse(useCaseErrorDto);
    }
    return ProjectRegisterCreateResponse.createNormalResponse("test");
  }
}