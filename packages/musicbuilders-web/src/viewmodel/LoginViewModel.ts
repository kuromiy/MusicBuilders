import { RequestErrorViewModel } from "./error/RequestErrorViewModel";
import { UseCaseErrorViewModel } from "./error/UseCaseErrorViewModel";

export class LoginViewModel {
  private _viewName: string;
  private _requestErrorViewModelList: Array<RequestErrorViewModel>;
  private _useCaseErrorViewModel: UseCaseErrorViewModel | null;

	constructor(viewName: string, requestErrorViewModelList: Array<RequestErrorViewModel>, useCaseErrorViewModel: UseCaseErrorViewModel | null ) {
		this._viewName = viewName;
		this._requestErrorViewModelList = requestErrorViewModelList;
		this._useCaseErrorViewModel = useCaseErrorViewModel;
	}

	public get viewName(): string {
		return this._viewName;
	}

	public get requestErrorViewModel(): Array<RequestErrorViewModel> {
		return this._requestErrorViewModelList;
	}

	public get useCaseErrorViewModel(): UseCaseErrorViewModel  {
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