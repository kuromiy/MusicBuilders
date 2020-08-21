/**
 * ユーザー登録画面ユーザー登録処理レスポンス
 */
export class UserRegisterCreateResponse {
  private _userId: string;

	constructor(userId: string) {
		this._userId = userId;
	}

	public get userId(): string {
		return this._userId;
	}
}