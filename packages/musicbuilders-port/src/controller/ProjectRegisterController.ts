import { inject, injectable } from "inversify";
import { ProjectRegisterCreateRequest } from "../request/ProjectRegisterCreateRequest";
import { ProjectRegisterIndexRequest } from "../request/ProjectRegisterIndexRequest";
import { ProjectRegisterCreateResponse } from "../response/ProjectRegisterCreateResponse";
import { ProjectRegisterIndexResponse } from "../response/ProjectRegisterIndexResponse";
import { ProjectRegisterCreateService } from "../service/ProjectRegisterCreateService";

@injectable()
export class ProjectRegisterController {
  private _projectRegisterCreateService: ProjectRegisterCreateService;

  constructor(@inject(ProjectRegisterCreateService) projectRegisterCreateService: ProjectRegisterCreateService) {
    this._projectRegisterCreateService = projectRegisterCreateService;
  }

  public async index(request: ProjectRegisterIndexRequest): Promise<ProjectRegisterIndexResponse> {
    // TODO URLのパラメータのチームIDの判定は必要か？
    return new ProjectRegisterIndexResponse();
  }

  public async create(request: ProjectRegisterCreateRequest): Promise<ProjectRegisterCreateResponse> {
    return await this._projectRegisterCreateService.execute(request);
  }
}