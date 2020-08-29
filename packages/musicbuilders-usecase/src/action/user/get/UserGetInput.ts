/**
 * ユーザー取得入力情報クラス
 */
export class UserGetInput {
  private _userId: string;

	constructor(userId: string) {
		this._userId = userId;
	}

	public get userId(): string {
		return this._userId;
	}
}