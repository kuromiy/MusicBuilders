import { inject, injectable } from "inversify";
import { TeamRegisterCreateRequest } from "../request/TeamRegisterCreateRequest";
import { TeamRegisterIndexRequest } from "../request/TeamRegisterIndexRequest";
import { TeamRegisterCreateResponse } from "../response/TeamRegisterCreateResponse";
import { TeamRegisterIndexResponse } from "../response/TeamRegisterIndexResponse";
import { TeamRegisterCreateService } from "../service/TeamRegisterCreateService";

@injectable()
export class TeamRegisterController {
  private _teamRegisterCreateService: TeamRegisterCreateService;

  constructor(@inject(TeamRegisterCreateService) teamRegisterCreateService: TeamRegisterCreateService) {
    this._teamRegisterCreateService = teamRegisterCreateService;
  }

  public async index(request: TeamRegisterIndexRequest): Promise<TeamRegisterIndexResponse> {
    return new TeamRegisterIndexResponse();
  }

  public async create(request: TeamRegisterCreateRequest): Promise<TeamRegisterCreateResponse> {
    return await this._teamRegisterCreateService.execute(request);
  }
}