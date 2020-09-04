export class UseCaseErrorViewModel {
  private _errorCode: string;
  private _errorName: string;
  private _errorMessage: string;

	constructor(errorCode: string, errorName: string, errorMessage: string) {
		this._errorCode = errorCode;
		this._errorName = errorName;
		this._errorMessage = errorMessage;
	}

	public get errorCode(): string {
		return this._errorCode;
	}

	public get errorName(): string {
		return this._errorName;
	}

	public get errorMessage(): string {
		return this._errorMessage;
	}

}