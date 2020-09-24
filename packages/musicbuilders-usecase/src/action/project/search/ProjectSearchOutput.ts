import { ProjectDto } from "../../../dto/project/ProjectDto";

export class ProjectSearchOutput {
  private _count: number;
  private _projectDto: Array<ProjectDto>;

	constructor(count: number, projectDto: Array<ProjectDto> = new Array<ProjectDto>()) {
		this._count = count;
		this._projectDto = projectDto;
	}

	public get count(): number {
		return this._count;
	}

	public get projectDto(): Array<ProjectDto> {
		return this._projectDto;
	}
}