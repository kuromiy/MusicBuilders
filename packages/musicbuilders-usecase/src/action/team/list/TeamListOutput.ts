import { TeamDto } from "../../../dto/team/TeamDto";

export class TeamListOutput {
  private _teamDtoList: Array<TeamDto>;

	constructor(teamDtoList: Array<TeamDto>) {
		this._teamDtoList = teamDtoList;
	}

	public get teamDtoList(): Array<TeamDto> {
		return this._teamDtoList;
	}
}