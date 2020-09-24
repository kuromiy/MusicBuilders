import { ProjectDto } from "../../dto/project/ProjectDto";

export class ProjectQueryResult {
  private _projectDto: Array<ProjectDto>;

	constructor(projectDto: Array<ProjectDto>) {
		this._projectDto = projectDto;
	}

	public get projectDto(): Array<ProjectDto> {
		return this._projectDto;
	}
}