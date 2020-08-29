export class UserRegisterViewModel {
  private _viewName: string;
  private _model: any;

	constructor(viewName: string, model: any) {
		this._viewName = viewName;
		this._model = model;
	}

	public get viewName(): string {
		return this._viewName;
	}

	public get model(): any {
		return this._model;
	}

	public set viewName(value: string) {
		this._viewName = value;
	}

	public set model(value: any) {
		this._model = value;
	}
}