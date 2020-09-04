export class UseCaseError {
  public static USE001 = new UseCaseError("USE001", "ユーザー登録エラー", "既に使われているメールアドレスです。");

  private _errorCode: string;
  private _errorName: string;
  private _errorMessage: string;

	private constructor(errorCode: string, errorName: string, errorMessage: string) {
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