import { TeamDto } from "../../../dto/team/TeamDto";

export class TeamCreateOutput {
  private _teamDto: TeamDto;

	constructor(teamDto: TeamDto) {
		this._teamDto = teamDto;
	}

	public get teamDto(): TeamDto {
		return this._teamDto;
	}
}