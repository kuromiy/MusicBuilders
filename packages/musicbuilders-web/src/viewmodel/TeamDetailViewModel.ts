import { ProjectViewDto } from "./dto/ProjectViewDto";
import { TeamViewDto } from "./dto/TeamViewDto";
import { RequestErrorViewModel } from "./error/RequestErrorViewModel";
import { UseCaseErrorViewModel } from "./error/UseCaseErrorViewModel";

export class TeamDetailViewModel {
  private _viewName: string;
  private _teamDto: TeamViewDto;
  private _count: number;
  private _projectDtoList: Array<ProjectViewDto>;
  private _requestErrorViewModelList: Array<RequestErrorViewModel>;
  private _useCaseErrorViewModel: UseCaseErrorViewModel | null;

	constructor(viewName: string, teamDto: TeamViewDto, count: number, projectDtoList: Array<ProjectViewDto>, requestErrorViewModelList: Array<RequestErrorViewModel>, useCaseErrorViewModel: UseCaseErrorViewModel | null) {
    this._viewName = viewName;
    this._teamDto = teamDto;
    this._count = count;
    this._projectDtoList = projectDtoList;
		this._requestErrorViewModelList = requestErrorViewModelList;
		this._useCaseErrorViewModel = useCaseErrorViewModel;
	}

	public get viewName(): string {
		return this._viewName;
  }

  public get teamDto(): TeamViewDto {
    return this._teamDto;
  }

  public get count(): number {
    return this._count;
  }

  public get projectDtoList(): Array<ProjectViewDto> {
    return this._projectDtoList;
  }

	public get requestErrorViewModel(): Array<RequestErrorViewModel> {
		return this._requestErrorViewModelList;
	}

	public get useCaseErrorViewModel(): UseCaseErrorViewModel {
    if (!this._useCaseErrorViewModel) throw new Error("");
		return this._useCaseErrorViewModel;
  }

  public hasUseCaseError(): boolean {
    return this._useCaseErrorViewModel !== null;
  }

  public hasRequestError(key: string): boolean {
    const target = this._requestErrorViewModelList.filter(value => value.errorProperty === key);
    return target.length !== 0;
  }

  public getRequestError(key: string): Array<RequestErrorViewModel> {
    return this._requestErrorViewModelList.filter(value => value.errorProperty === key);
  }
}