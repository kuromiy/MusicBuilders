import { inject, injectable } from "inversify";
import { TeamDetailIndexRequest } from "../request/TeamDetailIndexRequest";
import { TeamDetailIndexResponse } from "../response/TeamDetailIndexResponse";
import { TeamDetailIndexService } from "../service/TeamDetailIndexService";

@injectable()
export class TeamDetailController {
  private _teamDetailIndexService: TeamDetailIndexService;

	constructor(@inject(TeamDetailIndexService) teamDetailIndexService: TeamDetailIndexService) {
		this._teamDetailIndexService = teamDetailIndexService;
	}

  public async index(request: TeamDetailIndexRequest): Promise<TeamDetailIndexResponse> {
    return this._teamDetailIndexService.execute(request);
  }
}