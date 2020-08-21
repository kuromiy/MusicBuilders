/**
 * ユーザー作成入力情報クラス
 */
export class UserCreateInput {
  private _userName: string;
  private _userMail: string;
  private _userPassword: string;

	constructor(userName: string, userMail: string, userPassword: string) {
		this._userName = userName;
		this._userMail = userMail;
		this._userPassword = userPassword;
	}

	public get userName(): string {
		return this._userName;
	}

	public get userMail(): string {
		return this._userMail;
	}

	public get userPassword(): string {
		return this._userPassword;
	}
}