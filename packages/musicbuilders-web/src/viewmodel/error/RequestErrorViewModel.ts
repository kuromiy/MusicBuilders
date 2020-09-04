export class RequestErrorViewModel {
  private _errorProperty: string;
  private _errorMessage: string;

	constructor(errorProperty: string, errorMessage: string) {
		this._errorProperty = errorProperty;
		this._errorMessage = errorMessage;
	}

	public get errorProperty(): string {
		return this._errorProperty;
	}

	public get errorMessage(): string {
		return this._errorMessage;
	}
}